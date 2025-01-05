import { getPayload } from "payload";
import config from "@payload-config";
import path from "path";
import fs from "fs/promises";
import { exit } from "process";

const DATA_PATH = "scripts/bulkUpload/tagData";

type TagType = "club" | "resource";

interface InputData {
    category: string;
    tags: string[];
}

interface CollectionNames {
    tags: "club-tags" | "resource-tags";
    categories: "club-tag-categories" | "resource-tag-categories";
}

interface Stats {
    requested: {
        categories: number;
        tags: number;
    };
    created: {
        categories: number;
        tags: number;
    };
    errors: {
        count: number;
        messages: string[];
    };
}

const getCollectionNames = (type: TagType): CollectionNames => {
    switch (type) {
        case "club":
            return {
                tags: "club-tags",
                categories: "club-tag-categories",
            };
        case "resource":
            return {
                tags: "resource-tags",
                categories: "resource-tag-categories",
            };
        default:
            throw new Error(`Invalid tag type: ${type}. Must be 'club' or 'resource'.`);
    }
};

const getDataPath = (type: TagType): string => {
    const filename = type === "club" ? "clubTagsExample.json" : "resourceTagsExample.json";
    return path.join(DATA_PATH, filename);
};

async function bulkUpload(type: TagType): Promise<void> {
    const payload = await getPayload({ config });
    const collections = getCollectionNames(type);

    const stats: Stats = {
        requested: { categories: 0, tags: 0 },
        created: { categories: 0, tags: 0 },
        errors: { count: 0, messages: [] },
    };

    try {
        console.log(`Initializing ${type} tags bulk upload...`);

        // read and parse JSON file
        const fileContent = await fs.readFile(path.resolve(getDataPath(type)), "utf8");
        const inputData: InputData[] = JSON.parse(fileContent);

        for (const data of inputData) {
            try {
                stats.requested.categories++;
                stats.requested.tags += data.tags.length;

                // find or create the category
                let category = await payload.find({
                    collection: collections.categories,
                    where: {
                        name: {
                            equals: data.category,
                        },
                    },
                });

                let categoryDoc;
                if (category.docs.length === 0) {
                    categoryDoc = await payload.create({
                        collection: collections.categories,
                        data: {
                            name: data.category,
                        },
                    });
                    stats.created.categories++;
                    console.log(`created new category: ${data.category}`);
                } else {
                    categoryDoc = category.docs[0];
                    console.log(`found existing category: ${data.category}`);
                }

                // create all tags for this category
                for (const tagName of data.tags) {
                    try {
                        // check if tag already exists in this category
                        const existingTag = await payload.find({
                            collection: collections.tags,
                            where: {
                                and: [
                                    {
                                        name: {
                                            equals: tagName,
                                        },
                                    },
                                    {
                                        category: {
                                            equals: categoryDoc.id,
                                        },
                                    },
                                ],
                            },
                        });

                        if (existingTag.docs.length > 0) {
                            console.log(`tag already exists: ${tagName} in category: ${data.category}`);
                            continue;
                        }

                        const createdTag = await payload.create({
                            collection: collections.tags,
                            data: {
                                name: tagName,
                                category: categoryDoc.id,
                            },
                        });
                        stats.created.tags++;
                        console.log(`created tag: ${createdTag.name} in category: ${data.category}`);
                    } catch (error: any) {
                        stats.errors.count++;
                        stats.errors.messages.push(`error creating tag '${tagName}': ${error.message}`);
                        console.error(`error creating tag: ${tagName}`, error.message);
                    }
                }
            } catch (error: any) {
                stats.errors.count++;
                stats.errors.messages.push(`error processing category '${data.category}': ${error.message}`);
                console.error(`error processing category: ${data.category}`, error.message);
            }
        }
    } catch (error: any) {
        stats.errors.count++;
        stats.errors.messages.push(`error in bulk upload: ${error.message}`);
        console.error("error in bulk upload:", error.message);
    } finally {
        // print summary in a clean format
        console.log("\nSummary:");
        console.log("─".repeat(50));
        console.log(`Categories  ${stats.created.categories.toString().padStart(6)} / ${stats.requested.categories.toString().padStart(6)}   created/requested`);
        console.log(`Tags        ${stats.created.tags.toString().padStart(6)} / ${stats.requested.tags.toString().padStart(6)}   created/requested`);

        if (stats.errors.count > 0) {
            console.log("\nErrors:");
            console.log("─".repeat(50));
            stats.errors.messages.forEach((msg, i) => {
                console.log(`${(i + 1).toString().padStart(2)}. ${msg}`);
            });
            console.log(`\nTotal Errors: ${stats.errors.count}`);
        }

        exit(stats.errors.count > 0 ? 1 : 0);
    }
}

// get tag type from command line argument
const tagType = process.argv[2]?.toLowerCase() as TagType;

if (!tagType || !["club", "resource"].includes(tagType)) {
    console.error("usage: payload run bulkUploadTags.ts <club|resource>");
    exit(1);
}

// start the upload
bulkUpload(tagType).catch((error) => {
    console.error("Fatal error:", error);
    exit(1);
});
