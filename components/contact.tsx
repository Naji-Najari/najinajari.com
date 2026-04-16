"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Mail, Send, CheckCircle, Loader2, Phone, Copy, Check } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTrack } from "@/hooks/use-track";
import { logoUrl } from "@/lib/logo";

function RevealItem({
  label,
  value,
  icon,
  domain,
  isLink,
  platform,
}: {
  label: string;
  value: string;
  icon?: React.ElementType;
  domain?: string;
  isLink?: boolean;
  platform: string;
}) {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const Icon = icon;
  const track = useTrack();

  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden transition-colors hover:border-neutral-400 dark:hover:border-neutral-600">
      <button
        onClick={() => {
          if (!revealed) {
            track("external_link_click", {
              platform,
              location: "contact",
              action: "reveal",
            });
          }
          setRevealed(!revealed);
        }}
        className="w-full flex items-center gap-3 text-sm font-medium px-4 py-3 text-foreground"
      >
        {domain ? (
          <img src={logoUrl(domain)} alt={label} className="size-5 rounded-sm" />
        ) : (
          Icon && <Icon className="size-5 text-muted-foreground" />
        )}
        {label}
      </button>
      {revealed && (
        <div className="flex items-center justify-between px-4 pb-3 gap-2">
          {isLink ? (
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                track("external_link_click", {
                  platform,
                  location: "contact",
                  action: "click_link",
                })
              }
              className="text-xs text-primary-sky hover:underline truncate"
            >
              {value}
            </a>
          ) : (
            <span className="text-xs text-muted-foreground truncate">{value}</span>
          )}
          <button
            onClick={() => {
              navigator.clipboard.writeText(value);
              track("external_link_click", {
                platform,
                location: "contact",
                action: "copy",
              });
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="shrink-0 p-1 rounded hover:bg-muted transition-colors"
          >
            {copied ? (
              <Check className="size-3.5 text-green-500" />
            ) : (
              <Copy className="size-3.5 text-muted-foreground" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}

const contactItems = [
  { label: "Email", value: "najarinaji2015@gmail.com", domain: "", icon: Mail, isLink: false, platform: "email" },
  { label: "Phone", value: "(+33) 6 98 28 43 44", domain: "", icon: Phone, isLink: false, platform: "phone" },
  { label: "LinkedIn", value: "https://www.linkedin.com/in/naji-najari", domain: "linkedin.com", icon: null, isLink: true, platform: "linkedin" },
];

export default function Contact() {
  const t = useTranslations("contact");
  const track = useTrack();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();
      track("contact_submit", { status: "success", subject_length: form.subject.length });
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      track("contact_submit", { status: "error" });
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <BlurFade delay={0.1} inView>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground heading-underline inline-block">
              {t("title")}
            </h2>
            <p className="mt-6 text-lg text-foreground">
              {t("subtitle")}
            </p>
          </div>
        </BlurFade>

        <div className="max-w-xl mx-auto">
          {/* Direct contact */}
          <BlurFade delay={0.15} inView>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              {contactItems.map((item) => (
                <RevealItem
                  key={item.label}
                  label={item.label}
                  value={item.value}
                  icon={item.icon || undefined}
                  domain={item.domain || undefined}
                  isLink={item.isLink}
                  platform={item.platform}
                />
              ))}
            </div>
          </BlurFade>

          {/* Separator */}
          <BlurFade delay={0.18} inView>
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-800" />
              <span className="text-xs text-muted-foreground uppercase tracking-wider">{t("or_form")}</span>
              <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-800" />
            </div>
          </BlurFade>

          {/* Form */}
          <BlurFade delay={0.2} inView>
            <MagicCard
              className="rounded-xl"
              gradientColor="#2563eb08"
              gradientFrom="#2563eb"
              gradientTo="#3b82f6"
            >
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    placeholder={t("your_name")}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                  <Input
                    type="email"
                    placeholder={t("your_email")}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
                <Input
                  placeholder={t("subject")}
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  required
                />
                <Textarea
                  placeholder={t("your_message")}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                />
                <button
                  type="submit"
                  disabled={status === "sending" || status === "sent"}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-medium py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {status === "sending" && <Loader2 className="size-4 animate-spin" />}
                  {status === "sent" && <CheckCircle className="size-4" />}
                  {status === "idle" || status === "error" ? <Send className="size-4" /> : null}
                  {status === "idle" && t("send")}
                  {status === "sending" && t("sending")}
                  {status === "sent" && t("sent")}
                  {status === "error" && t("error")}
                </button>
              </form>
            </MagicCard>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
