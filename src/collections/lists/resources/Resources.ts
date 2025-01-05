import type { CollectionConfig } from "payload";

export const Resources: CollectionConfig = {
    slug: "resources",
    admin: {
        useAsTitle: "title",
        group: "Resources",
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
            validate: (value: string | null | undefined) => {
                // Allow URLs with:
                // - Optional protocol
                // - Domains with hyphens
                // - Subdomains
                // - Path segments with special chars
                // - Query params and fragments
                const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(:\d+)?(\/[-\w\._~:/?#\[\]@!$&'\(\)\*\+,;=\%]*)?$/i;
                if (value && !urlRegex.test(value)) {
                    return "Please provide a valid URL.";
                }
                return true;
            },
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
