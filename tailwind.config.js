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
            keyframes: {
                // crisis page
                "emergency-pulse": {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0.9" },
                },
                // wellness wheel
                "gentle-pulse": {
                    "0%": { transform: "scale(1)" },
                    "50%": { transform: "scale(1.05)" },
                    "100%": { transform: "scale(1)" },
                },
                // ongoing badge
                "badge-shine": {
                    "0%, 100%": {
                        backgroundColor: "#22c55e",
                        boxShadow: "0 0 1px #22c55e",
                        transform: "scale(1)",
                    },
                    "50%": {
                        backgroundColor: "#1CCA5B",
                        boxShadow: "0 0 3px #1CCA5B",
                        transform: "scale(1.05)",
                    },
                },
                "badge-shine-dark": {
                    "0%, 100%": {
                        backgroundColor: "#23E169",
                        boxShadow: "0 0 1px #23E169",
                        transform: "scale(1)",
                    },
                    "50%": {
                        backgroundColor: "#1BC559",
                        boxShadow: "0 0 3px #1BC559",
                        transform: "scale(1.05)",
                    },
                },
                // ongoing event card border
                "ongoing-border": {
                    "0%, 100%": {
                        borderColor: "#392fad",
                    },
                    "50%": {
                        borderColor: "#96baff",
                    },
                },
            },
            animation: {
                "emergency-pulse": "emergency-pulse 2s ease-in-out infinite", // crisis-page
                "gentle-pulse": "gentle-pulse 1.5s ease-in-out infinite", // wellness wheel
                "badge-shine": "badge-shine 2s ease-in-out infinite", // ongoing badge
                "ongoing-border": "ongoing-border 3s ease-in-out infinite", // ongoing event card border
            },
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        function ({ addVariant }) {
            addVariant("fr", "&:lang(fr)");
        },
    ],
};
