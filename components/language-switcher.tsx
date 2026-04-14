"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

const locales = [
  { code: "en", flag: "🇬🇧", label: "English" },
  { code: "fr", flag: "🇫🇷", label: "Français" },
  { code: "ar", flag: "🇸🇦", label: "العربية" },
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) {
      setOpen(false);
      return;
    }
    const segments = pathname.split("/");
    if (["en", "fr", "ar"].includes(segments[1])) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    router.replace(segments.join("/") || "/");
    setOpen(false);
  };

  const current = locales.find((l) => l.code === locale) || locales[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center size-9 rounded-full text-sm hover:bg-muted transition-colors"
        aria-label="Switch language"
      >
        {current.flag}
      </button>
      {open && (
        <div className="absolute top-full mt-2 right-0 bg-background border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-lg overflow-hidden z-[9999] min-w-[140px]">
          {locales.map((l) => (
            <button
              key={l.code}
              onClick={() => switchLocale(l.code)}
              className={`flex items-center gap-2.5 w-full px-3 py-2 text-sm hover:bg-muted transition-colors ${
                locale === l.code
                  ? "font-semibold text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              <span>{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
