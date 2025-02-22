import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://mindvista.ca",
            lastModified: "2025-01-19",
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: "https://mindvista.ca/crisis",
            lastModified: "2025-01-19",
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: "https://mindvista.ca/directory/resources",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: "https://mindvista.ca/directory/clubs",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: "https://mindvista.ca/events",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.75,
        },
        {
            url: "https://mindvista.ca/holistic-wellness",
            lastModified: "2025-01-19",
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: "https://mindvista.ca/about",
            lastModified: "2025-01-19",
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: "https://mindvista.ca/directory",
            lastModified: "2025-01-19",
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: "https://mindvista.ca/sponsor",
            lastModified: "2025-01-19",
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: "https://mindvista.ca/contact",
            lastModified: "2025-01-19",
            changeFrequency: "yearly",
            priority: 0.6,
        },
    ];
}
