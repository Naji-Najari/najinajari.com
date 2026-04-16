"use client";

import { useCallback } from "react";
import { useAptabase } from "@aptabase/react";

type EventProps = Record<string, string | number | boolean | undefined | null>;

type EventName =
  | "page_view"
  | "section_view"
  | "dock_click"
  | "theme_toggle"
  | "language_switch"
  | "external_link_click"
  | "blog_card_click"
  | "chatbot_open"
  | "chatbot_message_sent"
  | "chatbot_error"
  | "contact_submit";

function sanitize(props?: EventProps) {
  if (!props) return undefined;
  const clean: Record<string, string | number | boolean> = {};
  for (const [k, v] of Object.entries(props)) {
    if (v === undefined || v === null) continue;
    clean[k] = v;
  }
  return clean;
}

export function useTrack() {
  const { trackEvent } = useAptabase();

  return useCallback(
    (name: EventName, props?: EventProps) => {
      const cleaned = sanitize(props);
      if (process.env.NODE_ENV === "development") {
        console.log(`[Aptabase - Dev] ${name}`, cleaned ?? {});
        return;
      }
      trackEvent(name, cleaned);
    },
    [trackEvent],
  );
}
