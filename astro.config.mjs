import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { joinBase, matchAlternate } from "./src/lib/alternates.mjs";

const site = process.env.SITE_URL || "https://mtaqys.github.io";

function normalizeBase(value) {
  if (!value || value === "/") return "/";
  const withSlash = value.startsWith("/") ? value : `/${value}`;
  return withSlash.endsWith("/") ? withSlash : `${withSlash}/`;
}

const base = normalizeBase(process.env.BASE_PATH ?? "/");

export default defineConfig({
  site,
  base,
  trailingSlash: "always",
  i18n: {
    defaultLocale: "fr",
    locales: ["fr", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/404") && !page.endsWith(".txt"),
      serialize(item) {
        const url = new URL(item.url);
        const pair = matchAlternate(url.pathname, base);
        if (!pair) return item;
        const abs = (path) => new URL(joinBase(base, path), url.origin).href;
        return {
          ...item,
          links: [
            { lang: "fr", url: abs(pair.fr) },
            { lang: "en", url: abs(pair.en) },
            { lang: "x-default", url: abs(pair.fr) },
          ],
        };
      },
    }),
  ],
});
