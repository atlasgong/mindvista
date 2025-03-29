import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
import fs from "fs";

const execAsync = promisify(exec);

interface DockerContainer {
    Name: string;
    State: string;
}

const CONFIG = {
    database: {
        user: "mindvista",
        dbName: "mindvista",
        containerService: "postgres",
    },
    paths: {
        dataDir: path.join(process.cwd(), "data"),
        dumpFilePattern: /\.sql\.gz$/,
    },
    docker: {
        withSudo: process.argv.includes("--with-sudo"),
    },
} as const;

class DockerError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DockerError";
    }
}

function prependSudo(command: string): string {
    return CONFIG.docker.withSudo && command.startsWith("docker") ? `sudo ${command}` : command;
}

async function executeCommand(command: string): Promise<string> {
    try {
        const { stdout, stderr } = await execAsync(prependSudo(command));
        if (stderr) console.error(stderr);
        return stdout;
    } catch (error) {
        if (error instanceof Error) {
            if (error.message.includes("ENOENT")) {
                throw new DockerError("Docker is not installed or not in PATH. Please install Docker and try again.");
            }
            throw error;
        }
        throw error;
    }
}

async function verifyDockerRunning(): Promise<void> {
    try {
        await executeCommand("docker info");
    } catch (error) {
        if (error instanceof Error) {
            if (error.message.includes("permission denied") && !CONFIG.docker.withSudo) {
                throw new DockerError("Permission denied when executing Docker command. Try running the script with `--with-sudo` flag.");
            }
            // check if Docker daemon is actually not running
            if (error.message.includes("Cannot connect to the Docker daemon")) {
                throw new DockerError("Docker is not running. Please start Docker and try again.");
            }
            throw new DockerError("Failed to connect to Docker. Make sure Docker is running and you have the necessary permissions.");
        }
        throw error;
    }
}

async function getPostgresContainer(): Promise<DockerContainer> {
    try {
        const stdout = await executeCommand(`docker compose ps ${CONFIG.database.containerService} --format '{{json .}}'`);

        // Handle empty output
        if (!stdout.trim()) {
            throw new DockerError("PostgreSQL container not found. Please run 'npm run setup:dev' first.");
        }

        // Split by newlines and parse each line as JSON
        const containers = stdout
            .trim()
            .split("\n")
            .map((line) => {
                try {
                    return JSON.parse(line);
                } catch (e) {
                    return null;
                }
            })
            .filter((container): container is DockerContainer => container !== null && typeof container === "object" && typeof container.Name === "string" && typeof container.State === "string");

        if (containers.length === 0) {
            throw new DockerError("PostgreSQL container not found. Please run 'npm run setup:dev' first.");
        }

        return containers[0];
    } catch (error) {
        if (error instanceof DockerError) {
            throw error;
        }
        throw new DockerError("Failed to get PostgreSQL container status. Please run 'npm run setup:dev' first.");
    }
}

async function verifyDatabaseConnection(containerName: string): Promise<void> {
    await executeCommand(`docker exec ${containerName} psql -U ${CONFIG.database.user} -d ${CONFIG.database.dbName} -c "SELECT 1"`);
}

async function checkEnvironment(): Promise<string> {
    await verifyDockerRunning();

    const container = await getPostgresContainer();
    if (container.State !== "running") {
        throw new DockerError(`PostgreSQL container is ${container.State}. Please run 'docker compose up -d' to start it.`);
    }

    await verifyDatabaseConnection(container.Name);
    return container.Name;
}

function findLatestDumpFile(): string {
    const files = fs
        .readdirSync(CONFIG.paths.dataDir)
        .filter((file) => CONFIG.paths.dumpFilePattern.test(file))
        .sort()
        .reverse();

    if (files.length === 0) {
        throw new Error("No database dumps found in data directory.");
    }

    return path.join(CONFIG.paths.dataDir, files[0]);
}

async function executeDatabaseQuery(containerName: string, query: string): Promise<void> {
    await executeCommand(`docker exec ${containerName} psql -U ${CONFIG.database.user} -d ${CONFIG.database.dbName} -c "${query}"`);
}

async function restoreDatabaseFromDump(containerName: string, dumpFile: string): Promise<void> {
    // Copy dump file to container
    await executeCommand(`docker cp "${dumpFile}" ${containerName}:/tmp/dump.sql.gz`);

    try {
        // Restore database, filtering out known benign errors
        await executeCommand(`docker exec ${containerName} bash -c "gunzip -c /tmp/dump.sql.gz | psql -U ${CONFIG.database.user} -d ${CONFIG.database.dbName} 2>&1 | grep -v 'role \\"neondb_owner\\" does not exist' | grep -v 'role \\"neon_superuser\\" does not exist'"`);
    } finally {
        // Clean up temporary file
        await executeCommand(`docker exec ${containerName} rm /tmp/dump.sql.gz`);
    }
}

async function main() {
    try {
        console.log("Starting database seed from local dump...");

        const containerName = await checkEnvironment();
        const dumpFile = findLatestDumpFile();
        console.log(`Using dump file: ${dumpFile}`);

        console.log("Restoring to local database...");
        await executeDatabaseQuery(containerName, "DROP SCHEMA public CASCADE;");
        await executeDatabaseQuery(containerName, "CREATE SCHEMA public;");
        await restoreDatabaseFromDump(containerName, dumpFile);

        console.log("Database seed complete.");
    } catch (error) {
        console.error("\nFailed to seed database:", error instanceof Error ? error.message : error);
        process.exit(1);
    }
}

main();
