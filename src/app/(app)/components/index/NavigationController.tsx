"use client";

import { useEffect, useState } from "react";
import NavBar from "../navbar/NavBar";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import Link from "next/link";
import Image from "next/image";

interface NavigationControllerProps {
    hasAnnouncement?: boolean;
}

export default function NavigationController({ hasAnnouncement = false }: NavigationControllerProps) {
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
                <LandingNavBarDesktop hasAnnouncement />
            </div>
            <div className={`absolute left-0 top-0 w-full transform transition-all duration-300 ${showMainNav ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-[-100%] opacity-0"}`}>
                <NavBar />
            </div>
        </div>
    );
}

import { FaInstagram, FaTiktok } from "react-icons/fa";
import { SocialMediaLink } from "../SocialMediaLink";

function LandingNavBarDesktop({ hasAnnouncement }: { hasAnnouncement?: boolean }) {
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
            <div className={`fixed z-20 flex w-full flex-row items-center px-20 text-cAccent xl:px-28 2xl:px-32 dark:text-cSoftWhite ${hasAnnouncement ? "pb-10 pt-16 xl:pb-12 xl:pt-20 2xl:pb-14 2xl:pt-24" : "py-10 xl:py-12 2xl:py-14"}`}>
                <nav className="flex w-2/5 flex-row gap-10 text-lg font-semibold xl:gap-12 2xl:gap-16">
                    <div className="flex items-center gap-8">
                        {socialLinks.map((link) => (
                            <SocialMediaLink key={link.label} href={link.href} icon={link.icon} label={link.label} className="text-cAccent transition-transform duration-200 hover:scale-110 dark:text-white" size="1.5rem" />
                        ))}
                    </div>
                    <Link href="/" className="transition-transform duration-200 hover:scale-110">
                        Home
                    </Link>
                    <Link href="/about" className="transition-transform duration-200 hover:scale-110">
                        About
                    </Link>
                </nav>

                <div className="flex w-1/5 justify-center">
                    <Link href="/">
                        <Image width={164} height={164} className="h-16 w-16 rounded-full border-4 border-black bg-black transition-transform duration-200 hover:scale-110 dark:border-0 dark:bg-transparent" src="/logoWhite.png" alt="MindVista Logo" />
                    </Link>
                </div>

                <nav className="flex w-2/5 flex-row justify-end gap-10 text-lg font-semibold xl:gap-14 2xl:gap-20">
                    <Link href="/directory" className="transition-transform duration-200 hover:scale-110">
                        Directory
                    </Link>
                    <Link href="/events" className="transition-transform duration-200 hover:scale-110">
                        Events
                    </Link>
                    <ThemeSwitcher />
                </nav>
            </div>
        </header>
    );
}
