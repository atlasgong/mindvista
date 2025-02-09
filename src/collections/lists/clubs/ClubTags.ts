import type { CollectionConfig } from "payload";
import { canEditContent } from "@lib/access";

export const ClubTags: CollectionConfig = {
    slug: "club-tags",
    admin: {
        group: "Clubs",
        useAsTitle: "name",
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
            relationTo: "club-tag-categories",
            required: true,
        },
    ],
};
