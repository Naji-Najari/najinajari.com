"use client";

import Link from "next/link";
import { useTrack } from "@/hooks/use-track";
import type { ReactNode } from "react";

interface BlogCardLinkProps {
  href: string;
  slug: string;
  locale: string;
  source: "carousel" | "listing";
  label: string;
  children: ReactNode;
}

export function BlogCardLink({
  href,
  slug,
  locale,
  source,
  label,
  children,
}: BlogCardLinkProps) {
  const track = useTrack();
  return (
    <Link
      href={href}
      onClick={() => track("blog_card_click", { slug, source, locale })}
      className="group block h-full focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:rounded-xl"
      aria-label={label}
    >
      {children}
    </Link>
  );
}
