import type { CollectionConfig } from "payload";
import { denyAccess, canEditContent, denyFieldAccess } from "@/lib/access";

export const Pages: CollectionConfig = {
    slug: "pages",
    admin: {
        useAsTitle: "slug",
        group: "Content",
    },
    access: {
        create: denyAccess,
        update: canEditContent,
        delete: denyAccess,
    },
    fields: [
        {
            name: "slug",
            type: "text",
            required: true,
            unique: true,
            access: {
                update: denyFieldAccess,
            },
        },
        {
            name: "title",
            required: true,
            type: "text",
        },
        {
            name: "seoDescription",
            label: "SEO Description",
            required: true,
            type: "text",
        },
    ],
};
