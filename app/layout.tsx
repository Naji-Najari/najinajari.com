import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://najinajari.com"),
  title: "Naji Najari — Senior AI Engineer | Multi-Agent Systems, RAG, LLMOps",
  description:
    "Senior AI Engineer with a PhD in Machine Learning. Building multi-agent AI systems in production: LangGraph, RAG, Google ADK, LLMOps. Open to freelance missions.",
  keywords: [
    "AI Engineer",
    "Senior AI Engineer",
    "Multi-Agent Systems",
    "RAG",
    "LangGraph",
    "Google ADK",
    "LLMOps",
    "MLOps",
    "Freelance AI Engineer",
    "PhD Machine Learning",
    "Langfuse",
    "LLM Fine-tuning",
    "FastAPI",
    "Python",
    "AI Agents",
    "RAG Pipeline",
    "Naji Najari",
  ],
  authors: [{ name: "Naji Najari" }],
  creator: "Naji Najari",
  alternates: {
    canonical: "https://najinajari.com",
  },
  openGraph: {
    title: "Naji Najari — Senior AI Engineer",
    description:
      "Senior AI Engineer with a PhD in ML. Building multi-agent AI systems, RAG pipelines, and LLM-powered products in production.",
    url: "https://najinajari.com",
    siteName: "Naji Najari",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Naji Najari — Senior AI Engineer",
    description:
      "Senior AI Engineer with a PhD in ML. AI Agents, RAG, LLMOps. Open to freelance.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
