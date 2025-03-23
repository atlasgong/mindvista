import { execFile, spawn, type SpawnOptions, type ChildProcess } from "child_process";
import { promisify } from "util";
import path from "path";
import fs from "fs";
import { Readable, Writable } from "stream";

const execFileAsync = promisify(execFile);

// Environment variables from .env.development
const POSTGRES_URL = process.env.POSTGRES_URL;

if (!POSTGRES_URL) {
    console.error("Error: POSTGRES_URL environment variable is required.");
    process.exit(1);
}

// Ensure POSTGRES_URL is available after check
const POSTGRES_URL_SAFE = POSTGRES_URL;

async function executePsql(query: string): Promise<void> {
    try {
        await execFileAsync("psql", [POSTGRES_URL_SAFE, "-c", query], { shell: false });
    } catch (error) {
        console.error(`Error executing psql query: ${query}`);
        console.error(error);
        throw error;
    }
}

async function executeGunzipPsql(dumpFile: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const spawnOptions: SpawnOptions = {
            stdio: ["pipe", "pipe", "pipe"],
            shell: false,
        };

        const gunzip = spawn("gunzip", ["-c", dumpFile], spawnOptions) as ChildProcess & {
            stdout: Readable;
            stderr: Readable;
        };
        const psql = spawn("psql", [POSTGRES_URL_SAFE], spawnOptions) as ChildProcess & {
            stdin: Writable;
            stderr: Readable;
        };

        if (!gunzip.stdout || !psql.stdin || !gunzip.stderr || !psql.stderr) {
            reject(new Error("Failed to create process streams"));
            return;
        }

        gunzip.stdout.pipe(psql.stdin);

        gunzip.stderr.on("data", (data) => console.error(`gunzip error: ${data}`));
        psql.stderr.on("data", (data) => console.error(`psql error: ${data}`));

        psql.on("close", (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`psql process exited with code ${code}`));
            }
        });

        gunzip.on("error", reject);
        psql.on("error", reject);
    });
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
        await executePsql("DROP SCHEMA public CASCADE;");
        await executePsql("CREATE SCHEMA public;");
        await executeGunzipPsql(dumpFile);

        console.log("Database seed complete.");
    } catch (error) {
        console.error("Failed to seed database:", error);
        process.exit(1);
    }
}

main();
