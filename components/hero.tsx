"use client";

import { Mail, ChevronDown, Mouse, Download } from "lucide-react";
import { FaLinkedinIn, FaGithub, FaGraduationCap } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { socialLinks } from "@/lib/data";
import FramerWrapper from "@/components/animation/framer-wrapper";
import { TextEffect } from "@/components/animation/text-effect";
import TextRotator from "@/components/animation/text-rotator";
import HackerBtn from "@/components/animation/hacker-btn";

const stackTags = [
  { name: "LangGraph", domain: "langchain.com" },
  { name: "Google ADK", domain: "google.com" },
  { name: "RAG", domain: null },
  { name: "Langfuse", domain: "langfuse.com" },
  { name: "FastAPI", domain: "fastapi.tiangolo.com" },
  { name: "MCP", domain: "anthropic.com" },
  { name: "GCP", domain: "cloud.google.com" },
  { name: "AWS", domain: "aws.amazon.com" },
  { name: "Kubernetes", domain: "kubernetes.io" },
  { name: "Palantir", domain: "palantir.com" },
  { name: "Python", domain: "python.org" },
  { name: "MLFlow", domain: "mlflow.org" },
  { name: "HuggingFace", domain: "huggingface.co" },
];

const logoUrl = (domain: string) =>
  `https://img.logo.dev/${domain}?token=${process.env.NEXT_PUBLIC_LOGO_DEV_API_KEY}&size=64`;

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
      className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-40 pt-20 pb-16"
    >
      <div className="w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* LEFT — Text & Actions */}
        <FramerWrapper
          className="flex-1"
          y={0}
          x={-100}
        >
          {/* Name */}
          <TextEffect
            per="char"
            preset="fade-in-blur"
            delay={0.3}
            speedReveal={1.5}
            as="h1"
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-primary heading-underline"
          >
            Naji Najari, Ph.D.
          </TextEffect>

          {/* Role — generous spacing from name */}
          <div className="mt-8">
            <TextRotator />
          </div>

          {/* Separator line */}
          <div className="mt-6 w-full max-w-xs h-px bg-border" />

          {/* Description */}
          <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-8">
            Building multi-agent platforms, RAG pipelines, and LLM-powered
            products at Brevo. PhD in unsupervised anomaly detection.
          </p>

          {/* Stack tags */}
          <div className="mt-12 flex flex-wrap gap-2 max-w-2xl">
            {stackTags.map((tag) => (
              <span
                key={tag.name}
                className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors cursor-default"
              >
                {tag.domain && (
                  <img
                    src={logoUrl(tag.domain)}
                    alt={tag.name}
                    className="size-4 rounded-sm"
                  />
                )}
                {tag.name}
              </span>
            ))}
          </div>

          {/* Actions — mobile only */}
          <div className="mt-8 flex flex-wrap gap-2 lg:hidden">
            <a href="/CV_Naji_NAJARI.pdf" download className="btn-3d inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl border-0 bg-[#FCFCFD] text-neutral-700 transition-all duration-150">
              <Download className="size-4" />
              Download CV
            </a>
            <a href="mailto:najarinaji2015@gmail.com" className="btn-3d inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl border-0 bg-[#FCFCFD] text-neutral-700 transition-all duration-150">
              <Mail className="size-4" />
              Email
            </a>
            <a href="https://www.linkedin.com/in/naji-najari" target="_blank" rel="noopener noreferrer" className="btn-3d inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl border-0 bg-[#FCFCFD] text-neutral-700 transition-all duration-150">
              <img src={logoUrl("linkedin.com")} alt="LinkedIn" className="size-4 rounded-sm" />
              LinkedIn
            </a>
            <a href="https://github.com/Naji-Najari" target="_blank" rel="noopener noreferrer" className="btn-3d inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl border-0 bg-[#FCFCFD] text-neutral-700 transition-all duration-150">
              <img src={logoUrl("github.com")} alt="GitHub" className="size-4 rounded-sm" />
              GitHub
            </a>
            <a href="https://scholar.google.com/citations?user=rkgpg1gAAAAJ" target="_blank" rel="noopener noreferrer" className="btn-3d inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl border-0 bg-[#FCFCFD] text-neutral-700 transition-all duration-150">
              <img src={logoUrl("scholar.google.com")} alt="Scholar" className="size-4 rounded-sm" />
              Scholar
            </a>
          </div>

        </FramerWrapper>

        {/* RIGHT — Photo + Buttons */}
        <FramerWrapper
          className="hidden lg:flex flex-col items-center gap-6 shrink-0"
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

      {/* Actions — desktop, centered in flow */}
      <div className="hidden lg:flex justify-center gap-3 mt-16 lg:mt-20">
        <FramerWrapper delay={0.5} y={50}>
          <a
            href="/CV_Naji_NAJARI.pdf"
            download
            className="btn-3d inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl border-0 bg-[#FCFCFD] text-neutral-700 transition-all duration-150"
          >
            <Download className="size-4" />
            Download CV
          </a>
        </FramerWrapper>
        <FramerWrapper delay={0.6} y={50}>
          <a
            href="mailto:najarinaji2015@gmail.com"
            className="btn-3d inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl border-0 bg-[#FCFCFD] text-neutral-700 transition-all duration-150"
          >
            <Mail className="size-4" />
            Email
          </a>
        </FramerWrapper>
        <FramerWrapper delay={0.7} y={50}>
          <a
            href="https://www.linkedin.com/in/naji-najari"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-3d inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl border-0 bg-[#FCFCFD] text-neutral-700 transition-all duration-150"
          >
            <img src={logoUrl("linkedin.com")} alt="LinkedIn" className="size-4 rounded-sm" />
            LinkedIn
          </a>
        </FramerWrapper>
        <FramerWrapper delay={0.8} y={50}>
          <a
            href="https://github.com/Naji-Najari"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-3d inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl border-0 bg-[#FCFCFD] text-neutral-700 transition-all duration-150"
          >
            <img src={logoUrl("github.com")} alt="GitHub" className="size-4 rounded-sm" />
            GitHub
          </a>
        </FramerWrapper>
        <FramerWrapper delay={0.9} y={50}>
          <a
            href="https://scholar.google.com/citations?user=rkgpg1gAAAAJ"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-3d inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl border-0 bg-[#FCFCFD] text-neutral-700 transition-all duration-150"
          >
            <img src={logoUrl("scholar.google.com")} alt="Scholar" className="size-4 rounded-sm" />
            Scholar
          </a>
        </FramerWrapper>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() =>
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
        }
        className="hidden lg:flex flex-col items-center gap-1 mt-8 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
      >
        <Mouse className="size-5" />
        <ChevronDown className="size-4 animate-bounce" />
      </button>
    </section>
  );
}
