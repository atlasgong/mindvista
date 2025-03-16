import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
import fs from "fs";

const execAsync = promisify(exec);

// Environment variables from .env.development
const POSTGRES_URL = process.env.POSTGRES_URL;

if (!POSTGRES_URL) {
    console.error("Error: POSTGRES_URL environment variable is required.");
    process.exit(1);
}

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

async function getLatestDump(): Promise<string> {
    const dataDir = path.join(process.cwd(), "data");
    const files = fs
        .readdirSync(dataDir)
        .filter((file) => file.endsWith(".sql.gz"))
        .sort()
        .reverse();

    if (files.length === 0) {
        throw new Error("No database dumps found in data directory.");
    }

    return path.join(dataDir, files[0]);
}

async function main() {
    try {
        console.log("Starting database seed from local dump...");

        // Get latest dump file
        const dumpFile = await getLatestDump();
        console.log(`Using dump file: ${dumpFile}`);

        // Restore to local database
        console.log("Restoring to local database...");
        await executeCommand(`psql "${POSTGRES_URL}" -c "DROP SCHEMA public CASCADE;"`);
        await executeCommand(`psql "${POSTGRES_URL}" -c "CREATE SCHEMA public;"`);
        await executeCommand(`gunzip -c ${dumpFile} | psql "${POSTGRES_URL}"`);

        console.log("Database seed complete.");
    } catch (error) {
        console.error("Failed to seed database:", error);
        process.exit(1);
    }
}

main();
