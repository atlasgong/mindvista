import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();

    // verify secret for extra security
    const { secret } = body;
    if (!process.env.REVALIDATION_SECRET || secret !== process.env.REVALIDATION_SECRET) {
        return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    try {
        // revalidate the directory page
        revalidatePath("/directory");
        return NextResponse.json({ revalidated: true, now: Date.now() });
    } catch (err) {
        return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
    }
}
