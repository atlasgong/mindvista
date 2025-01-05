import { getPayload } from "payload";
import config from "@payload-config";
import { exit } from "process";
import { BaseEntityData, Stats, readJsonFile, getExistingTagMap, checkEntityExists, printSummary, initStats } from "./bulkUploadEntities";

const DATA_FILE = "scripts/bulkUpload/entityData/resourcesData.json";

interface ResourceData extends BaseEntityData<{ category: string; tag: string }[]> {
    insuranceDetails: string | null;
    insuranceProviders?: {
        insuranceProvider: {
            name: string;
            description?: string;
        }[];
    }[];
    location: string | null;
    channel: string | null;
    onCampus: boolean;
    tags: { category: string; tag: string }[];
}

function mapChannelToFields(channel: string | null): {
    channelOnline: boolean;
    channelTelephone: boolean;
    channelInPerson: boolean;
} {
    const result = {
        channelOnline: false,
        channelTelephone: false,
        channelInPerson: false,
    };

    if (!channel) return result;

    const channelLower = channel.toLowerCase();

    if (channelLower.includes("online")) {
        result.channelOnline = true;
    }
    if (channelLower.includes("telephone")) {
        result.channelTelephone = true;
    }
    if (channelLower.includes("in person") || channelLower === "in-person") {
        result.channelInPerson = true;
    }

    return result;
}

async function bulkUpload(): Promise<void> {
    const payload = await getPayload({ config });
    const stats: Stats = initStats();

    try {
        const resourcesData = await readJsonFile<ResourceData>(DATA_FILE);
        stats.requested = resourcesData.length;
        console.log(`Found ${resourcesData.length} resources to process`);

        // get all existing tags
        const tagMap = await getExistingTagMap("resource-tags");

        for (const resource of resourcesData) {
            try {
                // check if resource exists
                if (await checkEntityExists(payload, "resources", resource.slug)) {
                    console.log(`Resource already exists: ${resource.title}`);
                    stats.skipped++;
                    continue;
                }

                // map tag objects to IDs
                const tagIds = resource.tags
                    .map((tagObj) => {
                        const id = tagMap.get(tagObj.tag);
                        if (!id) {
                            console.warn(`Warning: Tag not found: ${JSON.stringify(tagObj)}`);
                            return undefined;
                        }
                        return id;
                    })
                    .filter((id): id is number => id !== undefined);

                // create resource
                await payload.create({
                    collection: "resources",
                    data: {
                        slug: resource.slug,
                        title: resource.title,
                        description: resource.description,
                        website: resource.website,
                        insuranceDetails: resource.insuranceDetails,
                        insuranceProviders: resource.insuranceProviders,
                        email: resource.email,
                        phoneNumber: resource.phoneNumber,
                        location: resource.location,
                        ...mapChannelToFields(resource.channel),
                        onCampus: resource.onCampus,
                        currentlyActive: Boolean(resource.currentlyActive),
                        tags: tagIds,
                    },
                });

                stats.created++;
                console.log(`Created resource: ${resource.title}`);
            } catch (error: any) {
                stats.errors.count++;
                stats.errors.messages.push(`Error processing resource ${resource.title}: ${error.message}`);
                console.error(`Error processing resource ${resource.title}:`, error.message);
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
