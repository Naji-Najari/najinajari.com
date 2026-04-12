"use client";

import { ExternalLink, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { publications, patents } from "@/lib/data";
import FramerWrapper from "@/components/animation/framer-wrapper";

export default function Publications() {
  return (
    <section id="publications" className="py-20 md:py-28 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <FramerWrapper y={-20} delay={0.1}>
          <h2 className="text-3xl font-bold text-foreground mb-16 heading-underline">
            Publications & Patents
          </h2>
        </FramerWrapper>

        <div className="space-y-4 mb-14">
          {publications.map((pub, index) => (
            <FramerWrapper key={pub.title} y={30} delay={0.1 + index * 0.08}>
              <div className="group bg-card rounded-xl p-5 border-2 border-border hover:border-primary-sky/50 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-start gap-3 justify-between">
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-foreground leading-snug mb-2 group-hover:text-primary-sky transition-colors">
                      {pub.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {pub.authors}
                    </p>
                    <div className="flex items-center gap-3 flex-wrap">
                      <Badge
                        className={`text-xs font-semibold ${
                          pub.highlight
                            ? "bg-primary-sky text-white hover:bg-primary-sky/90"
                            : ""
                        }`}
                        variant={pub.highlight ? "default" : "secondary"}
                      >
                        {pub.venue}
                      </Badge>
                      {pub.url && (
                        <a
                          href={pub.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-medium text-primary-sky hover:underline"
                        >
                          <ExternalLink className="size-3" />
                          Read paper
                        </a>
                      )}
                    </div>
                  </div>
                  <span className="text-sm font-bold text-muted-foreground shrink-0">
                    {pub.year}
                  </span>
                </div>
              </div>
            </FramerWrapper>
          ))}
        </div>

        <FramerWrapper y={20} delay={0.1}>
          <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <ShieldCheck className="size-5 text-primary-sky" />
            International Patents
          </h3>
        </FramerWrapper>

        <div className="grid md:grid-cols-2 gap-4">
          {patents.map((patent, index) => (
            <FramerWrapper key={patent.title} scale={0.95} delay={0.1 + index * 0.1}>
              <div className="bg-card rounded-xl p-5 border-2 border-border hover:border-primary-sky/50 transition-all duration-300">
                <h4 className="text-sm font-bold text-foreground mb-2">
                  {patent.title}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {patent.inventors}
                </p>
                <p className="text-xs text-primary-sky font-medium mt-2">
                  Filed: {patent.filed}
                </p>
              </div>
            </FramerWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
