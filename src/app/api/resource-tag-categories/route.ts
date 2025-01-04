import { getPayloadClient } from "@/payloadClient";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const payload = await getPayloadClient();
        const items = await payload.find({
            collection: "resource-tag-categories",
            depth: 0,
            limit: 100,
        });
        return NextResponse.json(items);
    } catch (error) {
        console.error("Error fetching resource tag categories:", error);
        return NextResponse.json({ error: "Failed to fetch resource tag categories" }, { status: 500 });
    }
}
