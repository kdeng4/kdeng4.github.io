import { getCollection, getEntry } from "astro:content";

export async function getSite() {
  const entry = await getEntry("site", "main");
  if (!entry) throw new Error("content/site.yaml must contain a main entry.");
  return entry.data;
}

export async function getCV() {
  const entry = await getEntry("cv", "main");
  if (!entry) throw new Error("content/cv.yaml must contain a main entry.");
  return entry.data;
}

export async function getProjects() {
  const entries = await getCollection("projects");
  return entries.sort((a, b) => a.data.order - b.data.order || a.id.localeCompare(b.id));
}

export async function getPublications() {
  const entries = await getCollection("publications");
  return entries.sort((a, b) => Number(b.data.year) - Number(a.data.year) || a.id.localeCompare(b.id));
}
