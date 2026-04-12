"use client";

import { Bot, Search, Activity, Cpu } from "lucide-react";
import { motion, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";

const services = [
  {
    icon: Bot,
    title: "AI Agents",
    description:
      "I design multi-agent systems that go beyond chatbots. Agents that call your APIs, query your data, and execute real business logic. Built to run 24/7, not just during a demo.",
    keywords: "LangGraph, Google ADK, FastAPI, MCP",
  },
  {
    icon: Search,
    title: "RAG Pipelines",
    description:
      "I build retrieval systems that give your users accurate answers from your own documents. Hybrid search, reranking, chunking strategies, and proper evaluation to avoid hallucinations.",
    keywords: "RAG, Hybrid Search, LangChain",
  },
  {
    icon: Activity,
    title: "LLM Evaluation",
    description:
      "I set up tracing, LLM-as-a-judge scoring, and human review pipelines so you can measure your AI quality and improve it continuously.",
    keywords: "Langfuse, LLM-as-a-Judge, HITL",
  },
  {
    icon: Cpu,
    title: "Model Fine-tuning",
    description:
      "When a generic model isn't enough, I fine-tune open-source LLMs on your data. Custom classifiers, domain-specific generation, multilingual NLP. From training to serving.",
    keywords: "LoRA, PEFT, vLLM, HuggingFace",
  },
];

function ServiceCard({ item, index }: { item: typeof services[number]; index: number }) {
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
                {item.title}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
              {item.description}
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
  return (
    <section id="about" className="py-28 md:py-36 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <BlurFade delay={0.1} inView>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground heading-underline inline-block">
              About
            </h2>
            <p className="mt-6 text-base text-muted-foreground max-w-2xl mx-auto">
              Senior AI Engineer with a PhD in Machine Learning. I help companies
              ship AI agents, RAG systems, and LLM-powered products to production.
            </p>
          </div>
        </BlurFade>

        <div className="mb-16" />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((item, index) => (
            <ServiceCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
