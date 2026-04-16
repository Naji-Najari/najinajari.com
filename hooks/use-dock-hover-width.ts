"use client";

import { useRef } from "react";
import {
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

/**
 * Shared hover-magnify math used by every dock item. Given the dock's shared
 * mouseX motion value, returns the spring-animated width to apply to a button
 * based on its distance from the cursor.
 */
export function useDockHoverWidth(mouseX: MotionValue<number>) {
  const ref = useRef<HTMLButtonElement>(null);

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

  return { ref, width };
}
