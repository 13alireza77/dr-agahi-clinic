import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import site from "./src/data/site.json" with { type: "json" };

// SITE_URL / BASE_PATH are set by the GitHub Pages workflow; locally the site is served from "/".
export default defineConfig({
  site: process.env.SITE_URL || site.url,
  base: process.env.BASE_PATH || "/",
  trailingSlash: "always",
  integrations: [sitemap({ filter: (page) => !page.includes("/404") })],
  build: { inlineStylesheets: "auto" },
  devToolbar: { enabled: false },
});
