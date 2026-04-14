import { NextIntlClientProvider, useMessages } from "next-intl";
import { getLocale } from "next-intl/server";
import { ThemeProvider } from "@/components/theme-provider";
import { AptabaseClient } from "@/components/analytics/aptabase-client";
import { PostHogProvider, PostHogPageView } from "@/components/analytics/posthog-provider";
import { Suspense } from "react";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
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
