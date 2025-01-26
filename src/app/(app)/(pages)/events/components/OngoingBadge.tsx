interface OngoingBadgeProps {
    className?: string;
}

export function OngoingBadge({ className = "" }: OngoingBadgeProps) {
    return <span className={`animate-badge-shine w-fit shrink-0 whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium text-white ${className} `}>Ongoing</span>;
}
