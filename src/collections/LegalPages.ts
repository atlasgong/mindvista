import type { CollectionConfig } from "payload";

export const LegalPages: CollectionConfig = {
    slug: "legal",
    versions: {
        drafts: true,
        maxPerDoc: 10,
    },
    admin: {
        useAsTitle: "page",
        group: "Content",
    },
    fields: [
        {
            name: "page",
            required: true,
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
