"use client";

import { useEvents } from "../EventsProvider";
import { EventsList } from "./EventsList";

export function EventsContent() {
    const { ongoingEvents, isLoading } = useEvents();
    const hasOngoingEvents = !isLoading && ongoingEvents && ongoingEvents.length > 0;

    return (
        <div className="space-y-16">
            {/* Ongoing Events Section - Only rendered if there are ongoing events */}
            {hasOngoingEvents && (
                <section>
                    <h2 className="mb-8 text-center text-2xl font-bold text-cText">Ongoing Events</h2>
                    <EventsList type="ongoing" className="mx-auto max-w-3xl" variant="featured" />
                </section>
            )}

            {/* Upcoming Events Section */}
            <section>
                <h2 className="mb-8 text-center text-2xl font-bold text-cText">Upcoming Events</h2>
                <EventsList type="upcoming" className="mx-auto max-w-3xl" />
            </section>

            {/* Past Events Section */}
            <section>
                <h2 className="mb-8 text-2xl font-bold text-cText">Past Events</h2>
                <EventsList type="past" className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" />
            </section>
        </div>
    );
}
