"use client";

import { useState } from "react";
import { AnimatePresence, motion, type MotionValue } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useDockHoverWidth } from "@/hooks/use-dock-hover-width";
import { useTrack } from "@/hooks/use-track";

export function ThemeToggle({ mouseX }: { mouseX: MotionValue<number> }) {
  const { resolvedTheme, setTheme } = useTheme();
  const track = useTrack();
  const [hovered, setHovered] = useState(false);
  const { ref, width } = useDockHoverWidth(mouseX);

  const handleToggle = () => {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    track("theme_toggle", { to: next });
    setTheme(next);
  };

  return (
    <motion.button
      ref={ref}
      style={{ width, height: width }}
      onClick={handleToggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-colors"
      aria-label="Toggle theme"
      aria-pressed={resolvedTheme === "dark"}
    >
      {resolvedTheme === "dark" ? (
        <Sun className="size-5" />
      ) : (
        <Moon className="size-5" />
      )}
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -top-8 text-xs font-medium bg-foreground text-background px-2 py-1 rounded-md whitespace-nowrap pointer-events-none"
          >
            Theme
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
