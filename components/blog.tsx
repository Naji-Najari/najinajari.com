import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { BlurFade } from "@/components/ui/blur-fade";
import { BlogCarousel } from "@/components/blog-carousel";
import { getAllPosts, type Locale } from "@/lib/blog";

const PREVIEW_COUNT = 5;

export default async function Blog() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("blog");

  const posts = await getAllPosts(locale);
  if (posts.length === 0) return null;

  return (
    <section id="blog" className="py-20 md:py-28 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <BlurFade delay={0.1} inView>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground heading-underline inline-block">
              {t("title")}
            </h2>
            <p className="mt-4 text-sm text-muted-foreground max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.2} inView>
          <BlogCarousel
            posts={posts.slice(0, PREVIEW_COUNT)}
            readMoreLabel={t("read_more")}
            prevLabel={t("prev")}
            nextLabel={t("next")}
          />
        </BlurFade>

        <BlurFade delay={0.3} inView>
          <div className="mt-10 flex justify-center">
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-sky hover:underline focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 rounded-md px-1"
            >
              {t("see_all")}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
