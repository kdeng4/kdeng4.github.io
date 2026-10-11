# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Academic portfolio website for Patrick Deng, built on the [al-folio](https://github.com/alshedivat/al-folio) Jekyll starter (v1.x). Hosted on GitHub Pages at https://kdeng4.github.io.

**This is a personal site, not the al-folio starter repo.** Upstream's `AGENTS.md`, `docs/`, and `test/` came along with the fork sync and describe the _starter's_ rules — several of them (the thin-starter style contract in particular) do **not** apply here. See "Local overrides" below.

## Architecture: runtime lives in gems

As of the v1 migration, al-folio is a thin starter and **all runtime ships as versioned RubyGems** under the [`al-org-dev`](https://github.com/al-org-dev) org. There is no `_layouts/`, `_includes/`, or `_plugins/` directory in this repo anymore — do not go looking for them, and do not recreate them to "fix" a missing template.

| What                                                                         | Owned by                                                                                       |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Base layouts, includes, publication/repository cards, style primitives       | `al_folio_core`                                                                                |
| CV rendering (`layout: cv`, RenderCV + JSONResume)                           | `al_folio_cv`                                                                                  |
| Distill posts                                                                | `al_folio_distill`                                                                             |
| Search, icons, analytics, math, charts, image tools, comments                | `al_search`, `al_icons`, `al_analytics`, `al_math`, `al_charts`, `al_img_tools`, `al_comments` |
| Citations, external posts, cookie consent, newsletter, RTL, email protection | `al_citations`, `al_ext_posts`, `al_cookie`, `al_newsletter`, `al_rtl`, `al_email_protect`     |

To read a layout or include, look inside the gem: `bundle info al_folio_core --path`.

`Gemfile` pins every gem to an **exact** version. `bundle update` alone will not upgrade you — you must edit the pins first. Read current pins from the `Gemfile`, not from prose.

### The `al_folio` config contract

`_config.yml` must keep these keys or the build warns and `upgrade audit` fails:

- `al_folio.api_version: 1`
- `al_folio.style_engine: tailwind`
- `al_folio.tailwind.{version,css_entry,preflight}`
- `al_folio.distill.{engine,source}`
- `theme: al_folio_core`

`al_folio.distill.allow_remote_loader` must stay `false` — `true` opts out of the Distill supply-chain hardening.

### Features fail silently

Feature gating is two-layered: the gem must be installed **and** the `_config.yml` flag enabled. If neither is true, the feature renders nothing and raises no error. Check both before debugging further.

## Local overrides (this site's customizations)

Local overrides **are** supported in a personal site — a file at a gem-owned path wins over the gem's copy. This site deliberately keeps two:

- `_sass/_variables.scss` — Patrick's navy/teal palette (`$blue-color-dark: #004369`, `$teal-color`, `$sand-color`, `$red-color-light`)
- `_sass/_themes.scss` — wires those into `--global-theme-color` / `--global-hover-color` for light and dark mode

Both are the gem's files plus those colour changes only, and both are acknowledged in `.al-folio-overrides.yml` against `al_folio_core` 1.0.15. After any gem update, re-check drift:

```bash
bundle exec al-folio upgrade overrides audit          # updates .al-folio-overrides.yml — commit it
bundle exec al-folio upgrade overrides diff _sass/_variables.scss
bundle exec al-folio upgrade overrides accept _sass/_variables.scss
```

⚠️ Upstream's `test/style_contract.js` fails whenever the repo contains `_sass/`. That check enforces the _starter's_ thin-boundary and ships to every fork, but does not apply to a personal site with intentional overrides — the harness and its workflow were removed here during the v1 sync. If a future sync restores them, remove them again rather than dropping the overrides.

## Build & Development Commands

```bash
bundle install
bundle exec jekyll serve --watch --port=8080 --livereload   # → http://localhost:8080 (baseurl is "")
JEKYLL_ENV=production bundle exec jekyll build              # production build
bundle exec al-folio upgrade audit                          # v1 contract + security audit
```

Docker (`docker compose up`) also works but is not installed on the current machine.

### Formatting

**Always `npm install` first** — a global/outdated prettier formats differently and CI rejects it.

```bash
npm install && npx prettier . --write
npx prettier . --check
```

Prettier uses `@shopify/prettier-plugin-liquid` with `printWidth: 150`.

## Content model

- **`_config.yml`** — site metadata, feature flags, CDN library pins with SRI hashes, the `al_folio` contract
- **`_pages/`** — static pages. Navbar shows only **CV** (`nav_order: 1`) and **projects** (`nav_order: 3`); everything else sets `nav: false` or omits it
- **`_posts/`**, **`_projects/`**, **`_books/`**, **`_teachings/`** — content collections
- **`_bibliography/papers.bib`** — processed by `jekyll-scholar` (APA); contains Patrick's CompEd '25 paper only
- **`_data/`** — `cv.yml`, `socials.yml`, `coauthors.yml`, `repositories.yml`, `venues.yml`
- **`assets/json/resume.json`** — JSONResume; this is the **live CV source** (`cv_format: jsonresume` in `_pages/cv.md`)
- **`_personalization/`** — customization backup and fork-sync plan; excluded from the build

## Fork sync

This is a fork of `alshedivat/al-folio`. `_personalization/patrick_customizations.md` is the customization inventory and `_personalization/sync_plan_v1.md` documents the v1 migration. Always keep Patrick's side for personalized values during merge conflicts, and re-delete upstream demo content (`_projects/N_project.md`, `_news/announcement_*.md`, demo `_posts/`, Einstein bib entries) after every sync.

## CI/CD

- **`deploy.yml`** — the real deployment. Builds with Ruby 3.3.5 + Python 3.13 + Node 20 (`npm ci`), purges unused CSS, then deploys via `actions/upload-pages-artifact` + `actions/deploy-pages`. GitHub Pages is set to **workflow** build type. If an upstream sync restores `JamesIves/github-pages-deploy-action`, replace it with the Pages-artifact approach again.
- **`prettier.yml`**, **`axe.yml`** (accessibility), **`broken-links.yml`** (lychee), **`upgrade-check.yml`** (runs `al-folio upgrade audit`)
- Starter-repo-only workflows (`unit-tests`, `visual-regression`, `release`, `star-history`, `update-screenshots`) were **removed** during the v1 sync — they publish al-folio's own gems, chart its stars, and check the starter boundary, none of which apply to this site. Expect upstream syncs to keep reintroducing them.
