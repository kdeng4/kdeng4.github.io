import { readFileSync } from "node:fs";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { parse } from "yaml";

const { main: site } = parse(readFileSync("content/site.yaml", "utf8")) as { main: { url: string } };

export default defineConfig({
  site: site.url,
  output: "static",
  trailingSlash: "always",
  integrations: [sitemap()],
  redirects: {
    "/publications/": "/research/",
    "/projects/Master to PhD Pathway Study/": "/projects/masters-to-phd/",
    "/projects/master-to-phd-pathway-study/": "/projects/masters-to-phd/",
    "/projects/Master-to-PhD-Pathway-Study/": "/projects/masters-to-phd/",
  },
  devToolbar: { enabled: false },
});
