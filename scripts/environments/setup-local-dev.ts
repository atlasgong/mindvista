import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

const LOCALSTACK_ENDPOINT = process.env.S3_ENDPOINT || "http://localhost:4566";
const BUCKET_NAME = process.env.S3_BUCKET || "mindvista-local";
const REGION = process.env.S3_REGION || "ca-central-1";
const AWS_ACCESS_KEY_ID = process.env.S3_ACCESS_KEY_ID || "test";
const AWS_SECRET_ACCESS_KEY = process.env.S3_SECRET_ACCESS_KEY || "test";

async function executeCommand(command: string): Promise<void> {
    try {
        const { stdout, stderr } = await execAsync(command);
        if (stdout) console.log(stdout);
        if (stderr) console.error(stderr);
    } catch (error) {
        console.error(`Error executing command: ${command}`);
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

async function runAwsCommand(command: string): Promise<void> {
    // Use AWS CLI through Docker
    const dockerAwsCommand = `docker run --rm --network=host \
        -e AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} \
        -e AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY} \
        amazon/aws-cli ${command} --endpoint-url=${LOCALSTACK_ENDPOINT}`;
    await executeCommand(dockerAwsCommand);
}

async function setupS3(): Promise<void> {
    console.log("\nSetting up S3 bucket...");

    try {
        // Create bucket
        await runAwsCommand(`s3 mb s3://${BUCKET_NAME} --region ${REGION}`);

        // Enable versioning
        await runAwsCommand(`s3api put-bucket-versioning --bucket ${BUCKET_NAME} --versioning-configuration Status=Enabled`);

        console.log("S3 bucket setup complete");
    } catch (error) {
        console.error("Failed to set up S3 bucket:", error);
        throw error;
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
        const { stdout } = await execAsync("docker compose ps --format json");
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
            console.log("1. Use existing containers: docker compose start");
            console.log("2. Recreate containers: docker compose up -d");
            console.log("3. Remove containers: docker compose down\n");
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
        console.log("- Check status: docker compose ps");
        console.log("- Start containers: docker compose start");
        console.log("- Stop containers: docker compose stop");
        console.log("- Remove containers: docker compose down");
        console.log("\nLogs:");
        console.log("- All containers: docker compose logs -f");
        console.log("- PostgreSQL: docker compose logs -f postgres");
        console.log("- LocalStack: docker compose logs -f localstack");
        console.log("\nS3 Storage:");
        console.log("- List buckets: docker run --rm --network=host -e AWS_ACCESS_KEY_ID=test -e AWS_SECRET_ACCESS_KEY=test amazon/aws-cli s3 ls --endpoint-url=http://localhost:4566");
        console.log("\nApplication:");
        console.log("- Start development server: npm run dev");
    } catch (error) {
        console.error("\nSetup failed:", error);
        process.exit(1);
    }
}

main();
