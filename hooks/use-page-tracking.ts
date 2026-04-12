"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useAptabase } from "@aptabase/react";

export function usePageTracking() {
  const pathname = usePathname();
  const { trackEvent } = useAptabase();
  const lastPathnameRef = useRef<string | null>(null);

  useEffect(() => {
    lastPathnameRef.current = pathname;

    const timeoutId = setTimeout(() => {
      if (process.env.NODE_ENV === "development") {
        console.log("[Aptabase - Dev] page_view", { pathname });
        return;
      }

      trackEvent("page_view", {
        page_title: document.title,
        page_path: pathname,
      });
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname, trackEvent]);
}
