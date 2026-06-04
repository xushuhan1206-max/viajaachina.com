"use client";

import { useState } from "react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-[999] w-14 h-14 rounded-full bg-[#C62828] shadow-[0_4px_20px_rgba(198,40,40,0.4)] flex items-center justify-center hover:scale-110 transition-transform"
        >
          {/* Pulse ring */}
          <span className="absolute inset-[-4px] rounded-full border-2 border-[#C62828] animate-ping opacity-60" />
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white relative z-10">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" />
            <path d="M7 9h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z" />
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-[999] w-[360px] max-w-[calc(100vw-24px)] h-[480px] max-h-[70vh] bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-[#1A1A2E] px-4 py-3 flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#C62828]" />
            <span className="text-white text-sm font-semibold flex-1">ViajaAChina AI</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/60 text-lg hover:text-white transition-colors bg-transparent border-none cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 p-4 overflow-y-auto">
            {/* AI Welcome */}
            <div className="flex gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-[#C62828] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-[10px] font-bold">AI</span>
              </div>
              <div className="bg-gray-100 rounded-xl rounded-tl-sm px-3 py-2 text-[13px] max-w-[85%]">
                <p className="font-medium mb-1">¡Hola! 👋 Soy tu asistente de viaje para China.</p>
                <p className="text-gray-600">Puedo ayudarte con:</p>
                <ul className="text-gray-600 mt-1 list-disc list-inside text-[12px]">
                  <li>Planificar rutas personalizadas</li>
                  <li>Dudas sobre visa y pagos</li>
                  <li>Recomendar ciudades y actividades</li>
                  <li>Información de transporte</li>
                </ul>
                <p className="mt-2">¿Qué te gustaría saber?</p>
              </div>
            </div>

            {/* Quick suggestions */}
            <div className="flex flex-wrap gap-1.5 ml-9">
              {["¿Necesito visa?", "Ruta 7 días", "¿Cómo pago?"].map((q) => (
                <span
                  key={q}
                  className="bg-[#FFB300]/10 text-[#B37A00] text-[11px] px-2.5 py-1 rounded-full border border-[#FFB300]/20 cursor-pointer hover:bg-[#FFB300]/20 transition-colors"
                >
                  {q}
                </span>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 px-3 py-2.5 flex gap-2">
            <input
              type="text"
              placeholder="Escribe tu pregunta..."
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#C62828] transition-colors"
            />
            <button className="bg-[#C62828] text-white rounded-lg px-3 py-2 text-[13px] font-medium hover:bg-[#B71C1C] transition-colors">
              Enviar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
