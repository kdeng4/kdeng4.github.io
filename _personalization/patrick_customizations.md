# Patrick Deng - Personalization Reference

Backup of all customizations made to the al-folio theme for Patrick's portfolio.
Use this to re-apply personalizations after syncing the fork with upstream.

---

## _config.yml Overrides

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

### Social Integration (now in _data/socials.yml)

```yaml
# _data/socials.yml
cv_pdf: /assets/pdf/resume.pdf
email: keqi.deng@outlook.com
github_username: kdeng4
linkedin_username: deng-patrick
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

## _pages/about.md

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
social: true
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

## _pages/cv.md

```yaml
---
layout: cv
permalink: /cv/
title: cv
nav: true
nav_order: 1
cv_pdf: resume.pdf
cv_format: jsonresume
description:
toc:
  sidebar: left
---
```

---

## _data/cv.yml

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

## _bibliography/papers.bib

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

## _data/repositories.yml

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

| File | Description |
|------|-------------|
| `_projects/Master to PhD Pathway Study.md` | Academic project page (importance: 1) |
| `_projects/rpm_agent.md` | RPM Agent project page (importance: 2) |
| `_projects/asl_recognition.md` | ASL Recognition project page (importance: 3) |
| `_projects/job_tracker.md` | Job Tracker project page (importance: 4) |
| `_books/the_godfather.md` | Book review (5 stars, read Aug-Sep 2024) |
| `_posts/2024-12-04-photo-gallery.md` | Photo gallery blog post |
| `_posts/2025-03-26-plotly.md` | Plotly visualization post |
| `assets/json/resume.json` | Full JSON resume |
| `assets/pdf/resume.pdf` | Resume PDF (binary) |
| `assets/pdf/OMSCS_to_PhD_CS8903.pdf` | Publication PDF |
| `assets/img/person.jpg` | Profile photo (binary) |
| `assets/img/book_covers/the_godfather.jpg` | Book cover image (binary) |

---

## Notes

All content updated and merge conflicts resolved as of Feb 2026. After future fork syncs,
always pick the **HEAD** (Patrick's) side for personalized values in the files listed above.
