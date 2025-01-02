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

const randomMessage = messages[Math.floor(Math.random() * messages.length)];

export default function Custom404() {
    return (
        <div className="mb-[16vmin] flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
            <h1 className="from-cAccent to-cLightBlue dark:to-cText bg-gradient-to-r bg-clip-text text-[20vmax] font-bold text-transparent">404</h1>
            <p className="text-cText mb-3 text-xl font-semibold">{randomMessage.main}</p>
            <p className="text-cTextOffset mb-8 text-lg font-medium">{randomMessage.sub}</p>
            <Link href="/" className="text-cBackground from-cAccent to-cLightBlue dark:to-cText inline-block rounded-lg bg-gradient-to-r px-6 py-3 font-medium transition-opacity hover:opacity-90">
                Go Home
            </Link>
        </div>
    );
}
