import type { CollectionConfig } from "payload";
import { validateURL } from "@lib/validations";
import { canEditContent } from "@lib/access";

export const Resources: CollectionConfig = {
    slug: "resources",
    admin: {
        useAsTitle: "title",
        group: "Resources",
    },
    access: {
        create: canEditContent,
        update: canEditContent,
        delete: canEditContent,
    },
    fields: [
        {
            name: "slug",
            type: "text",
            required: true,
            unique: true,
        },
        {
            name: "title",
            required: true,
            type: "text",
        },
        {
            name: "description",
            required: true,
            type: "textarea",
        },
        {
            name: "website",
            type: "text",
            validate: validateURL,
        },
        {
            name: "newsletter",
            type: "text",
            admin: {
                description: "Does this resource have a sign-up link for their newsletter?",
            },
            validate: validateURL,
        },
        {
            name: "insuranceDetails",
            type: "textarea",
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
                            type: "text",
                            required: true,
                        },
                        {
                            name: "description",
                            type: "text",
                        },
                    ],
                },
            ],
        },
        {
            name: "email",
            type: "email",
        },
        {
            name: "phoneNumber",
            type: "text",
            // gotta validate this somehow...
        },
        {
            name: "location",
            type: "text",
        },
        {
            name: "channelOnline",
            type: "checkbox",
            label: "Online",
        },
        {
            name: "channelTelephone",
            type: "checkbox",
            label: "Telephone",
        },
        {
            name: "channelInPerson",
            type: "checkbox",
            label: "In Person",
        },
        {
            name: "onCampus",
            type: "checkbox",
        },
        {
            name: "currentlyActive",
            type: "checkbox",
        },
        {
            name: "tags",
            type: "relationship",
            relationTo: "resource-tags",
            hasMany: true,
        },
    ],
};
