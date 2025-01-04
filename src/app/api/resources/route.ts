import { getPayloadClient } from "@/payloadClient";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const payload = await getPayloadClient();
        const items = await payload.find({
            collection: "resources",
            depth: 1,
            limit: 100,
            where: {
                currentlyActive: {
                    equals: true,
                },
            },
        });
        return NextResponse.json(items);
    } catch (error) {
        console.error("Error fetching resources:", error);
        return NextResponse.json({ error: "Failed to fetch resources" }, { status: 500 });
    }
}
