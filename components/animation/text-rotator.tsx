"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const roles = [
  "Senior AI Engineer",
  "Senior Data Scientist",
  "ML Researcher",
];

export default function TextRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-base sm:text-2xl text-muted-foreground font-medium">
      I am a{" "}
      <span className="relative inline-flex overflow-hidden align-bottom h-[1.2em] min-w-[320px]">
        <AnimatePresence mode="wait">
          <motion.span
            key={roles[index]}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute left-0 text-primary-sky font-bold"
          >
            {roles[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}
