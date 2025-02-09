import type { CollectionConfig } from "payload";
import { canEditContent } from "@lib/access";

export const ResourceTagCategories: CollectionConfig = {
    slug: "resource-tag-categories",
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
    ],
};
