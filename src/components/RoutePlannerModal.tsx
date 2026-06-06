"use client";

import { useState } from "react";

interface RoutePlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (params: RouteParams) => void;
}

export interface RouteParams {
  cities: string[];
  days: number;
  budget: string;
  interests: string[];
  nationality: string;
}

const CITIES = [
  { id: "beijing", name: "Beijing", emoji: "🏯" },
  { id: "shanghai", name: "Shanghai", emoji: "🌃" },
  { id: "chengdu", name: "Chengdu", emoji: "🐼" },
  { id: "xian", name: "Xi'an", emoji: "🗿" },
  { id: "guangzhou", name: "Guangzhou", emoji: "🍜" },
  { id: "chongqing", name: "Chongqing", emoji: "🌶️" },
  { id: "hangzhou", name: "Hangzhou", emoji: "🍵" },
  { id: "shenzhen", name: "Shenzhen", emoji: "🤖" },
  { id: "guilin", name: "Guilin", emoji: "⛰️" },
  { id: "zhangjiajie", name: "Zhangjiajie", emoji: "🏔️" },
  { id: "harbin", name: "Harbin", emoji: "❄️" },
  { id: "kunming", name: "Kunming", emoji: "🌸" },
];

const DAYS_OPTIONS = [5, 7, 10, 14];

const BUDGETS = [
  { id: "bajo", label: "Mochilero", emoji: "💰", desc: "~¥200/día" },
  { id: "medio", label: "Medio", emoji: "💰💰", desc: "~¥500/día" },
  { id: "alto", label: "Cómodo", emoji: "💰💰💰", desc: "~¥1000/día" },
];

const INTERESTS = [
  { id: "cultura", label: "Cultura", emoji: "🏛️" },
  { id: "comida", label: "Comida", emoji: "🍜" },
  { id: "naturaleza", label: "Naturaleza", emoji: "🌿" },
  { id: "compras", label: "Compras", emoji: "🛍️" },
  { id: "familia", label: "Familia", emoji: "👨‍👩‍👧" },
  { id: "aventura", label: "Aventura", emoji: "🧗" },
  { id: "nightlife", label: "Vida nocturna", emoji: "🌙" },
  { id: "fotografia", label: "Fotografía", emoji: "📸" },
];

const NATIONALITIES = [
  { id: "espana", label: "España 🇪🇸" },
  { id: "mexico", label: "México 🇲🇽" },
  { id: "argentina", label: "Argentina 🇦🇷" },
  { id: "colombia", label: "Colombia 🇨🇴" },
  { id: "chile", label: "Chile 🇨🇱" },
  { id: "peru", label: "Perú 🇵🇪" },
  { id: "brasil", label: "Brasil 🇧🇷" },
  { id: "otro", label: "Otro país" },
];

