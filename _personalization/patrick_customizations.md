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
  Patrick's personal portfolio. Based on [*folio](https://github.com/bogoli/-folio) design.
footer_text: >
  Powered by <a href="https://jekyllrb.com/" target="_blank">Jekyll</a> with <a href="https://github.com/alshedivat/al-folio">al-folio</a> theme.
keywords: jekyll, patrick-deng, data-engineer, data-analyst, portfolio-website
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
# NOTE: Patrick does NOT include "posts_in_search" (upstream has it as true)
max_width: 930px
```

### Open Graph (disabled)

```yaml
serve_og_meta: false
serve_schema_org: false
```

### Social Integration

```yaml
github_username: kdeng4
instagram_id: deng.1995
linkedin_username: deng-patrick
whatsapp_number: +16475144114
contact_note: >
#  You can even add a little note about which of these is the best way to reach you.
# All other social fields are blank/default
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
subtitle: B.Sci., M.Eng., MLOps Engineer and Data Analyst

profile:
  align: right
  image: person.jpg
  image_circular: false
  more_info: >
    <p>Toronto ON M5A 4P7<p>

news: false
selected_papers: false
social: false
---
```

Bio text:

> Hello! I am a Master's student in **Computer Science** at [**Georgia Tech**](https://www.gatech.edu/) and a **MLOps Engineer** at **Walmart Canada**. I live in downtown Toronto with Roxy - my lovable dog.
>
> I earned my first Master's degree in **Chemical Engineering** from the **University of Calgary** in 2020. Since then, I have gained over four years of professional experience in the **data** field, focusing on **database architecture**, **data pipeline engineering**, and **data visualization**.
>
> Over the past year, through work and academic opportunities, I have cultivated a strong interest in emerging technologies, exploring areas such as **AI learning algorithms**, **machine learning applications**, and **natural language processing**. In 2022, I embarked on my second Master's program at the **Georgia Institute of Technology**, with an anticipated graduation in 2025.
>
> I am fluent in both **English** and **Mandarin Chinese**.

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
description:
toc:
  sidebar: left
---
```

---

## _data/cv.yml

Only the "General Information" section is customized; the rest is still template placeholder data:

```yaml
- title: General Information
  type: map
  contents:
    - name: Full Name
      value: Patrick (Keqi) Deng
    - name: Date of Birth
      value: December 4th, 1995
    - name: Languages
      value: English, Chinese Mandarin, Chinese Sezchuaness
```

The Education section has one real entry:
```yaml
- title: Master of Science
  institution: Georgia Institute of Technology
  year: 2025
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

## assets/json/resume.json (full custom content)

This entire file is Patrick's resume. Key sections:
- **basics**: Patrick Deng, keqi.deng@outlook.com, 647.514.4114, Toronto ON
- **work**: Walmart Canada (MLOps & Data Engineer, 2024-present), Dane Creek Capital Corp. (Data Engineer, 2021-2024)
- **education**: Georgia Tech MS CS (2022-present, 3.9 GPA), U of Calgary MEng ChemEng (2018-2020), UCalgary/SWPU BSc Eng (2014-2018)
- **skills**: Data, Tools & Platforms, Business Impact, Machine Learning & AI
- **certificates**: Python for Data Analysis (Udemy), Google Data Analytics (Coursera), OOP in Java (Coursera)
- **publications**: "Exploring Transitions of Graduates From an Online Master's in CS to Doctoral Programs"
- **projects**: Raven's Progressive Matrices Agent, ASL Recognition with HMMs, Job Application Timeline Tracker
- **languages**: English, Chinese Mandarin, Chinese Sichuanese, Japanese (beginner), French (beginner)
- **interests**: Outdoor Activities (Skiing, Hiking), Creative Pursuits (Reading, Music)

(Full file preserved at assets/json/resume.json — unlikely to be overwritten by fork sync)

---

## Custom Content Files

These are Patrick's own content files (not overwritten by upstream sync):

| File | Description |
|------|-------------|
| `_projects/Master to PhD Pathway Study.md` | Academic project page |
| `_books/the_godfather.md` | Book review (5 stars, read Aug-Sep 2024) |
| `_posts/2024-12-04-photo-gallery.md` | Photo gallery blog post |
| `_posts/2025-03-26-plotly.md` | Plotly visualization post |
| `assets/json/resume.json` | Full JSON resume |
| `assets/pdf/resume.pdf` | Resume PDF (binary) |
| `assets/img/person.jpg` | Profile photo (binary) |
| `assets/img/book_covers/the_godfather.jpg` | Book cover image (binary) |

---

## Notes

All merge conflicts have been resolved as of Feb 2026. After future fork syncs,
always pick the **HEAD** (Patrick's) side for personalized values in the files listed above.
