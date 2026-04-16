import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock3 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Dock from "@/components/dock";
import Footer from "@/components/footer";
import { BlogCover } from "@/components/blog-cover";
import { GridBackground } from "@/components/grid-background";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { routing, type Locale } from "@/i18n/routing";

type Params = { locale: Locale; slug: string };

function formatDate(iso: string, locale: string) {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export async function generateStaticParams() {
  const entries = await Promise.all(
    routing.locales.map(async (locale) => {
      const slugs = await getAllSlugs(locale);
      return slugs.map((slug) => ({ locale, slug }));
    }),
  );
  return entries.flat();
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPostBySlug(locale, slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
      url: `/${locale}/blog/${slug}`,
      images: post.image ? [post.image] : ["/photo.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params;
  const post = await getPostBySlug(locale, slug);
  if (!post) notFound();

  let Post: React.ComponentType;
  try {
    const mod = await import(`@/content/blog/${locale}/${slug}.mdx`);
    Post = mod.default;
  } catch {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "blog" });

  return (
    <>
      <GridBackground />
      <Dock />
      <main className="relative pt-28 pb-20 px-6">
        <article className="max-w-3xl mx-auto">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 rounded-md px-1"
          >
            <ArrowLeft className="size-4" />
            {t("back_to_blog")}
          </Link>

          <div className="mb-10">
            <BlogCover
              post={post}
              aspect="2/1"
              rounded="rounded-2xl"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>

          <header className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4">
              {post.title}
            </h1>
            {post.description && (
              <p className="text-base text-muted-foreground leading-relaxed mb-5">
                {post.description}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="size-4" aria-hidden />
                {formatDate(post.date, post.locale)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="size-4" aria-hidden />
                {post.readingTime}
              </span>
            </div>
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center text-xs px-2.5 py-1 rounded-lg border border-neutral-200 dark:border-neutral-800 text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:text-foreground prose-p:text-foreground/90 prose-a:text-primary-sky prose-strong:text-foreground">
            <Post />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
