"use client";

import { stackCategories } from "@/lib/data";
import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";
import { Brain, Cpu, Code, Cloud, Languages } from "lucide-react";

const logoUrl = (domain: string) =>
  `https://img.logo.dev/${domain}?token=${process.env.NEXT_PUBLIC_LOGO_DEV_API_KEY}&size=64`;

const toolLogos: Record<string, string> = {
  LangGraph: "langchain.com",
  "Google ADK": "google.com",
  LangChain: "langchain.com",
  Langfuse: "langfuse.com",
  "LLM-as-a-Judge": "",
  MCP: "anthropic.com",
  vLLM: "vllm.ai",
  LiteLLM: "litellm.ai",
  "LoRA/QLoRA": "",
  PEFT: "huggingface.co",
  RAG: "",
  PyTorch: "pytorch.org",
  "HuggingFace Transformers": "huggingface.co",
  "scikit-learn": "scikit-learn.org",
  TensorFlow: "tensorflow.org",
  "Anomaly Detection": "",
  "Time Series": "",
  Python: "python.org",
  FastAPI: "fastapi.tiangolo.com",
  Docker: "docker.com",
  Kubernetes: "kubernetes.io",
  SQL: "",
  "CI/CD": "",
  "GCP / Vertex AI": "cloud.google.com",
  ZenML: "zenml.io",
  MLFlow: "mlflow.org",
  Prometheus: "prometheus.io",
  "Spark / PySpark": "spark.apache.org",
  AWS: "aws.amazon.com",
  Palantir: "palantir.com",
  Kafka: "kafka.apache.org",
};

const categoryIcons: Record<string, React.ElementType> = {
  "AI / GenAI": Brain,
  "ML / Deep Learning": Cpu,
  Engineering: Code,
  "Cloud & MLOps": Cloud,
  Languages: Languages,
};

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stackCategories.map((category, index) => {
            const Icon = categoryIcons[category.label] || Code;
            return (
              <BlurFade key={category.label} delay={0.1 + index * 0.06} inView>
                <MagicCard
                  className="h-full rounded-xl"
                  gradientColor="#2563eb08"
                  gradientFrom="#2563eb"
                  gradientTo="#3b82f6"
                >
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Icon className="size-4 text-primary-sky" />
                      <h3 className="text-sm font-bold text-foreground">
                        {category.label}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.items.map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border border-neutral-200 dark:border-neutral-800 text-muted-foreground"
                        >
                          {toolLogos[item] && (
                            <img
                              src={logoUrl(toolLogos[item])}
                              alt={item}
                              className="size-3.5 rounded-sm"
                            />
                          )}
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </MagicCard>
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}
