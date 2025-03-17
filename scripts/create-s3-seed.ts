/**
 * Creates a seed file for local S3 development by downloading files from production S3 bucket.
 *
 * Usage:
 * ```sh
 * PROD_S3_BUCKET="bucket-name" \
 * AWS_ACCESS_KEY_ID="your-access-key" \
 * AWS_SECRET_ACCESS_KEY="your-secret-key" \
 * AWS_REGION="region-name" \
 * tsx scripts/create-s3-seed.ts
 * ```
 *
 * This will create a timestamped .s3.tar.gz file in the data/ directory.
 * Only code owners should run this script as it requires production S3 access.
 */

import { S3Client, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { createWriteStream } from "fs";
import { execFile } from "child_process";
import { promisify } from "util";
import path from "path";
import fs from "fs";

const execFileAsync = promisify(execFile);

// Required environment variables
const requiredEnvVars = ["PROD_S3_BUCKET", "AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY", "AWS_REGION"];

// Check for required environment variables
const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);
if (missingVars.length > 0) {
    console.error("Missing required environment variables:", missingVars.join(", "));
    console.error("\nUsage:");
    console.error('PROD_S3_BUCKET="bucket-name" \\');
    console.error('AWS_ACCESS_KEY_ID="your-access-key" \\');
    console.error('AWS_SECRET_ACCESS_KEY="your-secret-key" \\');
    console.error('AWS_REGION="region-name" \\');
    console.error("tsx scripts/create-s3-seed.ts");
    process.exit(1);
}

// Initialize S3 client
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
});

async function downloadObject(bucket: string, key: string, targetPath: string) {
    // Skip directory markers (keys ending with '/')
    if (key.endsWith("/")) {
        // Just create the directory
        fs.mkdirSync(targetPath, { recursive: true });
        return;
    }

    const command = new GetObjectCommand({
        Bucket: bucket,
        Key: key,
    });

    const response = await s3Client.send(command);
    if (!response.Body) throw new Error(`No body in response for ${key}`);

    // Ensure directory exists
    const dir = path.dirname(targetPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    // Stream the file to disk
    const writeStream = createWriteStream(targetPath);
    if ("pipe" in response.Body) {
        response.Body.pipe(writeStream);
        await new Promise<void>((resolve, reject) => {
            writeStream.on("finish", () => resolve());
            writeStream.on("error", (err) => reject(err));
        });
    }
}

async function main() {
    try {
        console.log("Starting S3 backup...");

        // Create timestamp for filename
        const timestamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
        const tmpDir = path.join(process.cwd(), "tmp", "s3-backup");
        const backupFile = path.join(process.cwd(), "data", `${timestamp}.s3.tar.gz`);

        // Create temporary directory
        console.log("Creating temporary directory...");
        if (fs.existsSync(tmpDir)) {
            fs.rmSync(tmpDir, { recursive: true });
        }
        fs.mkdirSync(tmpDir, { recursive: true });

        // First, list all objects to get total count
        console.log("Listing files in S3 bucket...");
        let continuationToken: string | undefined;
        let allObjects: { Key: string }[] = [];

        do {
            const command = new ListObjectsV2Command({
                Bucket: process.env.PROD_S3_BUCKET,
                ContinuationToken: continuationToken,
            });

            const response = await s3Client.send(command);
            if (response.Contents) {
                allObjects = allObjects.concat(response.Contents.filter((obj): obj is { Key: string } => obj.Key !== undefined));
            }
            continuationToken = response.NextContinuationToken;
        } while (continuationToken);

        if (allObjects.length === 0) {
            console.error("Error: No objects found in bucket. Is the bucket name correct?");
            process.exit(1);
        }

        console.log(`Found ${allObjects.length} objects in bucket.`);

        // Download all objects
        console.log("\nStarting download...");
        let downloadedFiles = 0;
        const totalFiles = allObjects.length;

        for (const object of allObjects) {
            const targetPath = path.join(tmpDir, object.Key);
            await downloadObject(process.env.PROD_S3_BUCKET || "", object.Key, targetPath);
            downloadedFiles++;
            if (downloadedFiles % 10 === 0 || downloadedFiles === totalFiles) {
                const percent = ((downloadedFiles / totalFiles) * 100).toFixed(1);
                console.log(`Progress: ${downloadedFiles}/${totalFiles} files (${percent}%)...`);
            }
        }

        // Create tar.gz archive
        console.log("\nCreating backup archive...");
        await execFileAsync("tar", ["-czf", backupFile, "-C", tmpDir, "."]);

        // Clean up
        fs.rmSync(tmpDir, { recursive: true });

        // Get file size
        const stats = fs.statSync(backupFile);
        const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);

        console.log(`\nBackup complete!`);
        console.log(`Location: ${backupFile}`);
        console.log(`Size: ${sizeMB} MB`);
        console.log(`Objects: ${allObjects.length}`);
    } catch (error) {
        if (error instanceof Error) {
            console.error("Failed to create S3 backup:", error.message);
            if ("code" in error) {
                console.error("Error code:", (error as { code: string }).code);
            }
        } else {
            console.error("Failed to create S3 backup:", error);
        }
        process.exit(1);
    }
}

main();
