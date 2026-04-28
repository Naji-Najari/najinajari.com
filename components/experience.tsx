import { getTranslations } from "next-intl/server";
import { BlurFade } from "@/components/ui/blur-fade";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { logoUrl } from "@/lib/logo";

const companyLogos: Record<string, string> = {
  Brevo: "brevo.com",
  FORVIA: "faurecia.com",
  Orange: "orange.com",
};

export default async function Experience() {
  const t = await getTranslations("experience");

  const items = [
    {
      id: "brevo",
      company: "Brevo",
      title: t("brevo_title"),
      date: t("brevo_date"),
      location: t("brevo_location"),
      bullets: t.raw("brevo_bullets") as string[],
      tags: ["LangGraph", "Google ADK", "RAG", "FastAPI", "Kubernetes", "Langfuse", "MCP"],
      logoUrl: logoUrl(companyLogos.Brevo),
    },
    {
      id: "forvia",
      company: "FORVIA",
      title: t("forvia_title"),
      date: t("forvia_date"),
      location: t("forvia_location"),
      bullets: t.raw("forvia_bullets") as string[],
      tags: ["Machine Learning", "Time Series", "Predictive Maintenance", "Python"],
      logoUrl: logoUrl(companyLogos.FORVIA),
    },
    {
      id: "orange",
      company: "Orange",
      title: t("orange_title"),
      date: t("orange_date"),
      location: t("orange_location"),
      bullets: t.raw("orange_bullets") as string[],
      tags: ["PyTorch", "PySpark", "Anomaly Detection", "Transformers", "Deep Learning"],
      logoUrl: logoUrl(companyLogos.Orange),
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

        <BlurFade delay={0.2} inView>
          <ExperienceTimeline items={items} />
        </BlurFade>
      </div>
    </section>
  );
}