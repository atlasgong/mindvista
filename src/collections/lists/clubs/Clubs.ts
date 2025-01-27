import type { CollectionConfig } from "payload";
import { validateURL, validateFacebookURL, validateInstagramURL } from "@lib/validations";

export const Clubs: CollectionConfig = {
    slug: "clubs",
    admin: {
        useAsTitle: "title",
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
            validate: validateURL,
        },
        {
            name: "newsletter",
            type: "text",
            admin: {
                description: "Does this club have a sign-up link for their newsletter?",
            },
            validate: validateURL,
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
            validate: validateFacebookURL,
        },
        {
            name: "instagram",
            type: "text",
            validate: validateInstagramURL,
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
        },
        {
            name: "currentlyActive",
            type: "checkbox",
        },
        {
            name: "tags",
            type: "relationship",
            relationTo: "club-tags",
            hasMany: true,
        },
    ],
};
