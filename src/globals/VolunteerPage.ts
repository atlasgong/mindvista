import type { GlobalConfig } from "payload";
import { canEditContent, canEditFrenchContent, denyAccessField } from "@lib/access";
import { revalidatePath } from "next/cache";
import { validateURLWithProtocol } from "@lib/validations";

export const VolunteerPage: GlobalConfig = {
    slug: "volunteer",
    admin: {
        group: "Static Content",
        preview: () => `${process.env.NEXT_PUBLIC_SERVER_URL}/volunteer`,
        livePreview: {
            url: `${process.env.NEXT_PUBLIC_SERVER_URL}/volunteer`,
        },
    },
    versions: {
        max: 25,
        drafts: true,
    },
    hooks: {
        // revalidate page on "save"
        afterChange: [
            () => {
                revalidatePath("/volunteer");
            },
        ],
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
            name: "title",
            label: "Title",
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
                read: canEditFrenchContent,
                update: canEditFrenchContent,
            },
        },
        {
            name: "description",
            label: "Description - En",
            required: true,
            type: "textarea",
            access: {
                update: canEditContent,
            },
        },
        {
            name: "descriptionFr",
            label: "Description - Fr",
            required: false,
            type: "textarea",
            access: {
                read: canEditFrenchContent,
                update: canEditFrenchContent,
            },
        },
        {
            name: "positions",
            type: "array",
            label: "Volunteer Positions",
            required: true,
            access: {
                create: canEditContent,
            },
            fields: [
                {
                    name: "title",
                    label: "Position Title - En",
                    type: "text",
                    required: true,
                    access: {
                        update: canEditContent,
                    },
                },
                {
                    name: "titleFr",
                    label: "Position Title - Fr",
                    type: "text",
                    required: false,
                    access: {
                        read: canEditFrenchContent,
                        update: canEditFrenchContent,
                    },
                },
                {
                    name: "description",
                    label: "Description - En",
                    type: "richText",
                    required: true,
                    access: {
                        update: canEditContent,
                    },
                },
                {
                    name: "descriptionFr",
                    label: "Description - Fr",
                    type: "richText",
                    required: false,
                    access: {
                        read: canEditFrenchContent,
                        update: canEditFrenchContent,
                    },
                },
                {
                    name: "requirements",
                    label: "Requirements - En",
                    type: "richText",
                    required: true,
                    access: {
                        update: canEditContent,
                    },
                },
                {
                    name: "requirementsFr",
                    label: "Requirements - Fr",
                    type: "richText",
                    required: false,
                    access: {
                        read: canEditFrenchContent,
                        update: canEditFrenchContent,
                    },
                },
                {
                    name: "timeCommitment",
                    label: "Time Commitment - En",
                    type: "text",
                    required: true,
                    access: {
                        update: canEditContent,
                    },
                },
                {
                    name: "timeCommitmentFr",
                    label: "Time Commitment - Fr",
                    type: "text",
                    required: false,
                    access: {
                        read: canEditFrenchContent,
                        update: canEditFrenchContent,
                    },
                },
                {
                    name: "datePosted",
                    label: "Date Posted",
                    type: "date",
                    required: true,
                    admin: {
                        date: {
                            pickerAppearance: "dayOnly",
                        },
                    },
                    access: {
                        update: canEditContent,
                    },
                },
                {
                    name: "formLink",
                    label: "Google Form Link",
                    type: "text",
                    required: true,
                    validate: validateURLWithProtocol,
                    access: {
                        update: canEditContent,
                    },
                },
                {
                    name: "isOpen",
                    label: "Position Open",
                    type: "checkbox",
                    required: true,
                    defaultValue: true,
                    access: {
                        update: canEditContent,
                    },
                },
            ],
        },
    ],
};
