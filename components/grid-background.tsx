"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/components/theme-provider";
import Gridlines from "react-gridlines";

export function GridBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setMounted(true);
    setWindowWidth(window.innerWidth);

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  let cellSize = 32;
  if (windowWidth < 640) cellSize = 20;
  else if (windowWidth < 1024) cellSize = 24;

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    >
      <Gridlines
        cellWidth={cellSize}
        cellHeight={cellSize}
        strokeWidth={isDark ? 1.2 : 2}
        lineColor={isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.04)"}
        className="w-full h-full"
      />
    </div>
  );
}
