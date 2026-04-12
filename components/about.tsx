"use client";

import { FileText, Award, BookOpen } from "lucide-react";
import FramerWrapper from "@/components/animation/framer-wrapper";

const stats = [
  { icon: FileText, value: "4", label: "Publications" },
  { icon: Award, value: "2", label: "Patents" },
  { icon: BookOpen, value: "Ph.D.", label: "Machine Learning" },
];

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-start">
          <div className="space-y-6">
            <FramerWrapper x={-60} delay={0.1}>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                At <span className="text-primary-sky font-semibold">Brevo</span>, I work on a multi-agent AI platform used by end-users and
                internal teams: RAG pipelines for documentation Q&A, CRM contact
                management agents, campaign analytics agents. Built with LangGraph
                (migrated to Google ADK), served via FastAPI, deployed on
                Kubernetes, monitored with Langfuse.
              </p>
            </FramerWrapper>

            <FramerWrapper x={-60} delay={0.2}>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Before that: I led a team of data scientists and engineers at{" "}
                <span className="text-primary-sky font-semibold">Forvia</span>{" "}
                (world&apos;s 4th largest automotive supplier): predictive
                maintenance, manufacturing quality. At{" "}
                <span className="text-primary-sky font-semibold">Orange</span>,
                I applied my PhD research to anomaly detection on telecom
                network traffic at scale.
              </p>
            </FramerWrapper>

            <FramerWrapper x={-60} delay={0.3}>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                PhD: Transformer-based unsupervised anomaly detection. 4
                published papers (ECML-PKDD, IEEE), 2 international patents. I
                went from writing the papers to deploying the models.
              </p>
            </FramerWrapper>
          </div>

          <FramerWrapper x={60} delay={0.3} className="flex flex-row lg:flex-col gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-2 p-5 rounded-xl border-2 border-border bg-card hover:border-primary-sky/50 transition-colors duration-300"
              >
                <stat.icon className="size-6 text-primary-sky" />
                <span className="text-2xl font-bold text-foreground">
                  {stat.value}
                </span>
                <span className="text-xs text-muted-foreground text-center">
                  {stat.label}
                </span>
              </div>
            ))}
          </FramerWrapper>
        </div>
      </div>
    </section>
  );
}
