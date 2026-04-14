import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://najinajari.com";

  return routing.locales.map((locale) => ({
    url: locale === routing.defaultLocale ? baseUrl : `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 1,
  }));
}
