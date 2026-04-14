/**
 * Next.js instrumentation hook.
 *
 * Delegates the Node-only tracing setup to `./instrumentation-node.ts` via a
 * runtime-gated dynamic import. This is the official Next.js pattern for OTEL
 * integrations — it guarantees that the Edge bundle never statically includes
 * Node APIs like `process.on`, `@opentelemetry/sdk-node`, etc.
 *
 * Docs: https://nextjs.org/docs/app/api-reference/file-conventions/instrumentation
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./instrumentation-node");
  }
}
