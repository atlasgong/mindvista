import type { GlobalConfig } from "payload";
import { canEditContent, canEditFrenchContent } from "@lib/access";
import { revalidatePath } from "next/cache";

export const AnnouncementBar: GlobalConfig = {
    slug: "announcement-bar",
    admin: {
        group: "Static Content",
        description: "Configure the announcement bar that appears at the top of the site.",
    },
    versions: {
        max: 25,
        drafts: true,
    },
    hooks: {
        afterChange: [
            () => {
                revalidatePath("/");
            },
        ],
    },
    fields: [
        {
            name: "isEnabled",
            type: "checkbox",
            label: "Show Announcement Bar",
            defaultValue: false,
            required: true,
            access: {
                update: canEditContent,
            },
        },
        {
            name: "message",
            type: "text",
            label: "Message - En",
            required: true,
            access: {
                update: canEditContent,
            },
        },
        {
            name: "messageFr",
            type: "text",
            label: "Message - Fr",
            required: false,
            access: {
                read: canEditFrenchContent,
                update: canEditFrenchContent,
            },
        },
        {
            name: "link",
            type: "group",
            label: "Link",
            fields: [
                {
                    name: "text",
                    type: "text",
                    label: "Link Text - En",
                    required: true,
                    access: {
                        update: canEditContent,
                    },
                },
                {
                    name: "textFr",
                    type: "text",
                    label: "Link Text - Fr",
                    required: false,
                    access: {
                        read: canEditFrenchContent,
                        update: canEditFrenchContent,
                    },
                },
                {
                    name: "href",
                    type: "text",
                    label: "Internal Link URL",
                    required: true,
                    admin: {
                        description: "Internal means your URL must redirect to a page on mindvista.ca. For example, you could enter `/sponsor` for the sponsors page.",
                    },
                    access: {
                        update: canEditContent,
                    },
                },
            ],
        },
    ],
};
