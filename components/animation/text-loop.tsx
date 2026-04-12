"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence, type Transition, type Variants } from "framer-motion";
import { useState, useEffect, Children } from "react";

type TextLoopProps = {
  children: React.ReactNode[];
  className?: string;
  interval?: number;
  transition?: Transition;
  variants?: Variants;
};

export function TextLoop({
  children,
  className,
  interval = 3,
  transition = { duration: 0.3 },
  variants,
}: TextLoopProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = Children.toArray(children);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % items.length);
    }, interval * 1000);
    return () => clearInterval(timer);
  }, [items.length, interval]);

  const motionVariants: Variants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  };

  return (
    <span className={cn("relative inline-block whitespace-nowrap", className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={currentIndex}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={transition}
          variants={variants || motionVariants}
        >
          {items[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
