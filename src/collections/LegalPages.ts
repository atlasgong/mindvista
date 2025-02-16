import type { CollectionConfig } from "payload";
import { canEditContent, canEditFrenchContent, denyAccess, denyAccessField } from "@lib/access";

export const LegalPages: CollectionConfig = {
    slug: "legal",
    admin: {
        useAsTitle: "page",
        group: "Content",
    },
    access: {
        create: denyAccess,
        delete: denyAccess,
    },
    fields: [
        {
            name: "page",
            required: true,
            type: "relationship",
            relationTo: "pages", // reference the parent collection
            access: {
                update: denyAccessField,
            },
        },
        {
            name: "content",
            label: "Content - En",
            required: true,
            type: "richText",
            access: {
                update: canEditContent,
            },
        },
        {
            name: "contentFr",
            label: "Content - Fr",
            required: false,
            type: "richText",
            access: {
                create: canEditFrenchContent,
                read: canEditFrenchContent,
                update: canEditFrenchContent,
            },
        },
    ],
};
