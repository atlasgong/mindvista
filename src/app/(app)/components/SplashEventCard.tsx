"use client";

import { Event } from "@/payload-types";
import { fetchEvents } from "../(pages)/events/actions";
import { useEffect, useState } from "react";
import { EventCard } from "../(pages)/events/components/EventCard";
import { EventCardSkeleton } from "../(pages)/events/components/EventCardSkeleton";

export default function SplashEventCard() {
    const [event, setEvent] = useState<Event | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [eventType, setEventType] = useState<"ongoing" | "upcoming">("upcoming");

    useEffect(() => {
        // first try to fetch ongoing events
        fetchEvents("ongoing")
            .then((ongoingEvents) => {
                if (ongoingEvents && ongoingEvents.length > 0) {
                    // if there are ongoing events, use the first one
                    setEvent(ongoingEvents[0]);
                    setEventType("ongoing");
                } else {
                    // if no ongoing events, try to fetch upcoming events
                    return fetchEvents("upcoming").then((upcomingEvents) => {
                        if (upcomingEvents && upcomingEvents.length > 0) {
                            setEvent(upcomingEvents[0]);
                            setEventType("upcoming");
                        }
                    });
                }
            })
            .catch((error) => {
                console.error("Error fetching events:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []); // only fetch on mount

    if (!event && !isLoading) {
        return null; // don't show anything if no events are available
    }

    const variant = eventType === "ongoing" ? "compactFeatured" : "compactDefault";

    return <div className="flex h-full">{isLoading ? <EventCardSkeleton variant={variant} /> : event && <EventCard event={event} variant={variant} />}</div>;
}
