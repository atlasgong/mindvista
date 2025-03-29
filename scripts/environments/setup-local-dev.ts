import { exec } from "child_process";
import { promisify } from "util";
import { S3Client, CreateBucketCommand, BucketLocationConstraint, BucketAlreadyOwnedByYou, BucketAlreadyExists } from "@aws-sdk/client-s3";

const execAsync = promisify(exec);

// parse command line arguments
const withSudo = process.argv.includes("--with-sudo");

const LOCALSTACK_ENDPOINT = process.env.S3_ENDPOINT || "http://localhost:4566";
const BUCKET_NAME = process.env.S3_BUCKET || "mindvista-local";
const REGION = process.env.S3_REGION || "ca-central-1";
const AWS_ACCESS_KEY_ID = process.env.S3_ACCESS_KEY_ID || "test";
const AWS_SECRET_ACCESS_KEY = process.env.S3_SECRET_ACCESS_KEY || "test";

async function executeCommand(command: string): Promise<void> {
    try {
        // prepend sudo to docker commands if --with-sudo flag is present
        const finalCommand = withSudo && command.startsWith("docker") ? `sudo ${command}` : command;

        const { stdout, stderr } = await execAsync(finalCommand);
        if (stdout) console.log(stdout);
        if (stderr) console.error(stderr);
    } catch (error) {
        if (error instanceof Error) {
            if (error.message.includes("permission denied") && !withSudo) {
                console.error("\nPermission denied when executing Docker command.");
                console.error("Try running the script with `--with-sudo` flag.");
                process.exit(1);
            }
        }
        console.error(`\nError executing command: ${command}`);
        console.error(error);
        throw error;
    }
}

async function waitForLocalStack(): Promise<void> {
    console.log("Waiting for LocalStack to be ready...");
    let retries = 30;
    while (retries > 0) {
        try {
            await execAsync(`curl -s ${LOCALSTACK_ENDPOINT}/health`);
            console.log("LocalStack is ready!");
            return;
        } catch (error) {
            retries--;
            if (retries === 0) {
                throw new Error("LocalStack failed to start.");
            }
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }
    }
}

// runAwsCommand function removed as S3 operations now use the SDK

async function setupS3(): Promise<void> {
    console.log("\nSetting up S3 bucket using AWS SDK...");

    const s3Client = new S3Client({
        region: REGION,
        endpoint: LOCALSTACK_ENDPOINT,
        credentials: {
            accessKeyId: AWS_ACCESS_KEY_ID,
            secretAccessKey: AWS_SECRET_ACCESS_KEY,
        },
        forcePathStyle: true, // Required for LocalStack compatibility
    });

    const createBucketCommand = new CreateBucketCommand({
        Bucket: BUCKET_NAME,
        // CreateBucketConfiguration is needed if region is not us-east-1
        ...(REGION !== "us-east-1" && {
            CreateBucketConfiguration: { LocationConstraint: REGION as BucketLocationConstraint },
        }),
    });

    try {
        console.log(`Attempting to create bucket '${BUCKET_NAME}'...`);
        await s3Client.send(createBucketCommand);
        console.log(`Bucket '${BUCKET_NAME}' created successfully.`);
        console.log("S3 bucket setup complete.");
    } catch (error) {
        if (error instanceof BucketAlreadyOwnedByYou || error instanceof BucketAlreadyExists) {
            // LocalStack might return BucketAlreadyExists, AWS proper returns BucketAlreadyOwnedByYou
            console.log(`Bucket '${BUCKET_NAME}' already exists. Skipping creation and continuing...`);
        } else {
            // For any other error during bucket creation, log and re-throw
            console.error(`Failed to create or access S3 bucket '${BUCKET_NAME}':`, error);
            throw error;
        }
    }
}

async function checkPrerequisites(): Promise<boolean> {
    try {
        // Check Docker
        await executeCommand("docker --version");
        console.log("Docker is installed.");

        // Check Docker Compose
        await executeCommand("docker compose version");
        console.log("Docker Compose is available.");

        return true;
    } catch (error) {
        console.error("\nPrerequisites check failed!");
        console.log("\nPlease ensure you have Docker installed:");
        console.log("1. Install and start Docker.");
        console.log("2. Run this setup script again.\n");
        return false;
    }
}

async function checkExistingContainers(): Promise<boolean> {
    try {
        const { stdout } = await execAsync(`${withSudo ? "sudo " : ""}docker compose ps --format json`);
        const containers = JSON.parse(stdout);

        if (containers.length > 0) {
            console.log("\nExisting containers found:");
            for (const container of containers) {
                console.log(`- ${container.Service} (${container.State})`);
            }
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
}

async function main() {
    console.log("Setting up local development environment...\n");

    const cmdPrefix = withSudo ? "sudo " : "";

    try {
        // Check prerequisites
        const prereqsOk = await checkPrerequisites();
        if (!prereqsOk) {
            process.exit(1);
        }

        // Check for existing containers
        const containersExist = await checkExistingContainers();
        if (containersExist) {
            console.log("\nContainers are already set up. You can:");
            console.log(`1. Use existing containers: ${cmdPrefix}docker compose start`);
            console.log(`2. Recreate containers: ${cmdPrefix}docker compose up -d`);
            console.log(`3. Remove containers: ${cmdPrefix}docker compose down\n`);
            process.exit(0);
        }

        // Start Docker services
        console.log("Starting Docker services...");
        await executeCommand("docker compose up -d");

        // Wait for services to be ready
        await waitForLocalStack();

        // Set up S3
        await setupS3();

        console.log("\nLocal development environment setup complete!");
        console.log("\nContainer Management:");
        console.log(`- Check status: ${cmdPrefix}docker compose ps`);
        console.log(`- Start containers: ${cmdPrefix}docker compose start`);
        console.log(`- Stop containers: ${cmdPrefix}docker compose stop`);
        console.log(`- Remove containers: ${cmdPrefix}docker compose down`);
        console.log("\nLogs:");
        console.log(`- All containers: ${cmdPrefix}docker compose logs -f`);
        console.log(`- PostgreSQL: ${cmdPrefix}docker compose logs -f postgres`);
        console.log(`- LocalStack: ${cmdPrefix}docker compose logs -f localstack`);
        console.log("\nS3 Storage:");
        console.log(`- List buckets: ${cmdPrefix}docker run --rm --network=host -e AWS_ACCESS_KEY_ID=test -e AWS_SECRET_ACCESS_KEY=test amazon/aws-cli s3 ls --endpoint-url=http://localhost:4566`);
        console.log("\nApplication:");
        console.log("- Start development server: npm run dev");
    } catch (error) {
        console.error("\nSetup failed:", error);
        process.exit(1);
    }
}

main();
