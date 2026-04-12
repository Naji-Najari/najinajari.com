"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
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
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { navItems } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  Home,
  User,
  Briefcase,
  Code2,
  BookOpen,
  Layers,
  Mail,
};

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
  const ref = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [36, 48, 36]);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

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
            className="absolute -bottom-8 text-xs font-medium bg-foreground text-background px-2 py-1 rounded-md whitespace-nowrap"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

function ThemeToggle({ mouseX }: { mouseX: MotionValue<number> }) {
  const ref = useRef<HTMLButtonElement>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => setMounted(true), []);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [36, 48, 36]);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.button
      ref={ref}
      style={{ width, height: width }}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-colors"
      aria-label="Toggle theme"
    >
      {mounted ? (
        theme === "dark" ? (
          <Sun className="size-5" />
        ) : (
          <Moon className="size-5" />
        )
      ) : (
        <Sun className="size-5" />
      )}
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -bottom-8 text-xs font-medium bg-foreground text-background px-2 py-1 rounded-md whitespace-nowrap"
          >
            Theme
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

function useActiveSection() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return activeSection;
}

export default function Dock() {
  const mouseX = useMotionValue(Infinity);
  const activeSection = useActiveSection();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-end gap-0.5 sm:gap-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-background/70 backdrop-blur-xl border-2 border-border rounded-2xl shadow-lg max-w-[95vw] overflow-x-auto"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 }}
    >
      {navItems.map((item) => (
        <DockItem
          key={item.id}
          icon={iconMap[item.icon]}
          label={item.label}
          isActive={activeSection === item.id}
          onClick={() => scrollTo(item.id)}
          mouseX={mouseX}
        />
      ))}
      <div className="w-px h-8 bg-border mx-1 self-center" />
      <ThemeToggle mouseX={mouseX} />
    </motion.nav>
  );
}
