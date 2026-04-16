"use client";

import { useEffect, useRef } from "react";
import { navItems } from "@/lib/data";
import { useTrack } from "@/hooks/use-track";

/**
 * Mounts IntersectionObservers on every homepage section (ids taken from
 * navItems) and fires `section_view` the first time each section becomes at
 * least 50% visible. One-shot per page load.
 */
export function SectionTracker() {
  const track = useTrack();
  const seenRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          if (seenRef.current.has(id)) return;
          seenRef.current.add(id);
          track("section_view", { section: id });
        },
        { threshold: 0.5 },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [track]);

  return null;
}