export default function RoutePlannerModal({ isOpen, onClose, onSubmit }: RoutePlannerModalProps) {
  const [step, setStep] = useState(1);
  const [cities, setCities] = useState<string[]>([]);
  const [days, setDays] = useState(7);
  const [budget, setBudget] = useState("medio");
  const [interests, setInterests] = useState<string[]>(["cultura", "comida"]);
  const [nationality, setNationality] = useState("espana");

  if (!isOpen) return null;

  const toggleCity = (id: string) => {
    setCities((prev) => prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]);
  };

  const toggleInterest = (id: string) => {
    setInterests((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const handleSubmit = () => {
    onSubmit({ cities, days, budget, interests, nationality });
    onClose();
  };

  const canProceed = () => {
    if (step === 1) return cities.length > 0;
    if (step === 2) return days > 0;
    if (step === 3) return budget !== "";
    return true;
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl w-full max-w-[480px] max-h-[85vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <div>
            <h2 className="text-lg font-bold text-[#1A1A2E]">🗺️ Planifica tu viaje</h2>
            <p className="text-xs text-gray-500">Paso {step} de 4</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl bg-transparent border-none cursor-pointer">✕</button>
        </div>

        {/* Progress bar */}
        <div className="px-6 pt-3">
          <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#C62828] rounded-full transition-all duration-300" style={{ width: `${(step / 4) * 100}%` }} />
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          {/* Step 1: Cities */}
          {step === 1 && (
            <div>
              <h3 className="text-base font-semibold mb-1">¿Qué ciudades quieres visitar?</h3>
              <p className="text-xs text-gray-500 mb-4">Selecciona una o más ciudades</p>
              <div className="grid grid-cols-3 gap-2">
                {CITIES.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => toggleCity(city.id)}
                    className={`p-3 rounded-xl text-center transition-all border ${
                      cities.includes(city.id)
                        ? "bg-[#C62828] text-white border-[#C62828] shadow-md"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:border-[#C62828] hover:bg-red-50"
                    }`}
                  >
                    <span className="text-lg block">{city.emoji}</span>
                    <span className="text-[11px] font-medium block mt-1">{city.name}</span>
                  </button>
                ))}
              </div>
              {cities.length > 0 && (
                <p className="mt-3 text-xs text-[#C62828] font-medium">
                  ✓ {cities.length} ciudad{cities.length > 1 ? "es" : ""} seleccionada{cities.length > 1 ? "s" : ""}
                </p>
              )}
            </div>
          )}

          {/* Step 2: Days + Budget */}
          {step === 2 && (
            <div>
              <h3 className="text-base font-semibold mb-1">¿Cuántos días y presupuesto?</h3>
              <p className="text-xs text-gray-500 mb-4">Esto nos ayuda a optimizar tu ruta</p>

              <p className="text-sm font-medium mb-2">Días de viaje:</p>
              <div className="flex gap-2 mb-5">
                {DAYS_OPTIONS.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDays(d)}
                    className={`flex-1 py-3 rounded-xl text-center font-semibold transition-all border ${
                      days === d
                        ? "bg-[#C62828] text-white border-[#C62828]"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:border-[#C62828]"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>

              <p className="text-sm font-medium mb-2">Presupuesto:</p>
              <div className="space-y-2">
                {BUDGETS.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setBudget(b.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all border ${
                      budget === b.id
                        ? "bg-[#FFF8E1] border-[#FFB300] shadow-sm"
                        : "bg-gray-50 border-gray-200 hover:border-[#FFB300]"
                    }`}
                  >
                    <span className="text-lg">{b.emoji}</span>
                    <div className="text-left">
                      <span className="text-sm font-medium block">{b.label}</span>
                      <span className="text-[11px] text-gray-500">{b.desc}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Interests */}
          {step === 3 && (
            <div>
              <h3 className="text-base font-semibold mb-1">¿Qué te interesa más?</h3>
              <p className="text-xs text-gray-500 mb-4">Selecciona todos los que apliquen</p>
              <div className="grid grid-cols-2 gap-2">
                {INTERESTS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => toggleInterest(item.id)}
                    className={`flex items-center gap-2 p-3 rounded-xl transition-all border ${
                      interests.includes(item.id)
                        ? "bg-[#E8F5E9] border-[#2E7D32] text-[#2E7D32]"
                        : "bg-gray-50 border-gray-200 text-gray-700 hover:border-[#2E7D32]"
                    }`}
                  >
                    <span className="text-lg">{item.emoji}</span>
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Nationality + Confirm */}
          {step === 4 && (
            <div>
              <h3 className="text-base font-semibold mb-1">¿De dónde eres?</h3>
              <p className="text-xs text-gray-500 mb-4">Para verificar requisitos de visa</p>
              <div className="grid grid-cols-2 gap-2 mb-6">
                {NATIONALITIES.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => setNationality(n.id)}
                    className={`p-3 rounded-xl text-sm font-medium transition-all border ${
                      nationality === n.id
                        ? "bg-[#EEEDFE] border-[#534AB7] text-[#534AB7]"
                        : "bg-gray-50 border-gray-200 text-gray-700 hover:border-[#534AB7]"
                    }`}
                  >
                    {n.label}
                  </button>
                ))}
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm font-semibold mb-2">📋 Tu viaje:</p>
                <div className="text-xs text-gray-600 space-y-1">
                  <p>🏙️ Ciudades: {cities.map(c => CITIES.find(x => x.id === c)?.name).join(", ")}</p>
                  <p>📅 Días: {days}</p>
                  <p>💰 Presupuesto: {BUDGETS.find(b => b.id === budget)?.label}</p>
                  <p>⭐ Intereses: {interests.map(i => INTERESTS.find(x => x.id === i)?.label).join(", ")}</p>
                  <p>🛂 Nacionalidad: {NATIONALITIES.find(n => n.id === nationality)?.label}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex gap-3 rounded-b-2xl">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Atrás
            </button>
          )}
          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className="flex-1 py-2.5 rounded-xl bg-[#C62828] text-white text-sm font-semibold hover:bg-[#B71C1C] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Siguiente
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex-1 py-2.5 rounded-xl bg-[#C62828] text-white text-sm font-semibold hover:bg-[#B71C1C] transition-colors flex items-center justify-center gap-2"
            >
              🚀 Generar mi ruta
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
