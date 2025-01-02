import type { CollectionConfig } from "payload";

export const ResourceTags: CollectionConfig = {
    slug: "resource-tags",
    admin: {
        group: "Resources",
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
            relationTo: "resource-tag-categories",
            required: true,
        },
    ],
};
