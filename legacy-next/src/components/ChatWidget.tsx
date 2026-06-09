"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_QUESTIONS = [
  "¿Necesito visa para viajar a China?",
  "Ruta de 10 días por China",
  "¿Cómo pagar en China?",
  "Beijing, Shanghai o Xi’an?",
  "Consejos para primer viaje",
];

function normalizeMessage(detail: unknown) {
  if (typeof detail === "string") return detail;
  if (detail && typeof detail === "object" && "message" in detail) {
    const value = (detail as { message?: unknown }).message;
    return typeof value === "string" ? value : "";
  }
  return "";
}

export default function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState("");
  const sectionRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  useEffect(() => {
    loadingRef.current = isLoading;
  }, [isLoading]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  const scrollToChat = useCallback(() => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => inputRef.current?.focus(), 320);
  }, []);

  const sendMessage = useCallback(async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg || loadingRef.current) return;

    loadingRef.current = true;
    const userMessage: Message = { role: "user", content: msg };
    const newMessages = [...messages, userMessage];
    setMessages([...newMessages, { role: "assistant", content: "__TYPING__" }]);
    setInput("");
    setIsLoading(true);
    scrollToChat();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: msg,
          conversation_id: conversationId,
        }),
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        throw new Error(`HTTP ${res.status}: ${errText}`);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No reader");

      const decoder = new TextDecoder();
      let assistantContent = "";
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("__CONV_ID__:")) {
            const cid = line.replace("__CONV_ID__:", "").trim();
            if (cid) setConversationId(cid);
            continue;
          }
          if (line.trim()) {
            assistantContent += line + "\n";
            setMessages((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = {
                role: "assistant",
                content: assistantContent.trim(),
              };
              return updated;
            });
          }
        }
      }

      if (buffer.trim() && !buffer.startsWith("__CONV_ID__")) {
        assistantContent += buffer;
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: assistantContent.trim(),
          };
          return updated;
        });
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "desconocido";
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          role: "assistant",
          content: `Lo siento, hubo un error (${errorMessage}).\n\nPor favor, intenta de nuevo.`,
        },
      ]);
    } finally {
      loadingRef.current = false;
      setIsLoading(false);
    }
  }, [conversationId, input, messages, scrollToChat]);

  useEffect(() => {
    const openHandler = () => scrollToChat();
    const sendHandler = (event: Event) => {
      const message = normalizeMessage((event as CustomEvent).detail);
      if (!message) return;
      scrollToChat();
      window.setTimeout(() => sendMessage(message), 180);
    };

    window.addEventListener("open-chat", openHandler);
    window.addEventListener("chatbot-send-message", sendHandler);
    return () => {
      window.removeEventListener("open-chat", openHandler);
      window.removeEventListener("chatbot-send-message", sendHandler);
    };
  }, [scrollToChat, sendMessage]);

  return (
    <section ref={sectionRef} id="ai-chat" className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-[1000px] rounded-[28px] border border-[rgba(226,232,240,0.92)] bg-white shadow-[var(--shadow-soft)]">
        <div className="flex items-center justify-between gap-4 border-b border-[rgba(226,232,240,0.9)] bg-[linear-gradient(135deg,var(--ink-blue)_0%,#1a0a2e_100%)] px-5 py-4 text-white sm:px-6">
          <div>
            <p className="text-sm font-semibold">Chat con IA</p>
            <p className="mt-0.5 text-xs text-white/65">Preguntas reales, respuestas en español, contexto de viaje por China.</p>
          </div>
          <div className="hidden rounded-full border border-white/15 bg-white/8 px-3 py-1 text-xs text-white/72 sm:block">
            En línea
          </div>
        </div>

        <div className="grid gap-0 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="border-b border-[rgba(226,232,240,0.9)] bg-[var(--warm-rice)] p-5 lg:border-b-0 lg:border-r">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--slate-500)]">Sugerencias rápidas</p>
            <div className="mt-4 grid gap-2">
              {QUICK_QUESTIONS.map((question) => (
                <button
                  key={question}
                  onClick={() => sendMessage(question)}
                  className="rounded-2xl border border-[rgba(18,53,91,0.08)] bg-white px-4 py-3 text-left text-sm font-medium text-[var(--slate-700)] transition hover:border-[rgba(194,65,12,0.24)] hover:text-[var(--china-red)]"
                >
                  {question}
                </button>
              ))}
            </div>
          </aside>

          <div>
            <div className="h-[460px] overflow-y-auto bg-[var(--porcelain)] px-4 py-5 sm:px-6">
              {messages.length === 0 && (
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[var(--china-red)] text-xs font-semibold text-white">
                    AI
                  </div>
                  <div className="max-w-[86%] rounded-[24px] rounded-tl-md bg-white px-5 py-4 text-sm leading-7 text-[var(--slate-700)] shadow-[var(--shadow-soft)]">
                    <p className="font-semibold text-[var(--slate-900)]">Hola, soy tu asistente para viajar a China.</p>
                    <p className="mt-2">
                      Pregúntame por visado, pagos, ciudades, trenes, rutas o qué conviene hacer si es tu primera vez.
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    {message.role === "assistant" && message.content !== "__TYPING__" && (
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[var(--china-red)] text-xs font-semibold text-white">
                        AI
                      </div>
                    )}
                    <div
                      className={`max-w-[86%] whitespace-pre-wrap rounded-[24px] px-5 py-4 text-sm leading-7 shadow-[var(--shadow-soft)] ${
                        message.role === "user"
                          ? "rounded-tr-md bg-[linear-gradient(135deg,var(--china-red)_0%,var(--ink-blue)_100%)] text-white"
                          : message.content === "__TYPING__"
                          ? "rounded-tl-md bg-white text-[var(--slate-700)]"
                          : "rounded-tl-md bg-white text-[var(--slate-700)]"
                      }`}
                    >
                      {message.content === "__TYPING__" ? (
                        <span className="flex items-center gap-1.5 py-1">
                          <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--china-red)]" style={{ animationDelay: "0ms" }} />
                          <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--imperial-gold)]" style={{ animationDelay: "140ms" }} />
                          <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--ink-blue)]" style={{ animationDelay: "280ms" }} />
                        </span>
                      ) : (
                        message.content
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-[rgba(226,232,240,0.9)] bg-white p-4 sm:p-5">
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Escribe tu pregunta sobre China..."
                  disabled={isLoading}
                  className="min-h-12 flex-1 rounded-full border border-[rgba(226,232,240,0.95)] bg-[var(--porcelain)] px-5 text-sm text-[var(--slate-900)] outline-none transition placeholder:text-[var(--slate-500)] focus:border-[rgba(194,65,12,0.35)] focus:ring-4 focus:ring-[rgba(194,65,12,0.10)] disabled:opacity-50"
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={isLoading || !input.trim()}
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--china-red)] px-6 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-45"
                >
                  {isLoading ? "Pensando..." : "Enviar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
