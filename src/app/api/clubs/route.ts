import { getPayloadClient } from "@/payloadClient";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const payload = await getPayloadClient();
        const items = await payload.find({
            collection: "clubs",
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
        console.error("Error fetching clubs:", error);
        return NextResponse.json({ error: "Failed to fetch clubs" }, { status: 500 });
    }
}
