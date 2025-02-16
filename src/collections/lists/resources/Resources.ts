import type { CollectionConfig } from "payload";
import { validateURL } from "@lib/validations";
import { canEditContent, canEditFrenchContent } from "@lib/access";

export const Resources: CollectionConfig = {
    slug: "resources",
    admin: {
        useAsTitle: "title",
        group: "Resources",
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
                description: "Does this resource have a sign-up link for their newsletter?",
            },
            validate: validateURL,
            access: {
                update: canEditContent,
            },
        },
        {
            name: "insuranceDetails",
            label: "Insurance Details - En",
            type: "textarea",
            access: {
                update: canEditContent,
            },
        },
        {
            name: "insuranceDetailFr",
            label: "Insurance Details - Fr",
            type: "textarea",
            access: {
                create: canEditFrenchContent,
                read: canEditFrenchContent,
                update: canEditFrenchContent,
            },
        },
        {
            name: "insuranceProviders",
            type: "array",
            fields: [
                {
                    name: "insuranceProvider",
                    type: "array",
                    required: true,
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
                            type: "text",
                            access: {
                                update: canEditContent,
                            },
                        },
                        {
                            name: "descriptionFr",
                            label: "Description - Fr",
                            type: "text",
                            access: {
                                create: canEditFrenchContent,
                                read: canEditFrenchContent,
                                update: canEditFrenchContent,
                            },
                        },
                    ],
                },
            ],
            access: {
                create: canEditContent,
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
            name: "location",
            label: "Location - En",
            type: "text",
            access: {
                update: canEditContent,
            },
        },
        {
            name: "locationFr",
            label: "Location - Fr",
            type: "text",
            access: {
                create: canEditFrenchContent,
                read: canEditFrenchContent,
                update: canEditFrenchContent,
            },
        },
        {
            name: "channelOnline",
            type: "checkbox",
            label: "Online",
            access: {
                update: canEditContent,
            },
        },
        {
            name: "channelTelephone",
            type: "checkbox",
            label: "Telephone",
            access: {
                update: canEditContent,
            },
        },
        {
            name: "channelInPerson",
            type: "checkbox",
            label: "In Person",
            access: {
                update: canEditContent,
            },
        },
        {
            name: "onCampus",
            type: "checkbox",
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
            relationTo: "resource-tags",
            hasMany: true,
            access: {
                update: canEditContent,
            },
        },
    ],
};
