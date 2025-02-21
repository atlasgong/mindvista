import { getPayloadClient } from "../src/payloadClient";

async function patchLegalVersions() {
    try {
        const payload = await getPayloadClient();

        // Patch all documents to draft status
        const result = await payload.update({
            collection: "legal",
            where: {
                id: {
                    not_equals: true, // This query pattern works better than exists
                },
            },
            data: {
                // @ts-ignore - _status is a system field but we need to set it
                _status: "draft",
            },
        });

        console.log(`Successfully patched ${result.docs.length} legal documents to draft status`);
        console.log("This will trigger the versioning system to populate the versions collection");
        process.exit(0);
    } catch (error) {
        console.error("Error patching legal documents:", error);
        process.exit(1);
    }
}

// Just run with: npx ts-node scripts/patchLegalVersions.ts
patchLegalVersions();
