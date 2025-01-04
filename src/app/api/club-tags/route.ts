import { getPayloadClient } from "@/payloadClient";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const payload = await getPayloadClient();
        const items = await payload.find({
            collection: "club-tags",
            depth: 1,
            limit: 100,
        });
        return NextResponse.json(items);
    } catch (error) {
        console.error("Error fetching club tags:", error);
        return NextResponse.json({ error: "Failed to fetch club tags" }, { status: 500 });
    }
}
