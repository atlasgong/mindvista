import type { CollectionConfig } from "payload";

export const Pages: CollectionConfig = {
    slug: "pages",
    admin: {
        useAsTitle: "slug",
        group: "Content",
    },
    fields: [
        {
            name: "slug",
            type: "text",
            required: true,
            unique: true,
        },
        {
            name: "title",
            required: true,
            type: "text",
        },
        {
            name: "seoDescription",
            label: "SEO Description",
            required: true,
            type: "text",
        },
    ],
};
