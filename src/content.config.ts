import { defineCollection, reference } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

const text = z.string().trim().min(1);
const link = z.object({
  label: text,
  href: text.refine((value) => /^(https:\/\/|\/(?!\/)|mailto:)/.test(value), "Use an HTTPS, local, or email link"),
});
const section = z.object({
  title: text,
  paragraphs: z.array(text).min(1),
  bullets: z.array(text).optional(),
});

const site = defineCollection({
  loader: file("content/site.yaml"),
  schema: z.object({
    name: text,
    fullName: text,
    initials: text,
    url: z.url(),
    language: text,
    description: text,
    email: z.email(),
    location: text,
    role: text,
    employer: text,
    employerUrl: z.url(),
    resume: text,
    searchConsoleVerification: text,
    analytics: z.object({ enabled: z.boolean(), googleId: z.string().regex(/^G-[A-Z0-9]+$/) }),
    navigation: z.array(link),
    social: z.array(link),
    home: z.object({
      eyebrow: text,
      heading: text,
      accent: text,
      introduction: text,
      primaryAction: text,
      secondaryAction: text,
      portraitCaption: z.array(text).min(1),
      currentLabel: text,
      currentDescription: text,
      projectsTitle: text,
      projectsDescription: text,
      researchTitle: text,
      researchDescription: text,
      aboutTitle: text,
      aboutDescription: text,
      aboutLink: text,
    }),
    projects: z.object({ eyebrow: text, title: text, description: text }),
    research: z.object({ eyebrow: text, title: text, description: text }),
    about: z.object({ eyebrow: text, title: text, introduction: text, paragraphs: z.array(text).min(1) }),
    contact: z.object({ eyebrow: text, title: text, description: text }),
    footer: text,
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "*.yaml", base: "./content/projects" }),
  schema: z.object({
    title: text,
    shortTitle: text,
    category: text,
    year: z.string().regex(/^\d{4}$/),
    period: text,
    context: text,
    role: text,
    featured: z.boolean(),
    order: z.number().int().positive(),
    summary: text,
    outcome: text,
    stack: z.array(text).min(1),
    sections: z.array(section).min(1),
    links: z.array(link),
  }),
});

const publications = defineCollection({
  loader: glob({ pattern: "*.yaml", base: "./content/publications" }),
  schema: z.object({
    title: text,
    shortTitle: text,
    year: z.string().regex(/^\d{4}$/),
    venue: text,
    authors: z.array(text).min(1),
    description: text,
    href: z.url(),
    doi: text,
    project: reference("projects"),
  }),
});

const cv = defineCollection({
  loader: file("content/cv.yaml"),
  schema: z.object({
    experience: z.array(
      z.object({
        company: text,
        position: text,
        location: text,
        start: text,
        end: text,
        summary: text,
        highlights: z.array(text),
      })
    ),
    education: z.array(
      z.object({
        institution: text,
        degree: text,
        area: text,
        start: text,
        end: text,
        url: z.url(),
        score: text,
        courses: z.string().optional(),
      })
    ),
    skills: z.array(z.object({ name: text, items: z.array(text).min(1) })),
    languages: z.array(z.object({ name: text, proficiency: text })),
    interests: z.array(z.object({ name: text, items: z.array(text) })),
  }),
});

export const collections = { site, projects, publications, cv };
