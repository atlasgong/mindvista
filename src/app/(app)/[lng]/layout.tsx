import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import NextTopLoader from "nextjs-toploader";
import "src/global.css";

import { dir } from "i18next";
import { languages, type Language } from "../i18n/settings";
import { Metadata } from "next";

export async function generateStaticParams() {
    return languages.map((lng) => ({ lng }));
}

export const metadata: Metadata = {
    title: {
        template: "%s – MindVista",
        default: "MindVista – Your wellness journey starts here.",
    },
    description: "Discover MindVista - a transformative initiative enhancing student wellness at McGill University. Access mental health resources, on-campus club directories, weekly wellness newsletters, and engaging events designed to support your well-being. Explore holistic solutions for a thriving student life.",
};

export default async function AppLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lng: Language }> }) {
    const lng = (await params).lng;

    // CHANGES MADE TO THIS COMPONENT MUST BE MIRRORED IN src/app/not-found.tsx.
    // See CONTRIBUTING.md#note-about-not-foundtsx
    return (
        <html lang={lng} dir={dir(lng)} suppressHydrationWarning>
            <head>
                <meta name="apple-mobile-web-app-title" content="MindVista" />
                {/* social media stuff here */}
                <script
                    // this script exists to solve the classic FOUC problem; a better solution can surely be found.
                    // suppressHydrationWarning is used as part of this solution
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                function getInitialTheme() {
                                    const storedTheme = localStorage.getItem('theme');
                                    if (storedTheme) return storedTheme;
                                    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                                }
                                const theme = getInitialTheme();
                                document.documentElement.classList.add(theme);
                            })();
                        `,
                    }}
                />
                {/* google site name: https://developers.google.com/search/docs/appearance/site-names */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "WebSite",
                            name: "MindVista",
                            url: "https://mindvista.ca/",
                        }),
                    }}
                />
            </head>
            <body className="min-h-screen bg-cBackground text-cText antialiased">
                <NextTopLoader showSpinner={false} />
                {children}
                <SpeedInsights />
                <Analytics />
            </body>
        </html>
    );
}
