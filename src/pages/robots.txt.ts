import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  if (!site) {
    return new Response("Missing site URL", { status: 500 });
  }

  const sitemap = new URL("/sitemap.xml", site).href;
  const body = `User-agent: *
Allow: /

Sitemap: ${sitemap}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
