import type { CollectionConfig } from "payload";
import { validateURLWithProtocol, validateInstagramURL } from "@lib/validations";
import { canEditContent, canEditFrenchContent } from "@lib/access";

// this replicates Payload's internal DateFieldValidation type
type PayloadDateValidation = (value: string | Date | null | undefined, options: { siblingData?: { startDate?: string } }) => string | true | Promise<string | true>;

export const Events: CollectionConfig = {
    slug: "events",
    admin: {
        useAsTitle: "title",
        group: "Events",
        livePreview: {
            url: ({ data }) => `${process.env.NEXT_PUBLIC_SERVER_URL}/events/${data.slug}`,
        },
    },
    versions: {
        drafts: true,
        maxPerDoc: 20,
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
            name: "incentive",
            label: "Incentive - En",
            type: "text",
            access: {
                update: canEditContent,
            },
        },
        {
            name: "incentiveFr",
            label: "Incentive - Fr",
            type: "text",
            access: {
                create: canEditFrenchContent,
                read: canEditFrenchContent,
                update: canEditFrenchContent,
            },
        },
        {
            name: "limitedAvailability",
            type: "checkbox",
            label: "Limited quantity?",
            admin: {
                description: "Check this if you cannot guarantee every attendee will receive the incentive (e.g. limited stock).",
            },
            access: {
                update: canEditContent,
            },
        },
        {
            name: "isChance",
            type: "checkbox",
            label: "Is this incentive a chance/possibility?",
            admin: {
                description: "Check this if the incentive is not guaranteed (e.g., chance to win a prize).",
            },
            access: {
                update: canEditContent,
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
            access: {
                update: canEditContent,
            },
            fields: [
                {
                    name: "startDate",
                    required: true,
                    type: "date",
                    index: true,
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
                    index: true,
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
            label: "Location - En",
            required: true,
            type: "text",
            access: {
                update: canEditContent,
            },
        },
        {
            name: "locationFr",
            label: "Location - Fr",
            required: false,
            type: "text",
            access: {
                create: canEditFrenchContent,
                read: canEditFrenchContent,
                update: canEditFrenchContent,
            },
        },
        {
            name: "locationLink",
            type: "text",
            admin: {
                description: "The full URL to the location (e.g., Google Maps link). Must start with http:// or https://",
            },
            validate: validateURLWithProtocol,
            access: {
                update: canEditContent,
            },
        },
        {
            name: "signUpLink",
            type: "text",
            admin: {
                description: "The registration/sign up URL for this event. Must start with http:// or https://",
            },
            validate: validateURLWithProtocol,
            access: {
                update: canEditContent,
            },
        },
        {
            name: "instagramPost",
            type: "text",
            admin: {
                description: "Link to an Instagram post.",
            },
            validate: validateInstagramURL,
            access: {
                update: canEditContent,
            },
        },
        {
            name: "graphic",
            type: "upload",
            relationTo: "media",
            access: {
                update: canEditContent,
            },
        },
    ],
};
