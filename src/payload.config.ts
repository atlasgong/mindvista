import { s3Storage } from "@payloadcms/storage-s3";
import { awsCredentialsProvider } from "@vercel/functions/oidc";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import { resendAdapter } from "@payloadcms/email-resend";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { payloadSentinel } from "payload-sentinel";

import { Users } from "@collections/Users";
import { Media } from "@collections/Media";
import { Pages } from "@collections/Pages";
import { LegalPages } from "@collections/LegalPages";
import { AboutPage } from "@globals/AboutPage";
import { HolisticWellnessPage } from "@globals/HolisticWellnessPage";
import { Clubs } from "./collections/lists/clubs/Clubs";
import { Resources } from "./collections/lists/resources/Resources";
import { ClubTagCategories } from "./collections/lists/clubs/ClubTagCategories";
import { ResourceTagCategories } from "./collections/lists/resources/ResourceTagCategories";
import { ClubTags } from "./collections/lists/clubs/ClubTags";
import { ResourceTags } from "./collections/lists/resources/ResourceTags";
import { Events } from "./collections/Events";
import { SponsorPage } from "./globals/SponsorPage";
import { VolunteerPage } from "./globals/VolunteerPage";
import { AnnouncementBar } from "./globals/AnnouncementBar";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const isDevelopment = process.env.APP_ENV === "development";

// use local postgres server in development, neon otherwise
const dbAdapter = isDevelopment
    ? postgresAdapter({
          pool: {
              connectionString: process.env.POSTGRES_URL,
          },
          /**
           * Prevent Payload from attempting to push schema changes during startup in development.
           * Schema is managed by migrations and the seeding script.
           */
          push: false,
      })
    : vercelPostgresAdapter({
          push: false,
      });

// use access key authentication in development, IAM role-based authentication otherwise
const storageConfig = isDevelopment
    ? {
          credentials: {
              accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
              secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
          },
          region: process.env.S3_REGION,
          endpoint: process.env.S3_ENDPOINT,
          forcePathStyle: true,
      }
    : {
          credentials: awsCredentialsProvider({
              roleArn: process.env.AWS_ROLE_ARN || "",
          }),
          region: process.env.S3_REGION,
      };

export default buildConfig({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
    telemetry: false,
    admin: {
        user: Users.slug,
        importMap: {
            baseDir: path.resolve(dirname),
        },
        livePreview: {
            breakpoints: [
                {
                    name: "GalaxyS10",
                    label: "Galaxy S10",
                    width: 360,
                    height: 760,
                },
                {
                    name: "iPhone13Pro",
                    label: "iPhone 13 Pro",
                    width: 390,
                    height: 844,
                },
                {
                    name: "iPadPortrait",
                    label: "iPad (Portrait)",
                    width: 810,
                    height: 1080,
                },
                {
                    name: "iPadLandscape",
                    label: "iPad (Landscape)",
                    width: 1080,
                    height: 810,
                },
                {
                    name: "macbookPro",
                    label: "MacBook Pro",
                    width: 1512,
                    height: 982,
                },
                {
                    name: "chromebook",
                    label: "Chromebook",
                    width: 1366,
                    height: 768,
                },
            ],
        },
        avatar: "default",
    },
    collections: [Users, Media, Pages, LegalPages, Events, Clubs, Resources, ClubTagCategories, ResourceTagCategories, ClubTags, ResourceTags],
    globals: [AboutPage, HolisticWellnessPage, SponsorPage, VolunteerPage, AnnouncementBar],
    editor: lexicalEditor(),
    secret: process.env.PAYLOAD_SECRET || "",
    typescript: {
        outputFile: path.resolve(dirname, "payload-types.ts"),
    },
    db: dbAdapter,
    sharp,
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
            config: storageConfig,
        }),
        payloadSentinel(),
    ],
});
