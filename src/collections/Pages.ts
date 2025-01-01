import type { CollectionConfig } from "payload";

export const Pages: CollectionConfig = {
    slug: "pages",
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
            name: "description",
            required: true,
            type: "text",
        },
    ],
};
