/** @type {import('tailwindcss').Config} */

const { fontFamily } = require("tailwindcss/defaultTheme");

export default {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    darkMode: "selector",
    theme: {
        fontFamily: {
            sans: ["Inter Variable", ...fontFamily.sans],
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
            },
            typography: {
                DEFAULT: { // affects prose components
                    css: {
                        color: "var(--text)",
                        '*': { color: 'inherit' },
                    }
                }
            }
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
};
