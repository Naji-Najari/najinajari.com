"use client";

import { useState } from "react";
import {
  motion,
  useMotionValue,
  AnimatePresence,
  type MotionValue,
} from "framer-motion";
import {
  Home,
  User,
  Briefcase,
  Code2,
  BookOpen,
  Layers,
  Mail,
  Newspaper,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { navItems } from "@/lib/data";
import { useLocale, useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { useActiveSection } from "@/hooks/use-active-section";
import { useDockHoverWidth } from "@/hooks/use-dock-hover-width";
import { useTrack } from "@/hooks/use-track";

const iconMap: Record<string, React.ElementType> = {
  Home,
  User,
  Briefcase,
  Code2,
  BookOpen,
  Layers,
  Mail,
  Newspaper,
};

const sectionIds = navItems.map((item) => item.id);

function DockItem({
  icon: Icon,
  label,
  isActive,
  onClick,
  mouseX,
}: {
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  onClick: () => void;
  mouseX: MotionValue<number>;
}) {
  const [hovered, setHovered] = useState(false);
  const { ref, width } = useDockHoverWidth(mouseX);

  return (
    <motion.button
      ref={ref}
      style={{ width, height: width }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative flex items-center justify-center rounded-full transition-colors ${
        isActive
          ? "bg-primary-sky/15 text-primary-sky border border-primary-sky/30"
          : "text-muted-foreground hover:text-foreground"
      }`}
      aria-label={label}
    >
      <Icon className="size-5" />
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -top-8 text-xs font-medium bg-foreground text-background px-2 py-1 rounded-md whitespace-nowrap pointer-events-none"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export default function Dock() {
  const mouseX = useMotionValue(Infinity);
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === `/${locale}` || pathname === "/";
  const isBlogRoute = pathname.startsWith(`/${locale}/blog`);
  const defaultSection = isBlogRoute ? "blog" : "home";
  const activeSection = useActiveSection({
    sectionIds,
    enabled: isHome,
    defaultSection,
  });
  const t = useTranslations("nav");
  const track = useTrack();

  const handleNav = (id: string) => {
    track("dock_click", { section: id, from_home: isHome });
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (id === "blog" && isBlogRoute) {
      if (pathname !== `/${locale}/blog`) {
        router.push(`/${locale}/blog`);
      }
      return;
    }
    router.push(`/${locale}${id === "home" ? "" : `#${id}`}`);
  };

  return (
    <motion.nav
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-end gap-0.5 sm:gap-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-background/70 backdrop-blur-xl border-2 border-border rounded-2xl shadow-lg overflow-visible"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 }}
    >
      {navItems.map((item) => (
        <DockItem
          key={item.id}
          icon={iconMap[item.icon]}
          label={t(item.id)}
          isActive={activeSection === item.id}
          onClick={() => handleNav(item.id)}
          mouseX={mouseX}
        />
      ))}
      <div className="w-px h-8 bg-border mx-1 self-center" />
      <ThemeToggle mouseX={mouseX} />
      <LanguageSwitcher />
    </motion.nav>
  );
}
