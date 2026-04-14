"use client";

import { useTranslations } from "next-intl";
import { MapPin, Calendar } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";

const logoUrl = (domain: string) =>
  `https://img.logo.dev/${domain}?token=${process.env.NEXT_PUBLIC_LOGO_DEV_API_KEY}&size=64`;

const companyLogos: Record<string, string> = {
  Brevo: "brevo.com",
  FORVIA: "faurecia.com",
  Orange: "orange.com",
};

export default function Experience() {
  const t = useTranslations("experience");

  const experienceData = [
    {
      company: "Brevo",
      title: t("brevo_title"),
      date: t("brevo_date"),
      location: t("brevo_location"),
      bullets: t.raw("brevo_bullets") as string[],
      tags: ["LangGraph", "Google ADK", "RAG", "FastAPI", "Kubernetes", "Langfuse", "MCP"],
    },
    {
      company: "FORVIA",
      title: t("forvia_title"),
      date: t("forvia_date"),
      location: t("forvia_location"),
      bullets: t.raw("forvia_bullets") as string[],
      tags: ["Machine Learning", "Time Series", "Predictive Maintenance", "Python"],
    },
    {
      company: "Orange",
      title: t("orange_title"),
      date: t("orange_date"),
      location: t("orange_location"),
      bullets: t.raw("orange_bullets") as string[],
      tags: ["PyTorch", "PySpark", "Anomaly Detection", "Transformers", "Deep Learning"],
    },
  ];

  return (
    <section id="experience" className="py-20 md:py-28 px-6 lg:px-20">
      <div className="max-w-4xl mx-auto">
        <BlurFade delay={0.1} inView>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground heading-underline inline-block">
              {t("title")}
            </h2>
          </div>
        </BlurFade>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute start-6 md:start-8 top-0 bottom-0 w-px bg-neutral-200 dark:bg-neutral-800" />

          <div className="space-y-12">
            {experienceData.map((exp, index) => (
              <BlurFade key={exp.company} delay={0.1 + index * 0.1} inView>
                <div className="relative ps-16 md:ps-20">
                  {/* Timeline dot */}
                  <div className="absolute start-4 md:start-6 top-1 size-4 rounded-full border-[3px] border-primary-sky bg-background z-10" />

                  {/* Date badge */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <img
                      src={logoUrl(companyLogos[exp.company] || "")}
                      alt={exp.company}
                      className="size-8 rounded-lg"
                    />
                    <div>
                      <h3 className="text-base font-bold text-foreground">
                        {exp.title}
                      </h3>
                      <p className="text-sm font-semibold text-primary-sky">
                        {exp.company}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3" />
                      {exp.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3" />
                      {exp.location}
                    </span>
                  </div>

                  {/* Content card */}
                  <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-card">
                    <ul className="space-y-2 mb-4">
                      {exp.bullets.map((bullet, i) => (
                        <li
                          key={i}
                          className="text-sm text-muted-foreground leading-relaxed ps-4 relative before:content-['·'] before:absolute before:start-0 before:text-primary-sky before:font-bold before:text-lg"
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2.5 py-1 rounded-lg border border-neutral-200 dark:border-neutral-800 text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
