"use client";

import { useState, useEffect } from "react";
import { Download } from "lucide-react";

export default function HackerBtn({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  const [displayText, setDisplayText] = useState(label);
  const charset = "abcdefghijklmnopqrstuvwxyz";

  const randomChars = (length: number) =>
    Array.from(
      { length },
      () => charset[Math.floor(Math.random() * charset.length)]
    ).join("");

  const scramble = async (input: string) => {
    let prefix = "";
    for (let index = 0; index < input.length; index++) {
      await new Promise((resolve) => setTimeout(resolve, 50));
      prefix += input.charAt(index);
      setDisplayText(prefix + randomChars(input.length - prefix.length));
    }
  };

  useEffect(() => {
    setDisplayText(label);
  }, [label]);

  return (
    <a
      href={href}
      download
      className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium px-4 py-2 hover:bg-primary/90 transition-colors w-fit"
      onMouseEnter={() => scramble(label)}
    >
      <Download className="size-4" />
      {displayText}
    </a>
  );
}
