import { getPayloadClient } from "../src/payloadClient";

const COLLECTION_TO_UPDATE = "some-collection"; // change this to the collection you want to update

/**
 * Need to enable versioning for an existing collection?
 * See https://github.com/payloadcms/payload/discussions/5353
 */
async function patchCollectionVersioning() {
    try {
        const payload = await getPayloadClient();

        // patch all documents to draft status
        const result = await payload.update({
            collection: COLLECTION_TO_UPDATE,
            where: {},
            data: {
                // @ts-ignore - _status is a system field but we need to set it
                _status: "draft",
            },
        });

        console.log(`Successfully patched ${result.docs.length} documents to draft status.`);
        console.log("This will trigger the versioning system to populate the versions collection.");
        process.exit(0);
    } catch (error) {
        console.error("Error patching documents:", error);
        process.exit(1);
    }
}

patchCollectionVersioning();
