import type { CollectionConfig } from "payload";
import { canEditContent } from "@lib/access";

export const ResourceTags: CollectionConfig = {
    slug: "resource-tags",
    admin: {
        useAsTitle: "name",
        group: "Resources",
    },
    access: {
        create: canEditContent,
        update: canEditContent,
        delete: canEditContent,
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
