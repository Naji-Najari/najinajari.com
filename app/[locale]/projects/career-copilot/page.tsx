import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import {
  ArrowLeft,
  ArrowUpRight,
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
import { codeToHtml } from "shiki";
import { GridBackground } from "@/components/grid-background";
import { Highlighter } from "@/components/ui/highlighter";
import { ShimmerLink } from "@/components/ui/shimmer-button";
import { TableOfContents } from "@/components/ui/table-of-contents";
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

async function CodeBlock({
  children,
  language,
}: {
  children: string;
  language: string;
}) {
  const lang = language.split(/[ ·]/)[0].trim() || "text";
  const html = await codeToHtml(children, {
    lang,
    themes: { light: "one-light", dark: "one-dark-pro" },
    defaultColor: false,
  });
  return (
    <div className="not-prose rounded-xl overflow-hidden border border-border bg-[var(--shiki-light-bg,#f6f8fa)] dark:bg-[var(--shiki-dark-bg,#0d1117)] my-6">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/40">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f56]" />
          <span className="size-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="size-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <span className="text-[10px] uppercase tracking-wide text-muted-foreground font-mono">
          {language}
        </span>
      </div>
      <div
        className="text-xs leading-relaxed overflow-x-auto [&_pre]:p-4 [&_pre]:bg-transparent [&_code]:bg-transparent"
        dir="ltr"
        dangerouslySetInnerHTML={{ __html: html }}
      />
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
  const tHero = await getTranslations({ locale, namespace: "hero" });

  const problemBullets = t.raw("problem_bullets") as { prefix: string; desc: string }[];
  const modesBullets = t.raw("modes_bullets") as { prefix: string; desc: string }[];
  const modesGraphBullets = t.raw("modes_graph_bullets") as { prefix: string; desc: string }[];
  const agenticWiringBullets = t.raw("agentic_wiring_bullets") as {
    prefix: string;
    sub: string[];
  }[];
  const obsBullets = t.raw("obs_bullets") as { title: string; desc: string }[];
  const designBackendBullets = t.raw("design_backend_bullets") as {
    prefix: string;
    desc: string;
  }[];
  const designFrontendBullets = t.raw("design_frontend_bullets") as {
    prefix: string;
    desc: string;
  }[];

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

  const tocItems = [
    { id: "objective", label: t("problem_kicker") },
    { id: "modes", label: t("solution_kicker") },
    { id: "agentic", label: t("agentic_kicker") },
    { id: "system-design", label: t("design_kicker") },
    { id: "observability", label: t("obs_kicker") },
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

  const fastapiSnippet = `# Discriminated union: clients get one of three typed response
# shapes, picked by the requested mode.
AnalyzeResponse = Union[
    RecruiterFitResponse,    # recruiter mode, fit / borderline
    RecruiterNoFitResponse,  # recruiter mode, no_fit
    CandidateResponse,       # candidate mode
]


@router.post("/v1/analyze", response_model=AnalyzeResponse)
async def analyze(request: AnalyzeRequest) -> AnalyzeResponse:
    """Run the agent graph against a CV + JD pair, return the typed result."""

    # ADK Workflow graph runs end-to-end. Parallel branches actually
    # execute in parallel thanks to the async runner.
    state = await run_agent(root_agent, initial_state)

    # Pydantic schemas at every node boundary guarantee state is typed
    # where it matters; we just pick the right response builder.
    return (
        _build_recruiter_response(state)
        if request.mode == "recruiter"
        else _build_candidate_response(state)
    )`;

  const langfuseSnippet = `@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze(request: AnalyzeRequest) -> AnalyzeResponse:
    langfuse = get_client()
    with langfuse.start_as_current_observation(
        name=f"analyze.{request.mode}",
        as_type="agent",
        input={"mode": request.mode, "cv_text": ..., "jd_text": ...},
    ) as span, propagate_attributes(
        trace_name=f"career-copilot.analyze.{request.mode}",
        tags=["analyze", request.mode],
        metadata={
            "mode": request.mode,
            "model": PRIMARY_MODEL,
            "version": VERSION,
            "cv_chars": str(len(request.cv_text)),
            "jd_chars": str(len(request.jd_text)),
        },
    ):
        state = await run_agent(root_agent, initial_state)
        response = _build_response(state)
        span.update(output=response.model_dump())
        return response`;

  return (
    <div className="min-h-screen relative">
      <GridBackground />
      <Dock />

      {/* HEADER section (full-width, border-b, magicui pattern) */}
      <div className="space-y-4 border-b border-border relative z-10 pt-20">
        <div className="max-w-7xl mx-auto flex flex-col gap-6 px-6 pt-6 pb-14 md:pb-20">
          {/* Back button alone, left-aligned */}
          <Link
            href={`/${locale}#projects`}
            aria-label={t("back_to_projects")}
            className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-border bg-background hover:bg-muted/60 transition-colors w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          {/* Centered block: h1, tagline, shields, buttons */}
          <div className="text-center flex flex-col items-center gap-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-balance text-foreground">
              <Highlighter action="underline" color="#0ea5e9" strokeWidth={3}>
                {t("title")}
              </Highlighter>
            </h1>
            <p className="text-muted-foreground max-w-4xl md:text-lg md:text-balance mx-auto">
              {t("tagline")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-1.5">
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
          </div>
        </div>
      </div>

      {/* MAIN + ASIDE — flex with vertical dividers (magicui pattern) */}
      <div className="flex divide-x divide-border relative max-w-7xl mx-auto px-4 md:px-0 z-10">
        <div
          aria-hidden
          className="absolute max-w-7xl mx-auto left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] lg:w-full h-full border-x border-border pointer-events-none"
        />
        <main className="w-full p-0 overflow-hidden">
          {/* Cover — agent graph diagram on subtle gradient + dot pattern */}
          <div className="relative w-full h-[500px] overflow-hidden border-b border-border bg-gradient-to-br from-background via-muted/40 to-background">
            <div
              aria-hidden
              className="absolute inset-0 opacity-50 [background-image:radial-gradient(circle,var(--color-border)_1px,transparent_1px)] [background-size:20px_20px]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent"
            />
            <Image
              src="/projects/career-copilot-graph.svg"
              alt={t("architecture_graph_alt")}
              fill
              priority
              sizes="100vw"
              className="relative z-10 object-contain p-6 md:p-12 block dark:hidden"
            />
            <Image
              src="/projects/career-copilot-graph-dark.svg"
              alt={t("architecture_graph_alt")}
              fill
              priority
              sizes="100vw"
              className="relative z-10 object-contain p-6 md:p-12 hidden dark:block"
            />
          </div>

          <div className="p-6 lg:p-10">
            <div className="prose dark:prose-invert max-w-none prose-headings:scroll-mt-8 prose-headings:font-semibold prose-a:no-underline prose-headings:tracking-tight prose-headings:text-balance prose-p:tracking-tight prose-lg prose-strong:text-foreground prose-a:text-primary-sky hover:prose-a:underline">
            {/* OBJECTIVE — magicui prose pattern */}
            <H2 number="01" id="objective">{t("problem_kicker")}</H2>
            <p>{t("problem_title")}</p>
            <h3>{t("problem_subhead")}</h3>
            <ul>
              {problemBullets.map((b, i) => (
                <li key={i}>
                  <strong>{b.prefix}</strong>: {b.desc}
                </li>
              ))}
            </ul>

            {/* USE CASE — magicui prose pattern */}
            <H2 number="02" id="modes">{t("solution_kicker")}</H2>
            <p>{t("modes_title")}</p>
            <div className="not-prose my-8 rounded-xl border border-border bg-gradient-to-br from-background via-muted/40 to-background overflow-hidden">
              <div
                aria-hidden
                className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle,var(--color-border)_1px,transparent_1px)] [background-size:18px_18px]"
              />
              <Image
                src="/projects/use-case-flow.svg"
                alt="Career Copilot high-level flow"
                width={900}
                height={300}
                className="relative z-10 mx-auto block dark:hidden p-4 md:p-6 max-w-full h-auto"
              />
              <Image
                src="/projects/use-case-flow-dark.svg"
                alt="Career Copilot high-level flow"
                width={900}
                height={300}
                className="relative z-10 mx-auto hidden dark:block p-4 md:p-6 max-w-full h-auto"
              />
            </div>
            <h3>{t("modes_subhead")}</h3>
            <ul>
              {modesBullets.map((b, i) => (
                <li key={i}>
                  <strong>{b.prefix}</strong>: {b.desc}
                </li>
              ))}
            </ul>
            <h3>{t("modes_graph_subhead")}</h3>
            <ul>
              {modesGraphBullets.map((b, i) => (
                <li key={i}>
                  <strong>{b.prefix}</strong>: {b.desc}
                </li>
              ))}
            </ul>

            {/* 03 AGENTIC ARCHITECTURE — schema → comment → code → agent cards */}
            <H2 number="03" id="agentic">{t("agentic_kicker")}</H2>

            {/* Schema (gradient bg + dot pattern) */}
            <div className="not-prose relative rounded-2xl border border-border bg-gradient-to-br from-background via-muted/40 to-background overflow-hidden my-8">
              <div
                aria-hidden
                className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle,var(--color-border)_1px,transparent_1px)] [background-size:18px_18px]"
              />
              <Image
                src="/projects/career-copilot-graph.svg"
                alt={t("architecture_graph_alt")}
                width={1100}
                height={500}
                className="relative z-10 mx-auto block dark:hidden p-4 md:p-6 max-w-full h-auto"
              />
              <Image
                src="/projects/career-copilot-graph-dark.svg"
                alt={t("architecture_graph_alt")}
                width={1100}
                height={500}
                className="relative z-10 mx-auto hidden dark:block p-4 md:p-6 max-w-full h-auto"
              />
            </div>

            {/* Comment on the architecture */}
            <p>{t("agentic_comment")}</p>

            <h3>{t("agentic_wiring_subhead")}</h3>
            <ul>
              {agenticWiringBullets.map((b, i) => (
                <li key={i}>
                  <strong>{b.prefix}</strong>
                  <ul>
                    {b.sub.map((s, j) => (
                      <li key={j}>{s}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>

            {/* Workflow code */}
            <CodeBlock language="python · app/agent/agent.py">
              {graphSnippet}
            </CodeBlock>

            {/* Agents — grouped grids, animata product-features card style */}
            <h3>{t("agents_title")}</h3>
            <p>{t("agents_intro")}</p>

            {(
              [
                { roleKey: "agent_role_parser", cols: "sm:grid-cols-2" },
                { roleKey: "agent_role_recruiter", cols: "sm:grid-cols-3" },
                { roleKey: "agent_role_candidate", cols: "sm:grid-cols-3" },
              ] as const
            ).map(({ roleKey, cols }) => {
              const roleLabel = t(roleKey);
              const groupAgents = agents.filter((a) => a.role === roleLabel);
              return (
                <div key={roleKey} className="not-prose mt-8">
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-3 text-center">
                    {roleLabel}
                  </h4>
                  <div
                    className={`grid gap-4 place-items-stretch ${cols} max-w-3xl mx-auto`}
                  >
                    {groupAgents.map((agent) => {
                      const Icon = agent.icon;
                      return (
                        <article
                          key={agent.name}
                          className="group relative flex flex-col h-56 w-full rounded-2xl border border-border bg-gradient-to-br from-primary-sky/5 via-card to-card overflow-hidden p-5 transition-all duration-300 ease-out hover:scale-[1.03] hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-sky/10 hover:border-primary-sky/40"
                        >
                          <div className="flex size-10 items-center justify-center rounded-xl bg-primary-sky/15 text-primary-sky mb-3 transition-transform duration-300 group-hover:scale-110">
                            <Icon className="size-5" />
                          </div>
                          <h5 className="font-mono text-sm font-bold text-foreground mb-1">
                            {agent.name}
                          </h5>
                          <p
                            className="font-mono text-[10px] text-primary-sky mb-2"
                            dir="ltr"
                          >
                            → {agent.output}
                          </p>
                          <p className="text-xs text-muted-foreground leading-relaxed flex-1 overflow-hidden">
                            {agent.description}
                          </p>
                        </article>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* 04 SYSTEM DESIGN — backend + frontend justifications */}
            <H2 number="04" id="system-design">{t("design_kicker")}</H2>
            <p>{t("design_title")}</p>

            <h3>{t("design_backend_subhead")}</h3>
            <ul>
              {designBackendBullets.map((b, i) => (
                <li key={i}>
                  <strong>{b.prefix}</strong>: {b.desc}
                </li>
              ))}
            </ul>
            <CodeBlock language="python · app/routes/analyze.py">
              {fastapiSnippet}
            </CodeBlock>

            <h3>{t("design_frontend_subhead")}</h3>
            <ul>
              {designFrontendBullets.map((b, i) => (
                <li key={i}>
                  <strong>{b.prefix}</strong>: {b.desc}
                </li>
              ))}
            </ul>

            {/* OBSERVABILITY */}
            <H2 number="05" id="observability">{t("obs_kicker")}</H2>
            <p className="text-xl md:text-2xl font-medium text-foreground leading-snug mt-4 mb-4">
              {t("obs_title")}
            </p>
            <p className="text-base text-foreground/80 leading-relaxed mb-6">
              {t("obs_intro")}
            </p>
            <CodeBlock language="python · app/routes/analyze.py">
              {langfuseSnippet}
            </CodeBlock>
            <div className="not-prose grid gap-3 md:grid-cols-3 my-8">
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
          </div>
        </main>

        {/* RIGHT ASIDE — sticky TOC + preview card (magicui pattern) */}
        <aside className="hidden lg:block w-[350px] flex-shrink-0 p-6 lg:p-10 bg-muted/60 dark:bg-muted/20">
          <div className="sticky top-20 space-y-6">
            {/* AUTHOR CARD (magicui pattern) */}
            <div className="flex items-start gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/photo.jpg"
                alt={tHero("name")}
                className="rounded-full w-10 h-10 border border-border object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm tracking-tight text-balance font-semibold text-foreground">
                  {tHero("name")}
                </h3>
                <p className="text-xs text-muted-foreground text-balance">
                  {tHero("role")}
                </p>
              </div>
            </div>

            <div className="border border-border rounded-lg p-6 bg-card">
              <TableOfContents items={tocItems} title={t("toc_title")} />
            </div>
            <a
              href={LIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary-sky/40 hover:shadow-lg hover:shadow-primary-sky/5"
            >
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-muted">
                <Image
                  src="/projects/career-copilot.png"
                  alt={t("title")}
                  fill
                  sizes="350px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
                />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-background/85 backdrop-blur-sm border border-border text-[10px] font-medium uppercase tracking-wider text-foreground">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live
                </span>
              </div>
              <div className="p-4 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-foreground truncate">
                    {tProjects("try_it")}
                  </h4>
                  <p className="text-[11px] text-muted-foreground mt-0.5 truncate font-mono">
                    career-copilot.najinajari.com
                  </p>
                </div>
                <ArrowUpRight className="size-4 text-muted-foreground shrink-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary-sky" />
              </div>
            </a>
          </div>
        </aside>
      </div>

      <Footer />
    </div>
  );
}
