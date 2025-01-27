import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
    slug: "media",
    access: {
        read: () => true,
    },
    fields: [
        {
            name: "alt",
            type: "text",
            required: true,
        },
        {
            name: "purpose",
            type: "text",
            required: true,
            admin: {
                description: "Describe the purpose of this entity / where it is used.",
            },
        },
    ],
    upload: true,
};
