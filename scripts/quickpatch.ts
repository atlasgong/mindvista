import { getPayloadClient } from "../src/payloadClient";
import type { Payload } from "payload";

// Add collections that have versioning enabled
const VERSIONED_COLLECTIONS = [
    "legal", // Add other collection slugs here
] as const;

// Type for our versioned collections
type VersionedCollection = (typeof VERSIONED_COLLECTIONS)[number];

async function updateCollection(payload: Payload, collection: VersionedCollection) {
    try {
        console.log(`Patching collection: ${collection}`);

        // Do an empty update on all docs in the collection
        const result = await payload.update({
            collection,
            where: {
                id: {
                    not_equals: true,
                },
            },
            data: {}, // Empty update triggers a save
        });

        console.log(`Successfully patched ${result.docs.length} documents in ${collection}`);
    } catch (error) {
        console.error(`Error patching collection ${collection}:`, error);
        // Continue with other collections even if one fails
    }
}

async function quickPatch() {
    try {
        const payload = await getPayloadClient();

        // Process collections sequentially to avoid overwhelming the database
        for (const collection of VERSIONED_COLLECTIONS) {
            await updateCollection(payload, collection);
        }

        console.log("\nFinished patching all versioned collections");
        process.exit(0);
    } catch (error) {
        console.error("Error initializing payload:", error);
        process.exit(1);
    }
}

// Just run with: npx ts-node scripts/quickpatch.ts
quickPatch();
