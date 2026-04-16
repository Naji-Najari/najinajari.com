"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  systemTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
}

export const THEME_COOKIE = "theme";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year
const ThemeContext = createContext<ThemeContextValue | null>(null);

function readCookieTheme(fallback: Theme): Theme {
  if (typeof document === "undefined") return fallback;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${THEME_COOKIE}=([^;]+)`),
  );
  const value = match?.[1];
  if (value === "light" || value === "dark" || value === "system") return value;
  return fallback;
}

function writeCookieTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  document.cookie = `${THEME_COOKIE}=${theme}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`;
}

function readSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeProvider({
  children,
  initialTheme,
  defaultTheme = "light",
}: {
  children: ReactNode;
  /** Theme resolved on the server from the cookie (hydration-safe). */
  initialTheme?: Theme;
  defaultTheme?: Theme;
}) {
  const [theme, setThemeState] = useState<Theme>(
    () => initialTheme ?? readCookieTheme(defaultTheme),
  );
  const [systemTheme, setSystemThemeState] = useState<ResolvedTheme>(() =>
    readSystemTheme(),
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const updateSystem = () =>
      setSystemThemeState(mq.matches ? "dark" : "light");
    mq.addEventListener("change", updateSystem);
    return () => mq.removeEventListener("change", updateSystem);
  }, []);

  const resolvedTheme: ResolvedTheme =
    theme === "system" ? systemTheme : theme;

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      resolvedTheme === "dark",
    );
  }, [resolvedTheme]);

  const setTheme = useCallback((next: Theme) => {
    writeCookieTheme(next);
    setThemeState(next);
  }, []);

  return (
    <ThemeContext.Provider
      value={{ theme, resolvedTheme, systemTheme, setTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within <ThemeProvider>");
  }
  return ctx;
}
