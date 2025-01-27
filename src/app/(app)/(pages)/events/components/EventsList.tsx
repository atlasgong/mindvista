"use client";

import { EventCard } from "./EventCard";
import { EventCardSkeleton } from "./EventCardSkeleton";
import { useEvents } from "../EventsProvider";

interface EventsListProps {
    type: "ongoing" | "upcoming" | "past";
    className?: string;
    variant?: "default" | "featured";
}

export function EventsList({ type, className, variant = "default" }: EventsListProps) {
    const { ongoingEvents, upcomingEvents, pastEvents, isLoading } = useEvents();

    const events = {
        ongoing: ongoingEvents,
        upcoming: upcomingEvents,
        past: pastEvents,
    }[type];

    if (isLoading) {
        // show appropriate number of skeletons based on section type
        if (type === "past") {
            return (
                <div className={className}>
                    {[...Array(6)].map((_, index) => (
                        <EventCardSkeleton key={index} variant={variant} />
                    ))}
                </div>
            );
        }

        // show one skeleton for upcoming
        return (
            <div className={className}>
                <EventCardSkeleton variant={variant} />
            </div>
        );
    }

    // handle empty states
    if (!events || events.length === 0) {
        // for ongoing events, return null to hide the section completely
        if (type === "ongoing") {
            return null;
        }
        // for upcoming and past events, display message
        return (
            <div className="text-center text-lg text-cTextOffset">
                {type === "upcoming" && "No upcoming events at the moment."}
                {type === "past" && "No past events to display."}
            </div>
        );
    }

    // grid layout for past events
    if (type === "past") {
        return (
            <div className={className}>
                {events.map((event) => (
                    <EventCard key={event.id} event={event} variant={variant} />
                ))}
            </div>
        );
    }

    // flex col for ongoing and upcoming events
    return (
        <div className={`flex flex-col gap-6 ${className}`}>
            {events.map((event) => (
                <EventCard key={event.id} event={event} variant={variant} />
            ))}
        </div>
    );
}
