"use client";

import { Mail, ChevronDown, Mouse } from "lucide-react";
import { FaLinkedinIn, FaGithub, FaGraduationCap } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { socialLinks } from "@/lib/data";
import FramerWrapper from "@/components/animation/framer-wrapper";
import TextRotator from "@/components/animation/text-rotator";
import HackerBtn from "@/components/animation/hacker-btn";

const iconMap: Record<string, React.ElementType> = {
  Linkedin: FaLinkedinIn,
  Github: FaGithub,
  GraduationCap: FaGraduationCap,
  Mail,
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center px-4 sm:px-10 lg:px-40"
    >
      <div className="w-full flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
        {/* LEFT — Text & Actions */}
        <FramerWrapper
          className="flex-1 flex flex-col justify-start gap-6"
          y={0}
          x={-100}
        >
          <h3 className="text-2xl max-sm:text-xl text-muted-foreground">
            My name is
          </h3>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-primary heading-underline whitespace-nowrap leading-tight">
            Naji Najari, Ph.D.
          </h1>

          <div className="pt-2">
            <TextRotator />
          </div>

          <p className="text-base sm:text-lg text-muted-foreground max-w-lg leading-relaxed">
            I build AI systems that actually work in production.
          </p>

          <div className="flex flex-wrap gap-2">
            {["LangGraph", "Google ADK", "RAG", "Langfuse", "FastAPI", "MCP", "GCP", "AWS", "Kubernetes", "Palantir"].map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-2.5 py-1 rounded-full border border-border text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="h-fit w-full py-4 flex gap-4">
            {socialLinks.map((link, i) => {
              const Icon = iconMap[link.icon];
              return (
                <FramerWrapper key={link.platform} delay={0.55 + i * 0.125} y={50}>
                  <a
                    href={link.url}
                    target={
                      link.url.startsWith("mailto:") ? undefined : "_blank"
                    }
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "icon" })
                    )}
                    aria-label={link.platform}
                  >
                    <Icon className="size-4" />
                  </a>
                </FramerWrapper>
              );
            })}
          </div>

          <div className="flex gap-3">
            <HackerBtn label="Download CV" href="/CV_Naji_NAJARI.pdf" />
            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="inline-flex items-center gap-2 rounded-lg border border-border text-sm font-medium px-4 py-2 text-muted-foreground hover:text-primary hover:border-primary transition-colors"
            >
              <Mail className="size-4" />
              Contact me
            </button>
          </div>
        </FramerWrapper>

        {/* RIGHT — Photo */}
        <FramerWrapper
          className="h-full w-[47%] relative hidden lg:flex items-center justify-end"
          y={0}
          x={100}
        >
          <img
            src="/photo.jpg"
            alt="Naji Najari"
            className="w-72 h-80 rounded-2xl border-2 border-border shadow-lg object-cover"
          />
        </FramerWrapper>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() =>
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
        }
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
      >
        <Mouse className="size-5" />
        <ChevronDown className="size-4 animate-bounce" />
      </button>
    </section>
  );
}
