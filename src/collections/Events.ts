import type { CollectionConfig } from "payload";

export const Events: CollectionConfig = {
    slug: "events",
    admin: {
        useAsTitle: "title",
        group: "Events",
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
            name: "incentive",
            type: "text",
        },
        {
            name: "limitedAvailability",
            type: "checkbox",
            label: "Limited quantity?",
            admin: {
                description: "Check this if you cannot guarantee every attendee will receive the incentive (e.g. limited stock).",
            },
        },
        {
            name: "isChance",
            type: "checkbox",
            label: "Is this incentive a chance/possibility?",
            admin: {
                description: "Check this if the incentive is not guaranteed (e.g., chance to win a prize).",
            },
        },
        {
            name: "dateRanges",
            type: "array",
            required: true,
            minRows: 1,
            admin: {
                description: "Add one or more date ranges for this event",
            },
            fields: [
                {
                    name: "startDate",
                    required: true,
                    type: "date",
                    admin: {
                        date: {
                            pickerAppearance: "dayAndTime",
                        },
                    },
                },
                {
                    name: "endDate",
                    required: true,
                    type: "date",
                    admin: {
                        date: {
                            pickerAppearance: "dayAndTime",
                        },
                    },
                },
            ],
        },
        {
            name: "location",
            required: true,
            type: "text",
        },
        {
            name: "locationLink",
            type: "text",
            admin: {
                description: "The full URL to the location (e.g., Google Maps link). Must start with http:// or https://",
            },
            validate: (value: string | null | undefined) => {
                if (!value) return true;

                const protocolRegex = /^https?:\/\//i;
                if (!protocolRegex.test(value)) {
                    return "URL must start with http:// or https://";
                }

                const urlRegex = /^https?:\/\/([\w-]+\.)+[a-z]{2,}(:\d+)?(\/[-\w\._~:/?#\[\]@!$&'\(\)\*\+,;=\%]*)?$/i;
                if (!urlRegex.test(value)) {
                    return "Please provide a valid URL";
                }
                return true;
            },
        },
        {
            name: "signUpLink",
            type: "text",
            admin: {
                description: "The registration/sign up URL for this event. Must start with http:// or https://",
            },
            validate: (value: string | null | undefined) => {
                if (!value) return true;

                const protocolRegex = /^https?:\/\//i;
                if (!protocolRegex.test(value)) {
                    return "URL must start with http:// or https://";
                }

                const urlRegex = /^https?:\/\/([\w-]+\.)+[a-z]{2,}(:\d+)?(\/[-\w\._~:/?#\[\]@!$&'\(\)\*\+,;=\%]*)?$/i;
                if (!urlRegex.test(value)) {
                    return "Please provide a valid URL";
                }
                return true;
            },
        },
        {
            name: "instagramPost",
            type: "text",
            admin: {
                description: "Link to an Instagram post.",
            },
            validate: (value: string | null | undefined) => {
                const instagramRegex = /^(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9._%+-]+\/?.*$/;
                if (value && !instagramRegex.test(value)) {
                    return "Please provide a valid Instagram URL.";
                }
                return true;
            },
        },
        {
            name: "graphic",
            type: "upload",
            relationTo: "media",
        },
    ],
};
