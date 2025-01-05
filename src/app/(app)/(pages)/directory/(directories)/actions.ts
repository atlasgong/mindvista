"use server";

import { getPayloadClient } from "@/payloadClient";

export async function fetchDirectoryData(isClubDirectory: boolean) {
    try {
        const payload = await getPayloadClient();

        // fetch entities
        const [itemsData, tagsData, categoriesData] = await Promise.all([
            payload.find({
                collection: isClubDirectory ? "clubs" : "resources",
            }),
            payload.find({
                collection: isClubDirectory ? "club-tags" : "resource-tags",
                limit: 100,
            }),
            payload.find({
                collection: isClubDirectory ? "club-tag-categories" : "resource-tag-categories",
            }),
        ]);

        return {
            items: itemsData.docs || [],
            tags: tagsData.docs || [],
            categories: categoriesData.docs || [],
        };
    } catch (error) {
        console.error("Error fetching directory data:", error);
        throw error;
    }
}
