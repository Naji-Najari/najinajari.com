"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BlogCard } from "@/components/blog-card";
import type { PostMeta } from "@/lib/blog";

interface BlogCarouselProps {
  posts: PostMeta[];
  readMoreLabel: string;
  prevLabel: string;
  nextLabel: string;
}

export function BlogCarousel({
  posts,
  readMoreLabel,
  prevLabel,
  nextLabel,
}: BlogCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateBounds = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const atStart = el.scrollLeft <= 4;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    setCanPrev(!atStart);
    setCanNext(!atEnd);
  }, []);

  useEffect(() => {
    updateBounds();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateBounds, { passive: true });
    window.addEventListener("resize", updateBounds);
    return () => {
      el.removeEventListener("scroll", updateBounds);
      window.removeEventListener("resize", updateBounds);
    };
  }, [updateBounds, posts.length]);

  const scroll = (direction: "prev" | "next") => {
    const el = scrollerRef.current;
    if (!el) return;
    const offset = el.clientWidth * 0.85;
    el.scrollBy({
      left: direction === "next" ? offset : -offset,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      <div className="hidden md:flex gap-2 absolute -top-14 right-0">
        <button
          type="button"
          onClick={() => scroll("prev")}
          disabled={!canPrev}
          aria-label={prevLabel}
          className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-background/70 backdrop-blur-sm text-foreground transition-all hover:bg-accent hover:text-accent-foreground disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => scroll("next")}
          disabled={!canNext}
          aria-label={nextLabel}
          className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-background/70 backdrop-blur-sm text-foreground transition-all hover:bg-accent hover:text-accent-foreground disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {posts.map((post) => (
          <div
            key={`${post.locale}-${post.slug}`}
            className="snap-start shrink-0 w-[85%] md:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)]"
          >
            <BlogCard post={post} readMoreLabel={readMoreLabel} source="carousel" />
          </div>
        ))}
      </div>
    </div>
  );
}
