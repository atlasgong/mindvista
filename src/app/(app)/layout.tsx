import { Analytics } from "@vercel/analytics/react";
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <meta charSet="utf-8" />
                <meta name="apple-mobile-web-app-title" content="MindVista" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                {/* social media here */}
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
            </body>

            {/* https://vercel.com/docs/analytics/quickstart#add-the-analytics-component-to-your-app */}
            <Analytics />
        </html>
    );
}
