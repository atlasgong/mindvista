import type { CollectionConfig, FieldAccess } from "payload";
import type { User } from "../payload-types";
import { isAdmin } from "../lib/access";

const isSelf: FieldAccess = ({ req, id }) => {
    const user = req.user as User | null;
    return user?.id === Number(id);
};

export const Users: CollectionConfig = {
    slug: "users",
    admin: {
        useAsTitle: "fullName",
    },
    auth: true,
    fields: [
        {
            name: "fullName",
            required: true,
            type: "text",
            validate: (val: string | null | undefined) => {
                if (!val) return "Must enter full name.";
                if (val.length < 2) return "Full name must be 2 characters or more.";
                if (val.length > 32) return "Full name must be 32 characters or fewer.";
                return true;
            },
        },
        {
            name: "role",
            type: "select",
            required: true,
            defaultValue: "contentEditor",
            access: {
                update: isAdmin, // only admins can update user roles
            },
            options: [
                { label: "Root", value: "root" },
                { label: "Admin", value: "admin" },
                { label: "Content Editor", value: "contentEditor" },
                { label: "Content Editor (fr)", value: "contentEditorFr" },
            ],
        },
    ],
    access: {
        create: isAdmin,
        delete: isAdmin,
        update: ({ req, id }) => isSelf({ req, id }) || isAdmin({ req }), // users can update themselves, admins can update anyone
    },
};
