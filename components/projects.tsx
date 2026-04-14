"use client";

import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";

const logoUrl = (domain: string) =>
  `https://img.logo.dev/${domain}?token=${process.env.NEXT_PUBLIC_LOGO_DEV_API_KEY}&size=64`;

const tagLogos: Record<string, string> = {
  LangGraph: "langchain.com",
  RAG: "",
  "PostgreSQL pgvector": "postgresql.org",
  FastAPI: "fastapi.tiangolo.com",
  MCP: "anthropic.com",
  GCP: "cloud.google.com",
  Docker: "docker.com",
  vLLM: "vllm.ai",
  LoRA: "",
  Kubernetes: "kubernetes.io",
  Prometheus: "prometheus.io",
};

export default function Projects() {
  const t = useTranslations("projects");

  const projectsData = [
    {
      title: t("ragmaker_title"),
      description: t("ragmaker_desc"),
      tags: ["LangGraph", "RAG", "PostgreSQL pgvector", "FastAPI", "MCP", "GCP", "Docker"],
      liveUrl: "https://ragmaker.ai",
    },
    {
      title: t("multiagent_title"),
      description: t("multiagent_desc"),
      tags: ["LangGraph", "RAG", "vLLM", "LoRA", "Kubernetes", "Prometheus"],
      comingSoon: true,
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

        <div className="grid md:grid-cols-2 gap-6">
          {projectsData.map((project, index) => (
            <BlurFade key={project.title} delay={0.1 + index * 0.1} inView className="h-full">
              <MagicCard
                className="h-full rounded-xl"
                gradientColor="#2563eb08"
                gradientFrom="#2563eb"
                gradientTo="#3b82f6"
              >
                <div className="p-6 flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-base font-bold text-foreground">
                      {project.title}
                    </h3>
                    {project.comingSoon && (
                      <span className="text-xs italic text-primary-sky border border-primary-sky/30 rounded-lg px-2 py-0.5 shrink-0 ml-2">
                        {t("coming_soon")}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5">
                    {project.description}
                  </p>

                  {/* Tags with logos */}
                  <div className="flex flex-wrap gap-2 mb-5">
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

                  {/* Links */}
                  <div className="flex gap-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-sky hover:underline group/link"
                      >
                        {t("visit_site")}
                        <ArrowUpRight className="size-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                      </a>
                    )}
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
