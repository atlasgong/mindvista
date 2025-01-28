"use client";

import React, { useState, useEffect } from "react";
import EmergencyButton from "./EmergencyButton";
import ThemeIcon from "./ThemeIcon";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa";
import { SocialMediaLink } from "./SocialMediaLink";

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
                    <ThemeIcon />
                    <div className="flex items-center gap-5">
                        {socialLinks.map((link) => (
                            <SocialMediaLink key={link.label} href={link.href} icon={link.icon} label={link.label} className="text-cAccent dark:text-white" size="1.5rem" />
                        ))}
                    </div>
                </div>
                {/* DESKTOP END */}

                {/* MOBILE */}
                <div className="lg:hidden">
                    <Hamburger nav={nav} setNav={setNav} />
                    <HamburgerStyle />
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
        <button className={`${nav ? "is-active" : ""} hamburger hamburger--emphatic`} type="button" aria-label="Toggle Navigation Menu" onClick={() => setNav(!nav)}>
            <span className="hamburger-box">
                <span className="hamburger-inner"></span>
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
            <ThemeIcon />
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
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/holistic-wellness">
                <span className="flex gap-1 max-lg:flex-col max-lg:leading-9">
                    <span>Holistic</span>
                    <span>Wellness</span>
                </span>
            </Link>
            <Link href="/directory">Directory</Link>
            <Link href="/events">Events</Link>
        </nav>
    );
}

function LogoButton() {
    return (
        <Link href="/" className="flex flex-row gap-2 text-left text-cAccent">
            <Image width={164} height={164} className="max-w-12 rounded-full border-4 border-cAccent bg-cAccent dark:border-0 dark:bg-transparent" src="/logoWhite.png" alt="MindVista Logo" priority />

            <div className="flex flex-col max-lg:hidden dark:text-white">
                <h1 className="text-lg font-bold">MINDVISTA</h1>
                <p className="-mt-1 text-[0.6rem] font-bold leading-[0.5rem]">Your wellness journey starts here.</p>
            </div>
        </Link>
    );
}

function HamburgerStyle() {
    return (
        <style>
            {`
                    /*!
                     * Hamburgers
                     * @description Tasty CSS-animated hamburgers
                     * @author Jonathan Suh @jonsuh
                     * @site https://jonsuh.com/hamburgers
                     * @link https://github.com/jonsuh/hamburgers
                     * 
                     * This file has been edited and customized
                     * for MindVista, and therefore
                     * differs from the source files above.
                     */

                    .hamburger {
                        padding: 15px 15px;
                        display: inline-block;
                        cursor: pointer;
                        transition-property: opacity, filter;
                        transition-duration: 0.15s;
                        transition-timing-function: linear;
                        font: inherit;
                        color: inherit;
                        text-transform: none;
                        background-color: transparent;
                        border: 0;
                        margin: 0;
                        overflow: visible;
                    }

                    .hamburger:hover {
                        opacity: 0.7;
                    }

                    .hamburger.is-active:hover {
                        opacity: 0.7;
                    }

                    .hamburger.is-active .hamburger-inner,
                    .hamburger.is-active .hamburger-inner::before,
                    .hamburger.is-active .hamburger-inner::after {
                        background-color: var(--accent); /* active color */
                    }

                    .hamburger-box {
                        width: 40px;
                        height: 24px;
                        display: inline-block;
                        position: relative;
                    }

                    .hamburger-inner {
                        display: block;
                        top: 50%;
                        margin-top: -2px;
                    }

                    .hamburger-inner,
                    .hamburger-inner::before,
                    .hamburger-inner::after {
                        width: 40px;
                        height: 4px;
                        background-color: var(--accent); /* inactive color */
                        border-radius: 4px;
                        position: absolute;
                        transition-property: transform;
                        transition-duration: 0.15s;
                        transition-timing-function: ease;
                    }

                    .hamburger-inner::before,
                    .hamburger-inner::after {
                        content: "";
                        display: block;
                    }

                    .hamburger-inner::before {
                        top: -10px;
                    }

                    .hamburger-inner::after {
                        bottom: -10px;
                    }

                    /* Emphatic */
                    .hamburger--emphatic {
                        overflow: hidden;
                    }

                    .hamburger--emphatic .hamburger-inner {
                        transition: background-color 0.125s 0.175s ease-in;
                    }

                    .hamburger--emphatic .hamburger-inner::before {
                        left: 0;
                        transition:
                            transform 0.125s cubic-bezier(0.6, 0.04, 0.98, 0.335),
                            top 0.05s 0.125s linear,
                            left 0.125s 0.175s ease-in;
                    }

                    .hamburger--emphatic .hamburger-inner::after {
                        top: 10px;
                        right: 0;
                        transition:
                            transform 0.125s cubic-bezier(0.6, 0.04, 0.98, 0.335),
                            top 0.05s 0.125s linear,
                            right 0.125s 0.175s ease-in;
                    }

                    .hamburger--emphatic.is-active .hamburger-inner {
                        transition-delay: 0s;
                        transition-timing-function: ease-out;
                        background-color: transparent !important;
                    }

                    .hamburger--emphatic.is-active .hamburger-inner::before {
                        left: -80px;
                        top: -80px;
                        transform: translate3d(80px, 80px, 0) rotate(45deg);
                        transition:
                            left 0.125s ease-out,
                            top 0.05s 0.125s linear,
                            transform 0.125s 0.175s cubic-bezier(0.075, 0.82, 0.165, 1);
                    }

                    .hamburger--emphatic.is-active .hamburger-inner::after {
                        right: -80px;
                        top: -80px;
                        transform: translate3d(-80px, 80px, 0) rotate(-45deg);
                        transition:
                            right 0.125s ease-out,
                            top 0.05s 0.125s linear,
                            transform 0.125s 0.175s cubic-bezier(0.075, 0.82, 0.165, 1);
                    }
                `}
        </style>
    );
}
