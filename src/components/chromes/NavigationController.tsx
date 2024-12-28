import { useEffect, useState } from "react";
import NavBar from "@components/chromes/NavBar";
import ThemeIcon from "@components/buttons/ThemeIcon";
import "@styles/hamburgers.css";

export default function NavigationController() {
    const [showMainNav, setShowMainNav] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const viewportHeight = window.innerHeight;
            // check if we've scrolled past 90% of the first section
            const threshold = viewportHeight * 0.9;

            if (window.scrollY > threshold) {
                setShowMainNav(true);
            } else {
                setShowMainNav(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="fixed left-0 top-0 z-20 w-full">
            <div className={`absolute left-0 top-0 w-full transform transition-all duration-300 ${showMainNav ? "pointer-events-none -translate-y-full opacity-0" : "pointer-events-auto translate-y-0 opacity-100"}`}>
                <LandingNavBarDesktop />
            </div>
            <div className={`absolute left-0 top-0 w-full transform transition-all duration-300 ${showMainNav ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-[-100%] opacity-0"}`}>
                <NavBar />
            </div>
        </div>
    );
}

function LandingNavBarDesktop() {
    return (
        <header>
            <div className="fixed z-20 flex w-full flex-row items-center px-20 py-10 xl:px-28 xl:py-12 2xl:px-32 2xl:py-14">
                <nav className="flex w-2/5 flex-row gap-10 text-lg font-semibold xl:gap-12 2xl:gap-16">
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                </nav>

                <div className="flex w-1/5 justify-center">
                    <LogoButton />
                </div>

                <nav className="flex w-2/5 flex-row justify-end gap-10 text-lg font-semibold xl:gap-14 2xl:gap-20">
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
