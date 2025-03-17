import { S3Client, ListObjectsV2Command, DeleteObjectsCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { createReadStream } from "fs";
import path from "path";
import fs from "fs";
import * as tar from "tar";

// Environment variables from .env.development
const TARGET_BUCKET = process.env.S3_BUCKET || "mindvista-local";
const REGION = process.env.S3_REGION || "ca-central-1";
const LOCALSTACK_ENDPOINT = process.env.S3_ENDPOINT || "http://localhost:4566";

// LocalStack S3 client with test credentials
const localS3Client = new S3Client({
    region: REGION,
    endpoint: LOCALSTACK_ENDPOINT,
    credentials: {
        accessKeyId: "test",
        secretAccessKey: "test",
    },
    forcePathStyle: true,
});

async function checkLocalStack(): Promise<void> {
    console.log("Checking LocalStack connection...");
    try {
        await localS3Client.send(
            new ListObjectsV2Command({
                Bucket: TARGET_BUCKET,
                MaxKeys: 1,
            }),
        );
    } catch (error) {
        if (error instanceof Error && "code" in error) {
            const code = (error as { code: string }).code;
            if (code === "ECONNREFUSED" || code === "ENOTFOUND") {
                throw new Error(`LocalStack not running. Please run 'npm run setup:dev' first.`);
            }
            if (code === "NoSuchBucket") {
                throw new Error(`Bucket '${TARGET_BUCKET}' not found. Please run 'npm run setup:dev' first.`);
            }
        }
        throw error;
    }
}

async function getLatestBackup(): Promise<string> {
    const dataDir = path.join(process.cwd(), "data");
    const files = fs
        .readdirSync(dataDir)
        .filter((file) => file.endsWith(".s3.tar.gz"))
        .sort()
        .reverse();

    if (files.length === 0) {
        throw new Error("No S3 backups found in data directory.");
    }

    return path.join(dataDir, files[0]);
}

async function extractBackup(backupFile: string): Promise<string> {
    const extractDir = path.join(process.cwd(), "tmp", "s3-extract");

    // Clean up any existing extracted files
    if (fs.existsSync(extractDir)) {
        fs.rmSync(extractDir, { recursive: true });
    }
    fs.mkdirSync(extractDir, { recursive: true });

    // Extract the backup
    await tar.x({
        file: backupFile,
        cwd: extractDir,
    });

    return extractDir;
}

async function getAllFiles(dir: string, baseDir: string): Promise<{ path: string; key: string }[]> {
    const files: { path: string; key: string }[] = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files.push(...(await getAllFiles(fullPath, baseDir)));
        } else {
            // Calculate the key relative to baseDir to maintain directory structure
            const key = path.relative(baseDir, fullPath).replace(/\\/g, "/");
            files.push({ path: fullPath, key });
        }
    }

    return files;
}

async function uploadDirectory(directory: string) {
    const files = await getAllFiles(directory, directory);
    let uploaded = 0;
    const total = files.length;

    for (const { path: filePath, key } of files) {
        const fileStream = createReadStream(filePath);
        const command = new PutObjectCommand({
            Bucket: TARGET_BUCKET,
            Key: key,
            Body: fileStream,
        });

        await localS3Client.send(command);
        uploaded++;

        if (uploaded % 10 === 0 || uploaded === total) {
            const percent = ((uploaded / total) * 100).toFixed(1);
            console.log(`Progress: ${uploaded}/${total} files (${percent}%)...`);
        }
    }

    return total;
}

async function clearBucket() {
    console.log("Listing existing objects...");
    const objects: string[] = [];
    let continuationToken: string | undefined;

    // List all objects
    do {
        const command = new ListObjectsV2Command({
            Bucket: TARGET_BUCKET,
            ContinuationToken: continuationToken,
        });

        const response = await localS3Client.send(command);
        response.Contents?.forEach((object) => {
            if (object.Key) objects.push(object.Key);
        });

        continuationToken = response.NextContinuationToken;
    } while (continuationToken);

    if (objects.length > 0) {
        console.log(`Found ${objects.length} existing objects. Deleting...`);
        // Delete objects in batches
        for (let i = 0; i < objects.length; i += 1000) {
            const batch = objects.slice(i, i + 1000);
            const command = new DeleteObjectsCommand({
                Bucket: TARGET_BUCKET,
                Delete: {
                    Objects: batch.map((Key) => ({ Key })),
                    Quiet: true,
                },
            });

            await localS3Client.send(command);
            const progress = Math.min(i + 1000, objects.length);
            console.log(`Deleted ${progress}/${objects.length} objects...`);
        }
    } else {
        console.log("No existing objects found.");
    }
}

async function main() {
    try {
        console.log("Starting S3 seed from local backup...");

        // Check LocalStack is running and bucket exists
        await checkLocalStack();

        // Get latest backup file
        const backupFile = await getLatestBackup();
        const stats = fs.statSync(backupFile);
        const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
        console.log(`Using backup file: ${backupFile} (${sizeMB} MB)`);

        // Extract backup
        console.log("\nExtracting backup...");
        const extractDir = await extractBackup(backupFile);

        // Clear existing bucket
        console.log("\nPreparing LocalStack bucket...");
        await clearBucket();

        // Upload files
        console.log("\nUploading files to LocalStack...");
        const totalFiles = await uploadDirectory(extractDir);

        // Clean up
        fs.rmSync(extractDir, { recursive: true });

        console.log("\nS3 seed complete!");
        console.log(`Uploaded ${totalFiles} files to ${TARGET_BUCKET}`);
        console.log(`Endpoint: ${LOCALSTACK_ENDPOINT}`);
    } catch (error) {
        if (error instanceof Error) {
            console.error("\nFailed to seed S3:", error.message);
            if ("code" in error) {
                console.error("Error code:", (error as { code: string }).code);
            }
        } else {
            console.error("\nFailed to seed S3:", error);
        }
        process.exit(1);
    }
}

main();
