# Patrick Deng - Personalization Reference

Backup of all customizations made to the al-folio theme for Patrick's portfolio.
Use this to re-apply personalizations after syncing the fork with upstream.

**Last verified against `main`: 2026-08-03.** For the upcoming al-folio v1.x
migration, read [`sync_plan_v1.md`](sync_plan_v1.md) first — several items below
move to new locations under the plugin architecture.

---

## \_config.yml Overrides

These are the values that differ from upstream al-folio defaults.

### Site Settings

```yaml
title: blank
first_name: Patrick
middle_name:
last_name: Deng
email: keqi.deng@outlook.com
# NOTE: do NOT include "contact_note" — Patrick comments it out
description: >
  Patrick Deng — Data Engineer, MLOps practitioner, and M.Sc. CS (Georgia Tech).
  Building production data pipelines and applied ML systems in Toronto.
footer_text: >
  Powered by <a href="https://jekyllrb.com/" target="_blank">Jekyll</a> with <a href="https://github.com/alshedivat/al-folio">al-folio</a> theme.
keywords: patrick deng, data engineer, mlops, machine learning, data pipelines, bigquery, airflow, python, genai, toronto, georgia tech, applied ml
lang: en-ca
icon: ⚛️
url: https://kdeng4.github.io
baseurl: ""
last_updated: true
back_to_top: true
```

### Layout

```yaml
navbar_fixed: true
footer_fixed: false
search_enabled: true
socials_in_search: false
bib_search: false
max_width: 930px
```

### Open Graph (disabled)

```yaml
serve_og_meta: false
serve_schema_org: false
```

### Social Integration (now in \_data/socials.yml)

```yaml
# _data/socials.yml
cv_pdf: /assets/pdf/resume.pdf
email: keqi.deng@outlook.com
github_username: kdeng4
linkedin_username: deng-patrick
orcid_id: 0009-0008-9727-9269
instagram_id: deng.1995
whatsapp_number: +16475144114
rss_icon: true
```

### Analytics & Verification

```yaml
google_analytics: G-ML0SG7R2BY
google_site_verification: yU2mMf1BswMr-KldkIrf9O9wcWai96gS0icTiOR84Wo
enable_google_analytics: true
enable_google_verification: true
```

### Blog

```yaml
blog_name: my blog
disqus_shortname: patrick
```

### Collections

```yaml
collections:
  books:
    output: true
  news:
    defaults:
      layout: post
    output: true
  projects:
    output: true
    permalink: /:collection/:title/

announcements:
  enabled: false
  scrollable: true
  limit: 5

latest_posts:
  enabled: false
  scrollable: true
  limit: 3
```

### Jekyll Scholar

```yaml
scholar:
  last_name: [Deng]
  first_name: [Patrick]
```

### Optional Features (non-default values)

```yaml
enable_google_analytics: true
enable_google_verification: true
enable_masonry: true
enable_math: true
enable_darkmode: true
enable_navbar_social: true
enable_project_categories: true
enable_medium_zoom: true
enable_progressbar: true
```

---

## \_pages/about.md

```yaml
---
layout: about
title: about
permalink: /
subtitle: Data Engineer & MLOps | M.Sc. Computer Science, Georgia Tech

profile:
  align: right
  image: person.jpg
  image_circular: false
  more_info: >
    <p>Toronto, ON</p>

selected_papers: false
social: false # social icons handled by the contact section in the page body
announcements:
  enabled: false
latest_posts:
  enabled: false
---
```

Bio text (two paragraphs):

> I build production data pipelines and applied ML systems at **Walmart Canada**, where I own the end-to-end Ads CRM data warehouse processing **70 M+ records daily** and ship models that directly improve customer targeting and marketing ROI. When I'm not writing SQL or wrangling Airflow DAGs, I'm probably out on a trail with **Roxy** (my dog) or planning the next ski trip.
>
> I hold an **M.Sc. in Computer Science** from **Georgia Tech** (OMSCS, 2025) with coursework spanning AI, NLP, and database systems, plus an **M.Eng. in Chemical Engineering** from the **University of Calgary** (2020). That cross-disciplinary background — engineering fundamentals first, then four-plus years of hands-on data work, then a rigorous CS degree — means I approach problems with both analytical depth and practical urgency. I've designed customer segmentation frameworks, built GenAI agentic tools with LangGraph, deployed recommendation systems using collaborative filtering, and reduced pipeline costs through monitoring and optimisation. I'm fluent in **English** and **Mandarin Chinese**.

