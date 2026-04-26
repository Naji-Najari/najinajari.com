import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import {
  ArrowLeft,
  Briefcase,
  CheckCircle2,
  Cpu,
  Layers,
  MessageSquareQuote,
  Search,
  Server,
  Sparkles,
  UserSearch,
  Wand2,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Dock from "@/components/dock";
import Footer from "@/components/footer";
import { GridBackground } from "@/components/grid-background";
import { ShimmerLink } from "@/components/ui/shimmer-button";
import { logoUrl } from "@/lib/logo";
import { routing, type Locale } from "@/i18n/routing";

type Params = { locale: string };

const LIVE_URL = "https://career-copilot.najinajari.com";
const REPO_URL = "https://github.com/Naji-Najari/career-copilot";

function assertLocale(value: string): asserts value is Locale {
  if (!routing.locales.includes(value as Locale)) notFound();
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale } = await params;
  assertLocale(locale);
  const t = await getTranslations({ locale, namespace: "career_copilot_page" });
  const title = t("meta_title");
  const description = t("meta_description");
  return {
    title,
    description,
    keywords: [
      "Career Copilot",
      "Multi-agent system",
      "Google ADK v2",
      "OpenAI",
      "FastAPI",
      "Tavily MCP",
      "Langfuse",
      "RAG",
      "LLM orchestration",
      "Naji Najari",
    ],
    alternates: {
      canonical: `/${locale}/projects/career-copilot`,
      languages: {
        en: "/en/projects/career-copilot",
        fr: "/fr/projects/career-copilot",
        ar: "/ar/projects/career-copilot",
        "x-default": "/en/projects/career-copilot",
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/projects/career-copilot`,
      type: "article",
      images: ["/projects/career-copilot.png"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/projects/career-copilot.png"],
    },
  };
}

const techStack = [
  { name: "Google ADK v2", domain: "google.com" },
  { name: "OpenAI gpt-5.4-mini", domain: "openai.com" },
  { name: "FastAPI", domain: "fastapi.tiangolo.com" },
  { name: "Pydantic", domain: "pydantic.dev" },
  { name: "Tavily MCP", domain: "tavily.com" },
  { name: "Langfuse", domain: "langfuse.com" },
  { name: "Next.js 15", domain: "nextjs.org" },
  { name: "React 19", domain: "react.dev" },
  { name: "TanStack Query", domain: "tanstack.com" },
  { name: "Zod", domain: "zod.dev" },
  { name: "Tailwind CSS v4", domain: "tailwindcss.com" },
  { name: "Radix UI", domain: "radix-ui.com" },
  { name: "uv", domain: "astral.sh" },
  { name: "Docker", domain: "docker.com" },
];

// Shields.io-style two-tone badges (same visual as career-copilot README + frontend).
const STACK_SHIELDS = [
  { label: "Python", value: "3.12", color: "#3776AB" },
  { label: "Google ADK", value: "v2", color: "#4285F4" },
  { label: "OpenAI", value: "gpt-5.4-mini", color: "#412991" },
  { label: "FastAPI", value: "async", color: "#009688" },
  { label: "Tavily", value: "MCP", color: "#0B7285" },
  { label: "Langfuse", value: "tracing", color: "#0F172A" },
  { label: "uv", value: "managed", color: "#DE5FE9" },
  { label: "Next.js", value: "15", color: "#000000" },
];

function Shield({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <span className="inline-flex overflow-hidden rounded-[3px] text-[10px] leading-none font-semibold shadow-sm">
      <span className="bg-[#555] px-1.5 py-1 text-white">{label}</span>
      <span
        className="px-1.5 py-1 text-white"
        style={{ backgroundColor: color }}
      >
        {value}
      </span>
    </span>
  );
}

function H2({
  number,
  children,
  id,
}: {
  number?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <h2
      id={id}
      className="scroll-mt-28 text-2xl md:text-3xl font-bold text-foreground tracking-tight mt-16 mb-5 flex items-baseline gap-3"
    >
      {number && (
        <span className="font-mono text-xl md:text-2xl text-primary-sky shrink-0">
          {number}.
        </span>
      )}
      <span className="leading-tight">{children}</span>
    </h2>
  );
}

function CodeBlock({ children, language }: { children: string; language: string }) {
  return (
    <div className="not-prose rounded-xl overflow-hidden border border-border bg-neutral-950 my-6">
      <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800">
        <span className="text-[10px] uppercase tracking-wide text-neutral-500 font-mono">
          {language}
        </span>
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-neutral-700" />
          <span className="size-2.5 rounded-full bg-neutral-700" />
          <span className="size-2.5 rounded-full bg-neutral-700" />
        </div>
      </div>
      <pre
        className="p-4 text-xs leading-relaxed text-neutral-100 overflow-x-auto"
        dir="ltr"
      >
        <code>{children}</code>
      </pre>
    </div>
  );
}

export default async function CareerCopilotPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale } = await params;
  assertLocale(locale);
  const t = await getTranslations({ locale, namespace: "career_copilot_page" });
  const tProjects = await getTranslations({ locale, namespace: "projects" });

  const problemBullets = t.raw("problem_bullets") as string[];
  const recruiterBullets = t.raw("recruiter_bullets") as string[];
  const candidateBullets = t.raw("candidate_bullets") as string[];
  const scaleBullets = t.raw("scale_bullets") as { title: string; desc: string }[];
  const obsBullets = t.raw("obs_bullets") as { title: string; desc: string }[];
  const frontendBullets = t.raw("frontend_bullets") as { title: string; desc: string }[];

  const agents = [
    { name: "CV Parser", role: t("agent_role_parser"), description: t("agent_cv_parser_desc"), output: "ParsedCV", icon: UserSearch },
    { name: "JD Parser", role: t("agent_role_parser"), description: t("agent_jd_parser_desc"), output: "ParsedJD", icon: Briefcase },
    { name: "Fit Analyzer", role: t("agent_role_recruiter"), description: t("agent_fit_analyzer_desc"), output: "FitVerdict", icon: CheckCircle2 },
    { name: "Outreach Writer", role: t("agent_role_recruiter"), description: t("agent_outreach_writer_desc"), output: "OutreachDraft", icon: MessageSquareQuote },
    { name: "Gap Explainer", role: t("agent_role_recruiter"), description: t("agent_gap_explainer_desc"), output: "GapReport", icon: Layers },
    { name: "Research Agent", role: t("agent_role_candidate"), description: t("agent_research_desc"), output: "CompanyIntelligence", icon: Search },
    { name: "CV Optimizer", role: t("agent_role_candidate"), description: t("agent_cv_optimizer_desc"), output: "CVOptimizationBundle", icon: Wand2 },
    { name: "Interview Prep", role: t("agent_role_candidate"), description: t("agent_interview_prep_desc"), output: "InterviewPrepBundle", icon: Sparkles },
  ];

  const tiers = [
    { icon: Layers, title: t("tier_frontend_title"), desc: t("tier_frontend_desc") },
    { icon: Server, title: t("tier_backend_title"), desc: t("tier_backend_desc") },
    { icon: Cpu, title: t("tier_orchestration_title"), desc: t("tier_orchestration_desc") },
  ];

  const graphSnippet = `root_agent = Workflow(
    name="career_copilot",
    edges=[
        (
            "START",
            (cv_parser_agent, jd_parser_agent),  # parallel
            parse_join,
            mode_router,
            {
                "RECRUITER": fit_analyzer_agent,
                "CANDIDATE": (research_agent, cv_optimizer_agent),
            },
        ),
        (
            fit_analyzer_agent,
            verdict_router,
            {"OUTREACH": outreach_writer_agent, "GAP": gap_explainer_agent},
        ),
        (
            (research_agent, cv_optimizer_agent),
            candidate_join,
            interview_prep_agent,
        ),
    ],
)`;

  const apiSnippet = `POST /v1/analyze
Content-Type: application/json

{
  "cv_text": "Senior AI Engineer · 6y experience...",
  "jd_text": "We are looking for a Staff ML Engineer...",
  "mode": "recruiter"
}

200 OK · RecruiterFitResponse | RecruiterNoFitResponse | CandidateResponse
502 Bad Gateway · agent run failed
500 Internal Server Error · expected workflow state missing`;

  const pdfSnippet = `POST /v1/extract-pdf
Content-Type: multipart/form-data

file: <pdf binary, max 10 MB>

200 OK · { "text": "..." }
413 Request Entity Too Large
415 Unsupported Media Type
422 Unprocessable Entity · scanned image, no text extractable`;

  return (
    <>
      <GridBackground />
      <Dock />
      <main className="relative pt-28 pb-20 px-6">
        <article className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            href={`/${locale}#projects`}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 rounded-md px-1"
          >
            <ArrowLeft className="size-4" />
            {t("back_to_projects")}
          </Link>

          {/* Header (centered, magicui pattern) */}
          <header className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-tight mb-5">
              {t("title")}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6 text-pretty max-w-2xl mx-auto">
              {t("tagline")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-1.5 mb-7">
              {STACK_SHIELDS.map((item) => (
                <Shield key={item.label} {...item} />
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <ShimmerLink href={LIVE_URL} external>
                <Sparkles className="size-4" />
                {tProjects("try_it")}
              </ShimmerLink>
              <ShimmerLink href={REPO_URL} external>
                <FaGithub className="size-4" />
                {tProjects("source_code")}
              </ShimmerLink>
            </div>
          </header>

          {/* Cover (after header) */}
          <div className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl border border-border shadow-xl mb-10">
            <Image
              src="/projects/career-copilot.png"
              alt={t("title")}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>

          {/* Body */}
          <div>
            {/* PROBLEM */}
            <H2 number="01">{t("problem_kicker")}</H2>
            <p className="text-xl md:text-2xl font-medium text-foreground leading-snug mt-4 mb-8">
              {t("problem_title")}
            </p>
            <ul className="space-y-3 my-6">
              {problemBullets.map((b, i) => (
                <li
                  key={i}
                  className="flex gap-3 items-start text-base text-foreground/90 leading-relaxed"
                >
                  <span
                    aria-hidden
                    className="mt-2 size-1.5 rounded-full bg-primary-sky shrink-0"
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            {/* MODES */}
            <H2 number="02" id="modes">{t("modes_title")}</H2>
            <p className="text-base text-foreground/80 leading-relaxed mb-6">
              {t("modes_intro")}
            </p>
            <div className="not-prose grid gap-5 md:grid-cols-2 my-8">
              <article className="rounded-2xl border border-border bg-card/60 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary-sky/10 text-primary-sky">
                    <UserSearch className="size-4" />
                  </div>
                  <h3 className="text-base font-bold text-foreground">
                    {t("recruiter_title")}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {t("recruiter_desc")}
                </p>
                <ul className="space-y-2">
                  {recruiterBullets.map((b, i) => (
                    <li key={i} className="flex gap-2 text-sm text-foreground">
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </article>
              <article className="rounded-2xl border border-border bg-card/60 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    <Briefcase className="size-4" />
                  </div>
                  <h3 className="text-base font-bold text-foreground">
                    {t("candidate_title")}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {t("candidate_desc")}
                </p>
                <ul className="space-y-2">
                  {candidateBullets.map((b, i) => (
                    <li key={i} className="flex gap-2 text-sm text-foreground">
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>

            {/* ARCHITECTURE */}
            <H2 number="03" id="architecture">{t("architecture_title")}</H2>
            <p className="text-base text-foreground/80 leading-relaxed mb-6">
              {t("architecture_intro")}
            </p>
            <div className="not-prose grid gap-3 sm:grid-cols-3 my-6">
              {tiers.map((tier) => {
                const Icon = tier.icon;
                return (
                  <div
                    key={tier.title}
                    className="rounded-xl border border-border bg-card/60 p-4"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <Icon className="size-4 text-primary-sky" />
                      <h3 className="text-xs font-bold text-foreground">
                        {tier.title}
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {tier.desc}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="not-prose rounded-2xl border border-border bg-card/60 p-4 md:p-6 my-6 overflow-x-auto">
              <Image
                src="/projects/career-copilot-graph.svg"
                alt={t("architecture_graph_alt")}
                width={1100}
                height={500}
                className="block dark:hidden max-w-full h-auto mx-auto"
              />
              <Image
                src="/projects/career-copilot-graph-dark.svg"
                alt={t("architecture_graph_alt")}
                width={1100}
                height={500}
                className="hidden dark:block max-w-full h-auto mx-auto"
              />
            </div>
            <p className="text-xs text-muted-foreground italic">
              {t("architecture_legend")}
            </p>

            {/* AGENTS */}
            <H2 number="04" id="agents">{t("agents_title")}</H2>
            <p className="text-base text-foreground/80 leading-relaxed mb-6">
              {t("agents_intro")}
            </p>
            <CodeBlock language="python · app/agent/agent.py">
              {graphSnippet}
            </CodeBlock>
            <div className="not-prose grid gap-3 sm:grid-cols-2 my-8">
              {agents.map((agent) => {
                const Icon = agent.icon;
                return (
                  <article
                    key={agent.name}
                    className="rounded-xl border border-border bg-card/60 p-4"
                  >
                    <div className="flex items-start justify-between mb-2.5">
                      <div className="p-1.5 rounded-md bg-muted text-foreground">
                        <Icon className="size-3.5" />
                      </div>
                      <span className="text-[10px] uppercase tracking-wide text-muted-foreground border border-border rounded px-1.5 py-0.5">
                        {agent.role}
                      </span>
                    </div>
                    <h4 className="font-mono text-sm font-bold text-foreground">
                      {agent.name}
                    </h4>
                    <p
                      className="font-mono text-[10px] text-primary-sky mb-2"
                      dir="ltr"
                    >
                      → {agent.output}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {agent.description}
                    </p>
                  </article>
                );
              })}
            </div>

            {/* API */}
            <H2 number="05" id="api">{t("api_title")}</H2>
            <p className="text-base text-foreground/80 leading-relaxed mb-6">
              {t("api_intro")}
            </p>
            <h3 className="text-lg font-bold text-foreground mt-8 mb-2">
              {t("api_analyze_title")}
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              {t("api_analyze_desc")}
            </p>
            <CodeBlock language="http">{apiSnippet}</CodeBlock>
            <h3 className="text-lg font-bold text-foreground mt-8 mb-2">
              {t("api_pdf_title")}
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              {t("api_pdf_desc")}
            </p>
            <CodeBlock language="http">{pdfSnippet}</CodeBlock>

            {/* SCALE */}
            <H2 number="06" id="scale">{t("scale_title")}</H2>
            <p className="text-base text-foreground/80 leading-relaxed mb-6">
              {t("scale_intro")}
            </p>
            <div className="not-prose grid gap-3 sm:grid-cols-2 my-6">
              {scaleBullets.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-border bg-card/60 p-4"
                >
                  <h3 className="text-sm font-bold text-foreground mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* OBSERVABILITY */}
            <H2 number="07" id="observability">{t("obs_title")}</H2>
            <p className="text-base text-foreground/80 leading-relaxed mb-6">
              {t("obs_intro")}
            </p>
            <div className="not-prose grid gap-3 sm:grid-cols-3 my-6">
              {obsBullets.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-border bg-card/60 p-4"
                >
                  <h3 className="text-sm font-bold text-foreground mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* FRONTEND */}
            <H2 number="08" id="frontend">{t("frontend_title")}</H2>
            <p className="text-base text-foreground/80 leading-relaxed mb-6">
              {t("frontend_intro")}
            </p>
            <div className="not-prose grid gap-3 sm:grid-cols-3 my-6">
              {frontendBullets.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-border bg-card/60 p-4"
                >
                  <h3 className="text-sm font-bold text-foreground mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* STACK */}
            <H2 number="09" id="stack">{t("stack_title")}</H2>
            <p className="text-base text-foreground/80 leading-relaxed mb-6">
              {t("stack_intro")}
            </p>
            <div className="not-prose flex flex-wrap gap-2 my-6">
              {techStack.map((item) => (
                <span
                  key={item.name}
                  className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border border-border bg-card/60 text-foreground"
                >
                  <img
                    src={logoUrl(item.domain)}
                    alt={item.name}
                    className="size-3.5 rounded-sm"
                  />
                  {item.name}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="not-prose rounded-2xl border border-border bg-gradient-to-br from-primary-sky/10 via-background to-background p-8 mt-16">
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 tracking-tight">
                {t("cta_title")}
              </h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                {t("cta_desc")}
              </p>
              <div className="flex flex-wrap gap-3">
                <ShimmerLink href={LIVE_URL} external>
                  <Sparkles className="size-4" />
                  {tProjects("try_it")}
                </ShimmerLink>
                <ShimmerLink href={REPO_URL} external>
                  <FaGithub className="size-4" />
                  {tProjects("source_code")}
                </ShimmerLink>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
