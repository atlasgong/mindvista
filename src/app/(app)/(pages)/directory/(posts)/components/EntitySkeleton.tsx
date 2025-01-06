export default function EntitySkeleton() {
    return (
        <>
            {/* Header Skeleton */}
            <div className="mb-8 animate-pulse">
                <div className="mb-4 h-8 w-3/4 rounded-lg bg-cBackgroundOffset" />
                <div className="mb-4 h-4 w-1/2 rounded-lg bg-cBackgroundOffset" />
                <div className="h-6 w-24 rounded-full bg-cBackgroundOffset" />
            </div>

            {/* Grid Layout Skeleton */}
            <div className="grid auto-rows-fr grid-cols-1 gap-6 md:auto-cols-fr md:grid-flow-col">
                {/* Main Info Section Skeleton */}
                <div className="h-full md:col-span-1">
                    <div className="flex h-full flex-col rounded-2xl border border-cBorder bg-cBackgroundOffset p-6 shadow-sm md:p-8">
                        <div className="mb-6 flex items-center gap-2">
                            <div className="h-5 w-5 rounded-full bg-cBackground" />
                            <div className="h-6 w-32 rounded-lg bg-cBackground" />
                        </div>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="h-5 w-5 rounded-full bg-cBackground" />
                                    <div className="h-4 w-48 rounded-lg bg-cBackground" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Secondary Section Skeleton */}
                <div className="h-full md:col-span-1">
                    <div className="flex h-full flex-col rounded-2xl border border-cBorder bg-cBackgroundOffset p-6 shadow-sm md:p-8">
                        <div className="mb-6 flex items-center gap-2">
                            <div className="h-5 w-5 rounded-full bg-cBackground" />
                            <div className="h-6 w-32 rounded-lg bg-cBackground" />
                        </div>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="h-5 w-5 rounded-full bg-cBackground" />
                                    <div className="h-4 w-full rounded-lg bg-cBackground" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Tags Section Skeleton */}
            <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-8 w-24 rounded-full bg-cBackgroundOffset" />
                    ))}
                </div>
            </div>
        </>
    );
}
