import type { APIRoute } from "astro";
import { joinBase } from "../lib/alternates.mjs";

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const origin = site?.origin ?? "https://mtaqys.github.io";
  const sitemap = new URL(joinBase(import.meta.env.BASE_URL || "/", "/sitemap-index.xml"), origin).href;
  return new Response(`User-agent: *\nAllow: /\nSitemap: ${sitemap}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
