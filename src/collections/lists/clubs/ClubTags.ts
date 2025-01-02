import type { CollectionConfig } from "payload";

export const ClubTags: CollectionConfig = {
    slug: "club-tags",
    admin: {
        group: "Clubs",
    },
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
        },
        {
            name: "category",
            type: "relationship",
            relationTo: "club-tag-categories",
            required: true,
        },
    ],
};
