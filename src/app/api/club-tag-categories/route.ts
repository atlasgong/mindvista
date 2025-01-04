import { getPayloadClient } from "@/payloadClient";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const payload = await getPayloadClient();
        const items = await payload.find({
            collection: "club-tag-categories",
            depth: 0,
            limit: 100,
        });
        return NextResponse.json(items);
    } catch (error) {
        console.error("Error fetching club tag categories:", error);
        return NextResponse.json({ error: "Failed to fetch club tag categories" }, { status: 500 });
    }
}
