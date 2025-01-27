// for compact ongoing events (compactFeatured cards)

export function OngoingPulse() {
    return (
        <div className="relative h-3 w-3">
            <div className="absolute h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></div>
            <div className="absolute h-full w-full animate-pulse rounded-full bg-green-500"></div>
        </div>
    );
}
