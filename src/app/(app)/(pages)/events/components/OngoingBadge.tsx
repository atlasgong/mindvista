// for regular ongoing events (featured cards)

interface OngoingBadgeProps {
    className?: string;
}

export function OngoingBadge({ className = "" }: OngoingBadgeProps) {
    return <span className={`dark:animate-badge-shine-dark w-fit shrink-0 animate-badge-shine whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium text-white dark:text-mindvista-950 ${className} `}>Ongoing</span>;
}