---

## \_pages/cv.md

```yaml
---
layout: cv
permalink: /cv/
title: CV
nav: true
nav_order: 1
cv_pdf: /assets/pdf/resume.pdf
cv_format: jsonresume
description:
toc:
  sidebar: left
---
```

---

## Navigation Layout (`_pages/*.md` front matter)

Patrick's navbar shows only **CV** and **projects**; everything else is hidden.

| Page              | `nav`                                          | `nav_order` | Other                                                           |
| ----------------- | ---------------------------------------------- | ----------- | --------------------------------------------------------------- |
| `about.md`        | (home)                                         | —           | `permalink: /`, `social: false`                                 |
| `cv.md`           | `true`                                         | 1           | `title: CV`                                                     |
| `projects.md`     | `true`                                         | 3           | `display_categories: [academic, work, fun]`, `horizontal: true` |
| `blog.md`         | `false`                                        | —           |                                                                 |
| `books.md`        | `false`                                        | —           |                                                                 |
| `repositories.md` | `false`                                        | —           |                                                                 |
| `publications.md` | commented out (`#nav: false`, `#nav_order: 2`) |             |                                                                 |
| `teaching.md`     | nav removed                                    |             |                                                                 |
| `profiles.md`     | nav removed                                    | —           | `permalink: /people/`                                           |
| `dropdown.md`     | nav removed                                    | —           |                                                                 |

`about.md` uses `social: false` because the contact section in the page body
handles social icons — do **not** let upstream flip this back to `true`.

---

## Theme Colors (`_sass/_variables.scss` + `_sass/_themes.scss`)

Patrick replaced al-folio's purple/cyan default with a navy/teal palette.
**This is the customization most at risk in the v1 migration** — see `sync_plan_v1.md`.

`_sass/_variables.scss` — changed and added variables:

```scss
$red-color: #db1f48; // was #ff3636
$red-color-dark: #74112f; // was #b71c1c
$blue-color-dark: #004369; // was #00369f
$sand-color: #e5ddc8; // new
$teal-color: #01949a; // new
$red-color-light: #f3e3e2; // new
```

`_sass/_themes.scss` — light theme uses navy, dark theme uses teal on sand:

```scss
// :root (light)
--global-theme-color: #{v.$blue-color-dark}; // was $purple-color
--global-hover-color: #{v.$blue-color-dark}; // was $purple-color

// html[data-theme="dark"]
--global-theme-color: #{v.$teal-color}; // was $cyan-color
--global-hover-color: #{v.$teal-color}; // was $cyan-color
--global-hover-text-color: #{v.$sand-color}; // was $white-color
```

---

## `.github/workflows/deploy.yml`

The fork uses **workflow-based GitHub Pages deployment**, not the upstream
`JamesIves/github-pages-deploy-action` branch-push approach. Re-apply after every sync:

```yaml
permissions:
  contents: write
  pages: write # added
  id-token: write # added

concurrency: # added block
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment: # added block
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
```

And the final step replaces upstream's deploy action:

```yaml
- name: Upload Pages artifact 📦
  if: github.event_name != 'pull_request'
  uses: actions/upload-pages-artifact@v3
  with:
    path: _site
- name: Deploy to GitHub Pages 🚀
  if: github.event_name != 'pull_request'
  id: deployment
  uses: actions/deploy-pages@v4
```

---

## Deleted Upstream Demo Content

These upstream files are intentionally **deleted** in the fork. On merge they appear
as delete/modify conflicts — always resolve by **keeping them deleted** (`git rm`).

- **Demo posts (27)**: all `_posts/` entries from the al-folio demo except Patrick's
  own `2024-12-04-photo-gallery.md` and `2025-03-26-plotly.md`
- **Demo projects (9)**: `_projects/1_project.md` … `9_project.md`
- **News (3)**: `_news/announcement_1.md`, `_2.md`, `_3.md`
- **Bibliography**: all Einstein placeholder entries in `_bibliography/papers.bib`
- **Config**: both `external_sources` demo feeds (medium.com, Google Blog) emptied

---

## \_data/cv.yml

Full rendercv-format CV with Patrick's data. Key sections:

