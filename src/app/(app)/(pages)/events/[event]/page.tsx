import { RefreshRouteOnSave } from "@/app/(app)/components/RefreshRouteOnSave";
import { Fragment } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPayloadClient } from "@/payloadClient";
import Link from "next/link";
import { FiArrowLeft, FiCalendar, FiMapPin, FiGift, FiExternalLink, FiInstagram } from "react-icons/fi";
import LastUpdatedSection from "@/app/(app)/components/LastUpdatedSection";
import LocationButton from "./components/LocationButton";
import Hr from "@/app/(app)/components/Hr";
import { OngoingBadge } from "../components/OngoingBadge";
import { EventDate } from "../components/EventDate";
import ImageModal from "@/app/(app)/components/ImageModal";

type PageProps = {
    params: Promise<{
        event: string;
    }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function getEvent(slug: string) {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
        collection: "events",
        where: {
            slug: {
                equals: slug,
            },
        },
        limit: 1,
    });
    return docs[0] || null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const event = await getEvent((await params).event);
    if (!event) return { title: "404: Page Not Found" };

    return {
        title: event.title,
        description: event.description,
    };
}

export default async function EventPage({ params }: PageProps) {
    const event = await getEvent((await params).event);
    if (!event) return notFound();

    const now = new Date();
    const isOngoing = event.dateRanges?.some((range) => new Date(range.startDate) <= now && new Date(range.endDate) >= now);

    // Handle locationLink type
    const locationLink = typeof event.locationLink === "string" ? event.locationLink : undefined;

    return (
        <Fragment>
            <RefreshRouteOnSave />
            <div className="mx-auto max-w-4xl">
                <div className="rounded-2xl border border-cBorder bg-cBackgroundOffset px-6 pb-3 pt-6 shadow-sm transition-all hover:shadow-md md:px-8 md:pt-8">
                    {/* Header */}
                    <div className="flex flex-row items-start justify-between">
                        <h1 className="text-2xl font-bold leading-tight text-cText sm:text-3xl lg:text-4xl">{event.title}</h1>
                        {isOngoing && <OngoingBadge className="flex-shrink-0" />}
                    </div>
                    <p className="mt-4 text-base leading-relaxed text-cTextOffset sm:text-lg">{event.description}</p>
                    {event.instagramPost && (
                        <a href={event.instagramPost} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 text-cAccent hover:underline">
                            <FiInstagram className="h-4 w-4" />
                            More info on our Instagram
                            <FiExternalLink className="h-4 w-4" />
                        </a>
                    )}
                    {event.signUpLink && (
                        <div className="mt-4 flex justify-center">
                            <a href={event.signUpLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-cBorder bg-cBackground px-4 py-2 text-sm font-medium text-cText transition-colors hover:border-cAccent hover:text-cAccent">
                                Sign up for this event
                                <FiExternalLink className="h-4 w-4" />
                            </a>
                        </div>
                    )}

                    <Hr className="mb-8 mt-6" />

                    {/* Event Details */}
                    <div className="mt-8 flex flex-col justify-between gap-6 md:flex-row">
                        {/* Date & Time */}
                        <div className="space-y-3 md:mx-auto md:max-w-[25%]">
                            <div className="flex items-center gap-2">
                                <FiCalendar className="h-5 w-5 text-cTextOffset" />
                                <h2 className="text-lg font-semibold text-cText">Date & Time</h2>
                            </div>
                            <div className="space-y-2">{event.dateRanges?.map((range, index) => <EventDate key={index} startDate={range.startDate} endDate={range.endDate} className="text-cTextOffset" />)}</div>
                        </div>

                        {/* Location */}
                        <div className="space-y-3 md:mx-auto md:max-w-[33%]">
                            <div className="flex items-center gap-2">
                                <FiMapPin className="h-5 w-5 text-cTextOffset" />
                                <h2 className="text-lg font-semibold text-cText">Location</h2>
                            </div>
                            <LocationButton location={event.location} locationLink={locationLink} />
                        </div>

                        {/* Incentive */}
                        {event.incentive && (
                            <div className="space-y-3 md:mx-auto md:max-w-[25%]">
                                <div className="flex items-center gap-2">
                                    <FiGift className="h-5 w-5 text-cTextOffset" />
                                    <h2 className="text-lg font-semibold text-cText">Incentive</h2>
                                </div>
                                <p className={`font-medium ${event.isChance ? "text-purple-500 dark:text-purple-400" : "text-blue-500 dark:text-blue-400"}`}>
                                    {event.isChance ? "❓" : "🎁"} {event.incentive}
                                    <span className="text-xs">
                                        {event.isChance ? "†" : ""}
                                        {event.limitedAvailability ? "*" : ""}
                                    </span>
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Event Graphic */}
                    {typeof event.graphic === "object" && event.graphic?.url && <ImageModal className="my-8 md:mt-14" url={event.graphic.url} altText={event.graphic.alt} width={event.graphic.width || 1000} height={event.graphic.height || 1000} />}

                    <div className="min-h-4"></div>
                    {event.isChance && <p className="text-xs text-cTextOffset">&dagger;Incentives are awarded on a chance-to-win basis. There is no guaranteed prize.</p>}
                    {event.limitedAvailability && <p className="text-xs text-cTextOffset">*Incentives are available while supplies last, on a first-come, first-served basis.</p>}
                </div>
                {/* Footer */}
                <div className="mt-8 flex flex-col items-center">
                    <Link href="/events" className="inline-flex items-center gap-2 rounded-lg border border-cBorder bg-cBackgroundOffset px-4 py-2 text-base font-medium text-cText transition-colors hover:border-cAccent hover:text-cAccent">
                        <FiArrowLeft className="h-5 w-5" />
                        Go back to Events
                    </Link>
                    <LastUpdatedSection updatedAt={new Date(event.updatedAt)} />
                </div>
            </div>
        </Fragment>
    );
}
