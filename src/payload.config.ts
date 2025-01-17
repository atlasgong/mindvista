// storage-adapter-import-placeholder
import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { en } from "@payloadcms/translations/languages/en";
import { fr } from "@payloadcms/translations/languages/fr";

import { Users } from "@collections/Users";
import { Media } from "@collections/Media";
import { Pages } from "@collections/Pages";
import { LegalPages } from "@collections/LegalPages";
import { Clubs } from "./collections/lists/clubs/Clubs";
import { Resources } from "./collections/lists/resources/Resources";
import { ClubTagCategories } from "./collections/lists/clubs/ClubTagCategories";
import { ResourceTagCategories } from "./collections/lists/resources/ResourceTagCategories";
import { ClubTags } from "./collections/lists/clubs/ClubTags";
import { ResourceTags } from "./collections/lists/resources/ResourceTags";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
    serverURL: "https://mindvista.atl4s.org",
    telemetry: false,
    admin: {
        user: Users.slug,
        importMap: {
            baseDir: path.resolve(dirname),
        },
    },
    collections: [Users, Pages, LegalPages, Media, Clubs, Resources, ClubTagCategories, ResourceTagCategories, ClubTags, ResourceTags],
    editor: lexicalEditor(),
    secret: process.env.PAYLOAD_SECRET || "",
    typescript: {
        outputFile: path.resolve(dirname, "payload-types.ts"),
    },
    db: vercelPostgresAdapter({
        pool: {
            connectionString: process.env.POSTGRES_URL || "",
        },
    }),
    sharp,
    i18n: {
        fallbackLanguage: "en",
        supportedLanguages: { en, fr },
    },
    localization: {
        locales: ["en", "fr"],
        defaultLocale: "en",
        fallback: true,
    },
    plugins: [
        payloadCloudPlugin(),
        // storage-adapter-placeholder
    ],
});
