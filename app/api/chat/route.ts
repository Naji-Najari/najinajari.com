import Anthropic from "@anthropic-ai/sdk";
import { createHash, randomUUID } from "node:crypto";
import {
  propagateAttributes,
  startObservation,
} from "@langfuse/tracing";
import { z } from "zod";

const ChatSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(2000),
      }),
    )
    .min(1)
    .max(50),
});

const MODEL = "claude-haiku-4-5-20251001";
const MAX_TOKENS = 1024;

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are Naji's portfolio assistant.

FORMAT:
- Start with 1 short sentence that directly answers the question.
- If needed, add a few bullet points with key details. Keep each bullet short.
- ALWAYS leave a blank line before bullet points (required for markdown rendering).
- Use proper markdown: **bold** for emphasis, - for bullets.
- Never use em dashes. Use commas or periods instead.
- That's it. Never write more than needed.

TONE:
- You ARE Naji. Speak in first person. Say "I built", "My PhD", "I work at", never "Naji built" or "He works at".
- Casual and human. Like you're talking to someone at a conference.
- No emojis. No "Here's an overview". No "Feel free to ask". No em dashes. No colons after bullet bold text.
- Respond in the same language the user writes in.

BOUNDARIES:
- ONLY answer questions about Naji, his work, skills, experience, research, or availability.
- If someone asks anything unrelated (recipes, weather, code help, general knowledge), reply: "I can only answer questions about Naji's profile and work. Try asking about his experience, stack, or services!"
- Never share contact info unless specifically asked.
- Don't mention freelance unless asked about availability.

FOLLOW-UPS:
- At the end of EVERY response, add "---SUGGESTIONS---" on a new line, followed by exactly 2 short follow-up questions (max 5 words each), one per line.

---

ABOUT:
Naji Najari is a Senior AI Engineer with a PhD in Machine Learning, based in Paris, France.
He has 6+ years of hands-on AI/ML experience (since Nov 2019), covering anomaly detection research, industrial data science leadership, and now multi-agent LLM systems in production.
He is open to senior freelance missions (remote/hybrid) in AI Agents, RAG, LLMOps, and MLOps.
Email: najarinaji2015@gmail.com
LinkedIn: linkedin.com/in/naji-najari
GitHub: github.com/Naji-Najari

CURRENT ROLE:
Senior AI Engineer at Brevo (Sep 2024 - Present), Paris, France.
- Built multiple production agents within a multi-agent AI platform: documentation Q&A (RAG), CRM contact management, campaign analytics and recommendation using LangChain, LangGraph, Google ADK
- Exposed Brevo's public APIs as MCP servers for AI coding assistants (Claude, Cursor) using FastMCP, FastAPI
- Implemented production-grade RAG pipelines for real-time customer query answering using Ragflow, LangChain
- Integrated Langfuse for end-to-end LLM tracing and monitoring; built LLM-as-a-judge evaluation with human-in-the-loop annotation
- Fine-tuned BERT for multilingual spam and fraud detection using HuggingFace Transformers
- Trained and deployed ML audience recommendation models using ZenML, MLFlow

PREVIOUS ROLES:
- Senior Data Scientist & Technical Leader at FORVIA (Jan 2023 - Sep 2024): Led a team of 6-8, predictive maintenance, manufacturing quality, time series forecasting. World's 4th largest automotive supplier.
- Data Scientist & PhD Researcher (CIFRE) at Orange (Nov 2019 - Feb 2023): Anomaly detection on telecom network traffic using PyTorch, PySpark, Docker. Published 4 papers, filed 2 patents.

EDUCATION:
- PhD in Machine Learning from INSA Lyon (2019-2022): "Robust Unsupervised Anomaly Detection"
- Thesis focused on transformer-based unsupervised anomaly detection

PUBLICATIONS:
1. "RESIST: Robust Transformer for Unsupervised Time Series Anomaly Detection" - ECML-PKDD 2022
2. "Robust Variational Autoencoders and Normalizing Flows for Unsupervised Network Anomaly Detection" - AINA 2022
3. "RADON: Robust Autoencoder for Unsupervised Anomaly Detection" - SINConf 2021
4. "Network Traffic Modeling For IoT-device Re-identification" - IEEE COINS 2020

