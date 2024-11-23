import React, { useState } from "react";
import EmergencyButton from "@components/EmergencyButton";
import ThemeIcon from "@components/ThemeIcon";

import "@styles/hamburgers.css";

export default function NavBar() {
    const [nav, setNav] = useState(false);

    return (
        <header>
            <div className="fixed z-20 top-0 left-0 flex w-full flex-row justify-between px-6 py-2 shadow-cBackgroundOffset drop-shadow-sm backdrop-blur-2xl">
                <div className="basis-0">
                    <LogoButton />
                </div>

                <div className="content-center max-lg:hidden">
                    <NavLinks flexDirection="row" className="gap-6" />
                </div>

                <div className="flex flex-row gap-5 max-lg:hidden">
                    <EmergencyButton />
                    <ThemeIcon />
                </div>

                <div className="lg:hidden">
                    <Hamburger nav={nav} setNav={setNav} />
                </div>
            </div>

            <NavMenu nav={nav} />
        </header>
    );
}

interface HamburgerProps {
    nav: boolean;
    setNav: React.Dispatch<React.SetStateAction<boolean>>;
}
function Hamburger({ nav, setNav }: HamburgerProps) {
    return (
        <button
            className={`${nav ? "is-active" : ""} hamburger hamburger--emphatic`}
            type="button"
            aria-label="Toggle Navigation Menu"
            onClick={() => setNav(!nav)}
        >
            <span className="hamburger-box">
                <span className="hamburger-inner"></span>
            </span>
        </button>
    );
};

interface NavMenuProps {
    nav: boolean;
}
function NavMenu({ nav }: NavMenuProps) {
    return (
        <div
            className={`navMenu fixed left-0 top-0 z-10 h-full w-full bg-cBackground transition-transform duration-300 ${
                nav ? "translate-x-0" : "translate-x-full"
            } pointer-events-auto flex flex-col items-center justify-center gap-4`}
        >
            <ThemeIcon />
            <NavLinks flexDirection="col" className="gap-2 text-center text-5xl" />
            <EmergencyButton className="mt-2" />
        </div>
    );
};

interface NavLinksProps {
    flexDirection: "row" | "col";
    className?: string;
}
function NavLinks(props: NavLinksProps) {
    return (
        <nav className={`${props.className} flex flex-${props.flexDirection} font-semibold`}>
            <a href="/">Home</a>
            <a href="/">About</a>
            <a href="/">Resources</a>
            <a href="/">Contact</a>
        </nav>
    );
}

function LogoButton() {
    const redirectToHomepage = () => {
        window.location.href = "/";
    };

    return (
        <button className="flex flex-row gap-2 text-left text-cAccent" onClick={redirectToHomepage}>
            <img
                className="max-w-12 rounded-full border-4 border-cAccent bg-cAccent dark:border-0 dark:bg-transparent"
                src="/logo.png"
                alt="MindVista Logo"
                width="164"
                height="164"
            />
            <div className="flex flex-col max-lg:hidden">
                <h1 className="text-lg font-bold">MINDVISTA</h1>
                <p className="-mt-1 text-[0.6rem] font-bold leading-[0.5rem]">Your wellness journey starts here.</p>
            </div>
        </button>
    );
}
