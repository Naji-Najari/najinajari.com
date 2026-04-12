"use client";

import { TextEffect } from "./text-effect";

export default function TextRotator() {
  return (
    <p className="text-xl sm:text-3xl font-medium">
      <span className="text-muted-foreground">I am a </span>
      <TextEffect
        per="char"
        preset="fade-in-blur"
        delay={0.5}
        speedReveal={2}
        as="span"
        className="text-primary-sky font-bold"
      >
        Senior AI Engineer
      </TextEffect>
    </p>
  );
}
