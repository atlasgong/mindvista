export function DirectoryItemBoxSkeleton() {
    return (
        <div className="group block rounded-lg border border-cBorder bg-cBackgroundOffset p-6 shadow-sm transition-all duration-200 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 dark:hover:border-blue-800 dark:hover:shadow-blue-950/50">
            {/* Title skeleton */}
            <div className="mb-4 h-7 w-3/4 animate-pulse rounded-md bg-gray-200/50 dark:bg-gray-700/50" />

            {/* Description skeleton - 3 lines */}
            <div className="mb-4 space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-gray-200/50 dark:bg-gray-700/50" />
                <div className="h-4 w-11/12 animate-pulse rounded bg-gray-200/50 dark:bg-gray-700/50" />
                <div className="h-4 w-4/5 animate-pulse rounded bg-gray-200/50 dark:bg-gray-700/50" />
            </div>

            {/* Tags skeleton */}
            <div className="mt-auto flex flex-wrap gap-2">
                <div className="h-6 w-16 animate-pulse rounded-full bg-blue-50/50 dark:bg-blue-900/50" />
                <div className="h-6 w-20 animate-pulse rounded-full bg-blue-50/50 dark:bg-blue-900/50" />
                <div className="h-6 w-14 animate-pulse rounded-full bg-blue-50/50 dark:bg-blue-900/50" />
            </div>
        </div>
    );
}
