export function FiltersSkeleton() {
    return (
        <div className="space-y-6">
            {/* Filter groups skeleton */}
            {/* Category 1 */}
            <div className="filter-section">
                <h3 className="mb-4 text-lg font-semibold text-cText">
                    <div className="h-6 w-32 animate-pulse rounded bg-gray-200/50 dark:bg-gray-700/50" />
                </h3>
                <div className="flex flex-wrap gap-2">
                    <div className="inline-flex h-7 w-24 animate-pulse items-center rounded-full bg-gray-100/50 px-3 py-1 dark:bg-gray-700/50" />
                    <div className="inline-flex h-7 w-28 animate-pulse items-center rounded-full bg-gray-100/50 px-3 py-1 dark:bg-gray-700/50" />
                    <div className="inline-flex h-7 w-20 animate-pulse items-center rounded-full bg-gray-100/50 px-3 py-1 dark:bg-gray-700/50" />
                </div>
            </div>

            {/* Category 2 */}
            <div className="filter-section">
                <h3 className="mb-4 text-lg font-semibold text-cText">
                    <div className="h-6 w-36 animate-pulse rounded bg-gray-200/50 dark:bg-gray-700/50" />
                </h3>
                <div className="flex flex-wrap gap-2">
                    <div className="inline-flex h-7 w-32 animate-pulse items-center rounded-full bg-gray-100/50 px-3 py-1 dark:bg-gray-700/50" />
                    <div className="inline-flex h-7 w-24 animate-pulse items-center rounded-full bg-gray-100/50 px-3 py-1 dark:bg-gray-700/50" />
                    <div className="inline-flex h-7 w-28 animate-pulse items-center rounded-full bg-gray-100/50 px-3 py-1 dark:bg-gray-700/50" />
                </div>
            </div>

            {/* Category 3 */}
            <div className="filter-section">
                <h3 className="mb-4 text-lg font-semibold text-cText">
                    <div className="h-6 w-28 animate-pulse rounded bg-gray-200/50 dark:bg-gray-700/50" />
                </h3>
                <div className="flex flex-wrap gap-2">
                    <div className="inline-flex h-7 w-20 animate-pulse items-center rounded-full bg-gray-100/50 px-3 py-1 dark:bg-gray-700/50" />
                    <div className="inline-flex h-7 w-24 animate-pulse items-center rounded-full bg-gray-100/50 px-3 py-1 dark:bg-gray-700/50" />
                    <div className="inline-flex h-7 w-16 animate-pulse items-center rounded-full bg-gray-100/50 px-3 py-1 dark:bg-gray-700/50" />
                </div>
            </div>
        </div>
    );
}