PATENTS:
1. "Contextual Anomaly Detection For The Maintenance Of IoT Devices" (June 2022)
2. "Assistance For The Identification Of Malfunctioning Devices Using Traffic Metadata" (November 2020)

STACK:
AI/GenAI: LangGraph, Google ADK, LangChain, RAG, Langfuse, MCP, vLLM, LiteLLM, LoRA/QLoRA
ML/DL: PyTorch, HuggingFace Transformers, scikit-learn, TensorFlow, PEFT
Engineering: Python, FastAPI, Docker, Kubernetes, Kafka, SQL, CI/CD
Cloud/MLOps: GCP/Vertex AI, AWS, Palantir, ZenML, MLFlow, Spark/PySpark
Languages: French (Fluent), English (Fluent), Arabic (Native)

PROJECTS:
1. RagMaker (ragmaker.ai): Co-developed an Agentic B2B SaaS platform for document Q&A with hybrid search, Text-to-SQL, MCP integration, LangGraph workflows.
2. multi-agent-llm-stack (Coming Soon): End-to-end production ML stack with multi-agent RAG, LLM fine-tuning, vLLM serving.
`;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

/**
 * Derives a non-reversible, short user identifier from the caller's IP.
 * Used only to group Langfuse traces per visitor without storing the raw IP.
 */
function hashIp(ip: string | null): string {
  if (!ip) return "anonymous";
  return createHash("sha256").update(ip).digest("hex").slice(0, 16);
}

export async function POST(req: Request) {
  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = ChatSchema.safeParse(rawBody);
  if (!parsed.success) {
    return Response.json(
      { error: "Invalid input", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const trimmedMessages: ChatMessage[] = parsed.data.messages.slice(-20);

  const sessionId = req.headers.get("x-session-id") ?? randomUUID();
  const locale = req.headers.get("x-locale") ?? "en";
  const forwardedFor = req.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() ?? null;
  const userId = hashIp(ip);

  // propagateAttributes attaches trace-level metadata to every observation
  // created inside the callback. We use startObservation (manual lifecycle)
  // rather than startActiveObservation because the Response is returned
  // before the stream finishes — we need to end() the generation ourselves
  // once streaming completes.
  return propagateAttributes(
    {
      sessionId,
      userId,
      tags: ["portfolio", "chatbot", locale],
    },
    () => {
      const lastUserMessage =
        [...trimmedMessages].reverse().find((m) => m.role === "user")?.content ??
        "";

      const generation = startObservation(
        "portfolio-chat",
        {
          input: trimmedMessages,
          model: MODEL,
          modelParameters: { max_tokens: MAX_TOKENS },
        },
        { asType: "generation" },
      );

      // Populate trace-level input so the Langfuse trace preview is not empty.
      generation.setTraceIO({ input: lastUserMessage });

      const stream = client.messages.stream({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system: SYSTEM_PROMPT,
        messages: trimmedMessages,
      });

      const encoder = new TextEncoder();
      let fullOutput = "";

      const readable = new ReadableStream({
        async start(controller) {
          try {
            for await (const event of stream) {
              if (
                event.type === "content_block_delta" &&
                event.delta.type === "text_delta"
              ) {
                fullOutput += event.delta.text;
                controller.enqueue(
                  encoder.encode(
                    `data: ${JSON.stringify({ text: event.delta.text })}\n\n`,
                  ),
                );
              }
            }

            // finalMessage carries token usage counts.
            const finalMessage = await stream.finalMessage();
            generation.update({
              output: fullOutput,
              usageDetails: {
                input: finalMessage.usage.input_tokens,
                output: finalMessage.usage.output_tokens,
                total:
                  finalMessage.usage.input_tokens +
                  finalMessage.usage.output_tokens,
              },
            });
            generation.setTraceIO({
              input: lastUserMessage,
              output: fullOutput,
            });

            controller.enqueue(encoder.encode("data: [DONE]\n\n"));
            controller.close();
          } catch (err) {
            const message =
              err instanceof Error ? err.message : "stream failed";
            generation.update({
              level: "ERROR",
              statusMessage: message,
              output: fullOutput || undefined,
            });
            generation.setTraceIO({
              input: lastUserMessage,
              output: fullOutput || message,
            });
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ error: "Stream error" })}\n\n`,
              ),
            );
            controller.close();
          } finally {
            generation.end();
          }
        },
      });

      return new Response(readable, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    },
  );
}
