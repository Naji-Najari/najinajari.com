"use client";

import { useCallback, useEffect, useState } from "react";
import { useSectionObserver } from "@/hooks/use-section-observer";

/**
 * Tracks which section is currently in view by observing every section id.
 * Returns the latest section id that crossed the threshold, falling back to
 * `defaultSection` when the observer is disabled.
 */
export function useActiveSection({
  sectionIds,
  enabled,
  defaultSection,
}: {
  sectionIds: readonly string[];
  enabled: boolean;
  defaultSection: string;
}) {
  const [activeSection, setActiveSection] = useState(defaultSection);

  useEffect(() => {
    if (!enabled) setActiveSection(defaultSection);
  }, [enabled, defaultSection]);

  const handleIntersect = useCallback((id: string) => {
    setActiveSection(id);
  }, []);

  useSectionObserver({
    sectionIds,
    onIntersect: handleIntersect,
    enabled,
  });

  return activeSection;
}
