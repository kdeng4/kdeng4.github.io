import type { APIRoute } from "astro";
import { getSite } from "../lib/content";

export const GET: APIRoute = async () => {
  const site = await getSite();
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL("/sitemap-index.xml", site.url)}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
