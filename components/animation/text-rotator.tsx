"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { useTheme } from "@/components/theme-provider";
import { Highlighter } from "@/components/ui/highlighter";

export default function TextRotator() {
  const t = useTranslations("hero");
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
      {t("role_prefix")}{" "}
      {ready ? (
        <Highlighter
          action="highlight"
          color={highlightColor}
          animationDuration={1500}
          padding={5}
        >
          <span className="font-bold text-foreground">{t("role")}</span>
        </Highlighter>
      ) : (
        <span className="font-bold text-foreground">{t("role")}</span>
      )}
    </p>
  );
}
