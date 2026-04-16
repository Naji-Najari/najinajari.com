"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTrack } from "@/hooks/use-track";

/**
 * Fires a `page_view` event (through the typed `useTrack` wrapper, which
 * handles the dev/prod split and sanitisation) on every pathname change.
 */
export function usePageTracking() {
  const pathname = usePathname();
  const track = useTrack();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      track("page_view", {
        page_title: typeof document !== "undefined" ? document.title : "",
        page_path: pathname,
      });
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname, track]);
}
