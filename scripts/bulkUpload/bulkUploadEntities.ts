import { getPayload } from "payload";
import config from "@payload-config";
import path from "path";
import fs from "fs/promises";
import { ClubTag, ResourceTag } from "@/payload-types";

export interface Stats {
    requested: number;
    created: number;
    skipped: number;
    errors: {
        count: number;
        messages: string[];
    };
}

export interface BaseEntityData<T = string[]> {
    slug: string;
    title: string;
    description: string;
    website: string | null;
    email: string | null;
    phoneNumber: string | null;
    currentlyActive: boolean;
    tags: T;
}

export async function readJsonFile<T>(filePath: string): Promise<T[]> {
    console.log(`Reading data from ${filePath}...`);
    const dataPath = path.join(process.cwd(), filePath);
    const rawData = await fs.readFile(dataPath, "utf-8");
    return JSON.parse(rawData);
}

export async function getExistingTagMap(collection: "club-tags" | "resource-tags"): Promise<Map<string, number>> {
    console.log(`Fetching existing ${collection}...`);
    const payload = await getPayload({ config });
    const existingTags = await payload.find({
        collection,
        limit: 100,
    });

    return new Map(
        existingTags.docs.map((tag) => {
            if (collection === "club-tags") {
                return [(tag as ClubTag).name, tag.id];
            } else {
                return [(tag as ResourceTag).name, tag.id];
            }
        }),
    );
}

export async function checkEntityExists(payload: any, collection: string, slug: string): Promise<boolean> {
    const existing = await payload.find({
        collection,
        where: {
            slug: {
                equals: slug,
            },
        },
    });

    return existing.docs.length > 0;
}

export function printSummary(stats: Stats): void {
    console.log("\nSummary:");
    console.log("─".repeat(50));
    console.log(`Created  ${stats.created.toString().padStart(6)} / ${stats.requested.toString().padStart(6)}   created/requested`);
    console.log(`Skipped  ${stats.skipped.toString().padStart(6)}`);

    if (stats.errors.count > 0) {
        console.log("\nErrors:");
        console.log("─".repeat(50));
        stats.errors.messages.forEach((msg, i) => {
            console.log(`${(i + 1).toString().padStart(2)}. ${msg}`);
        });
        console.log(`\nTotal Errors: ${stats.errors.count}`);
    }
}

export function initStats(): Stats {
    return {
        requested: 0,
        created: 0,
        skipped: 0,
        errors: {
            count: 0,
            messages: [],
        },
    };
}
