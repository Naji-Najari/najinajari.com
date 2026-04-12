"use client";

import { Mail, ArrowUpRight } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";

const logoUrl = (domain: string) =>
  `https://img.logo.dev/${domain}?token=${process.env.NEXT_PUBLIC_LOGO_DEV_API_KEY}&size=64`;

const contactLinks = [
  {
    label: "Email",
    url: "mailto:najarinaji2015@gmail.com",
    domain: "",
    lucide: Mail,
  },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/naji-najari",
    domain: "linkedin.com",
    lucide: null,
  },
  {
    label: "GitHub",
    url: "https://github.com/Naji-Najari",
    domain: "github.com",
    lucide: null,
  },
  {
    label: "Google Scholar",
    url: "https://scholar.google.com/citations?user=rkgpg1gAAAAJ",
    domain: "scholar.google.com",
    lucide: null,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-20 md:py-28 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto text-center">
        <BlurFade delay={0.1} inView>
          <h2 className="text-3xl font-bold text-foreground heading-underline inline-block">
            Let&apos;s work together
          </h2>
        </BlurFade>

        <BlurFade delay={0.2} inView>
          <p className="text-base text-muted-foreground max-w-xl mx-auto mt-6 mb-10">
            Got a project in mind? I'd love to hear about it.
          </p>
        </BlurFade>

        <BlurFade delay={0.3} inView>
          <a
            href="mailto:najarinaji2015@gmail.com"
            className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-xl text-lg font-semibold hover:opacity-90 transition-all duration-300 hover:-translate-y-0.5"
          >
            <Mail className="size-5" />
            najarinaji2015@gmail.com
            <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </BlurFade>

        <BlurFade delay={0.4} inView>
          <div className="flex justify-center gap-3 mt-8">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target={link.url.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors"
              >
                {link.domain ? (
                  <img
                    src={logoUrl(link.domain)}
                    alt={link.label}
                    className="size-4 rounded-sm"
                  />
                ) : (
                  link.lucide && <link.lucide className="size-4" />
                )}
                {link.label}
              </a>
            ))}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
