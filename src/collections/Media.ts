import { canEditContent, canEditFrenchContent } from "@lib/access";
import { APIError, type CollectionConfig } from "payload";

export const Media: CollectionConfig = {
    slug: "media",
    access: {
        read: () => true,
        create: canEditContent,
        delete: canEditContent,
    },
    hooks: {
        // enforces lower_snake_case file naming and file size under 200kB
        beforeOperation: [
            async ({ req, operation }) => {
                if (!(operation === "create" && req.file)) return;

                const fileName = req.file.name;
                const lowerSnakeCaseRegex = /^[a-z0-9]+(?:_[a-z0-9]+)*\.[a-z0-9]+$/; // one or more lowercase letters/digits, optionally followed by groups starting with an underscore and more letters/digits, ending with a dot and an extension in lowercase.
                if (!lowerSnakeCaseRegex.test(fileName)) {
                    throw new APIError("Invalid file name: File name must be in lower_snake_case (e.g., 'my_file_name.ext'). Please rename your file accordingly.", 400, undefined, true);
                }

                const size = req.file.size;
                // enforce file size under 200kB
                if (size > 200 * 1024) {
                    throw new APIError("File size must be under 200kB.", 400, undefined, true);
                }

                return;
            },
        ],
    },
    fields: [
        {
            name: "alt",
            label: "Alt Text - En",
            type: "text",
            required: true,
            access: {
                update: canEditContent,
            },
        },
        {
            name: "altFr",
            label: "Alt Text - Fr",
            type: "text",
            required: false,
            access: {
                create: canEditFrenchContent,
                read: canEditFrenchContent,
                update: canEditFrenchContent,
            },
        },
        {
            name: "purpose",
            type: "text",
            required: true,
            admin: {
                description: "Describe the purpose of this entity / where it is used.",
            },
        },
    ],
    upload: true,
};
