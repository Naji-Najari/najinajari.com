"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface FramerWrapperProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  y?: number;
  x?: number;
  delay?: number;
  duration?: number;
  scale?: number;
}

export default function FramerWrapper({
  children,
  className,
  y = 15,
  x = 0,
  delay = 0.25,
  duration = 0.5,
  scale,
  ...props
}: FramerWrapperProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x,
        y,
        ...(scale !== undefined && { scale }),
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        ...(scale !== undefined && { scale: 1 }),
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
