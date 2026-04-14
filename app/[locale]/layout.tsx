import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { ThemeProvider } from "@/components/theme-provider";
import { AptabaseClient } from "@/components/analytics/aptabase-client";
import { PostHogProvider, PostHogPageView } from "@/components/analytics/posthog-provider";
import { Suspense } from "react";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

type LocaleParams = { locale: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<LocaleParams>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "en" | "fr" | "ar")) {
    return {};
  }
  const t = await getTranslations({ locale, namespace: "metadata" });
  const ogLocaleMap: Record<string, string> = {
    en: "en_US",
    fr: "fr_FR",
    ar: "ar_AR",
  };

  return {
    title: t("title"),
    description: t("description"),
    keywords: [
      "AI Engineer",
      "Senior AI Engineer",
      "Multi-Agent Systems",
      "RAG",
      "LangGraph",
      "Google ADK",
      "LLMOps",
      "MLOps",
      "Freelance AI Engineer",
      "PhD Machine Learning",
      "Langfuse",
      "Naji Najari",
    ],
    authors: [{ name: "Naji Najari" }],
    creator: "Naji Najari",
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        fr: "/fr",
        ar: "/ar",
        "x-default": "/en",
      },
    },
    openGraph: {
      title: t("og_title"),
      description: t("og_description"),
      url: `/${locale}`,
      siteName: "Naji Najari",
      locale: ogLocaleMap[locale] ?? "en_US",
      type: "website",
      images: ["/photo.jpg"],
    },
    twitter: {
      card: "summary",
      title: t("twitter_title"),
      description: t("twitter_description"),
      images: ["/photo.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<LocaleParams>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "fr" | "ar")) {
    notFound();
  }

  const messages = (await import(`../../messages/${locale}.json`)).default;
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} className="font-sans" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <PostHogProvider>
            <Suspense fallback={null}>
              <PostHogPageView />
            </Suspense>
            <AptabaseClient>
              <NextIntlClientProvider locale={locale} messages={messages}>
                {children}
              </NextIntlClientProvider>
            </AptabaseClient>
          </PostHogProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
