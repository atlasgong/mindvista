import type { CollectionConfig } from "payload";

export const LegalPages: CollectionConfig = {
    slug: "legal",
    admin: {
        group: "Content",
    },
    fields: [
        {
            name: "page",
            type: "relationship",
            relationTo: "pages", // reference the parent collection
        },
        {
            name: "content",
            required: true,
            type: "richText",
        },
    ],
};