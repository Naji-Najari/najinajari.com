"use client";

import { useEffect } from "react";

interface Options {
  sectionIds: readonly string[];
  onIntersect: (id: string) => void;
  enabled?: boolean;
  threshold?: number;
  rootMargin?: string;
}

/**
 * Observes all elements with the given ids via a single IntersectionObserver.
 * Fires `onIntersect(id)` every time a section crosses the threshold.
 *
 * Consumers decide whether to treat each call as state update (active section)
 * or as a one-shot event (analytics). Pass a memoised `onIntersect` to avoid
 * re-creating the observer on every render.
 */
export function useSectionObserver({
  sectionIds,
  onIntersect,
  enabled = true,
  threshold = 0.3,
  rootMargin = "-80px 0px 0px 0px",
}: Options) {
  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) onIntersect(entry.target.id);
        }
      },
      { threshold, rootMargin },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [enabled, sectionIds, onIntersect, threshold, rootMargin]);
}
