import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
    slug: "users",
    admin: {
        useAsTitle: "fullName",
    },
    auth: true,
    fields: [
        // Email added by default
        // Add more fields as needed
        {
            name: "fullName",
            required: true,
            type: "text",
            validate: (val: string | null | undefined) => {
                if (!val) return "Must enter full name.";
                if (val.length < 2) return "Full name must 2 characters or more.";
                if (val.length > 32) return "Full name must be 32 characters or fewer.";
                return true;
            },
        },
    ],
};
