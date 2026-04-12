"use client";

import { useState, useEffect } from "react";
import { Highlighter } from "@/components/ui/highlighter";

export default function TextRotator() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <p className="text-xl sm:text-3xl font-medium text-muted-foreground">
      I am a{" "}
      {ready ? (
        <Highlighter
          action="highlight"
          color="#bfdbfe"
          animationDuration={1500}
          padding={5}
        >
          <span className="font-bold text-foreground">Senior AI Engineer</span>
        </Highlighter>
      ) : (
        <span className="font-bold text-foreground">Senior AI Engineer</span>
      )}
    </p>
  );
}
