"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MessageCircle, X, Send, Sparkles, RefreshCw } from "lucide-react";
import { apiEndpoint } from "@/lib/api";

type ChatProductCard = {
  name: string;
  price: number;
  image?: string | null;
  url: string;
};

type ChatSource = { label: string; url: string };

type UiMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  products?: ChatProductCard[];
  sources?: ChatSource[];
  suggestions?: string[];
  error?: boolean;
};

const CHAT_PERSIST_ENABLED = true;
const STORAGE_KEY = "baktiseva.chat.session";

const QUICK_SUGGESTIONS = [
  "Pooja & Homa Prices",
  "Shop Puja Essentials",
  "Upcoming Events",
  "Available Seva",
  "Shipping Information",
  "Track My Order",
  "Festival Collections",
  "Contact Bakti Seva",
];

const CHAT_SUBTITLE = "Answers from the full Bakti Seva website";
const WELCOME =
  "Namaste! 🙏 Welcome to Bakti Seva & Sri Lakshminarasimhaswami Matth. Ask me about any pooja, homa, seva, shop item, event, shipping policy, or page on this website.";

function FormattedChatMessage({ text }: { text?: string }) {
  const safeText = typeof text === "string" ? text : "";
  if (!safeText) return null;

  const lines = safeText.split("\n");

  return (
    <div className="space-y-1.5 leading-relaxed text-xs md:text-sm text-[#49332D]">
      {lines.map((line, lineIdx) => {
        if (!line.trim()) return <div key={lineIdx} className="h-1" />;

        const parts = line.split(/(\[[^\]]+\]\([^)]+\))/g);

        return (
          <p key={lineIdx}>
            {parts.map((part, partIdx) => {
              const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
              if (linkMatch) {
                const [, label, href] = linkMatch;
                const safeHref = href.startsWith("/") || href.startsWith("https://") ? href : "/";
                return (
                  <Link
                    key={partIdx}
                    href={safeHref}
                    className="inline-flex items-center gap-1 font-semibold text-accent underline underline-offset-2 hover:text-accent/80 transition-colors mx-0.5"
                  >
                    {label}
                  </Link>
                );
              }

              const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
              return boldParts.map((bPart, bIdx) => {
                if (bPart.startsWith("**") && bPart.endsWith("**")) {
                  return (
                    <strong key={`${partIdx}-${bIdx}`} className="font-bold text-[#49332D]">
                      {bPart.slice(2, -2)}
                    </strong>
                  );
                }
                return <span key={`${partIdx}-${bIdx}`}>{bPart}</span>;
              });
            })}
          </p>
        );
      })}
    </div>
  );
}

