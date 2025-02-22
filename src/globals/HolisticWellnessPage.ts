import type { GlobalConfig } from "payload";
import { canEditContent, canEditFrenchContent, denyAccessField } from "@lib/access";
import { revalidatePath } from "next/cache";

export const HolisticWellnessPage: GlobalConfig = {
    slug: "holistic-wellness",
    admin: {
        group: "Static Content",
        preview: () => `${process.env.NEXT_PUBLIC_SERVER_URL}/holistic-wellness`,
        livePreview: {
            url: `${process.env.NEXT_PUBLIC_SERVER_URL}/holistic-wellness`,
        },
    },
    versions: {
        max: 25,
    },
    hooks: {
        // revalidate page on "save"
        afterChange: [
            () => {
                revalidatePath("/holistic-wellness");
            },
        ],
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
            name: "heroContent",
            label: "Hero Content - En",
            required: true,
            type: "richText",
            access: {
                update: canEditContent,
            },
        },
        {
            name: "heroContentFr",
            label: "Hero Content - Fr",
            required: false,
            type: "richText",
            access: {
                read: canEditFrenchContent,
                update: canEditFrenchContent,
            },
        },
        {
            name: "wellnessWheelTopContent",
            label: "Wellness Wheel Top Content - En",
            required: true,
            type: "richText",
            access: {
                update: canEditContent,
            },
        },
        {
            name: "wellnessWheelTopContentFr",
            label: "Wellness Wheel Top Content - Fr",
            required: false,
            type: "richText",
            access: {
                read: canEditFrenchContent,
                update: canEditFrenchContent,
            },
        },
        {
            name: "wellnessWheelDimensions",
            type: "array",
            label: "Wellness Wheel Dimensions",
            required: true,
            minRows: 8,
            maxRows: 8,
            access: {
                create: canEditContent,
            },
            fields: [
                {
                    name: "name",
                    label: "Name - En",
                    type: "text",
                    required: true,
                    access: {
                        update: canEditContent,
                    },
                },
                {
                    name: "nameFr",
                    label: "Name - Fr",
                    type: "text",
                    required: false,
                    access: {
                        create: canEditFrenchContent,
                        read: canEditFrenchContent,
                        update: canEditFrenchContent,
                    },
                },
                {
                    name: "description",
                    label: "Description - En",
                    type: "textarea",
                    maxLength: 155,
                    required: true,
                    access: {
                        update: canEditContent,
                    },
                },
                {
                    name: "descriptionFr",
                    label: "Description - Fr",
                    type: "textarea",
                    maxLength: 155,
                    required: false,
                    access: {
                        create: canEditFrenchContent,

                        read: canEditFrenchContent,
                        update: canEditFrenchContent,
                    },
                },
                {
                    name: "color",
                    type: "text",
                    required: true,
                    admin: {
                        description: "See https://v3.tailwindcss.com/docs/customizing-colors for a list of colors.",
                    },
                },
            ],
        },
        {
            name: "wellnessWheelBottomContent",
            label: "Wellness Wheel Bottom Content - En",
            required: true,
            type: "richText",
            access: {
                update: canEditContent,
            },
        },
        {
            name: "wellnessWheelBottomContentFr",
            label: "Wellness Wheel Bottom Content - Fr",
            required: false,
            type: "richText",
            access: {
                read: canEditFrenchContent,
                update: canEditFrenchContent,
            },
        },
        {
            name: "sections",
            type: "array",
            label: "Content Sections",
            access: {
                create: canEditContent,
            },
            fields: [
                {
                    name: "content",
                    label: "Content - En",
                    type: "richText",
                    required: true,
                    access: {
                        update: canEditContent,
                    },
                },
                {
                    name: "contentFr",
                    label: "Content - Fr",
                    type: "richText",
                    required: false,
                    access: {
                        create: canEditFrenchContent,
                        read: canEditFrenchContent,
                        update: canEditFrenchContent,
                    },
                },
            ],
        },
    ],
};
