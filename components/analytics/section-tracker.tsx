"use client";

import { useCallback, useRef } from "react";
import { navItems } from "@/lib/data";
import { useSectionObserver } from "@/hooks/use-section-observer";
import { useTrack } from "@/hooks/use-track";

const sectionIds = navItems.map((item) => item.id);

/**
 * Fires `section_view` the first time each homepage section becomes at least
 * 50% visible. One-shot per page load.
 */
export function SectionTracker() {
  const track = useTrack();
  const seenRef = useRef<Set<string>>(new Set());

  const handleIntersect = useCallback(
    (id: string) => {
      if (seenRef.current.has(id)) return;
      seenRef.current.add(id);
      track("section_view", { section: id });
    },
    [track],
  );

  useSectionObserver({
    sectionIds,
    onIntersect: handleIntersect,
    threshold: 0.5,
  });

  return null;
}
