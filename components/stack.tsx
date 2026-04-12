"use client";

import { stackCategories } from "@/lib/data";
import { BlurFade } from "@/components/ui/blur-fade";
import { Marquee } from "@/components/ui/marquee";

const logoUrl = (domain: string) =>
  `https://img.logo.dev/${domain}?token=${process.env.NEXT_PUBLIC_LOGO_DEV_API_KEY}&size=64`;

const stackWithLogos: { name: string; domain: string }[] = [
  { name: "LangGraph", domain: "langchain.com" },
  { name: "Google ADK", domain: "google.com" },
  { name: "LangChain", domain: "langchain.com" },
  { name: "Langfuse", domain: "langfuse.com" },
  { name: "FastAPI", domain: "fastapi.tiangolo.com" },
  { name: "Python", domain: "python.org" },
  { name: "PyTorch", domain: "pytorch.org" },
  { name: "HuggingFace", domain: "huggingface.co" },
  { name: "Docker", domain: "docker.com" },
  { name: "Kubernetes", domain: "kubernetes.io" },
  { name: "GCP", domain: "cloud.google.com" },
  { name: "AWS", domain: "aws.amazon.com" },
  { name: "Palantir", domain: "palantir.com" },
  { name: "MLFlow", domain: "mlflow.org" },
  { name: "Prometheus", domain: "prometheus.io" },
  { name: "Spark", domain: "spark.apache.org" },
  { name: "TensorFlow", domain: "tensorflow.org" },
  { name: "scikit-learn", domain: "scikit-learn.org" },
];

export default function Stack() {
  return (
    <section id="stack" className="py-20 md:py-28 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <BlurFade delay={0.1} inView>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground heading-underline inline-block">
              Stack
            </h2>
          </div>
        </BlurFade>

        {/* Logo marquee */}
        <BlurFade delay={0.2} inView>
          <div className="relative mb-16">
            <Marquee pauseOnHover className="[--duration:35s]">
              {stackWithLogos.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-card mx-1"
                >
                  <img
                    src={logoUrl(item.domain)}
                    alt={item.name}
                    className="size-5 rounded-sm"
                  />
                  <span className="text-sm text-muted-foreground whitespace-nowrap">
                    {item.name}
                  </span>
                </div>
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:35s] mt-3">
              {stackWithLogos.reverse().map((item) => (
                <div
                  key={item.name}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-card mx-1"
                >
                  <img
                    src={logoUrl(item.domain)}
                    alt={item.name}
                    className="size-5 rounded-sm"
                  />
                  <span className="text-sm text-muted-foreground whitespace-nowrap">
                    {item.name}
                  </span>
                </div>
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent" />
          </div>
        </BlurFade>

        {/* Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stackCategories.map((category, index) => (
            <BlurFade key={category.label} delay={0.1 + index * 0.08} inView>
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-primary-sky uppercase tracking-wider">
                  {category.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 text-muted-foreground hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
