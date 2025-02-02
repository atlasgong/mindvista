import Link from "next/link";

import "../global.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import NextTopLoader from "nextjs-toploader";
import NavBar from "./(app)/components/NavBar";
import Footer from "./(app)/components/Footer";

const messages = [
    {
        main: "Sometimes we lose our way, and that's okay.",
        sub: "Take a deep breath and let's find our path together.",
    },
    {
        main: "Just like our thoughts, sometimes pages wander off.",
        sub: "Take this moment to pause, breathe, and return to your center.",
    },
    {
        main: "This path may be lost, but you are not.",
        sub: "Every detour is an opportunity for a new perspective.",
    },
    {
        main: "Sometimes the best discoveries come from getting lost.",
        sub: "Take a deep breath and explore a different direction.",
    },
    {
        main: "Like meditation, not every path leads where we expect.",
        sub: "Let's mindfully find our way back together.",
    },
    {
        main: "Even the most traveled paths have their dead ends.",
        sub: "Use this pause to check in with yourself.",
    },
];

// This is the "acting" "default" component for the NotFound page.
// It may be freely edited as if it were any other component.
// See CONTRIBUTING.md#note-about-not-foundtsx for more details.
function NotFoundComponent() {
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    return (
        <div className="mb-[16vmin] mt-[5vh] flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
            <h1 className="bg-gradient-to-r from-cAccent to-cLightBlue bg-clip-text text-[20vmax] font-bold text-transparent dark:to-cText">404</h1>
            <p className="mb-3 text-xl font-semibold text-cText">{randomMessage.main}</p>
            <p className="mb-8 text-lg font-medium text-cTextOffset">{randomMessage.sub}</p>
            <Link href="/" className="inline-block rounded-lg bg-gradient-to-r from-cAccent to-cLightBlue px-6 py-3 font-medium text-cBackground transition-opacity hover:opacity-90 dark:to-cText">
                Go Home
            </Link>
        </div>
    );
}

export default function NotFound() {
    // CHANGES MUST ONLY BE MADE BELOW IF MIRRORED FROM ONE OF:
    // - src/app/(app)/(pages)/layout.tsx or
    // - src/app/(app)/layout.tsx
    // See CONTRIBUTING.md#note-about-not-foundtsx
    return (
        // APP LAYOUT START
        <html lang="en" suppressHydrationWarning>
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

                {/* APP LAYOUT CHILDREN START */}
                {/* PAGES LAYOUT START */}
                <NavBar />

                <main className="pt-[10vh]">
                    {/* PAGES LAYOUT CHILDREN START */}
                    <NotFoundComponent />
                    {/* PAGES LAYOUT CHILDREN END */}
                </main>

                <Footer />
                {/* PAGES LAYOUT END */}
                {/* APP LAYOUT CHILDREN END  */}

                {/* https://vercel.com/docs/speed-insights/quickstart */}
                {/* https://vercel.com/docs/analytics/quickstart */}
                <SpeedInsights />
                <Analytics />
            </body>
        </html>
        // APP LAYOUT END
    );
}
