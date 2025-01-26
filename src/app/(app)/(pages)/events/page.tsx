import { Suspense } from "react";
import { getPageFromCMS } from "@/lib/getPageFromCMS";
import { Metadata } from "next";
import { EventsList } from "./components/EventsList";

function OngoingEventsSection() {
    return (
        <EventsList 
            filter="ongoing" 
            className="mx-auto max-w-3xl" 
            variant="featured" 
        />
    );
}

export default function EventsPage() {
    return (
        <div className="mx-auto mb-14 max-w-7xl px-4 py-8 sm:px-8 md:px-12 lg:px-20">
            <header className="mb-12 mt-8 text-center">
                <h1 className="mb-4 text-4xl font-bold text-cText">Events</h1>
                <p className="text-xl text-cTextOffset">Discover and join exciting events in our community.</p>
            </header>

            <div className="space-y-16">
                {/* Ongoing Events Section - Conditionally Rendered */}
                <Suspense>
                    <section>
                        <h2 className="mb-8 text-2xl font-bold text-center text-cText">Ongoing Events</h2>
                        <OngoingEventsSection />
                    </section>
                </Suspense>

                {/* Upcoming Events Section */}
                <section>
                    <h2 className="mb-8 text-2xl font-bold text-center text-cText">Upcoming Events</h2>
                    <Suspense fallback={<div className="text-center">Loading upcoming events...</div>}>
                        <EventsList 
                            filter="upcoming" 
                            className="mx-auto max-w-3xl" 
                        />
                    </Suspense>
                </section>

                {/* Past Events Section */}
                <section>
                    <h2 className="mb-8 text-2xl font-bold text-cText">Past Events</h2>
                    <Suspense fallback={<div>Loading past events...</div>}>
                        <EventsList 
                            filter="past" 
                            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" 
                        />
                    </Suspense>
                </section>
            </div>
        </div>
    );
}

export async function generateMetadata(): Promise<Metadata> {
    const page = await getPageFromCMS("events");
    return {
        ...(page && {
            title: page.title,
            description: page.seoDescription,
        }),
    };
}
