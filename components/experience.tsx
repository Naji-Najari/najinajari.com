"use client";

import { MapPin, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { experiences } from "@/lib/data";
import FramerWrapper from "@/components/animation/framer-wrapper";

export default function Experience() {
  return (
    <section id="experience" className="py-20 md:py-28 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <FramerWrapper y={-20} delay={0.1}>
          <h2 className="text-3xl font-bold text-foreground mb-16 heading-underline">
            Experience
          </h2>
        </FramerWrapper>

        <div className="space-y-0">
          {experiences.map((exp, index) => (
            <FramerWrapper key={exp.company} y={40} delay={0.15 + index * 0.1}>
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-8">
                {/* Left — date */}
                <div className="flex md:flex-col md:items-end md:text-right gap-2 md:pt-2">
                  <span className="text-sm font-semibold text-primary-sky">
                    {exp.date}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="size-3" />
                    {exp.location}
                  </span>
                </div>

                {/* Right — content with timeline */}
                <div className="relative border-l-2 border-border pl-8 pb-12 last:pb-0">
                  <div className="timeline-point" />

                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      className="size-10 rounded-lg object-contain bg-card p-1 border-2 border-border"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                    <div>
                      <h3 className="text-lg font-bold text-foreground">
                        {exp.title}
                      </h3>
                      <p className="text-sm font-semibold text-primary-sky">
                        {exp.company}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {exp.bullets.map((bullet, i) => (
                      <li
                        key={i}
                        className="text-sm text-muted-foreground leading-relaxed pl-4 relative before:content-['▸'] before:absolute before:left-0 before:text-primary-sky before:font-bold"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs font-medium border border-border hover:border-primary-sky/50 transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </FramerWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
