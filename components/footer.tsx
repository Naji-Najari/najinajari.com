"use client";

import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="py-8 text-center border-t border-border">
      <p className="text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Naji Najari. {t("built_with")}
      </p>
    </footer>
  );
}
