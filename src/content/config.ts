import { z, defineCollection } from 'astro:content';

const legalCollection = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        description: z.string(),
    })
});

const clubCollection = defineCollection({
    type: "data",
    schema: z.object({
        name: z.string(),
        description: z.string().transform(str => str.trim() || "No description available."),
        status: z.enum(["active", "inactive"]),
        social_media: z.object({
            facebook: z.string().optional(),
            instagram: z.string().optional(),
            other: z.array(z.string()).nullable().optional()
        }).optional(),
        website: z.string().optional(),
        contact_info: z.string().optional(),
        categories: z.record(z.string(), z.array(z.string())).optional()
    })
});

const resourceCollection = defineCollection({
    type: "data",
    schema: z.object({
        name: z.string(),
        description: z.string().transform(str => str.trim() || "No description available."),
        status: z.enum(["active", "inactive"]),
        availability: z.union([
            z.array(z.enum(["online", "telephone", "in_person"])),
            z.object({ note: z.string() })
        ]),
        insurance: z.object({
            insurance: z.array(z.string()).optional(),
            details: z.string().optional()
        }).optional(),
        website: z.string().optional(),
        contact_info: z.string().optional(),
        location: z.string().optional(),
        categories: z.record(z.string(), z.array(z.string())).optional()
    })
});

export const collections = {
    'legal': legalCollection,
    'clubs': clubCollection,
    'resources': resourceCollection
};
