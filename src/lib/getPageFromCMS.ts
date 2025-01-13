import { getPayloadClient } from "@/payloadClient";
import { Page } from "@/payload-types";
import { Metadata } from "next";

export async function getPageFromCMS(slug: string): Promise<Page | null> {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
        collection: "pages",
        where: {
            slug: {
                equals: slug,
            },
        },
        limit: 1,
    });
    return docs[0] || null;
}

export function generatePageMetadata(page: Page | null, defaultTitle: string): Metadata {
    return {
        ...(page
            ? {
                  title: page.title,
                  description: page.seoDescription,
              }
            : {
                  title: defaultTitle,
              }),
    };
}
