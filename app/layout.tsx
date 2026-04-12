import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Naji Najari — Senior AI Engineer | Multi-Agent Systems, RAG, LLMOps",
  description:
    "Senior AI Engineer with a PhD in Machine Learning. Building multi-agent AI systems in production: LangGraph, RAG, Google ADK, LLMOps. Open to freelance missions.",
  keywords: [
    "AI Engineer",
    "Multi-Agent Systems",
    "RAG",
    "LangGraph",
    "LLMOps",
    "MLOps",
    "Freelance",
    "PhD Machine Learning",
    "Google ADK",
    "Langfuse",
  ],
  authors: [{ name: "Naji Najari" }],
  openGraph: {
    title: "Naji Najari — Senior AI Engineer",
    description:
      "Building multi-agent AI systems in production. PhD in ML. Open to freelance.",
    url: "https://najinajari.com",
    siteName: "Naji Najari",
    locale: "en_US",
    type: "website",
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
