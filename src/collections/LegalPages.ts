import type { CollectionConfig } from "payload";
import { canEditContent, denyAccess, denyFieldAccess } from "@lib/access";

export const LegalPages: CollectionConfig = {
    slug: "legal",
    admin: {
        useAsTitle: "page",
        group: "Content",
    },
    access: {
        create: denyAccess,
        update: canEditContent,
        delete: denyAccess,
    },
    fields: [
        {
            name: "page",
            required: true,
            type: "relationship",
            relationTo: "pages", // reference the parent collection
            access: {
                update: denyFieldAccess,
            },
        },
        {
            name: "content",
            required: true,
            type: "richText",
        },
    ],
};
