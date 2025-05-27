import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import NextTopLoader from "nextjs-toploader";
import { Metadata } from "next";
import "src/global.css";

export const metadata: Metadata = {
    title: {
        template: "%s – MindVista",
        default: "MindVista – Your wellness journey starts here.",
    },
    description: "Discover MindVista - a transformative initiative enhancing student wellness at McGill University. Access mental health resources, on-campus club directories, weekly wellness newsletters, and engaging events designed to support your well-being. Explore holistic solutions for a thriving student life.",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
    // CHANGES MADE TO THIS COMPONENT MUST BE MIRRORED IN src/app/not-found.tsx.
    // See https://github.com/MindVista/website/wiki/Miscellaneous#404-page-handling
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <meta name="apple-mobile-web-app-title" content="MindVista" />
                {/* TODO: social media stuff here */}
                <script
                    // this script exists to solve the classic FOUC problem for theme switching
                    // a better solution can surely be found
                    // suppressHydrationWarning is used as part of this solution
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                function getInitialTheme() {
                                    // first check local storage for if user has explicitly set a preference
                                    const storedTheme = localStorage.getItem('theme');
                                    if (storedTheme) return storedTheme;
                                    // if not in localStorage, default to system preferences
                                    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                                        return 'dark';
                                    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
                                        return 'light';
                                    } else {
                                        return 'dark'; // default fallback
                                    }
                                }   
                                const theme = getInitialTheme();
                                // remove any existing theme classes and add the expected one
                                document.documentElement.classList.remove('light', 'dark');
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

                {/* https://vercel.com/docs/speed-insights/quickstart */}
                {/* https://vercel.com/docs/analytics/quickstart */}
                <SpeedInsights />
                <Analytics />
            </body>
        </html>
    );
}
