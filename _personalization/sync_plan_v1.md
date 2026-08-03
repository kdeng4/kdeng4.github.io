# Fork Sync Plan — al-folio v1.x Migration

Prepared 2026-08-03. **Executed 2026-08-03** on branch `sync/al-folio-v1`.

## Outcome

The migration is done. What actually happened, versus what this plan predicted:

- **A normal `git merge upstream/main` worked.** Only 8 conflicts, and git auto-merged
  all 198 upstream deletions correctly because we had not modified those files. The
  "rebuild from the starter" procedure below was not needed — keep it as fallback.
- **The theme-colour risk did not materialise.** `al_folio_core` 1.0.15 ships
  `_sass/_variables.scss` and `_themes.scss` byte-identical to the pre-v1 versions, so
  our overrides are those files plus the colour changes and nothing else. Both are
  acknowledged in `.al-folio-overrides.yml`.
- **`deploy.yml` auto-merged**, keeping our Pages-artifact deployment _and_ picking up
  upstream's new Node/`npm ci` step.
- **Purgecss stays** — upstream still runs it in v1 and updated the safelist for
  Tailwind-era classes. Trap 4 below is resolved, not outstanding.
- **The style contract did fail** exactly as predicted (trap 3). Resolved by removing
  the starter-only CI: `unit-tests.yml`, `visual-regression.yml`, `release.yml`,
  `star-history.yml`, `update-screenshots.yml`, and the `test/` harness.
- `bundle exec al-folio upgrade audit`: **0 blocking**, 2 non-blocking (both false-positive
  jQuery hits on TikZ math inside the kept demo Distill post).

Everything below is the original plan, kept for the next sync.

---

## TL;DR

Upstream al-folio is no longer a theme you fork — it is a **thin starter**, and the
entire runtime (layouts, includes, Sass, plugins) now ships as versioned RubyGems.
The usual `git merge upstream/main` + "pick HEAD on conflicts" recipe **will not work**
this time. Upstream deleted 198 files that this fork still depends on.

Treat this as a migration, not a sync. Do it on a throwaway branch.

---

## Current divergence

|                        |                                                |
| ---------------------- | ---------------------------------------------- |
| Last common commit     | `0f1471b3` ("Update Google Scholar citations") |
| Upstream commits ahead | 64 (through `57e8d184`, al_folio_core 1.0.15)  |
| Our commits ahead      | 58                                             |
| Files we changed       | 69                                             |
| Files upstream changed | 300 (198 **deleted**, 40 added)                |
| Files touched by both  | 11                                             |

Upstream remote is now configured locally:

```bash
git remote -v   # upstream -> https://github.com/alshedivat/al-folio.git
```

---

## What upstream did

