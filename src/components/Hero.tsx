"use client";
import { useState } from "react";

const quickTags = [
  "🗺️ Planificar ruta",
  "🏙️ Descubrir ciudades",
  "🛂 ¿Necesito visa?",
  "💳 ¿Cómo pago?",
  "🚄 Transporte",
];

export default function Hero() {
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;
    window.dispatchEvent(
      new CustomEvent("chatbot-send-message", { detail: { message: inputValue } })
    );
    setInputValue("");
  };

  const handleTagClick = (tag: string) => {
    window.dispatchEvent(
      new CustomEvent("chatbot-send-message", { detail: { message: tag } })
    );
  };

  return (
    <section className="relative w-full min-h-[520px] md:min-h-[580px] flex items-center justify-center overflow-hidden mt-14">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1920&q=80"
          className="w-full h-full object-cover"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A2E]/88 via-[#2D1B3D]/82 to-[#1a0a2e]/90" />
      </div>

      {/* Decorative circles */}
      <div className="absolute -top-24 -right-24 w-80 md:w-96 h-80 md:h-96 rounded-full bg-[#C62828]/10 z-[1]" />
      <div className="absolute -bottom-12 left-[20%] w-40 md:w-48 h-40 md:h-48 rounded-full bg-[#FFB300]/8 z-[1]" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[720px] mx-auto px-6 md:px-8 py-12 md:py-20">
        <p className="text-[#FFB300] text-xs font-semibold tracking-[2px] uppercase mb-3">
          Tu guía de viaje con IA
        </p>
        <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight mb-3">
          Descubre China.<br />En tu idioma.
        </h1>
        <p className="text-white/70 text-sm md:text-base mb-7 max-w-[560px]">
          Planifica tu viaje a China con nuestro asistente de inteligencia artificial. 
          Rutas personalizadas, información actualizada y todo en español.
        </p>

        {/* AI Input */}
        <div className="bg-white/[0.08] border border-white/[0.15] rounded-[14px] px-4 py-3 flex items-center gap-3 focus-within:border-[#FFB300] transition-colors">
          <div className="w-6 h-6 rounded-full bg-[#C62828] flex-shrink-0" />
          <input
            type="text"
            placeholder="Pregúntame sobre China... (visa, pagos, rutas...)"
            className="flex-1 bg-transparent border-none text-white text-sm md:text-[15px] outline-none placeholder:text-white/40"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="w-8 h-8 rounded-lg bg-[#C62828] flex-shrink-0 flex items-center justify-center hover:scale-105 transition-transform"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>

        {/* Quick Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {quickTags.map((tag) => (
            <span
              key={tag}
              onClick={() => handleTagClick(tag)}
              className="bg-[#FFB300]/[0.12] text-[#FFB300] text-[12px] md:text-[12px] px-3 py-1.5 rounded-full border border-[#FFB300]/25 cursor-pointer hover:bg-[#FFB300]/25 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Route Planner CTA Button */}
        <button
          onClick={() => {
            const event = new CustomEvent("openRoutePlanner");
            window.dispatchEvent(event);
          }}
          className="mt-5 w-full md:w-auto px-6 py-3 bg-[#FFB300] text-[#1A1A2E] font-semibold text-sm rounded-xl hover:bg-[#FFC107] transition-colors shadow-lg shadow-[#FFB300]/20 flex items-center justify-center gap-2"
        >
          ✨ Planificar mi ruta con IA
        </button>
      </div>
    </section>
  );
}