export function FloatingWidgets() {
  const pathname = usePathname();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<UiMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
    if (!CHAT_PERSIST_ENABLED) return;
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as UiMessage[];
      if (Array.isArray(parsed)) setMessages(parsed);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!isClient || !CHAT_PERSIST_ENABLED) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-40)));
    } catch {
      /* ignore */
    }
  }, [messages, isClient]);

  useEffect(() => {
    if (isChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [messages, isChatOpen, isLoading]);

  useEffect(() => {
    if (!isChatOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsChatOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isChatOpen]);

  const resetChat = () => {
    abortRef.current?.abort();
    setMessages([]);
    setIsLoading(false);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  const sendText = useCallback(async (text: string, retryFrom?: UiMessage[]) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const historySource = retryFrom || messages;
    const userMsg: UiMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: trimmed,
    };
    const nextMessages = [...historySource, userMsg];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    const controller = new AbortController();
    abortRef.current = controller;
    const timeout = setTimeout(() => controller.abort(), 28000);

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/chat`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          message: trimmed,
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.status === 429) {
        setMessages((prev) => [
          ...prev,
          {
            id: `e-${Date.now()}`,
            role: "assistant",
            content: "You're sending messages a little too quickly. Please wait a moment.",
            error: true,
          },
        ]);
        return;
      }

      if (!response.ok || !data?.success || typeof data.reply !== "string") {
        setMessages((prev) => [
          ...prev,
          {
            id: `e-${Date.now()}`,
            role: "assistant",
            content:
              typeof data?.message === "string"
                ? data.message
                : "I'm having trouble responding right now. Please try again in a moment.",
            error: true,
          },
        ]);
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          content: data.reply,
        },
      ]);
    } catch (error) {
      console.error("Chat API error:", error);
      const timedOut = error instanceof DOMException && error.name === "AbortError";
      setMessages((prev) => [
        ...prev,
        {
          id: `e-${Date.now()}`,
          role: "assistant",
          content: timedOut
            ? "The request timed out. Please try again in a moment."
            : "I'm having trouble responding right now. Please try again in a moment.",
          error: true,
        },
      ]);
    } finally {
      clearTimeout(timeout);
      setIsLoading(false);
    }
  }, [isLoading, messages]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void sendText(input);
  };

  const retryLast = () => {
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (!lastUser) return;
    const withoutErrors = messages.filter((m) => !m.error && m.id !== lastUser.id);
    void sendText(lastUser.content, withoutErrors);
  };

  if (pathname.startsWith("/admin")) return null;

  const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant" && !m.error);

  return (
    <>
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        id="whatsapp-widget"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-6 left-6 z-50 w-[60px] h-[60px] rounded-full flex items-center justify-center shadow-[0_4px_24px_rgba(37,211,102,0.45)] hover:scale-110 hover:shadow-[0_6px_32px_rgba(37,211,102,0.6)] transition-all duration-300 group"
        style={{ background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)" }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 175.216 175.552" className="w-8 h-8" fill="white">
          <path d="M87.608 0C39.331 0 0 39.332 0 87.609c0 15.237 3.937 29.561 10.846 42.025L0 175.552l47.299-10.617c12.085 6.481 25.894 10.173 40.563 10.173C136.137 175.108 175.216 135.776 175.216 87.5 175.216 39.218 135.884 0 87.608 0zm0 160.748c-14.023 0-27.038-3.959-38.082-10.815l-26.693 5.999 6.18-26.139c-7.361-11.359-11.637-24.932-11.637-39.477C17.376 48.127 48.127 17.376 87.608 17.376c39.48 0 70.231 30.751 70.231 70.231 0 39.48-30.751 70.141-70.231 70.141z" />
          <path d="M87.608 17.376C48.127 17.376 17.376 48.127 17.376 87.316c0 14.545 4.276 28.118 11.637 39.477l-6.18 26.139 26.693-5.999c11.044 6.856 24.059 10.815 38.082 10.815 39.48 0 70.231-30.661 70.231-70.141 0-39.48-30.751-70.231-70.231-70.231zM131.85 113.4c-1.641 4.609-9.559 8.811-13.094 9.272-3.352.439-7.596.619-12.267-1.104-2.826-1.02-6.451-2.379-11.09-4.63-19.527-9.449-32.283-30.005-33.25-31.393-.96-1.389-7.832-10.42-7.832-19.893 0-9.47 4.968-14.131 6.731-16.079 1.759-1.951 3.838-2.44 5.123-2.44.386 0 .734.018 1.044.033 1.392.059 2.091.144 3.008 2.339.96 2.253 3.283 8.778 3.576 9.422.297.645.491 1.393.096 2.25-.379.873-.569 1.414-1.143 2.176-.576.764-1.204 1.703-1.716 2.289-.576.645-1.174 1.346-.504 2.638 1.39 2.681 4.959 8.182 10.626 13.243 7.305 6.502 13.474 8.57 15.34 9.524 1.868.953 2.971.795 4.072-.484 1.101-1.277 4.713-5.507 5.972-7.393 1.255-1.881 2.513-1.574 4.232-.97 1.719.604 10.936 5.164 12.806 6.104 1.871.94 3.114 1.393 3.572 2.171.455.78.455 4.499-1.302 9.165z" />
        </svg>
        <span className="absolute left-full ml-3 whitespace-nowrap bg-charcoal text-ivory text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg pointer-events-none">
          Chat on WhatsApp
        </span>
      </a>

      <div className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end max-w-[calc(100vw-1.5rem)]">
        {isClient && (
          <div
            className={`bg-[#FFFDF7] w-[min(380px,calc(100vw-1.5rem))] rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 transform origin-bottom-right mb-4 border border-[#E8D5B0] flex flex-col h-[min(480px,70vh)] ${
              isChatOpen
                ? "scale-100 opacity-100"
                : "scale-0 opacity-0 pointer-events-none absolute bottom-10"
            }`}
            role="dialog"
            aria-label="Bakti AI Guide chat"
          >
            <div className="bg-[#641E2E] text-ivory p-4 flex items-center justify-between shadow-md shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent shrink-0">
                  <Sparkles className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold flex items-center gap-1.5">
                    Bakti AI Guide
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" aria-hidden />
                  </h3>
                  <p className="text-[11px] text-ivory/70">{CHAT_SUBTITLE}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={resetChat}
                    title="Clear Chat"
                    aria-label="Reset conversation"
                    className="text-ivory/60 hover:text-ivory p-1.5 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsChatOpen(false)}
                  aria-label="Close chat"
                  className="text-ivory/70 hover:text-ivory p-1.5 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 p-4 bg-[#FFFDF7] overflow-y-auto flex flex-col gap-3.5 overscroll-contain">
              <div className="bg-[#FFFDF7] p-3.5 rounded-2xl rounded-tl-none shadow-sm text-[#49332D] border border-[#E8D5B0] self-start max-w-[90%]">
                <p className="font-semibold text-xs text-accent mb-1">Bakti AI Guide</p>
                <p className="text-xs md:text-sm leading-relaxed">{WELCOME}</p>
              </div>

              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`p-3.5 rounded-2xl shadow-sm text-xs md:text-sm border ${
                    m.role === "user"
                      ? "bg-[#F8F1E5] text-[#49332D] border-[#D8B76E] rounded-tr-none self-end max-w-[85%]"
                      : "bg-[#FFFDF7] text-[#49332D] border-[#E8D5B0] rounded-tl-none self-start max-w-[90%]"
                  }`}
                >
                  {m.role !== "user" && (
                    <p className="font-semibold text-[11px] text-accent mb-1">Bakti AI Guide</p>
                  )}
                  <FormattedChatMessage text={m.content} />
                  {m.products && m.products.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {m.products.map((p) => (
                        <Link
                          key={p.url}
                          href={p.url}
                          className="flex items-center gap-2 rounded-xl border border-[#E8D5B0] bg-white p-2 hover:border-[#D8B76E] transition-colors"
                        >
                          {p.image ? (
                            <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                          ) : (
                            <span className="w-10 h-10 rounded-lg bg-[#F8F1E5]" />
                          )}
                          <span className="min-w-0">
                            <span className="block text-xs font-semibold truncate">{p.name}</span>
                            <span className="text-[11px] text-accent font-bold">₹{p.price}</span>
                          </span>
                        </Link>
                      ))}
                      <Link href="/shop" className="text-[11px] font-semibold text-accent underline">
                        View All →
                      </Link>
                    </div>
                  )}
                  {m.sources && m.sources.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {m.sources.slice(0, 4).map((s) => (
                        <Link
                          key={s.url}
                          href={s.url}
                          className="text-[10px] px-2 py-0.5 rounded-full border border-[#E8D5B0] text-[#49332D]/80 hover:text-accent"
                        >
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  )}
                  {m.error && (
                    <button
                      type="button"
                      onClick={retryLast}
                      className="mt-2 text-[11px] font-semibold text-accent underline"
                    >
                      Retry
                    </button>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="bg-[#FFFDF7] p-3.5 rounded-2xl rounded-tl-none shadow-sm text-xs text-[#49332D]/70 border border-[#E8D5B0] self-start max-w-[85%] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-accent animate-bounce delay-150" />
                  <span className="w-2 h-2 rounded-full bg-accent animate-bounce delay-300" />
                  <span className="text-xs text-[#49332D]/60 ml-1">Bakti AI Guide is thinking...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {messages.length === 0 && (
              <div className="px-3 py-2 bg-[#FFFDF7] border-t border-[#E8D5B0] flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
                {QUICK_SUGGESTIONS.map((suggestion) => (
                  <button
                    type="button"
                    key={suggestion}
                    onClick={() => void sendText(suggestion)}
                    className="whitespace-nowrap text-[11px] font-medium bg-[#F8F1E5] hover:bg-accent/15 text-[#49332D] hover:text-accent px-2.5 py-1 rounded-full border border-[#E8D5B0] transition-all shrink-0"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {lastAssistant?.suggestions && lastAssistant.suggestions.length > 0 && messages.length > 0 && (
              <div className="px-3 py-2 bg-[#FFFDF7] border-t border-[#E8D5B0] flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
                {lastAssistant.suggestions.map((suggestion) => (
                  <button
                    type="button"
                    key={suggestion}
                    onClick={() => void sendText(suggestion)}
                    disabled={isLoading}
                    className="whitespace-nowrap text-[11px] font-medium bg-[#F8F1E5] hover:bg-accent/15 text-[#49332D] hover:text-accent px-2.5 py-1 rounded-full border border-[#E8D5B0] transition-all shrink-0"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="p-3 bg-[#FFFDF7] border-t border-[#E8D5B0] flex items-center gap-2 shrink-0"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Poojas, Products, Timings..."
                aria-label="Chat message"
                className="flex-1 bg-[#F8F1E5] text-xs sm:text-sm text-[#49332D] rounded-full px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-accent transition-shadow border border-[#E8D5B0]"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
                className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center hover:bg-accent/90 disabled:opacity-50 transition-colors shrink-0 shadow-md"
              >
                <Send className="w-4 h-4 ml-[-2px]" />
              </button>
            </form>
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-[60px] h-[60px] bg-[#641E2E] text-ivory rounded-full flex items-center justify-center shadow-2xl hover:bg-maroon hover:scale-110 transition-all duration-300 relative group"
          aria-label={isChatOpen ? "Close AI Chat" : "Open AI Chat"}
        >
          {isChatOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
          {!isChatOpen && (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-accent rounded-full border-2 border-white" />
          )}
        </button>
      </div>
    </>
  );
}
