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

const STORAGE_KEY = "theme";
const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({
  children,
  defaultTheme = "light",
}: {
  children: ReactNode;
  defaultTheme?: Theme;
}) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [systemTheme, setSystemThemeState] =
    useState<ResolvedTheme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (stored === "light" || stored === "dark" || stored === "system") {
        setThemeState(stored);
      }
    } catch {
      // storage unavailable
    }

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const updateSystem = () =>
      setSystemThemeState(mq.matches ? "dark" : "light");
    updateSystem();
    mq.addEventListener("change", updateSystem);
    setMounted(true);
    return () => mq.removeEventListener("change", updateSystem);
  }, []);

  const resolvedTheme: ResolvedTheme =
    theme === "system" ? systemTheme : theme;

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle(
      "dark",
      resolvedTheme === "dark",
    );
  }, [mounted, resolvedTheme]);

  const setTheme = useCallback((next: Theme) => {
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // storage unavailable
    }
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
    return {
      theme: "light",
      resolvedTheme: "light",
      systemTheme: "light",
      setTheme: () => {},
    };
  }
  return ctx;
}

/**
 * Inline script body injected server-side into <head>, runs before hydration
 * to prevent theme flash (FOUC). Reads localStorage, sets class="dark" on <html>.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('${STORAGE_KEY}')||'light';var d=t==='system'?(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):t;if(d==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`;
