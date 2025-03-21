import { Event } from "@/payload-types";
import Link from "next/link";
import { EventDate } from "./EventDate";
import { OngoingBadge } from "./OngoingBadge";
import { OngoingPulse } from "./OngoingPulse";

interface EventCardProps {
    event: Event;
    variant?: "default" | "featured" | "compactDefault" | "compactFeatured";
}

export function EventCard({ event, variant = "default" }: EventCardProps) {
    const isCompact = variant.startsWith("compact");
    const now = new Date();
    const isOngoing = event.dateRanges?.some((range) => new Date(range.startDate) <= now && new Date(range.endDate) >= now);
    const isFeatured = variant === "featured" || variant === "compactFeatured";

    const cardClassName = `
        group relative overflow-hidden rounded-lg border border-cBorder bg-cBackgroundOffset p-6 shadow-sm transition-all duration-200 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 dark:hover:border-blue-800 dark:hover:shadow-blue-950/50
        ${isCompact ? "pt-3 pb-4 px-4" : "p-6"}
        ${isFeatured ? "border-cAccent bg-gradient-to-br from-cBackgroundOffset to-cBackgroundOffsetAccent" : "border-cBorder"}
        ${!isCompact && isFeatured ? "md:p-8" : ""}
        ${isOngoing && !isCompact ? "animate-ongoing-border dark:border border-2" : ""}
        ${isCompact ? "min-h-[8rem] max-h-[10rem]" : ""}
    `;
    const titleClassName = `font-bold text-cText group-hover:text-blue-600 dark:group-hover:text-blue-400 ${isCompact ? "text-lg line-clamp-1" : "text-xl"} ${isFeatured && !isCompact ? "text-3xl" : ""}`;
    const descriptionClassName = `text-cTextOffset ${isCompact ? "line-clamp-2 text-xs" : `text-sm ${isFeatured ? "text-base" : "line-clamp-3"}`}`;

    if (isCompact) {
        return (
            <Link href={`/events/${event.slug}`} className={cardClassName}>
                {isOngoing && (
                    <div className="absolute right-3 top-3 transform-gpu">
                        <OngoingPulse />
                    </div>
                )}
                <div className="flex h-full flex-col">
                    <div className="space-y-1.5">
                        <p className="-mb-2 text-xs font-semibold">{isOngoing ? "Ongoing" : "Upcoming"}</p>
                        <h3 className={`${titleClassName} block overflow-hidden text-ellipsis whitespace-nowrap pr-8`}>{event.title}</h3>

                        <div className="text-xs">{event.dateRanges?.map((range, index) => <EventDate key={index} startDate={range.startDate} endDate={range.endDate} className="truncate whitespace-nowrap text-cTextOffset" compact />)}</div>
                    </div>

                    <div className="mt-auto space-y-1">
                        <p className="truncate text-xs font-medium text-cTextOffset">📍 {event.location}</p>
                        {event.incentive && (
                            <p className={`truncate text-xs font-medium ${event.isChance ? "text-purple-500 dark:text-purple-400" : "text-blue-500 dark:text-blue-400"}`}>
                                {event.isChance ? "❓" : "🎁"} {event.incentive}
                                <span className="text-xs">
                                    {event.isChance ? "†" : ""}
                                    {event.limitedAvailability ? "*" : ""}
                                </span>
                            </p>
                        )}
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <Link href={`/events/${event.slug}`} className={cardClassName}>
            <div className={`space-y-3 ${variant === "featured" ? "space-y-6" : ""}`}>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <h3 className={titleClassName}>{event.title}</h3>
                        {isOngoing && (
                            <div className="transform-gpu">
                                <OngoingBadge />
                            </div>
                        )}
                    </div>

                    <div className={`space-y-1 ${variant === "featured" ? "text-base" : "text-sm"}`}>{event.dateRanges?.map((range, index) => <EventDate key={index} startDate={range.startDate} endDate={range.endDate} className="text-cTextOffset" />)}</div>

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

                {variant === "featured" && <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />}
            </div>
        </Link>
    );
}
