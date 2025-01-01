import { GlobalConfig } from "payload";

export const Index: GlobalConfig = {
    slug: "/index",
    fields: [
        {
            name: "page",
            type: "relationship",
            relationTo: "pages",
            required: true,
        },
        {
            name: "mobileTitle",
            type: "text",
            required: true,
        },
        {
            name: "desktopTitle",
            type: "text",
            required: true,
        },
        {
            name: "description",
            type: "text",
            required: true,
        },
    ],
};
