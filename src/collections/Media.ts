import { canEditContent, canEditFrenchContent } from "@lib/access";
import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
    slug: "media",
    access: {
        read: () => true,
        create: canEditContent,
        delete: canEditContent,
    },
    fields: [
        {
            name: "alt",
            label: "Alt Text - En",
            type: "text",
            required: true,
            access: {
                update: canEditContent,
            },
        },
        {
            name: "altFr",
            label: "Alt Text - Fr",
            type: "text",
            required: false,
            access: {
                create: canEditFrenchContent,
                read: canEditFrenchContent,
                update: canEditFrenchContent,
            },
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
