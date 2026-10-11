# Migration from Jekyll to Astro

## What changed

The active build is now Astro 7 with strict TypeScript, native YAML content collections, plain CSS, and static output. The portfolio was redesigned around introducing Patrick, presenting representative work and research, and making contact details easy to find.

The former Jekyll/al-folio source, Ruby dependencies, styles, sample posts, supporting media, generated example screenshots, documentation, Docker setup, Vercel configuration, and GitHub workflows are preserved in `legacy/jekyll/`. They are outside the active build and deployment upload. The root license remains in place. Agent-specific al-folio skills under `.agents/skills/` remain historical resources and are not part of the build.

## Content retained

- Patrick's biography, employer, location, contact information, and professional links.
- All four projects, with explanatory summaries and full detail pages.
- The SIGCSE 2026 paper, co-authors, DOI, and research links.
- Work experience, education, skills, languages, and interests from the existing CV YAML.
- The original portrait and resume PDF.
- The `pdeng.pp.ua` canonical domain, Search Console verification, and production Google Analytics ID.

Copy has been edited for clarity using the existing source. Numerical claims are retained from that source; no new results, testimonials, repository links, or work experience were invented. The template blog, teaching, books, and demo pages are archived rather than presented as Patrick's writing.

## URL compatibility

| Previous URL                                     | Result                                  |
| ------------------------------------------------ | --------------------------------------- |
| `/`                                              | Redesigned homepage                     |
| `/projects/`                                     | Project directory                       |
| `/projects/rpm_agent/`                           | Retained                                |
| `/projects/asl_recognition/`                     | Retained                                |
| `/projects/job_tracker/`                         | Retained                                |
| `/projects/Master%20to%20PhD%20Pathway%20Study/` | Redirect to `/projects/masters-to-phd/` |
| `/projects/master-to-phd-pathway-study/`         | Redirect to `/projects/masters-to-phd/` |
| `/projects/Master-to-PhD-Pathway-Study/`         | Redirect to `/projects/masters-to-phd/` |
| `/publications/`                                 | Redirect to `/research/`                |
| `/cv/`                                           | Full CV rendered from YAML              |
| `/assets/pdf/resume.pdf`                         | Original file and URL retained          |

Vercel declares permanent redirects. Astro emits equivalent HTML redirect pages for portable static hosting. The public template-only demo URLs are retired; unknown paths show a helpful 404 rather than unrelated content.

## Hosting

The repository already targeted Vercel. `vercel.json` now selects `astro`, installs with `npm ci`, builds with `npm run build`, and serves `dist/`. The Node engine and `.nvmrc` target supported Node releases, with Node 24 used in CI. No Ruby, Python, ImageMagick, Bundler, or Docker step is required.

GitHub Actions now runs one Node-based verification workflow. The former Pages publication, citation updating, RenderCV, Docker publishing, and Jekyll audit jobs are archived so they cannot overwrite the new site or fail against a removed runtime. Existing Vercel Git integration remains the deployment path. This source migration does not itself push, change DNS, or publish a production deployment.

## Verification scope

Use the committed Playwright suite against a production build. It checks real visitor paths, the YAML-to-page boundary, every internal link, the PDF signature, legacy redirect navigation, no-JavaScript use, keyboard focus, clipboard success/failure, image dimensions, 320px reflow, and doubled text size. Axe scans the main pages in both Chromium and WebKit.

Manual visual review should include desktop and mobile, long titles, mixed-language content, focus, and the contact area. Automated scans do not prove full WCAG 2.2 compliance. Resource sizes and lab diagnostics do not establish real-user LCP, INP, or CLS. A few first-time visitors should still try identifying Patrick's work, opening a project, and finding contact details.
