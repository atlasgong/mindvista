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
        sort: filter === "past" ? "-dateRanges.0.startDate" : "dateRanges.0.startDate",
    });

    return events.docs;
}
