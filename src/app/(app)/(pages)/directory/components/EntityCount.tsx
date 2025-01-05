import { getPayloadClient } from "@/payloadClient";

async function getCount(collection: "clubs" | "resources") {
    const payload = await getPayloadClient();
    const result = await payload.count({ collection });
    return result.totalDocs;
}

export async function DirectoryCount({ collection }: { collection: "clubs" | "resources" }) {
    const count = await getCount(collection);
    return (
        <>
            {/* get rid of 's' for nonplural if only 1 entity */}
            {count} {count === 1 ? collection.slice(0, -1) : collection}
        </>
    );
}
