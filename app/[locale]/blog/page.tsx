import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Dock from "@/components/dock";
import Footer from "@/components/footer";
import { BlurFade } from "@/components/ui/blur-fade";
import { BlogCard } from "@/components/blog-card";
import { GridBackground } from "@/components/grid-background";
import { getAllPosts, type Locale } from "@/lib/blog";
import { routing } from "@/i18n/routing";

type Params = { locale: string };

function assertLocale(value: string): asserts value is Locale {
  if (!routing.locales.includes(value as Locale)) notFound();
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale } = await params;
  assertLocale(locale);
  const t = await getTranslations({ locale, namespace: "blog" });
  return {
    title: t("metadata_title"),
    description: t("metadata_description"),
    alternates: {
      canonical: `/${locale}/blog`,
      languages: {
        en: "/en/blog",
        fr: "/fr/blog",
        ar: "/ar/blog",
        "x-default": "/en/blog",
      },
    },
    openGraph: {
      title: t("metadata_title"),
      description: t("metadata_description"),
      url: `/${locale}/blog`,
      type: "website",
      images: ["/photo.jpg"],
    },
  };
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale } = await params;
  assertLocale(locale);
  const t = await getTranslations({ locale, namespace: "blog" });
  const posts = await getAllPosts(locale);

  return (
    <>
      <GridBackground />
      <Dock />
      <main className="relative pt-28 pb-20 px-6 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <BlurFade delay={0.1} inView>
            <div className="text-center mb-16">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground heading-underline inline-block">
                {t("title")}
              </h1>
              <p className="mt-4 text-sm text-muted-foreground max-w-2xl mx-auto">
                {t("subtitle")}
              </p>
            </div>
          </BlurFade>

          {posts.length === 0 ? (
            <BlurFade delay={0.2} inView>
              <p className="text-center text-sm text-muted-foreground py-16">
                {t("no_posts")}
              </p>
            </BlurFade>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <BlurFade
                  key={post.slug}
                  delay={0.1 + index * 0.05}
                  inView
                  className="h-full"
                >
                  <BlogCard post={post} readMoreLabel={t("read_more")} />
                </BlurFade>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
