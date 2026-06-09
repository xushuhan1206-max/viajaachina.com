"use client";

import { useMemo, useState } from "react";

const quickQuestions = [
  "¿Necesito visa?",
  "¿Cómo pago en China?",
  "Ruta 10 días",
  "Beijing vs Shanghai",
  "Tren bala",
];

export default function Hero() {
  const [inputValue, setInputValue] = useState("");

  const sanitizedSuggestions = useMemo(
    () => quickQuestions.map((item) => item.replace(/[¿?]/g, "").trim()),
    []
  );

  const dispatchChatMessage = (message: string) => {
    const cleaned = message.trim();
    if (!cleaned) return;
    window.dispatchEvent(new CustomEvent("chatbot-send-message", { detail: { message: cleaned } }));
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    dispatchChatMessage(inputValue);
    setInputValue("");
  };

  return (
    <section className="relative mt-[64px] min-h-[540px] overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1920&q=80"
          className="h-full w-full object-cover"
        >
          <source src="https://videos.pexels.com/video-files/2888567/2888567-hd_1920_1080_30fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.90)_0%,rgba(18,53,91,0.82)_48%,rgba(42,10,26,0.90)_100%)]" />
      </div>

      <div className="absolute -right-24 -top-24 z-[1] h-96 w-96 rounded-full bg-[rgba(194,65,12,0.18)] blur-2xl" />
      <div className="absolute bottom-[-80px] left-[18%] z-[1] h-64 w-64 rounded-full bg-[rgba(244,183,64,0.13)] blur-2xl" />
      <div className="oriental-contours absolute inset-x-0 bottom-0 z-[1] h-[260px] opacity-35 invert" />

      <div className="relative z-10 mx-auto flex min-h-[420px] max-w-[1000px] items-center">
        <div className="max-w-[720px]">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--imperial-gold)]">
            Tu guía de viaje con IA
          </p>
          <h1 className="text-4xl font-bold leading-tight tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
            Descubre China.
            <span className="block text-white">En tu idioma.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
            Planifica tu viaje a China con un asistente de inteligencia artificial en español: rutas personalizadas, información de visa, pagos, transporte y ciudades que vale la pena descubrir.
          </p>

          <div className="mt-8 max-w-2xl rounded-[18px] border border-white/15 bg-white/[0.08] p-3 shadow-[0_24px_70px_rgba(0,0,0,0.24)] backdrop-blur-xl transition focus-within:border-[rgba(244,183,64,0.72)]">
            <div className="flex items-center gap-3">
              <span className="h-7 w-7 flex-shrink-0 rounded-full bg-[var(--china-red)] shadow-[0_0_0_6px_rgba(194,65,12,0.16)]" />
              <input
                type="text"
                list="viajaachina-suggestions"
                placeholder="Pregúntame sobre China... visa, pagos, rutas, ciudades..."
                className="min-h-11 flex-1 bg-transparent text-[15px] text-white outline-none placeholder:text-white/42"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--china-red)] text-white transition hover:scale-105"
                aria-label="Enviar pregunta"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                  <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
              <datalist id="viajaachina-suggestions">
                {sanitizedSuggestions.map((item) => (
                  <option key={item} value={item} />
                ))}
              </datalist>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {quickQuestions.map((question) => (
              <button
                key={question}
                onClick={() => dispatchChatMessage(question)}
                className="rounded-full border border-[rgba(244,183,64,0.26)] bg-[rgba(244,183,64,0.12)] px-3 py-1.5 text-xs font-medium text-[var(--imperial-gold)] transition hover:bg-[rgba(244,183,64,0.23)]"
              >
                {question}
              </button>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("openRoutePlanner"))}
              className="inline-flex items-center justify-center rounded-full bg-[var(--china-red)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_42px_rgba(194,65,12,0.30)] transition hover:-translate-y-0.5"
            >
              Planificar mi ruta
            </button>
            <button
              onClick={() => document.getElementById("ciudades")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center justify-center rounded-full border border-white/18 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/16"
            >
              Explorar ciudades
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
