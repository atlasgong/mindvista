"use client";

import { Language } from "@i18n/settings";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LanguageSwitcher({ lng }: { lng: Language }) {
    const pathname = usePathname();

    // replaces the current locale with the target locale in the pathname
    const getLocalizedPath = (locale: string) => {
        const segments = pathname.split("/");
        segments[1] = locale; // assuming the locale is the first path segment
        return segments.join("/");
    };

    const targetLocale = lng === "en" ? "fr" : "en";
    const buttonLabel = lng === "en" ? "Fr" : "En";
    const ariaLabel = `${lng === "en" ? "Français" : "English"}`;

    return (
        <Link href={getLocalizedPath(targetLocale)} className="block w-4 self-center text-center font-bold text-cText transition-colors" aria-label={ariaLabel}>
            {buttonLabel}
        </Link>
    );
}
