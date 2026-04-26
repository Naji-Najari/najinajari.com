"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight, BookOpen, Sparkles } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";
import { ShimmerLink } from "@/components/ui/shimmer-button";
import { logoUrl } from "@/lib/logo";

const tagLogos: Record<string, string> = {
  "Google ADK": "google.com",
  OpenAI: "openai.com",
  FastAPI: "fastapi.tiangolo.com",
  MCP: "anthropic.com",
  Tavily: "tavily.com",
  Langfuse: "langfuse.com",
  Pydantic: "pydantic.dev",
};

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  detailHref: string;
  liveUrl?: string;
  githubUrl?: string;
}

export default function Projects() {
  const t = useTranslations("projects");
  const locale = useLocale();

  const projectsData: Project[] = [
    {
      title: t("career_copilot_title"),
      description: t("career_copilot_desc"),
      image: "/projects/career-copilot.png",
      tags: ["Google ADK", "OpenAI", "FastAPI", "MCP", "Tavily", "Langfuse", "Pydantic"],
      detailHref: `/${locale}/projects/career-copilot`,
      liveUrl: "https://career-copilot.najinajari.com",
      githubUrl: "https://github.com/Naji-Najari/career-copilot",
    },
  ];

  return (
    <section id="projects" className="py-20 md:py-28 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <BlurFade delay={0.1} inView>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground heading-underline inline-block">
              {t("title")}
            </h2>
          </div>
        </BlurFade>

        <div
          className={`grid gap-6 ${
            projectsData.length > 1 ? "md:grid-cols-2" : "max-w-3xl mx-auto"
          }`}
        >
          {projectsData.map((project, index) => (
            <BlurFade key={project.title} delay={0.1 + index * 0.1} inView className="h-full">
              <MagicCard
                className="h-full rounded-xl"
                gradientColor="#2563eb08"
                gradientFrom="#2563eb"
                gradientTo="#3b82f6"
              >
                <div className="flex flex-col h-full overflow-hidden rounded-xl">
                  {/* Media */}
                  <Link
                    href={project.detailHref}
                    aria-label={`${project.title} · ${t("read_more")}`}
                    className="group/media relative block aspect-[16/9] w-full overflow-hidden border-b border-border bg-muted"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                      className="object-cover transition-transform duration-500 group-hover/media:scale-105"
                    />
                  </Link>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1 gap-4">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base font-bold text-foreground">
                        {project.title}
                      </h3>
                      <Link
                        href={project.detailHref}
                        aria-label={`${project.title} · ${t("read_more")}`}
                        className="text-muted-foreground hover:text-primary-sky transition-colors shrink-0"
                      >
                        <ArrowUpRight className="size-4" />
                      </Link>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border border-neutral-200 dark:border-neutral-800 text-muted-foreground"
                        >
                          {tagLogos[tag] && (
                            <img
                              src={logoUrl(tagLogos[tag])}
                              alt={tag}
                              className="size-3.5 rounded-sm"
                            />
                          )}
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                      <ShimmerLink href={project.detailHref}>
                        <BookOpen className="size-4" />
                        {t("read_more")}
                      </ShimmerLink>
                      {project.liveUrl && (
                        <ShimmerLink href={project.liveUrl} external>
                          <Sparkles className="size-4" />
                          {t("try_it")}
                        </ShimmerLink>
                      )}
                      {project.githubUrl && (
                        <ShimmerLink href={project.githubUrl} external>
                          <FaGithub className="size-4" />
                          {t("source_code")}
                        </ShimmerLink>
                      )}
                    </div>
                  </div>
                </div>
              </MagicCard>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
