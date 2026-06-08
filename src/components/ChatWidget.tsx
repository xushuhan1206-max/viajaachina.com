"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_QUESTIONS = [
  "🗺️ Planificar una ruta de viaje",
  "🏛️ Descubrir ciudades de China",
  "🛂 ¿Necesito visa para China?",
  "💳 ¿Cómo pago en China?",
  "🚄 Transporte entre ciudades",
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pendingMessageRef = useRef<string | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Escuchar evento programático desde RoutePlannerModal
  useEffect(() => {
    const handler = (e: CustomEvent) => {
      const message = e.detail;
      if (!message) return;
      if (isOpen) {
        sendMessage(message);
      } else {
        setIsOpen(true);
        pendingMessageRef.current = message;
      }
    };
    window.addEventListener("chatbot-send-message", handler as EventListener);
    return () => window.removeEventListener("chatbot-send-message", handler as EventListener);
  }, [isOpen]);

  // Enviar mensaje pendiente cuando se abre el chat
  useEffect(() => {
    if (isOpen && pendingMessageRef.current) {
      const msg = pendingMessageRef.current;
      pendingMessageRef.current = null;
      setTimeout(() => sendMessage(msg), 150);
    }
  }, [isOpen]);

  async function sendMessage(text?: string) {
    const msg = text || input.trim();
    if (!msg || isLoading) return;

    const userMessage: Message = { role: "user", content: msg };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    // Placeholder: show typing indicator
    setMessages([...newMessages, { role: "assistant", content: "__TYPING__" }]);

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
    } catch (err: any) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          role: "assistant",
          content: `Lo siento, hubo un error (${err?.message || "desconocido"}).\n\nPor favor, intenta de nuevo.`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* Floating Bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-[999] w-16 h-16 rounded-full bg-gradient-to-br from-[#C62828] to-[#B71C1C] shadow-[0_4px_20px_rgba(198,40,40,0.5)] flex items-center justify-center hover:scale-110 transition-transform duration-200"
        >
          <span className="absolute inset-[-6px] rounded-full border-2 border-[#C62828]/40 animate-ping opacity-60" />
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white relative z-10">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" />
            <path d="M7 9h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z" />
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-[999] w-[440px] max-w-[calc(100vw-24px)] h-[600px] max-h-[90vh] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.18)] flex flex-col overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1A1A2E] to-[#16213E] px-4 py-3 flex items-center gap-3 flex-shrink-0">
            <div className="w-9 h-9 rounded-full bg-[#C62828] flex items-center justify-center shadow-[0_2px_8px_rgba(198,40,40,0.4)]">
              <span className="text-white text-[12px] font-bold">AI</span>
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-white text-sm font-semibold block truncate">ViajaAChina AI</span>
              <span className="text-[10px] text-green-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                En línea
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/50 text-lg hover:text-white transition-colors w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#F8F9FA]">
            {/* Welcome message (only if no messages) */}
            {messages.length === 0 && (
              <>
                <div className="flex gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#C62828] flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_rgba(198,40,40,0.3)]">
                    <span className="text-white text-[12px] font-bold">AI</span>
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-md px-4 py-3 text-[13.5px] max-w-[88%] shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                    <p className="font-semibold text-[#1A1A2E] mb-1.5">¡Hola! 👋</p>
                    <p className="text-gray-600 leading-relaxed">
                      Soy tu asistente de viaje a China. Puedo ayudarte con <strong>rutas personalizadas</strong>, visa, pagos, transporte y más.
                    </p>
                    <p className="text-gray-500 text-[11.5px] mt-2">¿Por dónde quieres empezar?</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2.5 ml-12">
                  {QUICK_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="bg-white text-[12.5px] px-3.5 py-2 rounded-full border border-[#FFB300]/30 text-[#8B6914] hover:bg-[#FFB300]/10 hover:border-[#FFB300]/50 cursor-pointer transition-all duration-150 shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Chat messages */}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : ""}`}
              >
                {msg.role === "assistant" && msg.content !== "__TYPING__" && (
                  <div className="w-9 h-9 rounded-full bg-[#C62828] flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_rgba(198,40,40,0.3)]">
                    <span className="text-white text-[12px] font-bold">AI</span>
                  </div>
                )}
                <div
                  className={`rounded-2xl px-4 py-3 text-[14px] max-w-[85%] whitespace-pre-wrap leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#C62828] text-white rounded-tr-md"
                      : msg.content === "__TYPING__"
                      ? "bg-white rounded-tl-md flex items-center shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                      : "bg-white rounded-tl-md shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                  }`}
                >
                  {msg.content === "__TYPING__" ? (
                    <div className="flex items-center gap-1 py-1 px-1">
                      <span className="w-2 h-2 rounded-full bg-[#C62828] animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 rounded-full bg-[#C62828] animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 rounded-full bg-[#C62828] animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
                {msg.role === "user" && (
                  <div className="w-9 h-9 rounded-full bg-[#534AB7] flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_rgba(83,74,183,0.3)]">
                    <span className="text-white text-[12px] font-bold">TÚ</span>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-100 px-3 py-3 flex gap-2.5 flex-shrink-0 bg-white items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Escribe tu pregunta..."
              disabled={isLoading}
              className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] outline-none focus:border-[#C62828] focus:ring-2 focus:ring-[#C62828]/20 transition-all duration-150 disabled:opacity-50 bg-[#F8F9FA] placeholder:text-gray-400"
            />
            <button
              onClick={() => sendMessage()}
              disabled={isLoading || !input.trim()}
              className="bg-[#C62828] text-white rounded-xl px-4 py-2.5 text-[13px] font-medium hover:bg-[#B71C1C] transition-colors duration-150 disabled:opacity-50 flex items-center gap-1.5 flex-shrink-0 shadow-[0_2px_8px_rgba(198,40,40,0.3)]"
            >
              {isLoading ? (
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                </span>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                  Enviar
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
