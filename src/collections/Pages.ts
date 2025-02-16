import type { CollectionConfig } from "payload";
import { denyAccess, canEditContent, denyAccessField, canEditFrenchContent } from "@/lib/access";

export const Pages: CollectionConfig = {
    slug: "pages",
    admin: {
        useAsTitle: "slug",
        group: "Content",
    },
    access: {
        create: denyAccess,
        delete: denyAccess,
    },
    fields: [
        {
            name: "slug",
            type: "text",
            required: true,
            unique: true,
            access: {
                update: denyAccessField,
            },
        },
        {
            name: "title",
            label: "Title - En",
            required: true,
            type: "text",
            access: {
                update: canEditContent,
            },
        },
        {
            name: "titleFr",
            label: "Title - Fr",
            required: false,
            type: "text",
            access: {
                create: canEditFrenchContent,
                read: canEditFrenchContent,
                update: canEditFrenchContent,
            },
        },
        {
            name: "seoDescription",
            label: "SEO Description - En",
            required: true,
            type: "text",
            access: {
                update: canEditContent,
            },
        },
        {
            name: "seoDescriptionFr",
            label: "SEO Description - Fr",
            required: false,
            type: "text",
            access: {
                create: canEditFrenchContent,
                read: canEditFrenchContent,
                update: canEditFrenchContent,
            },
        },
    ],
};
