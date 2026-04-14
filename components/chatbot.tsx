"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState, useRef, useEffect, useCallback } from "react";
import { MessageSquare, X, ArrowUp, Square, Copy, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestionKeys = [
  { titleKey: "suggestion_1", labelKey: "suggestion_1_label" },
  { titleKey: "suggestion_2", labelKey: "suggestion_2_label" },
  { titleKey: "suggestion_3", labelKey: "suggestion_3_label" },
  { titleKey: "suggestion_4", labelKey: "suggestion_4_label" },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-muted"
      aria-label="Copy"
    >
      {copied ? <Check className="size-3 text-green-500" /> : <Copy className="size-3 text-muted-foreground" />}
    </button>
  );
}

const SESSION_STORAGE_KEY = "nn_chat_session";

/**
 * Returns a stable session identifier persisted in localStorage so that
 * Langfuse groups every chat turn from the same browser into a single
 * conversation trace group.
 */
function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";
  const existing = window.localStorage.getItem(SESSION_STORAGE_KEY);
  if (existing) return existing;
  const fresh =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `s_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  window.localStorage.setItem(SESSION_STORAGE_KEY, fresh);
  return fresh;
}

export default function Chatbot() {
  const t = useTranslations("chatbot");
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const [followUps, setFollowUps] = useState<string[]>([]);
  const [sessionId, setSessionId] = useState("");
  const abortRef = useRef<AbortController | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setSessionId(getOrCreateSessionId());
  }, []);

  const scrollToBottom = useCallback(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingContent, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isStreaming) return;

    const userMessage: Message = { role: "user", content: content.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsStreaming(true);
    setStreamingContent("");
    setFollowUps([]);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-session-id": sessionId,
          "x-locale": locale,
        },
        body: JSON.stringify({ messages: newMessages }),
        signal: controller.signal,
      });

      if (!res.ok) throw new Error("Failed");

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No reader");

      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;
            try {
              const parsed = JSON.parse(data);
              if (parsed.text) {
                accumulated += parsed.text;
                setStreamingContent(accumulated);
              }
            } catch {
              // skip
            }
          }
        }
      }

      // Parse follow-up suggestions
      const parts = accumulated.split("---SUGGESTIONS---");
      const cleanContent = parts[0].trim();
      const newFollowUps = parts[1]
        ? parts[1].trim().split("\n").map((s) => s.trim()).filter(Boolean)
        : [];

      setMessages((prev) => [...prev, { role: "assistant", content: cleanContent }]);
      setFollowUps(newFollowUps);
      setStreamingContent("");
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Sorry, something went wrong. Please try again." },
        ]);
      }
      setStreamingContent("");
    } finally {
      setIsStreaming(false);
      abortRef.current = null;
    }
  };

  const handleStop = () => {
    if (abortRef.current) {
      abortRef.current.abort();
      if (streamingContent) {
        setMessages((prev) => [...prev, { role: "assistant", content: streamingContent }]);
        setStreamingContent("");
      }
    }
  };

  return (
    <>
      {/* Floating Button - exact FeedLake style */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="lg"
        className={cn(
          "fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50",
          "h-16 w-16 rounded-full shadow-2xl",
          "transition-all duration-300 ease-out",
          "hover:scale-110 active:scale-95",
          isOpen
            ? "bg-muted hover:bg-muted/80 rotate-90"
            : "bg-gradient-to-br from-primary via-primary/90 to-primary/80 hover:shadow-primary/50"
        )}
      >
        {isOpen ? (
          <X className="h-6 w-6 transition-transform duration-300" />
        ) : (
          <MessageSquare className="h-6 w-6" />
        )}
        <span className="sr-only">{isOpen ? "Close chat" : "Open chat"}</span>
      </Button>

      {/* Chat popup */}
      {isOpen && (
        <>
          {/* Glassmorphism Backdrop */}
          <div
            className={cn(
              "fixed inset-0 z-40",
              "bg-black/30 backdrop-blur-[1px]",
              "animate-in fade-in duration-300"
            )}
            onClick={() => setIsOpen(false)}
          />

          {/* Chat Window */}
          <div
            className={cn(
              "fixed bottom-20 right-4 md:bottom-24 md:right-6 z-50",
              "w-[calc(100vw-2rem)] h-[calc(100vh-8rem)] md:w-[440px] md:h-[650px] max-h-[calc(100vh-140px)]",
              "rounded-2xl shadow-2xl",
              "border border-border/50",
              "bg-background/95 backdrop-blur-xl",
              "overflow-hidden flex flex-col",
              "animate-in slide-in-from-bottom-8 duration-300 ease-out"
            )}
          >
            {/* Header */}
            <div
              className={cn(
                "flex items-center justify-between px-5 py-4",
                "border-b border-border/50",
                "bg-gradient-to-r from-primary/5 via-primary/3 to-transparent"
              )}
            >
              <div className="flex items-center gap-3">
                <img
                  src="/photo.jpg"
                  alt="Naji Najari"
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-neutral-200 dark:ring-neutral-700"
                />
                <div className="flex flex-col">
                  <h3 className="font-semibold text-sm">{t("assistant_name")}</h3>
                  <p className="text-xs text-muted-foreground">{t("ask_anything")}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-muted"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Messages viewport */}
            <div ref={viewportRef} className="flex-1 overflow-y-auto px-4">
              {messages.length === 0 && !isStreaming ? (
                <div className="flex flex-col h-full justify-center px-4">
                  <p className="text-2xl font-semibold text-foreground">{t("welcome")}</p>
                  <p className="text-2xl text-muted-foreground/65 mb-8">
                    {t("welcome_sub")}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {suggestionKeys.map((s) => (
                      <button
                        key={s.titleKey}
                        onClick={() => sendMessage(t(s.titleKey))}
                        className="h-auto w-full items-start justify-start text-left flex flex-col gap-0.5 rounded-2xl border px-3 py-2.5 hover:bg-accent/60 transition-colors"
                      >
                        <span className="font-medium text-sm truncate w-full">{t(s.titleKey)}</span>
                        <span className="text-xs text-muted-foreground truncate w-full">{t(s.labelKey)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="py-4 space-y-4">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={cn(
                        "group",
                        msg.role === "user"
                          ? "grid auto-rows-auto grid-cols-[minmax(72px,1fr)_auto] gap-y-2"
                          : ""
                      )}
                    >
                      {msg.role === "user" ? (
                        <div className="col-start-2 min-w-0">
                          <div className="rounded-3xl bg-muted px-5 py-2.5 break-words text-sm text-foreground">
                            {msg.content}
                          </div>
                        </div>
                      ) : (
                        <div className="animate-in fade-in slide-in-from-bottom-1 duration-150">
                          <div className="mx-2 leading-7 break-words text-sm text-foreground prose prose-sm prose-neutral dark:prose-invert max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0 prose-headings:my-2 prose-strong:text-foreground prose-a:text-primary-sky">
                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                          </div>
                          <div className="mt-1 ml-2">
                            <CopyButton text={msg.content} />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  {isStreaming && streamingContent && (
                    <div className="animate-in fade-in duration-150">
                      <div className="mx-2 leading-7 break-words text-sm text-foreground prose prose-sm prose-neutral dark:prose-invert max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0 prose-headings:my-2 prose-strong:text-foreground prose-a:text-primary-sky">
                        <ReactMarkdown>{streamingContent.split("---SUGGESTIONS---")[0]}</ReactMarkdown>
                        <span className="inline-block w-1.5 h-4 bg-primary animate-pulse ml-0.5 align-middle" />
                      </div>
                    </div>
                  )}
                  {followUps.length > 0 && !isStreaming && (
                    <div className="flex flex-wrap gap-2 mt-2 ml-2">
                      {followUps.map((q) => (
                        <button
                          key={q}
                          onClick={() => sendMessage(q)}
                          className="text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  )}
                  <div className="min-h-8" />
                </div>
              )}
            </div>

            {/* Composer - Claude style */}
            <div className="p-3">
              <div className="relative rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-background shadow-sm focus-within:border-neutral-400 dark:focus-within:border-neutral-500 transition-colors">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    e.target.style.height = "auto";
                    e.target.style.height = Math.min(e.target.scrollHeight, 150) + "px";
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage(input);
                    }
                  }}
                  placeholder={t("placeholder")}
                  rows={1}
                  className="w-full resize-none bg-transparent text-sm leading-relaxed outline-none px-4 pt-3 pb-10 placeholder:text-muted-foreground/50 min-h-[44px] max-h-[150px]"
                />
                <div className="absolute bottom-2 right-2">
                  {isStreaming ? (
                    <button
                      onClick={handleStop}
                      className="size-8 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
                      aria-label="Stop generating"
                    >
                      <Square className="size-3.5 fill-current text-muted-foreground" />
                    </button>
                  ) : (
                    <button
                      onClick={() => sendMessage(input)}
                      disabled={!input.trim()}
                      className="size-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-30 hover:opacity-90 transition-opacity"
                      aria-label="Send message"
                    >
                      <ArrowUp className="size-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
