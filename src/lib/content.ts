import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";

const contentDir = path.join(process.cwd(), "content");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  content: string;
  readingTime: number;
  draft?: boolean;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  tag: string;
  status: "live" | "beta" | "archived";
  url?: string;
  github?: string;
  content: string;
}

function readingTimeFrom(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

function isProjectStatus(value: unknown): value is Project["status"] {
  return value === "live" || value === "beta" || value === "archived";
}

export const getBlogPosts = cache(function getBlogPosts(): BlogPost[] {
  const dir = path.join(contentDir, "blog");
  if (!fs.existsSync(dir)) return [];

  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug: file.replace(/\.md$/, ""),
        title: data.title ?? "",
        date: data.date ?? "",
        description: data.description ?? "",
        tags: data.tags ?? [],
        content,
        readingTime: readingTimeFrom(content),
        draft: Boolean(data.draft),
      };
    })
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});

export function getBlogPost(slug: string): BlogPost | undefined {
  return getBlogPosts().find((p) => p.slug === slug);
}

export function getAdjacentPosts(slug: string) {
  const posts = getBlogPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) return { newer: undefined, older: undefined };

  return {
    newer: index > 0 ? posts[index - 1] : undefined,
    older: index < posts.length - 1 ? posts[index + 1] : undefined,
  };
}

export function slugifyTag(tag: string) {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const TAG_LABELS: Record<string, string> = {
  ai: "AI",
  building: "Building",
  engineering: "Engineering",
  life: "Life",
  marketing: "Marketing",
  productivity: "Productivity",
  react: "React",
};

export function formatTagLabel(tag: string) {
  const slug = slugifyTag(tag);
  if (TAG_LABELS[slug]) return TAG_LABELS[slug];
  return tag
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function getTags() {
  const tags = new Map<string, { slug: string; label: string; count: number }>();

  for (const post of getBlogPosts()) {
    for (const tag of post.tags) {
      const slug = slugifyTag(tag);
      if (!slug) continue;
      const existing = tags.get(slug);
      if (existing) {
        existing.count += 1;
      } else {
        tags.set(slug, { slug, label: formatTagLabel(tag), count: 1 });
      }
    }
  }

  return [...tags.values()].sort(
    (a, b) => b.count - a.count || a.label.localeCompare(b.label),
  );
}

export function getPostsByTag(tagSlug: string) {
  const slug = slugifyTag(tagSlug);
  return getBlogPosts().filter((post) =>
    post.tags.some((tag) => slugifyTag(tag) === slug),
  );
}

export function getTag(tagSlug: string) {
  return getTags().find((tag) => tag.slug === slugifyTag(tagSlug));
}

export const getProjects = cache(function getProjects(): Project[] {
  const dir = path.join(contentDir, "projects");
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md") && !f.startsWith("_"));

  const statusOrder = { live: 0, beta: 1, archived: 2 };

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug: file.replace(/\.md$/, ""),
        title: data.title ?? "",
        description: data.description ?? "",
        tag: data.tag ?? "",
        status: isProjectStatus(data.status) ? data.status : "live",
        url: data.url,
        github: data.github,
        content,
      } satisfies Project;
    })
    .sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
});

export function getProject(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}
