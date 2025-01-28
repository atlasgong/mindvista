"use server";

import { getPayloadClient } from "@/payloadClient";

export async function fetchEvents(filter: "ongoing" | "upcoming" | "past") {
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
        // Sort orders are set to achieve the following display in UI:
        // Past events: Newest first (i.e. most recent at top)
        // Upcoming events: Closest dates first (e.g. January 27 before February 2)
        // Ongoing events: Most recently started first
        sort:
            filter === "upcoming"
                ? ["dateRanges.startDate", "dateRanges.endDate"] // ascending for upcoming (closer dates first)
                : ["-dateRanges.startDate", "-dateRanges.endDate"], // descending for past/ongoing (newer dates first)
    });

    return events.docs;
}
