import type { CollectionConfig } from "payload";

export const ClubTagCategories: CollectionConfig = {
    slug: "club-tag-categories",
    admin: {
        useAsTitle: "name",
        group: "Clubs",
    },
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
        },
    ],
};
