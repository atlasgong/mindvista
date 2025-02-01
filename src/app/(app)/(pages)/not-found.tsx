import Link from "next/link";

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

export default function NotFound() {
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    return (
        <>
            <div className="mb-[16vmin] mt-[5vh] flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
                <h1 className="bg-gradient-to-r from-cAccent to-cLightBlue bg-clip-text text-[20vmax] font-bold text-transparent dark:to-cText">404</h1>
                <p className="mb-3 text-xl font-semibold text-cText">{randomMessage.main}</p>
                <p className="mb-8 text-lg font-medium text-cTextOffset">{randomMessage.sub}</p>
                <Link href="/" className="inline-block rounded-lg bg-gradient-to-r from-cAccent to-cLightBlue px-6 py-3 font-medium text-cBackground transition-opacity hover:opacity-90 dark:to-cText">
                    Go Home
                </Link>
            </div>
        </>
    );
}
