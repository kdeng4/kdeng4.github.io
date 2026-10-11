# Patrick Deng

A personal website for data engineering, applied AI, and research. Built with **Astro 7, strict TypeScript, and YAML**, deployed as static HTML on Vercel at [pdeng.pp.ua](https://pdeng.pp.ua).

The interface follows an editorial minimalist direction: warm off-white, deep green, readable system typography, open project lists, and straightforward navigation. Your projects, biography, CV, and SIGCSE publication are retained; template demo content stays in the archive.

## Run locally

Use **Node 24 LTS**. The old system Node 23 is unsupported by Astro.

```bash
nvm use
npm ci
npm run dev
```

Open [localhost:4321](http://localhost:4321). To inspect the static production build:

```bash
npm run build
npm run preview
```

## Edit content

| File                          | Controls                                                                 |
| ----------------------------- | ------------------------------------------------------------------------ |
| `content/site.yaml`           | Identity, homepage, biography, navigation, contacts, metadata, analytics |
| `content/cv.yaml`             | Work experience, education, skills, languages, interests                 |
| `content/projects/*.yaml`     | Project listings and complete project detail pages                       |
| `content/publications/*.yaml` | Research listings and publication links                                  |

Add a project by adding a YAML file in `content/projects/`. Its filename is its URL identifier. `featured: true` selects it for the homepage; `order` determines the sequence. The homepage shows the first three featured projects. YAML schemas validate required fields and publication references during the build.

All portfolio content is rendered to HTML at build time. Reading, navigating, downloading the resume, and using email links work without JavaScript. The only interface script enhances the visible email link with clipboard copying and feedback. The existing Google Analytics and Search Console settings are retained in `content/site.yaml`; analytics runs only in production and can be disabled with `analytics.enabled: false`.

## Checks

```bash
npx playwright install chromium webkit
npm run verify
```

The browser suite checks all main pages in Chromium and WebKit, including automated accessibility scans, narrow-screen reflow, 200% text sizing, keyboard focus, contact feedback, internal links, redirect compatibility, image dimensions, and the resume download. These checks do not substitute for manual usability testing or real-user Core Web Vitals.

Vercel uses `npm ci`, `npm run build`, and `dist/`. Its Git integration builds the site, and a production Deployment Check requires the GitHub Actions **Site verification** job to pass before releasing it to the production domains. See [CI and the release gate](docs/CI.md) for the checks, local validation, and project settings. There is no Ruby, Python, Docker, or Jekyll build step for the active site.

See [architecture](docs/ARCHITECTURE.md), [content editing](docs/CONTENT.md), and [migration notes](docs/MIGRATION.md). The original al-folio source and its license attribution are preserved under [legacy/jekyll](legacy/jekyll/); the root license is retained.
