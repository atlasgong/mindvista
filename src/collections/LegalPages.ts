import type { CollectionConfig } from "payload";
import { canEditContent, canEditFrenchContent, denyAccess, denyAccessField } from "@lib/access";
import { getPayloadClient } from "../payloadClient";
import { revalidatePath } from "next/cache";

export const LegalPages: CollectionConfig = {
    slug: "legal",
    admin: {
        useAsTitle: "page",
        group: "Content",
        livePreview: {
            url: async ({ data }) => {
                const payload = await getPayloadClient();
                const page = await payload.findByID({
                    collection: "pages",
                    id: data.page,
                });
                return `${process.env.NEXT_PUBLIC_SERVER_URL}/${page.slug}`;
            },
        },
    },
    hooks: {
        // revalidate legal page on "save"
        afterChange: [
            async ({ doc }) => {
                if (!doc?.page) return;
                const payload = await getPayloadClient();
                const page = await payload.findByID({
                    collection: "pages",
                    id: doc.page as string,
                    depth: 0,
                });
                if (page?.slug) {
                    // console.log(`Revalidating '/${page.slug}'...`);
                    revalidatePath("/" + page.slug);
                }
            },
        ],
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
            relationTo: "pages",
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
