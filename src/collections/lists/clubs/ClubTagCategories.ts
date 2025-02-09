import type { CollectionConfig } from "payload";
import { canEditContent } from "@lib/access";

export const ClubTagCategories: CollectionConfig = {
    slug: "club-tag-categories",
    admin: {
        useAsTitle: "name",
        group: "Clubs",
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
