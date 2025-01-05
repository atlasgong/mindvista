import { getPayload } from "payload";
import config from "@payload-config";
import { exit } from "process";
import { BaseEntityData, Stats, readJsonFile, getExistingTagMap, checkEntityExists, printSummary, initStats } from "./bulkUploadEntities";

const DATA_FILE = "scripts/bulkUpload/entityData/clubsData.json";

interface ClubData extends BaseEntityData {
    facebook: string | null;
    instagram: string | null;
    otherSocials: { link: string }[] | null;
}

async function bulkUpload(): Promise<void> {
    const payload = await getPayload({ config });
    const stats: Stats = initStats();

    try {
        const clubsData = await readJsonFile<ClubData>(DATA_FILE);
        stats.requested = clubsData.length;
        console.log(`Found ${clubsData.length} clubs to process`);

        // get all existing tags
        const tagMap = await getExistingTagMap("club-tags");

        for (const club of clubsData) {
            try {
                // check if club exists
                if (await checkEntityExists(payload, "clubs", club.slug)) {
                    console.log(`Club already exists: ${club.title}`);
                    stats.skipped++;
                    continue;
                }

                // map tag names to IDs
                const tagIds = club.tags
                    .map((tagName) => {
                        const id = tagMap.get(tagName);
                        if (!id) {
                            console.warn(`Warning: Tag not found: ${tagName}`);
                            return undefined;
                        }
                        return id;
                    })
                    .filter((id): id is number => id !== undefined);

                // create club
                await payload.create({
                    collection: "clubs",
                    data: {
                        slug: club.slug,
                        title: club.title,
                        description: club.description,
                        website: club.website,
                        email: club.email,
                        phoneNumber: club.phoneNumber,
                        facebook: club.facebook,
                        instagram: club.instagram,
                        otherSocials: club.otherSocials,
                        currentlyActive: Boolean(club.currentlyActive),
                        tags: tagIds,
                    },
                });

                stats.created++;
                console.log(`Created club: ${club.title}`);
            } catch (error: any) {
                stats.errors.count++;
                stats.errors.messages.push(`Error processing club ${club.title}: ${error.message}`);
                console.error(`Error processing club ${club.title}:`, error.message);
            }
        }
    } catch (error: any) {
        stats.errors.count++;
        stats.errors.messages.push(`Error in bulk upload: ${error.message}`);
        console.error("Error in bulk upload:", error.message);
    } finally {
        printSummary(stats);
        exit(stats.errors.count > 0 ? 1 : 0);
    }
}

// start upload
bulkUpload().catch((error) => {
    console.error("Fatal error:", error);
    exit(1);
});
