"use client";

import { useTranslations } from "next-intl";
import { Bot, Search, Activity, Cpu } from "lucide-react";
import { motion, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";

const services = [
  { icon: Bot, titleKey: "agents_title", descKey: "agents_desc", keywords: "LangGraph, Google ADK, FastAPI, MCP" },
  { icon: Search, titleKey: "rag_title", descKey: "rag_desc", keywords: "RAG, Hybrid Search, LangChain" },
  { icon: Activity, titleKey: "eval_title", descKey: "eval_desc", keywords: "Langfuse, LLM-as-a-Judge, HITL" },
  { icon: Cpu, titleKey: "finetune_title", descKey: "finetune_desc", keywords: "LoRA, PEFT, vLLM, HuggingFace" },
];

function ServiceCard({ item, index, t }: { item: typeof services[number]; index: number; t: ReturnType<typeof useTranslations> }) {
  const springValue = useSpring(0, { bounce: 0 });
  const scale = useTransform(springValue, [0, 1], [1, 1.05]);
  const zIndex = useTransform(springValue, (v) => Math.floor(v * 10) + 10);

  return (
    <BlurFade delay={0.15 + index * 0.08} inView className="h-full">
      <motion.div
        style={{ scale, zIndex }}
        onMouseEnter={() => springValue.set(1)}
        onMouseLeave={() => springValue.set(0)}
        className="h-full"
      >
        <MagicCard
          className="h-full md:min-h-[280px] rounded-xl"
          gradientColor="#2563eb10"
          gradientFrom="#2563eb"
          gradientTo="#3b82f6"
        >
          <div className="p-6 flex flex-col h-full">
            <div className="flex items-center gap-2 mb-3">
              <item.icon className="size-5 text-primary-sky" />
              <h3 className="text-base font-bold text-foreground">
                {t(item.titleKey)}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
              {t(item.descKey)}
            </p>
            <p className="mt-4 text-xs text-neutral-400 dark:text-neutral-500">
              {item.keywords}
            </p>
          </div>
        </MagicCard>
      </motion.div>
    </BlurFade>
  );
}

export default function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="py-28 md:py-36 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <BlurFade delay={0.1} inView>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground heading-underline inline-block">
              {t("title")}
            </h2>
            <p className="mt-6 text-base text-muted-foreground max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </div>
        </BlurFade>

        <div className="mb-16" />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((item, index) => (
            <ServiceCard key={item.titleKey} item={item} index={index} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
