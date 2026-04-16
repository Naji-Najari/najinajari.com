import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock3 } from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card";
import { BlogCover } from "@/components/blog-cover";
import type { PostMeta } from "@/lib/blog";

interface BlogCardProps {
  post: PostMeta;
  readMoreLabel: string;
}

function formatDate(iso: string, locale: string) {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function BlogCard({ post, readMoreLabel }: BlogCardProps) {
  return (
    <Link
      href={`/${post.locale}/blog/${post.slug}`}
      className="group block h-full focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:rounded-xl"
      aria-label={post.title}
    >
      <MagicCard
        className="h-full rounded-xl transition-transform duration-300 group-hover:-translate-y-0.5"
        gradientColor="#2563eb08"
        gradientFrom="#2563eb"
        gradientTo="#3b82f6"
      >
        <div className="flex flex-col h-full">
          <div className="transition-transform duration-500 group-hover:scale-[1.02] origin-center">
            <BlogCover
              post={post}
              aspect="16/9"
              rounded="rounded-t-xl"
              sizes="(max-width: 768px) 85vw, (max-width: 1024px) 45vw, 30vw"
            />
          </div>

          <div className="p-6 flex flex-col flex-1">
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="size-3.5" aria-hidden />
                {formatDate(post.date, post.locale)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="size-3.5" aria-hidden />
                {post.readingTime}
              </span>
            </div>

            <h3 className="text-base font-bold text-foreground mb-2 line-clamp-2">
              {post.title}
            </h3>

            <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5 line-clamp-3">
              {post.description}
            </p>

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center text-xs px-2.5 py-1 rounded-lg border border-neutral-200 dark:border-neutral-800 text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-sky mt-auto">
              {readMoreLabel}
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </MagicCard>
    </Link>
  );
}
