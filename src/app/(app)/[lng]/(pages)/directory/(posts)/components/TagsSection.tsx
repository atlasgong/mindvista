import { FiTag } from "react-icons/fi";

export interface Tag {
    id: string | number;
    name?: string;
}

export default function TagsSection({ tags }: { tags: (Tag | number)[] }) {
    if (!tags || tags.length === 0) return null;

    return (
        <div className="mx-[5vw] mt-14 flex justify-center">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <FiTag className="h-5 w-5 text-cTextOffset" />
                    <span className="text-base font-semibold text-cText">Tags:</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    {tags.map((tag) => (
                        <span key={typeof tag === "number" ? tag : tag.id} className="inline-block rounded-full bg-cBackgroundOffsetAccent px-3 py-1 text-sm text-cAccent transition-colors hover:bg-cBackgroundOffset">
                            {typeof tag === "number" ? tag : tag.name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
