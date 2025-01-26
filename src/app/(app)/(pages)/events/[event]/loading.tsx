export default function EventLoadingSkeleton() {
    return (
        <div className="animate-pulse space-y-8">
            <div className="space-y-4">
                <div className="h-8 w-3/4 rounded-lg bg-cBorder" />
                <div className="h-4 w-1/2 rounded-lg bg-cBorder" />
            </div>

            <div className="space-y-2">
                <div className="h-4 w-full rounded-lg bg-cBorder" />
                <div className="h-4 w-5/6 rounded-lg bg-cBorder" />
                <div className="h-4 w-4/6 rounded-lg bg-cBorder" />
            </div>
        </div>
    );
}
