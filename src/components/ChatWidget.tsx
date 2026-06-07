"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_QUESTIONS = [
  "¿Necesito visa para China?",
  "¿Cómo pago en China?",
  "Ruta 7 días Beijing + Xi'an",
  "¿Cómo comprar billetes de tren?",
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(text?: string) {
    const msg = text || input.trim();
    if (!msg || isLoading) return;

    const userMessage: Message = { role: "user", content: msg };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    // Add empty assistant message for streaming
    setMessages([...newMessages, { role: "assistant", content: "" }]);

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
        throw new Error("API error");
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
          // Dify stream format: plain text chunks (already decoded by route.ts)
          // Also check for special conversation ID token
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

      // Flush remaining buffer
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
    } catch {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          role: "assistant",
          content:
            "Lo siento, hubo un error al conectar con el asistente. Por favor, intenta de nuevo.",
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
          className="fixed bottom-6 right-6 z-[999] w-14 h-14 rounded-full bg-[#C62828] shadow-[0_4px_20px_rgba(198,40,40,0.4)] flex items-center justify-center hover:scale-110 transition-transform"
        >
          <span className="absolute inset-[-4px] rounded-full border-2 border-[#C62828] animate-ping opacity-50" />
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white relative z-10">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" />
            <path d="M7 9h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z" />
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-[999] w-[380px] max-w-[calc(100vw-24px)] h-[520px] max-h-[75vh] bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-[#1A1A2E] px-4 py-3 flex items-center gap-3 flex-shrink-0">
            <div className="w-3 h-3 rounded-full bg-[#C62828]" />
            <span className="text-white text-sm font-semibold flex-1">
              ViajaAChina AI
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/60 text-lg hover:text-white transition-colors bg-transparent border-none cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {/* Welcome message */}
            {messages.length === 0 && (
              <>
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#C62828] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-[10px] font-bold">AI</span>
                  </div>
                  <div className="bg-gray-100 rounded-xl rounded-tl-sm px-3 py-2 text-[13px] max-w-[85%]">
                    <p className="font-medium mb-1">¡Hola! 👋 Soy tu asistente para viajar a China.</p>
                    <p className="text-gray-600 text-[12px]">
                      Puedo ayudarte con rutas, visa, pagos, transporte y más. ¿Qué necesitas saber?
                    </p>
                  </div>
                </div>
                {/* Quick questions */}
                <div className="flex flex-wrap gap-1.5 ml-9">
                  {QUICK_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="bg-[#FFB300]/10 text-[#8B6914] text-[11px] px-2.5 py-1 rounded-full border border-[#FFB300]/20 cursor-pointer hover:bg-[#FFB300]/20 transition-colors"
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
                className={`flex gap-2 ${msg.role === "user" ? "justify-end" : ""}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-[#C62828] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-[10px] font-bold">AI</span>
                  </div>
                )}
                <div
                  className={`rounded-xl px-3 py-2 text-[13px] max-w-[80%] whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-[#EEEDFE] text-[#1A1A2E] rounded-tr-sm"
                      : "bg-gray-100 rounded-tl-sm"
                  }`}
                >
                  {msg.content || (isLoading && i === messages.length - 1 ? "Escribiendo..." : "")}
                </div>
                {msg.role === "user" && (
                  <div className="w-7 h-7 rounded-full bg-[#534AB7] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-[10px] font-bold">TÚ</span>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 px-3 py-2.5 flex gap-2 flex-shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Escribe tu pregunta..."
              disabled={isLoading}
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#C62828] transition-colors disabled:opacity-50"
            />
            <button
              onClick={() => sendMessage()}
              disabled={isLoading || !input.trim()}
              className="bg-[#C62828] text-white rounded-lg px-3 py-2 text-[13px] font-medium hover:bg-[#B71C1C] transition-colors disabled:opacity-50"
            >
              {isLoading ? "..." : "Enviar"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
