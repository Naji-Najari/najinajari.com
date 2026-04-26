import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getAllPosts } from "@/lib/blog";

const baseUrl = "https://najinajari.com";

function urlFor(locale: string, path = "") {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${baseUrl}${prefix}${path}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const homeEntries: MetadataRoute.Sitemap = routing.locales.map((locale) => ({
    url: urlFor(locale),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 1,
  }));

  const blogIndexEntries: MetadataRoute.Sitemap = routing.locales.map(
    (locale) => ({
      url: urlFor(locale, "/blog"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    }),
  );

  const projectEntries: MetadataRoute.Sitemap = routing.locales.map(
    (locale) => ({
      url: urlFor(locale, "/projects/career-copilot"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  const postEntries: MetadataRoute.Sitemap = (
    await Promise.all(
      routing.locales.map(async (locale) => {
        const posts = await getAllPosts(locale);
        return posts.map((post) => ({
          url: urlFor(locale, `/blog/${post.slug}`),
          lastModified: post.date ? new Date(post.date) : now,
          changeFrequency: "monthly" as const,
          priority: 0.6,
        }));
      }),
    )
  ).flat();

  return [
    ...homeEntries,
    ...blogIndexEntries,
    ...projectEntries,
    ...postEntries,
  ];
}
