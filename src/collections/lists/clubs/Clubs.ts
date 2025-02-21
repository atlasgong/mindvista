import type { CollectionConfig } from "payload";
import { validateURL, validateFacebookURL, validateInstagramURL } from "@lib/validations";
import { canEditContent, canEditFrenchContent } from "@lib/access";

export const Clubs: CollectionConfig = {
    slug: "clubs",
    admin: {
        useAsTitle: "title",
        group: "Clubs",
        livePreview: {
            url: ({ data }) => `${process.env.NEXT_PUBLIC_SERVER_URL}/directory/clubs/${data.slug}`,
        },
    },
    access: {
        create: canEditContent,
        delete: canEditContent,
    },
    fields: [
        {
            name: "slug",
            type: "text",
            required: true,
            unique: true,
            access: {
                update: canEditContent,
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
                create: canEditFrenchContent,
                read: canEditFrenchContent,
                update: canEditFrenchContent,
            },
        },
        {
            name: "website",
            type: "text",
            validate: validateURL,
            access: {
                update: canEditContent,
            },
        },
        {
            name: "newsletter",
            type: "text",
            admin: {
                description: "Does this club have a sign-up link for their newsletter?",
            },
            validate: validateURL,
            access: {
                update: canEditContent,
            },
        },
        {
            name: "email",
            type: "email",
            access: {
                update: canEditContent,
            },
        },
        {
            name: "phoneNumber",
            type: "text",
            // gotta validate this somehow...
            access: {
                update: canEditContent,
            },
        },
        {
            name: "facebook",
            type: "text",
            validate: validateFacebookURL,
            access: {
                update: canEditContent,
            },
        },
        {
            name: "instagram",
            type: "text",
            validate: validateInstagramURL,
            access: {
                update: canEditContent,
            },
        },
        {
            name: "otherSocials",
            type: "array",
            fields: [
                {
                    name: "link",
                    type: "text",
                    required: true,
                    validate: validateURL,
                },
            ],
            access: {
                update: canEditContent,
            },
        },
        {
            name: "currentlyActive",
            type: "checkbox",
            access: {
                update: canEditContent,
            },
        },
        {
            name: "tags",
            type: "relationship",
            relationTo: "club-tags",
            hasMany: true,
            access: {
                update: canEditContent,
            },
        },
    ],
};
