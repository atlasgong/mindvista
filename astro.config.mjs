// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

import icon from "astro-icon";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
    output: "server",
    site: "https://mindvista.ca",
    integrations: [tailwind(), react(), icon()],
    adapter: vercel(),
});
