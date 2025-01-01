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
import { Index } from "@globals/Index";
import { Pages } from "@collections/Pages";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
    telemetry: false,
    admin: {
        user: Users.slug,
        importMap: {
            baseDir: path.resolve(dirname),
        },
    },
    collections: [Users, Pages, Media],
    globals: [Index],
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
