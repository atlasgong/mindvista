import type { CollectionConfig } from "payload";

export const ResourceTagCategories: CollectionConfig = {
    slug: "resource-tag-categories",
    admin: {
        group: "Resources",
    },
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
        },
    ],
};