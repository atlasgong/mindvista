import { getPayloadClient } from "@/payloadClient";
import { DirectoryCard } from "./components/DirectoryCard";
import { DirectoryLayout } from "./components/DirectoryLayout";
import { DIRECTORY_ITEMS } from "./constants";

export default async function DirectoryPage() {
    const payload = await getPayloadClient();

    const [clubCount, resourceCount] = await Promise.all([payload.count({ collection: "clubs" }).then((res) => res.totalDocs), payload.count({ collection: "resources" }).then((res) => res.totalDocs)]);

    const counts = {
        [DIRECTORY_ITEMS.clubs.title]: clubCount,
        [DIRECTORY_ITEMS.resources.title]: resourceCount,
    };

    return (
        <DirectoryLayout>
            {Object.values(DIRECTORY_ITEMS).map((item) => (
                <DirectoryCard key={item.title} title={item.title} count={counts[item.title]} description={item.description} />
            ))}
        </DirectoryLayout>
    );
}
