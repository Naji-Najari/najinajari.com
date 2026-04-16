import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import readingTime from "reading-time";
import { imageSize } from "image-size";
import type { Locale } from "@/i18n/routing";

export type { Locale };

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  featured: boolean;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  readingTime: string;
  locale: Locale;
}

async function resolveImageDimensions(
  imagePath: string | undefined,
): Promise<{ width: number; height: number } | null> {
  if (!imagePath || !imagePath.startsWith("/")) return null;
  try {
    const fullPath = path.join(process.cwd(), "public", imagePath);
    const buffer = await fs.readFile(fullPath);
    const { width, height } = imageSize(buffer);
    if (!width || !height) return null;
    return { width, height };
  } catch {
    return null;
  }
}

const BLOG_DIR = path.join(process.cwd(), "content/blog");

async function readMeta(locale: Locale, file: string): Promise<PostMeta> {
  const slug = file.replace(/\.mdx$/, "");
  const source = await fs.readFile(path.join(BLOG_DIR, locale, file), "utf-8");
  const { data, content } = matter(source);
  const image = data.image ? String(data.image) : undefined;
  const dimensions = await resolveImageDimensions(image);
  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    featured: Boolean(data.featured),
    image,
    imageWidth: dimensions?.width,
    imageHeight: dimensions?.height,
    readingTime: readingTime(content).text,
    locale,
  };
}

export const getAllPosts = cache(
  async (locale: Locale): Promise<PostMeta[]> => {
    try {
      const files = await fs.readdir(path.join(BLOG_DIR, locale));
      const posts = await Promise.all(
        files
          .filter((f) => f.endsWith(".mdx"))
          .map((f) => readMeta(locale, f)),
      );
      return posts.sort((a, b) => b.date.localeCompare(a.date));
    } catch {
      return [];
    }
  },
);

export const getPostBySlug = cache(
  async (locale: Locale, slug: string): Promise<PostMeta | null> => {
    try {
      return await readMeta(locale, `${slug}.mdx`);
    } catch {
      return null;
    }
  },
);

export const getAllSlugs = cache(async (locale: Locale): Promise<string[]> => {
  try {
    const files = await fs.readdir(path.join(BLOG_DIR, locale));
    return files
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => f.replace(/\.mdx$/, ""));
  } catch {
    return [];
  }
});
