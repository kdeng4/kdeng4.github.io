# Editing the site

Portfolio copy lives in YAML. UI labels such as “All projects” and “View my resume” live in their components; the biography, project explanations, publication data, and homepage copy are data.

## Identity and pages

Edit `content/site.yaml`, keeping the outer `main:` key. It contains homepage, about, research, project-directory, and contact copy, plus links and metadata. Use `>-` for a multiline paragraph: YAML folds the source lines into one continuous paragraph.

Update the canonical domain with `main.url`. Keep this aligned with your hosting domain. The existing Google Analytics measurement ID is retained; set `analytics.enabled: false` to omit analytics scripts from production. Development never loads analytics.

## Projects

Create `content/projects/my-project.yaml` for `/projects/my-project/`. Start by copying an existing project and replacing its content. A complete entry looks like:

```yaml
title: A descriptive project title
shortTitle: A readable title for the directory
category: Software development
year: "2026"
period: January – March 2026
context: Personal project
role: Design and implementation
featured: false
order: 5
summary: Explain what it does, the problem, your contribution, and the actual outcome.
outcome: A concrete, verifiable result.
stack: [TypeScript]
sections:
  - title: The problem
    paragraphs:
      - Explain the context in a full paragraph.
links: []
```

Quote `year` and other values the schema expects as strings. Both `year` and `period` are optional; omit them when a case study should not identify a timeframe. Set `featured: true` to include a project among homepage candidates. The first three by `order` appear on the homepage; every project appears in the full directory. Keep a published filename stable to preserve its URL, or add an explicit redirect when renaming it. Do not add source-code links unless that repository exists and is intended to be public.

Each detail section has a `title`, one or more `paragraphs`, and optional `bullets`. A section can also include a `comparison` table after its paragraphs, with a caption and one or more rows:

```yaml
comparison:
  caption: How these approaches compare.
  rows:
    - option: An approach
      benefit: Where it helps.
      tradeoff: What it costs or makes harder.
```

The table uses the column headings Approach, Strength, and Tradeoff, with stacked rows on small screens. Text is escaped; HTML and Markdown syntax are not rendered. This makes the current YAML model predictable. Long-form Markdown could be added as a separate collection later if requested.

Use the optional project-level `references` list for technical sources. It has the same `label` and `href` fields as `links`, but appears only under Technical references on the project page. Keep project and source-code links in `links`; those also appear on the CV.

## Research

Add a YAML file under `content/publications/`, following the existing entry. `project` must match an existing project filename without `.yaml`. Publications sort newest first, and the newest appears on the homepage. The research section is omitted from the homepage when there are no publications. There is no writing section populated with template posts.

## CV and assets

Edit work experience, education, skills, languages, and interests in `content/cv.yaml`. Dates are quoted strings. The about page and CV page use the same data. Project and publication sections of the CV use their respective collections.

The Resume navigation opens `/cv/`, rendered directly from YAML. There is no downloadable resume attachment to maintain. The retired `/assets/pdf/resume.pdf` URL redirects to `/cv/` in Astro and Vercel; the historical file remains in the Jekyll archive.

Replace `src/assets/portrait.jpg` to change the photograph; Astro regenerates optimised variants on the next build.

Run `npm run build` after content changes. Required fields, URL formats, and publication references are checked before deployment.
