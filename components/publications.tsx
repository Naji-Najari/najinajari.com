"use client";

import { ExternalLink, ShieldCheck, FileText } from "lucide-react";
import { publications, patents } from "@/lib/data";
import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";

export default function Publications() {
  return (
    <section id="publications" className="py-20 md:py-28 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <BlurFade delay={0.1} inView>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground heading-underline inline-block">
              Publications & Patents
            </h2>
          </div>
        </BlurFade>

        {/* Publications */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {publications.map((pub, index) => (
            <BlurFade key={pub.title} delay={0.1 + index * 0.06} inView>
              <MagicCard
                className="rounded-xl"
                gradientColor="#2563eb08"
                gradientFrom="#2563eb"
                gradientTo="#3b82f6"
              >
                <div className="p-5 flex gap-4">
                  <FileText className="size-5 text-primary-sky shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-sm font-bold text-foreground leading-snug">
                        {pub.title}
                      </h3>
                      <span className="text-xs font-bold text-muted-foreground shrink-0">
                        {pub.year}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {pub.authors}
                    </p>
                    <div className="flex items-center gap-3 mt-3">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-lg ${
                          pub.highlight
                            ? "bg-primary-sky/10 text-primary-sky font-semibold"
                            : "border border-neutral-200 dark:border-neutral-800 text-muted-foreground"
                        }`}
                      >
                        {pub.venue}
                      </span>
                      {pub.url && (
                        <a
                          href={pub.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-medium text-primary-sky hover:underline"
                        >
                          <ExternalLink className="size-3" />
                          Paper
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </MagicCard>
            </BlurFade>
          ))}
        </div>

        {/* Patents */}
        <BlurFade delay={0.1} inView>
          <div className="flex items-center gap-2 mb-6">
            <ShieldCheck className="size-5 text-primary-sky" />
            <h3 className="text-lg font-bold text-foreground">
              International Patents
            </h3>
          </div>
        </BlurFade>

        <div className="grid md:grid-cols-2 gap-4">
          {patents.map((patent, index) => (
            <BlurFade key={patent.title} delay={0.1 + index * 0.08} inView>
              <MagicCard
                className="h-full rounded-xl"
                gradientColor="#2563eb08"
                gradientFrom="#2563eb"
                gradientTo="#3b82f6"
              >
                <div className="p-5">
                  <h4 className="text-sm font-bold text-foreground mb-2">
                    {patent.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {patent.inventors}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Filed: {patent.filed}
                  </p>
                </div>
              </MagicCard>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
