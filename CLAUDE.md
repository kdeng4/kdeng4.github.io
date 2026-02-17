# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Academic portfolio website for Patrick Deng, built on the [al-folio](https://github.com/alshedivat/al-folio) Jekyll theme. Hosted on GitHub Pages at https://kdeng4.github.io.

## Build & Development Commands

### Local development (Docker — preferred)

```bash
docker compose up
```

Serves at http://localhost:8080 with live reload. Auto-restarts Jekyll when `_config.yml` changes.

### Local development (native)

```bash
bundle install
bundle exec jekyll serve --watch --port=8080 --livereload
```

### Production build

```bash
JEKYLL_ENV=production bundle exec jekyll build
```

### Formatting

```bash
npx prettier --check .          # check formatting
npx prettier --write .          # fix formatting
```

Prettier is configured with `@shopify/prettier-plugin-liquid` for Liquid template support (printWidth: 150).

## Architecture

### Content model

- **`_config.yml`** — Master configuration. Defines site metadata, plugin settings, third-party library CDN references with SRI hashes, and collection definitions. Social media info is now in `_data/socials.yml` (managed by `jekyll-socials` plugin).
- **`_pages/`** — Static pages (about, blog, cv, publications, projects, teaching, repositories). Each uses YAML front matter to select a layout.
- **`_posts/`** — Blog posts in Markdown with front matter. Supports math (MathJax), code highlighting (Rouge), Distill-style posts, and embedded media.
- **`_projects/`** — Project showcase entries.
- **`_books/`** — Book review collection.
- **`_bibliography/`** — BibTeX files processed by `jekyll-scholar` for the publications page (APA style).
- **`_data/`** — Structured YAML data: `cv.yml`, `socials.yml`, `coauthors.yml`, `repositories.yml`, `venues.yml`.
- **`assets/json/resume.json`** — JSON Resume format, used as an alternative CV data source.

### Template hierarchy

- **`_layouts/`** — Liquid layouts. `default.liquid` is the base; others (`page`, `post`, `about`, `cv`, `bib`, `distill`, `book-review`) extend it.
- **`_includes/`** — Reusable Liquid partials (head, header, footer, social links, media embeds). Subdirectories `cv/`, `resume/`, `repository/` group related components.
- **`_sass/`** — SCSS stylesheets. `_base.scss` has core styles, `_themes.scss` defines color themes. Compiled to compressed CSS.

### Custom plugins (`_plugins/`)

Ruby plugins that run during Jekyll build:

- `google-scholar-citations.rb` / `inspirehep-citations.rb` — fetch citation data from external APIs
- `external-posts.rb` — pull in blog posts from external feeds
- `download-3rd-party.rb` — manage external library references
- `cache-bust.rb` — asset cache busting

### CI/CD

GitHub Actions workflows in `.github/workflows/`:

- **`deploy.yml`** — Main deployment: Ruby 3.3.5, Python 3.13, ImageMagick, Jekyll build with CSS purging (purgecss), deploy to GitHub Pages
- **`prettier.yml`** — Formatting checks
- **`axe.yml`** — Accessibility testing
- **`broken-links.yml`** — Link validation with lychee

### Key dependencies

- **Ruby**: Jekyll + ~20 plugins (see Gemfile). Notable: `jekyll-scholar` (bibliography), `jekyll-imagemagick` (responsive WebP images), `jekyll-jupyter-notebook`, `jekyll-minifier`
- **Node.js**: Prettier only (dev dependency)
- **CDN**: 40+ client-side libraries loaded via CDN with SRI integrity hashes (MathJax, Chart.js, D3, Mermaid, Bootstrap Table, Photoswipe, Leaflet, etc.), all configured in `_config.yml` under `third_party_libraries`
