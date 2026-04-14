/**
 * Node.js-only Langfuse tracing setup. Imported dynamically from
 * `instrumentation.ts` so that none of these Node APIs leak into the Edge
 * bundle during Next.js static analysis.
 */
import { NodeSDK } from "@opentelemetry/sdk-node";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { ATTR_SERVICE_NAME } from "@opentelemetry/semantic-conventions";
import { LangfuseSpanProcessor } from "@langfuse/otel";

const publicKey = process.env.LANGFUSE_PUBLIC_KEY;
const secretKey = process.env.LANGFUSE_SECRET_KEY;

if (!publicKey || !secretKey) {
  console.warn(
    "[langfuse] LANGFUSE_PUBLIC_KEY/SECRET_KEY missing — tracing disabled.",
  );
} else {
  const spanProcessor = new LangfuseSpanProcessor({
    publicKey,
    secretKey,
    baseUrl: process.env.LANGFUSE_BASE_URL ?? "https://cloud.langfuse.com",
    // "immediate" is required on Render / serverless: spans are exported as
    // soon as they end, preventing loss when the process is frozen.
    exportMode: "immediate",
    environment: process.env.NODE_ENV,
  });

  const sdk = new NodeSDK({
    resource: resourceFromAttributes({
      [ATTR_SERVICE_NAME]: "najinajari-portfolio",
    }),
    spanProcessors: [spanProcessor],
  });

  sdk.start();
  console.log("[langfuse] span processor initialized");

  // Graceful shutdown on Render redeploys.
  process.on("SIGTERM", async () => {
    try {
      await sdk.shutdown();
    } catch (err) {
      console.error("[langfuse] shutdown error", err);
    }
  });
}
