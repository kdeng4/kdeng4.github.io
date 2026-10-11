# Agent guidelines

This is Patrick Deng's personal portfolio. The active site uses **Astro, strict TypeScript, and YAML content**, with static output hosted on Vercel at https://pdeng.pp.ua.

The user requested a migration away from Jekyll/al-folio. The previous source and its guidelines are preserved in `legacy/jekyll/`; those starter-specific rules apply to the archive, not the active Astro site. Do not run gem upgrades or recreate a Jekyll runtime for the active site.

## Where changes belong

| Change                                                             | Location                                            |
| ------------------------------------------------------------------ | --------------------------------------------------- |
| Identity, biography, navigation, homepage copy, contact, analytics | `content/site.yaml`                                 |
| Experience, education, skills, languages, interests                | `content/cv.yaml`                                   |
| Projects and their detail pages                                    | `content/projects/*.yaml`                           |
| Publications                                                       | `content/publications/*.yaml`                       |
| Content schemas and validation                                     | `src/content.config.ts`                             |
| Shared content queries                                             | `src/lib/content.ts`                                |
| Layout and components                                              | `src/layouts/`, `src/components/`                   |
| Routes                                                             | `src/pages/`                                        |
| Visual tokens and responsive styles                                | `src/styles/global.css`                             |
| Deployment and automated checks                                    | `vercel.json`, `.github/workflows/ci.yml`, `tests/` |

## Working rules

- Keep portfolio content in YAML. Do not move it into component strings or add a CMS without a request.
- Preserve existing claims and links. Never invent metrics, employment, project source links, or publications.
- Keep static rendering and minimal client JavaScript. A small enhancement must leave the core task usable without JavaScript.
- Preserve underlined content links, visible keyboard focus, 44px standalone controls, and narrow-screen reflow.
- Follow the user's editorial minimalist brief: warm background, deep green accent, readable typography, and lists organised with space and alignment.
- Do not edit the historical archive unless specifically needed. Do not run its workflows or formatter.
- Use Node 24 (`.nvmrc`), install with `npm ci`, and keep dependency versions and the lockfile aligned.
- See `docs/ARCHITECTURE.md` for the content pipeline and `docs/MIGRATION.md` for preserved URLs and deployment changes.

## Validation

```bash
npm run lint:prettier
npm run build
npx playwright install chromium webkit
npm test
```

The build validates YAML and checks TypeScript. Browser tests exercise Chromium and WebKit, accessibility, 320px reflow, 200% text sizing, keyboard navigation, copy feedback, no-JavaScript use, internal links, redirects, and the real resume PDF. Run the appropriate checks for the change; do not claim WCAG conformance or real-user performance from automated results alone.

At the end of every completed task, provide a concise summary. If Git is available and there are completed changes to record, create a commit. Do not push or publish unless requested.