al-folio v1.0/v1.1 moved all runtime into gems under the
[`al-org-dev`](https://github.com/al-org-dev) org. The starter now owns only content,
wiring, and docs. Concretely, upstream **deleted**:

- all of `_layouts/` (13 files) → `al_folio_core`, `al_folio_cv`, `al_folio_distill`
- all of `_includes/` (~40 files) → `al_folio_core` and feature gems
- all of `_sass/` → `al_folio_core` (and the style engine changed, see below)
- all of `_plugins/` (8 files) → `al_citations`, `al_ext_posts`, etc.
- `FAQ.md`, `CUSTOMIZE.md`, `INSTALL.md`, `CONTRIBUTING.md` → moved under `docs/`

Two changes matter more than the rest:

**1. The style engine is now Tailwind v4, not Bootstrap/SCSS.**
`_config.yml` gains a required contract block:

```yaml
al_folio:
  api_version: 1
  style_engine: tailwind
  tailwind: { version: 4.1.18, preflight: false, css_entry: assets/tailwind/app.css }
```

**2. Analytics config moved from flat keys into a nested block** owned by `al_analytics`:

| Old (ours today)                                                                           | New (v1)                                                                                |
| ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| `google_analytics: G-ML0SG7R2BY`                                                           | `analytics.google: G-ML0SG7R2BY`                                                        |
| `enable_google_analytics: true`                                                            | (removed — presence of the ID is enough)                                                |
| `cronitor_analytics`, `pirsch_analytics`, `openpanel_analytics` and their `enable_*` flags | `analytics.cronitor`, `analytics.pirsch`, `analytics.openpanel`, `analytics.cloudflare` |

`google_site_verification` / `enable_google_verification` are unchanged.

---

## Risk assessment of our 69 customizations

### Green — carry over unchanged

Content and data are site-owned in v1 and are not affected by the migration:

`_data/cv.yml`, `_data/socials.yml`, `_data/repositories.yml`, `_bibliography/papers.bib`,
`assets/json/resume.json`, `assets/pdf/*`, `assets/img/*`, `_projects/*` (Patrick's four),
`_books/the_godfather.md`, Patrick's two `_posts/`, `_pages/about.md` body.

### Amber — needs translation

| Item                                 | Action                                                                                                                                              |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `_config.yml` identity/layout keys   | Re-apply onto the **new** upstream `_config.yml`; do not merge line-by-line                                                                         |
| Analytics keys                       | Migrate to the `analytics:` block per the table above                                                                                               |
| `_pages/*` front matter (nav orders) | Re-apply; upstream restructured several pages                                                                                                       |
| `.github/workflows/deploy.yml`       | Re-apply the Pages-artifact deployment (see `patrick_customizations.md`). Upstream also added a Node/`npm ci` step in v1 that we now need — keep it |
| Deleted demo content                 | Upstream re-added/modified some; delete again after merge                                                                                           |

### Red — genuinely at risk

**Custom theme colors (`_sass/_variables.scss`, `_sass/_themes.scss`).**
Patrick's navy/teal palette is expressed as SCSS variables consumed by files upstream
deleted. Local `_sass/*.scss` overrides _are_ still supported in a user site (per
`docs/BOUNDARIES.md`), but they now shadow **the gem's** files, which are Tailwind-era
and may not define `$purple-color`/`$cyan-color` the same way. Expect to re-express the
palette against `al_folio_core`'s actual variable names rather than copying our files over.

Do not assume our two SCSS files still apply. Diff them against the gem first:

```bash
bundle exec al-folio upgrade overrides diff _sass/_variables.scss
```

---

## Known traps

1. **`bundle update` alone does not upgrade you.** The `Gemfile` pins every gem to an
   exact version (`= 1.0.x`); Bundler honours the pin already in your file. You must edit
   the pins by hand. A v1.0 site silently stays on versions carrying a CVSS 9.4 Swiper
   prototype-pollution bug (`al_img_tools` < 1.0.3).
2. **`allow_remote_loader` must be `false`.** Under `al_folio_distill` 1.0.3 leaving it
   `true` opts you back out of the Distill supply-chain hardening. The audit flags it as blocking.
3. **The starter's own style contract will fail in this fork.** Upstream ships
   `test/style_contract.js` + `unit-tests.yml`, which fail if the repo contains `_sass/`,
   `_includes/`, `_layouts/`, or `_scripts/`. Those checks are scoped to the upstream repo
   but ship to every fork. Since we intend to keep a `_sass/` override, expect this
   workflow to go red — disable it or scope it out. Upstream acknowledges this as an open
   maintainer decision, so it will not be fixed for us.
4. **Purgecss.** Our `deploy.yml` runs purgecss against the built CSS. Tailwind v4 already
   tree-shakes, and upstream notes that re-minifying Tailwind output mangles `calc()`
   spacing tokens. Re-evaluate whether the purgecss step should stay.
5. **`CLAUDE.md` describes the old architecture** (`_includes/`, `_layouts/`, `_sass/`,
   `_plugins/` as live directories). It must be rewritten after the migration or it will
   actively mislead future sessions.

---

## Procedure

Do all of this on a disposable branch. Do not merge into `main` until the site builds
and the pages below have been eyeballed.

```bash
git checkout -b sync/al-folio-v1
```

**Step 1 — take upstream's wiring wholesale, not as a merge.**
Upstream's own migration skill (`.agents/skills/al-folio-v1-migration/SKILL.md`) says to
start from the v1 starter contract and bring site-owned files _over to it_, rather than
merging upstream _into_ the old tree. Follow that direction:

```bash
git checkout upstream/main -- Gemfile Gemfile.lock _config.yml package.json package-lock.json bin/ docs/ AGENTS.md
git rm -r --cached _includes _layouts _plugins _scripts   # keep _sass for now
```

**Step 2 — re-apply config.** Using `patrick_customizations.md`, port every identity,
layout, scholar, and feature value onto the new `_config.yml`. Migrate analytics into the
`analytics:` block. Keep the `al_folio:` contract keys exactly as upstream ships them.
Re-add `_personalization/` to `exclude:`.

**Step 3 — install and audit.**

```bash
bundle install
bundle exec al-folio upgrade audit
bundle exec al-folio upgrade overrides audit   # writes .al-folio-overrides.yml — commit it
```

**Step 4 — resolve the theme colors.** Diff and re-express the navy/teal palette
(red section above). Accept the override once it renders correctly:

```bash
bundle exec al-folio upgrade overrides accept _sass/_variables.scss
```

**Step 5 — re-delete demo content** that the merge reintroduced: the nine
`_projects/N_project.md`, the three `_news/announcement_*.md`, the demo `_posts/`,
and the Einstein bib entries.

**Step 6 — re-apply `deploy.yml`** Pages-artifact deployment, keeping upstream's new
Node/`npm ci` step. Decide on purgecss (trap 4). Disable the style-contract job (trap 3).

**Step 7 — build and inspect** home, `/cv/`, `/projects/`, `/publications/`,
`/repositories/`, `/blog/`, and both light and dark mode:

```bash
docker compose up   # http://localhost:8080
```

**Step 8 — rewrite `CLAUDE.md`** to describe the plugin architecture, then run
`npm install && npx prettier . --write` before committing.

---

## Verification checklist

- [ ] `bundle exec al-folio upgrade audit` reports no blocking findings
- [ ] `.al-folio-overrides.yml` committed
- [ ] `bundle list | grep -E 'al_img_tools|al_math|al_folio_distill'` shows ≥ 1.0.3 / 1.0.2 / 1.0.3
- [ ] `al_folio.distill.allow_remote_loader: false`
- [ ] Navy theme in light mode, teal-on-sand in dark mode
- [ ] Navbar shows only CV and projects, in that order
- [ ] CV page renders from `assets/json/resume.json` (jsonresume format), PDF link works
- [x] Publications page shows only the SIGCSE 2026 entry, no Einstein
- [ ] No demo projects, posts, or announcements
- [ ] Google Analytics tag present in built HTML
- [ ] `npx prettier . --check` passes
- [ ] Deployed site loads at https://kdeng4.github.io
