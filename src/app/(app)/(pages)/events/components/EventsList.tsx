import { getPayloadClient } from "@/payloadClient";
import { EventCard } from "./EventCard";

interface EventsListProps {
    filter: "ongoing" | "upcoming" | "past";
    className?: string;
    variant?: "default" | "featured";
}

async function getEvents(filter: EventsListProps["filter"]) {
    const payload = await getPayloadClient();
    const now = new Date().toISOString();

    let where = {};

    switch (filter) {
        case "ongoing":
            where = {
                and: [{ "dateRanges.startDate": { less_than: now } }, { "dateRanges.endDate": { greater_than: now } }],
            };
            break;
        case "upcoming":
            where = {
                "dateRanges.startDate": { greater_than: now },
            };
            break;
        case "past":
            where = {
                "dateRanges.endDate": { less_than: now },
            };
            break;
    }

    const events = await payload.find({
        collection: "events",
        where,
        sort: filter === "past" ? "-dateRanges.0.startDate" : "dateRanges.0.startDate",
    });

    return events.docs;
}

export async function EventsList({ filter, className, variant = "default" }: EventsListProps) {
    const events = await getEvents(filter);

    if (events.length === 0) {
        if (filter === "ongoing") {
            return null;
        }
        return (
            <div className="text-center text-cTextOffset">
                {filter === "upcoming" && "No upcoming events at the moment."}
                {filter === "past" && "No past events to display."}
            </div>
        );
    }

    // grid layout for past events
    if (filter === "past") {
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
