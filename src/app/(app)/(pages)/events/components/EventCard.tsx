import { Event } from "@/payload-types";
import { format } from "date-fns";
import Link from "next/link";
import { OngoingBadge } from "./OngoingBadge";

interface EventCardProps {
    event: Event;
    variant?: "default" | "featured";
}

export function EventCard({ event, variant = "default" }: EventCardProps) {
    const now = new Date();
    const isOngoing = event.dateRanges?.some((range) => new Date(range.startDate) <= now && new Date(range.endDate) >= now);

    const cardClassName = `
        group relative overflow-hidden rounded-xl border bg-cBackgroundOffset p-6 transition-all hover:shadow-lg
        ${variant === "featured" ? "border-cAccent bg-gradient-to-br from-cBackgroundOffset to-cBackgroundOffsetAccent md:p-8" : "border-cBorder"}
        ${isOngoing ? "animate-ongoing-border dark:border border-2" : ""}
    `;
    const titleClassName = `text-xl font-bold text-cText ${variant === "featured" ? "text-3xl" : ""}`;
    const descriptionClassName = `text-sm text-cTextOffset ${variant === "featured" ? "text-base" : "line-clamp-3"}`;

    return (
        <Link href={`/events/${event.slug}`} className={cardClassName}>
            {/* Event Content */}
            <div className={`space-y-4 ${variant === "featured" ? "space-y-6" : ""}`}>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <h3 className={titleClassName}>{event.title}</h3>
                        {/* Status Badge */}
                        {isOngoing && (
                            <div className="transform-gpu">
                                <OngoingBadge />
                            </div>
                        )}
                    </div>

                    {/* Date Ranges */}
                    <div className={`space-y-1 ${variant === "featured" ? "text-base" : "text-sm"}`}>
                        {event.dateRanges?.map((range, index) => (
                            <p key={index} className="text-cTextOffset">
                                {format(new Date(range.startDate), "MMM d, yyyy h:mm a")}
                                {" - "}
                                {format(new Date(range.endDate), "MMM d, yyyy h:mm a")}
                            </p>
                        ))}
                    </div>

                    <div className={`flex flex-col gap-2 ${variant === "featured" ? "text-base" : "text-sm"}`}>
                        <p className="font-medium text-cTextOffset">📍 {event.location}</p>
                        {event.incentive && (
                            <p className={`inline-flex items-center gap-1.5 font-medium ${event.isChance ? "text-purple-500 dark:text-purple-400" : "text-blue-500 dark:text-blue-400"}`}>
                                <span>
                                    {event.isChance ? "❓" : "🎁"} {event.incentive}
                                    <span className="text-xs">
                                        {event.isChance ? "†" : ""}
                                        {event.limitedAvailability ? "*" : ""}
                                    </span>
                                </span>
                            </p>
                        )}
                    </div>
                </div>

                <p className={descriptionClassName}>{event.description}</p>

                {/* Visual elements for featured cards */}
                {variant === "featured" && <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />}
            </div>
        </Link>
    );
}
