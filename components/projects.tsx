"use client";

import { ExternalLink, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/lib/data";
import FramerWrapper from "@/components/animation/framer-wrapper";

export default function Projects() {
  return (
    <section id="projects" className="py-20 md:py-28 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <FramerWrapper y={-20} delay={0.1}>
          <h2 className="text-3xl font-bold text-foreground mb-4 heading-underline">
            Projects
          </h2>
        </FramerWrapper>

        <FramerWrapper x={60} delay={0.2}>
          <p className="text-muted-foreground mb-12 max-w-2xl">
            Production systems and open-source tools I&apos;ve built.
          </p>
        </FramerWrapper>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <FramerWrapper
              key={project.title}
              scale={0.9}
              delay={0.15 + index * 0.1}
            >
              <div className="group relative bg-card rounded-xl p-6 border-2 border-border hover:border-primary-sky/50 hover:shadow-lg transition-all duration-300 flex flex-col h-full">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary-sky transition-colors">
                    {project.title}
                  </h3>
                  {project.comingSoon && (
                    <Badge
                      variant="outline"
                      className="text-xs italic shrink-0 border-primary-sky/30 text-primary-sky"
                    >
                      Coming Soon
                    </Badge>
                  )}
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs font-medium border border-border"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-sky hover:underline group/link"
                    >
                      Visit site
                      <ArrowUpRight className="size-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary-sky transition-colors"
                    >
                      <FaGithub className="size-4" />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </FramerWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
