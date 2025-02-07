import { s3Storage } from "@payloadcms/storage-s3";
import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import { resendAdapter } from "@payloadcms/email-resend";
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
import { Events } from "./collections/Events";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
    serverURL: "https://mindvista.ca",
    telemetry: false,
    admin: {
        user: Users.slug,
        importMap: {
            baseDir: path.resolve(dirname),
        },
    },
    collections: [Users, Pages, LegalPages, Media, Events, Clubs, Resources, ClubTagCategories, ResourceTagCategories, ClubTags, ResourceTags],
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
        supportedLanguages: { en, fr },
        fallbackLanguage: "en",
    },
    localization: {
        locales: ["en", "fr"],
        defaultLocale: "en",
        fallback: true,
    },
    email: resendAdapter({
        defaultFromAddress: process.env.RESEND_DEFAULT_EMAIL || "",
        defaultFromName: "MindVista | Payload CMS",
        apiKey: process.env.RESEND_API_KEY || "",
    }),
    plugins: [
        payloadCloudPlugin(),
        s3Storage({
            collections: {
                media: {
                    prefix: "media",
                },
            },
            bucket: process.env.S3_BUCKET || "",
            config: {
                credentials: {
                    accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
                    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
                },
                region: process.env.S3_REGION,
            },
        }),
    ],
});
