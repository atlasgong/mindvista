/** @type {import('tailwindcss').Config} */

const { fontFamily } = require("tailwindcss/defaultTheme");

// https://tailwindcss.com/docs/configuration

export default {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    darkMode: "selector",
    theme: {
        fontFamily: {
            sans: ["Inter Variable", ...fontFamily.sans],
            serif: ["Libre Baskerville", "Baskerville", ...fontFamily.serif],
        },
        extend: {
            colors: {
                cBackground: "var(--background)",
                cBackgroundOffset: "var(--background-offset)",
                cBackgroundOffsetAccent: "var(--background-offset-accent)",
                cAccent: "var(--accent)",
                cText: "var(--text)",
                cTextOffset: "var(--text-offset)",
                cRed: "var(--red)",
                cBorder: "var(--border)",
                cSoftWhite: "var(--soft-white)",
                cNavyBlue: "var(--navy-blue)",
                cLightBlue: "var(--light-blue)",
                cPurple: "var(--purple)",
                mindvista: {
                    1000: "#0c0a33",
                    950: "#181553",
                    800: "#392fad",
                    700: "#516de4",
                    400: "#96baff",
                    50: "#f8f8ff",
                },
            },
            // for crisis page ------
            keyframes: {
                "emergency-pulse": {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0.9" },
                },
            },
            animation: {
                "emergency-pulse": "emergency-pulse 2s ease-in-out infinite",
            },
            // -----------------------
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
