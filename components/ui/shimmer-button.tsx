"use client";

import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ShimmerStyleProps {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
}

interface ShimmerLinkProps extends ShimmerStyleProps {
  href: string;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
}

const SHELL =
  "group relative z-0 inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden border border-foreground/10 px-6 py-3 whitespace-nowrap text-background transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px";

function ShimmerLayers() {
  return (
    <>
      {/* Spark container */}
      <div
        aria-hidden
        className="absolute inset-0 -z-30 overflow-visible blur-[2px] [container-type:size]"
      >
        <div className="animate-shimmer-slide absolute inset-0 aspect-square h-[100cqh]">
          <div className="animate-spin-around absolute -inset-full w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))]" />
        </div>
      </div>
      {/* Inner highlight */}
      <span
        aria-hidden
        className="absolute inset-0 size-full rounded-[inherit] shadow-[inset_0_-8px_10px_#ffffff1f] transition-shadow duration-300 ease-in-out group-hover:shadow-[inset_0_-6px_10px_#ffffff3f] group-active:shadow-[inset_0_-10px_10px_#ffffff3f]"
      />
      {/* Backdrop (covers everything except the shimmer perimeter strip) */}
      <span
        aria-hidden
        className="absolute -z-20 rounded-[inherit] [background:var(--bg)]"
        style={{ inset: "var(--cut)" }}
      />
    </>
  );
}

function buildStyle({
  shimmerColor,
  shimmerSize,
  borderRadius,
  shimmerDuration,
  background,
}: Required<ShimmerStyleProps>): CSSProperties {
  return {
    "--spread": "90deg",
    "--shimmer-color": shimmerColor,
    "--speed": shimmerDuration,
    "--cut": shimmerSize,
    "--bg": background,
    borderRadius,
  } as CSSProperties;
}

export function ShimmerLink({
  href,
  external,
  className,
  ariaLabel,
  shimmerColor = "var(--background)",
  shimmerSize = "0.05em",
  shimmerDuration = "3s",
  borderRadius = "8px",
  background = "var(--foreground)",
  children,
}: ShimmerLinkProps) {
  const style = buildStyle({
    shimmerColor,
    shimmerSize,
    borderRadius,
    shimmerDuration,
    background,
  });
  const cls = cn(SHELL, "text-sm font-medium", className);

  const content = (
    <>
      <ShimmerLayers />
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        style={style}
        className={cls}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} aria-label={ariaLabel} style={style} className={cls}>
      {content}
    </Link>
  );
}
