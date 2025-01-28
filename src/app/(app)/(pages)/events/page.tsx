import { getPageFromCMS } from "@/lib/getPageFromCMS";
import { Metadata } from "next";
import { EventsProvider } from "./EventsProvider";
import { EventsContent } from "./components/EventsContent";
import Hr from "../../components/Hr";

export default function EventsPage() {
    return (
        <EventsProvider>
            <div className="mx-auto mb-14 max-w-7xl px-4 py-8 sm:px-12 md:px-16 lg:px-20">
                <header className="mb-12 mt-8 text-center">
                    <h1 className="mb-2 text-4xl font-bold text-cText">Events</h1>
                    <p className="px-8 text-xl tracking-tight text-cTextOffset md:px-12 lg:px-28 xl:px-40">View MindVista&apos;s upcoming wellness events at McGill University! Engage in activities that promote mental health and well-being, and stay connected to our supportive student community.</p>
                </header>

                <Hr className="mx-auto mb-12 max-w-[60vw]" />

                <EventsContent />
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
