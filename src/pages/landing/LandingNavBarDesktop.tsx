import ThemeIcon from "@components/buttons/ThemeIcon";

import "@styles/hamburgers.css";

export default function LandingNavBarDesktop() {
    return (
        <header>
            <div className="fixed z-20 flex w-full flex-row items-center px-20 py-10">
                <nav className="flex w-2/5 flex-row gap-16 text-lg font-semibold">
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                </nav>

                <div className="flex w-1/5 justify-center">
                    <LogoButton />
                </div>

                <nav className="flex w-2/5 flex-row justify-end gap-16 text-lg font-semibold">
                    <a href="/directory">Directory</a>
                    <a href="/contact">Contact</a>
                    <ThemeIcon />
                </nav>
            </div>
        </header>
    );
}

function LogoButton() {
    const redirectToHomepage = () => {
        window.location.href = "/";
    };

    return (
        <button onClick={redirectToHomepage}>
            <img className="h-16 w-16 rounded-full border-4 border-slate-600 bg-slate-600 dark:border-0 dark:bg-transparent" src="/logo.png" alt="MindVista Logo" />
        </button>
    );
}
