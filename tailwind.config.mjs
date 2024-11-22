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
                cAccent: "var(--accent)",
                cText: "var(--text)",
                cTextOffset: "var(--text-offset)",
                cRed: "var(--red)",
                cBorder: "var(--border)",
                cSoftWhite: "var(--soft-white)",
            },
        },
    },
    plugins: [],
};
