import { getPayloadClient } from "../src/payloadClient";

async function updateCollection() {
    // Do an empty update on all docs in the collection
    const result = (await getPayloadClient()).update({
        collection: "legal",
        where: {
            id: {
                not_equals: true,
            },
        },
        data: {}, // empty update triggers a save
    });

    console.log(`Successfully patched ${(await result).docs.length} documents.`);
}

updateCollection();
