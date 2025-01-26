"use client";

import { EventCard } from "./EventCard";
import { useEvents } from "../EventsProvider";

interface EventsListProps {
    type: "ongoing" | "upcoming" | "past";
    className?: string;
    variant?: "default" | "featured";
}

export function EventsList({ type, className, variant = "default" }: EventsListProps) {
    const { ongoingEvents, upcomingEvents, pastEvents, isLoading } = useEvents();

    if (isLoading) {
        return <div className="text-center">Loading events...</div>;
    }

    const events = {
        ongoing: ongoingEvents,
        upcoming: upcomingEvents,
        past: pastEvents,
    }[type];

    if (!events || events.length === 0) {
        if (type === "ongoing") {
            return null;
        }
        return (
            <div className="text-center text-cTextOffset">
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