- **Education**: Georgia Tech MS CS (2022–2025, 3.9), UCalgary MEng ChemEng (2018–2020), UCalgary/SWPU BSc (2014–2018)
- **Experience**: Walmart Canada (Data Engineer, Ads & MarTech, 2024–present), Dane Creek (Data Engineer, 2021–2024)
- **Skills**: Languages, Data Engineering & Cloud, Databases & Visualization, ML & AI, DevOps & Tools
- **Languages**: English, Mandarin, Sichuanese (native); Japanese, French (beginner)
- **Interests**: Outdoor Activities, Creative Pursuits
- **Certificates**: Python (Udemy), Google Data Analytics (Coursera), OOP in Java (Coursera)
- **Projects**: RPM Agent, ASL Recognition, Job Tracker
- **Publications**: ACM CompEd '25 paper on OMSCS-to-PhD transitions

---

## assets/json/resume.json

Full JSONResume-format file. Key sections:

- **basics**: Patrick Deng, Data Engineer & MLOps, Toronto ON
- **work**: Walmart Canada (Data Engineer, Ads & MarTech, 2024–present), Dane Creek (Data Engineer, 2021–2024)
- **education**: Georgia Tech MS CS (2022–2025, 3.9), UCalgary MEng (2018–2020), UCalgary/SWPU BSc (2014–2018)
- **skills**: Languages (Python, SQL, R, MATLAB, Java, C#), Data Engineering & Cloud, Databases & Visualization, ML & AI, DevOps & Tools
- **certificates**: 3 certificates (Udemy, Coursera)
- **publications**: ACM CompEd '25 paper
- **projects**: RPM Agent, ASL Recognition with HMMs, Job Application Timeline Tracker
- **languages**: English, Mandarin, Sichuanese, Japanese (beginner), French (beginner)
- **interests**: Outdoor Activities (Skiing, Hiking), Creative Pursuits (Reading, Music)

---

## \_bibliography/papers.bib

Single entry — Patrick's actual publication (replaces all Einstein placeholders):

```bibtex
@inproceedings{deng2025omscs,
  title     = {Exploring Transitions of Graduates From an Online Master's in CS to Doctoral Programs},
  author    = {Deng, Patrick},
  year      = {2025},
  booktitle = {Proceedings of the ACM Conference on Global Computing Education (CompEd '25)},
  publisher = {ACM},
  selected  = {true}
}
```

---

## \_data/repositories.yml

```yaml
github_users:
  - kdeng4

repo_description_lines_max: 5

github_repos:
  - kdeng4/AdventOfCode2024
```

---

## Custom Content Files

These are Patrick's own content files (not overwritten by upstream sync):

| File                                       | Description                                  |
| ------------------------------------------ | -------------------------------------------- |
| `_projects/Master to PhD Pathway Study.md` | Academic project page (importance: 1)        |
| `_projects/rpm_agent.md`                   | RPM Agent project page (importance: 2)       |
| `_projects/asl_recognition.md`             | ASL Recognition project page (importance: 3) |
| `_projects/job_tracker.md`                 | Job Tracker project page (importance: 4)     |
| `_books/the_godfather.md`                  | Book review (5 stars, read Aug-Sep 2024)     |
| `_posts/2024-12-04-photo-gallery.md`       | Photo gallery blog post                      |
| `_posts/2025-03-26-plotly.md`              | Plotly visualization post                    |
| `assets/json/resume.json`                  | Full JSON resume                             |
| `assets/pdf/resume.pdf`                    | Resume PDF (binary)                          |
| `assets/pdf/OMSCS_to_PhD_CS8903.pdf`       | Publication PDF                              |
| `assets/img/person.jpg`                    | Profile photo (binary)                       |
| `assets/img/book_covers/the_godfather.jpg` | Book cover image (binary)                    |
| `assets/img/prof_pic.jpg`                  | Replaced upstream demo photo (binary)        |
| `_personalization/`                        | This directory (excluded from build)         |

`_config.yml` adds `_personalization/` to `exclude:` so these notes never ship.

---

## Notes

Inventory re-verified 2026-08-03 against `main` (58 commits ahead of the last upstream
merge base `0f1471b3`). After future fork syncs, always pick the **HEAD** (Patrick's)
side for personalized values in the files listed above.

**Before the next sync, read [`sync_plan_v1.md`](sync_plan_v1.md)** — upstream has moved
to the v1 plugin architecture and a plain `git merge upstream/main` is no longer the
right procedure.
