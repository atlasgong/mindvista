import type { CollectionConfig } from "payload";

export const Clubs: CollectionConfig = {
    slug: "clubs",
    admin: {
        group: "Clubs",
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
            name: "email",
            type: "email",
        },
        {
            name: "phoneNumber",
            type: "text",
            // gotta validate this somehow...
        },
        {
            name: "facebook",
            type: "text",
            validate: (value: string | null | undefined) => {
                const facebookRegex = /^(https?:\/\/)?(www\.)?facebook\.com\/[A-Za-z0-9._-]+$/;
                if (value && !facebookRegex.test(value)) {
                    return "Please provide a valid Facebook URL.";
                }
                return true;
            },
        },
        {
            name: "instagram",
            type: "text",
            validate: (value: string | null | undefined) => {
                const instagramRegex = /^(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9._-]+$/;
                if (value && !instagramRegex.test(value)) {
                    return "Please provide a valid Instagram URL.";
                }
                return true;
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
                    validate: (value: string | null | undefined) => {
                        const urlRegex = /^(https?:\/\/)?([\w.-]+)+(:\d+)?(\/[\w.-]*)*\/?$/;
                        if (value && !urlRegex.test(value)) {
                            return "Please provide a valid URL.";
                        }
                        return true;
                    },
                },
            ],
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
            relationTo: "club-tags",
            hasMany: true,
        },
    ],
};
