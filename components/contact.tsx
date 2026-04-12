"use client";

import { Mail, ArrowUpRight } from "lucide-react";
import { FaLinkedinIn, FaGithub, FaGraduationCap } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import FramerWrapper from "@/components/animation/framer-wrapper";

const contactLinks = [
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/naji-najari",
    icon: FaLinkedinIn,
  },
  {
    label: "GitHub",
    url: "https://github.com/Naji-Najari",
    icon: FaGithub,
  },
  {
    label: "Google Scholar",
    url: "https://scholar.google.com/citations?user=rkgpg1gAAAAJ",
    icon: FaGraduationCap,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-20 md:py-28 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto text-center">
        <FramerWrapper y={-20} delay={0.1}>
          <h2 className="text-3xl font-bold text-foreground mb-4 heading-underline inline-block">
            Let&apos;s work together
          </h2>
        </FramerWrapper>

        <FramerWrapper y={20} delay={0.2}>
          <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-lg mt-8">
            Open to senior freelance missions (remote/hybrid) — AI Agents · RAG
            · LLMOps · MLOps
          </p>
        </FramerWrapper>

        <FramerWrapper scale={0.9} delay={0.3}>
          <a
            href="mailto:najarinaji2015@gmail.com"
            className="group inline-flex items-center gap-3 bg-primary-sky text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl hover:shadow-primary-sky/25 transition-all duration-300 hover:-translate-y-0.5"
          >
            <Mail className="size-5" />
            najarinaji2015@gmail.com
            <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </FramerWrapper>

        <FramerWrapper y={20} delay={0.4}>
          <div className="flex justify-center gap-4 mt-8">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center size-12 rounded-full border-2 border-border text-muted-foreground hover:border-primary-sky hover:text-primary-sky hover:shadow-md transition-all duration-300"
                aria-label={link.label}
              >
                <link.icon className="size-5" />
              </a>
            ))}
          </div>
        </FramerWrapper>
      </div>
    </section>
  );
}
