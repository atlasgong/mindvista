"use client";

import React, { useState, useEffect } from "react";
import styles from "./hamburger.module.css";
import EmergencyButton from "../EmergencyButton";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa";
import { SocialMediaLink } from "../SocialMediaLink";

export default function NavBar() {
    const [nav, setNav] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setNav(false);
    }, [pathname]);

    const socialLinks = [
        {
            href: "https://instagram.com/mindvista.mcgill/",
            icon: FaInstagram,
            label: "Instagram",
        },
        {
            href: "https://tiktok.com/@mindvistamcgill",
            icon: FaTiktok,
            label: "TikTok",
        },
    ];

    return (
        <header>
            <div className="fixed left-0 top-0 z-20 flex w-full flex-row items-center justify-between px-6 py-2 drop-shadow-sm backdrop-blur-2xl md:py-4 dark:border-b dark:border-cBackgroundOffset">
                <div className="basis-0">
                    <LogoButton />
                </div>

                {/* DESKTOP */}
                <div className="text-lg max-lg:hidden">
                    <NavLinks flexDirection="row" className="gap-6" />
                </div>

                <div className="flex flex-row gap-5 max-lg:hidden">
                    <EmergencyButton />
                    <ThemeSwitcher />
                    <div className="flex items-center gap-5">
                        {socialLinks.map((link) => (
                            <SocialMediaLink key={link.label} href={link.href} icon={link.icon} label={link.label} className="text-cAccent transition-transform hover:scale-110 dark:text-white" size="1.5rem" />
                        ))}
                    </div>
                </div>
                {/* DESKTOP END */}

                {/* MOBILE */}
                <div className="lg:hidden">
                    <Hamburger nav={nav} setNav={setNav} />
                </div>
                {/* MOBILE END */}
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
        <button className={`${nav ? styles["is-active"] : ""} ${styles.hamburger} ${styles["hamburger--spin"]}`} type="button" aria-label="Toggle Navigation Menu" aria-controls="navigation" onClick={() => setNav(!nav)}>
            <span className={styles["hamburger-box"]}>
                <span className={styles["hamburger-inner"]}></span>
            </span>
        </button>
    );
}

interface NavMenuProps {
    nav: boolean;
}
function NavMenu({ nav }: NavMenuProps) {
    const socialLinks = [
        {
            href: "https://facebook.com/mindvista.mcgill",
            icon: FaFacebook,
            label: "Facebook",
        },
        {
            href: "https://instagram.com/mindvista.mcgill/",
            icon: FaInstagram,
            label: "Instagram",
        },
        {
            href: "https://tiktok.com/@mindvistamcgill",
            icon: FaTiktok,
            label: "TikTok",
        },
        {
            href: "https://linkedin.com/company/mindvista/",
            icon: FaLinkedin,
            label: "LinkedIn",
        },
        {
            href: "https://github.com/atlasgong/mindvista",
            icon: FaGithub,
            label: "GitHub",
        },
    ];

    return (
        <div className={`navMenu fixed left-0 top-0 z-10 h-full w-full bg-cBackground transition-transform duration-300 ${nav ? "translate-x-0" : "translate-x-full"} pointer-events-auto flex flex-col items-center justify-center gap-4`}>
            <ThemeSwitcher />
            <NavLinks flexDirection="col" className="gap-2 text-center text-5xl" />
            <EmergencyButton className="mt-2" />
            <div className="mt-3 flex items-center gap-5">
                {socialLinks.map((link) => (
                    <SocialMediaLink key={link.label} href={link.href} icon={link.icon} label={link.label} className="text-cAccent dark:text-white" size="1.5rem" />
                ))}
            </div>
        </div>
    );
}

interface NavLinksProps {
    flexDirection: "row" | "col";
    className?: string;
}
function NavLinks(props: NavLinksProps) {
    return (
        <nav className={`${props.className} flex flex-${props.flexDirection} font-semibold text-cAccent dark:text-cSoftWhite`}>
            <Link href="/" className="inline-block transition-transform hover:scale-110">
                Home
            </Link>
            <Link href="/about" className="inline-block transition-transform hover:scale-110">
                About
            </Link>
            <Link href="/holistic-wellness" className="inline-block transition-transform hover:scale-110">
                <span className="flex gap-1 max-lg:flex-col max-lg:leading-9">
                    <span>Holistic</span>
                    <span>Wellness</span>
                </span>
            </Link>
            <Link href="/directory" className="inline-block transition-transform hover:scale-110">
                Directory
            </Link>
            <Link href="/events" className="inline-block transition-transform hover:scale-110">
                Events
            </Link>
        </nav>
    );
}

function LogoButton() {
    return (
        <Link href="/" className="flex flex-row gap-2 text-left text-cAccent transition-transform hover:scale-110">
            <Image width={164} height={164} className="max-w-12 rounded-full border-4 border-cAccent bg-cAccent dark:border-0 dark:bg-transparent" src="/logoWhite.png" alt="MindVista Logo" priority />

            <div className="flex flex-col max-lg:hidden dark:text-white">
                <h1 className="text-lg font-bold">MINDVISTA</h1>
                <p className="-mt-1 text-[0.6rem] font-bold leading-[0.5rem]">Your wellness journey starts here.</p>
            </div>
        </Link>
    );
}
