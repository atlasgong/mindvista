import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */

const isDevelopment = process.env.APP_ENV === "development";
const isProduction = process.env.APP_ENV === "production";
const isStaging = process.env.APP_ENV === "staging";

// parse NEXT_PUBLIC_SERVER_URL for local development
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
const [localHostname, localPort] = serverUrl.replace(/^https?:\/\//, "").split(":");

const nextConfig = {
    images: {
        remotePatterns: [
            ...(isProduction
                ? [
                      {
                          protocol: "https",
                          hostname: "mindvista.ca",
                          pathname: "/api/media/**",
                      },
                  ]
                : []),
            ...(isStaging
                ? [
                      {
                          protocol: "https",
                          hostname: "mindvista-[a-z0-9]{9}-mindvista-dev.vercel.app",
                          pathname: "/api/media/**",
                      },
                  ]
                : []),
            ...(isDevelopment
                ? [
                      {
                          protocol: "http",
                          hostname: localHostname,
                          ...(localPort && { port: localPort }),
                          pathname: "/api/media/**",
                      },
                  ]
                : []),
        ],
    },
};

export default withPayload(nextConfig);
