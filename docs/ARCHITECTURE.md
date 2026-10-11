# Architecture

## Stack

- **Astro 7** prerenders every route into static HTML in `dist/`.
- **TypeScript** uses Astro's `strictest` configuration for templates, data access, and tests.
- **YAML content collections** use Astro's native `file()` and `glob()` loaders, with Zod schemas.
- **Plain CSS** contains shared tokens, typography, layout, responsive rules, focus states, reduced-motion support, and print styles.
- **Playwright + axe** exercise the production output in Chromium and WebKit.
- **Vercel** serves the static output. No adapter, application server, database, client framework, or runtime content fetch is needed.

This fits a portfolio whose content changes with a source commit. Astro's [content collections](https://docs.astro.build/en/guides/content-collections/) support typed YAML and build-time validation; its [Vercel deployment guide](https://docs.astro.build/en/guides/deploy/vercel/) covers static hosting without an adapter.

## Data flow

```text
content/*.yaml + content/{projects,publications}/*.yaml
  → native Astro loaders
  → Zod validation (src/content.config.ts)
  → typed queries (src/lib/content.ts)
  → layouts, components, and routes
  → static HTML + CSS + optimised images in dist/
  → Vercel CDN
```

`site.yaml` and `cv.yaml` each contain a `main` entry. Project IDs come from filenames; publication `project` fields reference a project collection entry. Missing fields or invalid references stop the build. No YAML content is interpreted as HTML; paragraphs and bullet points are rendered as escaped text.

`astro.config.ts` reads the canonical origin from `content/site.yaml` so sitemap, canonical links, structured data, and robots.txt use the same domain. The build outputs a sitemap index and an accessible 404. Vercel uses permanent redirects for renamed legacy routes; Astro also creates static redirect pages for portable hosting.

## Source boundaries

- `content/`: editable portfolio data.
- `src/content.config.ts`: validated data contracts.
- `src/pages/`: home, project directory, project details, research, about, CV, 404, and robots.txt.
- `src/layouts/BaseLayout.astro`: semantic shell, shared metadata, visible navigation, contact, footer, and optional production analytics.
- `src/components/`: project list, publication, contact enhancement, and small inline SVG arrows.
- `src/assets/portrait.jpg`: original personal photograph, optimised by Astro at build time.
- `/cv/`: the online resume, rendered from YAML; the retired PDF URL redirects here.
- `legacy/jekyll/`: historical source, excluded from TypeScript, formatting, Vercel uploads, and the active content/build pipeline.

## Design and interaction

The page background is `#FAF9F6`, body text `#202124`, secondary text `#5C6067`, and accent `#245C4F`. The 960px main container holds narrower reading columns, with 18px relative body sizing, 1.7 line-height, system fonts with Chinese fallbacks, and a small monospace scale for metadata.

Content links are underlined before hover. Independent controls have at least 44px target height, navigation wraps, and project layouts collapse on mobile. A skip link, visible focus outline, real headings, landmarks, reduced-motion rules, and forced-colour styles support different input and display settings. The interface has no entrance animation, scroll effects, hidden desktop navigation, or webfont downloads.

Email remains visible as a `mailto:` link. The copy button is hidden until secure-context clipboard support is available; success and failure are announced in a live region and remain visible. All content and core navigation work without JavaScript. Existing Google Analytics loads asynchronously only in production when enabled in YAML.

Image width and height reserve layout space. Astro generates local WebP variants with responsive sizes. There are no remote image services or third-party UI dependencies. A resource budget test guards the homepage's local assets; it is a local regression check, not evidence of real-user Core Web Vitals.

## Development and deployment

Use Node 24 (`.nvmrc`), `npm ci`, and `npm run dev`. `npm run build` runs type/content checks before prerendering. `npm run preview` serves the built output; if the Astro CLI runs it in the background, use `npx astro preview stop` to stop it.

The root `vercel.json` selects Astro, builds with npm, and serves `dist/`. GitHub Actions runs `npm run verify` for formatting, the build, and browser checks with read-only repository permissions. Vercel requires the resulting check on the deployed commit before releasing production domains; see [CI and the production release gate](CI.md) for the project setting. GitHub Actions does not publish or run the archived Ruby workflows. Keep tests and lockfile updates in the same commit as their implementation.
