import { defineConfig } from "astro/config";

const site = (process.env.SITE_URL || "https://mtaqys.github.io").replace(/\/$/, "");

export default defineConfig({
  site,
  trailingSlash: "always",
  build: {
    format: "directory",
    inlineStylesheets: "never",
  },
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
});
