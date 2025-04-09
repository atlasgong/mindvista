import { getPayloadClient } from "../src/payloadClient";

const COLLECTION_TO_UPDATE = "events"; // change this to the collection you want to update
const EXPECTED_STATUS: "published" | "draft" = "published";

/**
 * Need to enable versioning for an existing collection?
 * See https://github.com/payloadcms/payload/discussions/5353
 *
 * This script should not be run standalone, unless you need to do local testing.
 * To update a remote database, this file serves as a template and the below code
 * should be copied to a migration file.
 */
async function patchCollectionVersioning() {
    try {
        const payload = await getPayloadClient();

        // patch all documents to expected status
        const result = await payload.update({
            collection: COLLECTION_TO_UPDATE,
            where: {},
            data: {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore - _status is a system field but we need to set it
                _status: EXPECTED_STATUS,
            },
        });

        console.log(`Successfully patched ${result.docs.length} documents to ${EXPECTED_STATUS} status.`);
        console.log("This will trigger the versioning system to populate the versions collection.");
        process.exit(0);
    } catch (error) {
        console.error("Error patching documents:", error);
        process.exit(1);
    }
}

patchCollectionVersioning();
