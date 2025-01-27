import type { CollectionConfig } from "payload";
import { validateURLWithProtocol, validateInstagramURL } from "@lib/validations";

// this replicates Payload's internal DateFieldValidation type
type PayloadDateValidation = (value: string | Date | null | undefined, options: { siblingData?: { startDate?: string } }) => string | true | Promise<string | true>;

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
                        description: "Must be same as or later than start date",
                    },
                    validate: ((value, { siblingData }) => {
                        if (!value || !siblingData?.startDate) return true;

                        const endDate = new Date(value);
                        const startDate = new Date(siblingData.startDate);

                        return endDate >= startDate || "End date must be same as or later than start date";
                    }) as PayloadDateValidation,
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
            validate: validateURLWithProtocol,
        },
        {
            name: "signUpLink",
            type: "text",
            admin: {
                description: "The registration/sign up URL for this event. Must start with http:// or https://",
            },
            validate: validateURLWithProtocol,
        },
        {
            name: "instagramPost",
            type: "text",
            admin: {
                description: "Link to an Instagram post.",
            },
            validate: validateInstagramURL,
        },
        {
            name: "graphic",
            type: "upload",
            relationTo: "media",
        },
    ],
};
