import { DirectoryCard } from "./components/DirectoryCard";
import { DirectoryLayout } from "./components/DirectoryLayout";
import { DIRECTORY_ITEMS } from "./constants";

export default function DirectoryLoading() {
    return (
        <DirectoryLayout>
            {Object.values(DIRECTORY_ITEMS).map((item) => (
                <DirectoryCard key={item.title} title={item.title} isLoading={true} description={item.description} />
            ))}
        </DirectoryLayout>
    );
}
