import type { CollectionConfig } from "payload";
import { canEditContent, canEditFrenchContent, denyAccess, denyAccessField } from "@lib/access";
import { getPayloadClient } from "../payloadClient";

export const LegalPages: CollectionConfig = {
    slug: "legal",
    admin: {
        useAsTitle: "page",
        group: "Content",
        livePreview: {
            url: async ({ data }) => {
                if (!data.page) return process.env.NEXT_PUBLIC_SERVER_URL || "";
                const page = (await getPayloadClient()).findByID({
                    collection: "pages",
                    id: data.page,
                });
                return `${process.env.NEXT_PUBLIC_SERVER_URL}/${(await page).slug}`;
            },
        },
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
