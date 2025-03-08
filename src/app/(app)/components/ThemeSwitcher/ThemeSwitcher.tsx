"use client";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";
export const COOLDOWN_DURATION = 750; // in ms

function getSystemPreference(): Theme {
    if (typeof window === "undefined") return "dark";

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
        return "light";
    }

    return "dark"; // default fallback
}

function getThemePreference(): Theme {
    if (typeof window === "undefined") return "dark";

    // first check localStorage
    const storedTheme = localStorage.getItem("theme") as Theme;
    if (storedTheme) return storedTheme;

    // if preference undefined in localStorage, use system preference
    return getSystemPreference();
}

export default function ThemeSwitcher() {
    const [theme, setTheme] = useState<Theme>(getThemePreference);
    const [isInCooldown, setIsInCooldown] = useState(false);

    // apply theme to document
    useEffect(() => {
        const element = document.documentElement;
        if (theme === "light") {
            element.classList.remove("dark");
            element.classList.add("light");
        } else {
            element.classList.remove("light");
            element.classList.add("dark");
        }
    }, [theme]);

    // listen for system preference changes
    useEffect(() => {
        // only sync with system preferences if user hasn't explicitly set a preference
        if (typeof window !== "undefined" && !localStorage.getItem("theme")) {
            const updateThemeFromSystem = () => {
                setTheme(getSystemPreference());
            };

            const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
            const lightModeMediaQuery = window.matchMedia("(prefers-color-scheme: light)");
            darkModeMediaQuery.addEventListener("change", updateThemeFromSystem);
            lightModeMediaQuery.addEventListener("change", updateThemeFromSystem);

            return () => {
                darkModeMediaQuery.removeEventListener("change", updateThemeFromSystem);
                lightModeMediaQuery.removeEventListener("change", updateThemeFromSystem);
            };
        }
    }, []);

    const handleToggleClick = () => {
        if (isInCooldown) return;

        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);

        // save preference to localStorage
        if (typeof window !== "undefined") {
            localStorage.setItem("theme", newTheme);
        }

        setIsInCooldown(true);
        setTimeout(() => setIsInCooldown(false), COOLDOWN_DURATION);
    };

    return (
        <button id="themeToggle" data-testid="themeToggle" className={`border-0 bg-none transition-opacity duration-200 ${isInCooldown ? "cursor-not-allowed opacity-50" : "opacity-100"}`} onClick={handleToggleClick} disabled={isInCooldown} aria-label="Toggle site to light or dark mode.">
            <svg width="1.5rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path className="fill-transparent dark:fill-cText" fillRule="evenodd" d="M12 17.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zm0 1.5a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm12-7a.8.8 0 0 1-.8.8h-2.4a.8.8 0 0 1 0-1.6h2.4a.8.8 0 0 1 .8.8zM4 12a.8.8 0 0 1-.8.8H.8a.8.8 0 0 1 0-1.6h2.5a.8.8 0 0 1 .8.8zm16.5-8.5a.8.8 0 0 1 0 1l-1.8 1.8a.8.8 0 0 1-1-1l1.7-1.8a.8.8 0 0 1 1 0zM6.3 17.7a.8.8 0 0 1 0 1l-1.7 1.8a.8.8 0 1 1-1-1l1.7-1.8a.8.8 0 0 1 1 0zM12 0a.8.8 0 0 1 .8.8v2.5a.8.8 0 0 1-1.6 0V.8A.8.8 0 0 1 12 0zm0 20a.8.8 0 0 1 .8.8v2.4a.8.8 0 0 1-1.6 0v-2.4a.8.8 0 0 1 .8-.8zM3.5 3.5a.8.8 0 0 1 1 0l1.8 1.8a.8.8 0 1 1-1 1L3.5 4.6a.8.8 0 0 1 0-1zm14.2 14.2a.8.8 0 0 1 1 0l1.8 1.7a.8.8 0 0 1-1 1l-1.8-1.7a.8.8 0 0 1 0-1z" />
                <path className="fill-mindvista-800 dark:fill-transparent" fillRule="evenodd" d="M16.5 6A10.5 10.5 0 0 1 4.7 16.4 8.5 8.5 0 1 0 16.4 4.7l.1 1.3zm-1.7-2a9 9 0 0 1 .2 2 9 9 0 0 1-11 8.8 9.4 9.4 0 0 1-.8-.3c-.4 0-.8.3-.7.7a10 10 0 0 0 .3.8 10 10 0 0 0 9.2 6 10 10 0 0 0 4-19.2 9.7 9.7 0 0 0-.9-.3c-.3-.1-.7.3-.6.7a9 9 0 0 1 .3.8z" />
            </svg>
        </button>
    );
}
