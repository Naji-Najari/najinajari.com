"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Highlighter } from "@/components/ui/highlighter";

export default function TextRotator() {
  const [ready, setReady] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const highlightColor = mounted && resolvedTheme === "dark" ? "#1e3a5f" : "#bfdbfe";

  return (
    <p className="text-xl sm:text-3xl font-medium text-muted-foreground">
      I am a{" "}
      {ready ? (
        <Highlighter
          action="highlight"
          color={highlightColor}
          animationDuration={1500}
          padding={5}
        >
          <span className="font-bold text-foreground">Senior AI Engineer</span>
        </Highlighter>
      ) : (
        <span className="font-bold text-foreground">Senior AI Engineer</span>
      )}
    </p>
  );
}
