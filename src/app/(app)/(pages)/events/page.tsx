import { Suspense } from "react";
import { getPageFromCMS } from "@/lib/getPageFromCMS";
import { Metadata } from "next";
import { EventsList } from "./components/EventsList";
import { EventsProvider } from "./EventsProvider";

export default function EventsPage() {
    return (
        <EventsProvider>
            <div className="mx-auto mb-14 max-w-7xl px-4 py-8 sm:px-8 md:px-12 lg:px-20">
                <header className="mb-12 mt-8 text-center">
                    <h1 className="mb-4 text-4xl font-bold text-cText">Events</h1>
                    <p className="text-xl text-cTextOffset">Discover and join exciting events in our community.</p>
                </header>

                <div className="space-y-16">
                    {/* Ongoing Events Section - Conditionally Rendered */}
                    <Suspense>
                        <section>
                            <h2 className="mb-8 text-center text-2xl font-bold text-cText">Ongoing Events</h2>
                            <EventsList type="ongoing" className="mx-auto max-w-3xl" variant="featured" />
                        </section>
                    </Suspense>

                    {/* Upcoming Events Section */}
                    <section>
                        <h2 className="mb-8 text-center text-2xl font-bold text-cText">Upcoming Events</h2>
                        <Suspense fallback={<div className="text-center">Loading upcoming events...</div>}>
                            <EventsList type="upcoming" className="mx-auto max-w-3xl" />
                        </Suspense>
                    </section>

                    {/* Past Events Section */}
                    <section>
                        <h2 className="mb-8 text-2xl font-bold text-cText">Past Events</h2>
                        <Suspense fallback={<div>Loading past events...</div>}>
                            <EventsList type="past" className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" />
                        </Suspense>
                    </section>
                </div>
            </div>
        </EventsProvider>
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
