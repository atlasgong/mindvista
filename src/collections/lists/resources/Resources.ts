import type { CollectionConfig } from "payload";

export const Resources: CollectionConfig = {
    slug: "resources",
    admin: {
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
                const urlRegex = /^(https?:\/\/)?([\w.-]+)+(:\d+)?(\/[\w.-]*)*\/?$/;
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
            name: "channel",
            type: "text",
            validate: (value: string | null | undefined) => {
                const validValues = ["online", "telephone", "inPerson"];
                if (value && validValues.includes(value)) {
                    return true;
                }
                return "Must be 'online', 'telephone', or 'inPerson'.";
            },
        },
        {
            name: "currentlyActive",
            type: "text",
            required: true,
            validate: (value: string | null | undefined) => {
                if (value && (value === "true" || value === "false")) {
                    return true;
                }
                return "Must be 'true' or 'false'.";
            },
        },
        {
            name: "tags",
            type: "relationship",
            relationTo: "resource-tags",
            hasMany: true,
        },
    ],
};