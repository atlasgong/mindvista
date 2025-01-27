interface EventCardSkeletonProps {
    variant?: "default" | "featured" | "compactDefault" | "compactFeatured";
}

export function EventCardSkeleton({ variant = "default" }: EventCardSkeletonProps) {
    const isCompact = variant.startsWith("compact");
    const isFeatured = variant === "featured" || variant === "compactFeatured";

    const cardClassName = `
        group relative overflow-hidden rounded-xl border bg-cBackgroundOffset transition-all
        ${isCompact ? "pt-3 pb-4 px-4" : "p-6"}
        ${isFeatured ? "border-cAccent bg-gradient-to-br from-cBackgroundOffset to-cBackgroundOffsetAccent" : "border-cBorder"}
        ${!isCompact && isFeatured ? "md:p-8" : ""}
        ${isCompact ? "min-h-[8rem] max-h-[10rem]" : ""}
    `;

    if (isCompact) {
        return (
            <div className={cardClassName}>
                <div className="absolute right-3 top-3 h-3 w-3 animate-pulse rounded-full bg-gray-200/50 dark:bg-gray-700/50" />
                <div className="flex h-full flex-col">
                    <div className="space-y-1.5">
                        {/* Title skeleton */}
                        <div className="h-6 w-[calc(100%-24px)] animate-pulse rounded-md bg-gray-200/50 dark:bg-gray-700/50" />

                        {/* Date ranges skeleton */}
                        <div className="h-4 w-48 animate-pulse rounded bg-gray-200/50 dark:bg-gray-700/50" />
                    </div>

                    {/* Location and incentive skeleton */}
                    <div className="mt-auto space-y-1">
                        <div className="h-3.5 w-36 animate-pulse rounded bg-gray-200/50 dark:bg-gray-700/50" />
                        <div className="h-3.5 w-32 animate-pulse rounded bg-gray-200/50 dark:bg-gray-700/50" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={cardClassName}>
            <div className={`space-y-3 ${variant === "featured" ? "space-y-6" : ""}`}>
                <div className="space-y-2">
                    {/* Title skeleton */}
                    <div className="flex justify-between">
                        <div className={`h-7 w-3/4 animate-pulse rounded-md bg-gray-200/50 dark:bg-gray-700/50 ${variant === "featured" ? "h-9" : ""}`} />
                    </div>

                    {/* Date ranges skeleton */}
                    <div className={`space-y-1 ${variant === "featured" ? "text-base" : "text-sm"}`}>
                        <div className="h-5 w-64 animate-pulse rounded bg-gray-200/50 dark:bg-gray-700/50" />
                        <div className="h-5 w-56 animate-pulse rounded bg-gray-200/50 dark:bg-gray-700/50" />
                    </div>

                    {/* Location and incentive skeleton */}
                    <div className={`flex flex-col gap-2 ${variant === "featured" ? "text-base" : "text-sm"}`}>
                        <div className="h-5 w-48 animate-pulse rounded bg-gray-200/50 dark:bg-gray-700/50" />
                        <div className="h-5 w-40 animate-pulse rounded bg-gray-200/50 dark:bg-gray-700/50" />
                    </div>
                </div>

                {/* Description skeleton */}
                <div className="space-y-2">
                    <div className="h-4 w-full animate-pulse rounded bg-gray-200/50 dark:bg-gray-700/50" />
                    <div className="h-4 w-11/12 animate-pulse rounded bg-gray-200/50 dark:bg-gray-700/50" />
                    <div className="h-4 w-4/5 animate-pulse rounded bg-gray-200/50 dark:bg-gray-700/50" />
                </div>

                {/* Visual elements for featured cards */}
                {variant === "featured" && <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />}
            </div>
        </div>
    );
}
