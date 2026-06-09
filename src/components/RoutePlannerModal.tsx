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
  { id: "beijing", name: "Beijing" },
  { id: "shanghai", name: "Shanghai" },
  { id: "chengdu", name: "Chengdu" },
  { id: "xian", name: "Xi'an" },
  { id: "guangzhou", name: "Guangzhou" },
  { id: "chongqing", name: "Chongqing" },
  { id: "hangzhou", name: "Hangzhou" },
  { id: "shenzhen", name: "Shenzhen" },
  { id: "guilin", name: "Guilin" },
  { id: "zhangjiajie", name: "Zhangjiajie" },
  { id: "harbin", name: "Harbin" },
  { id: "kunming", name: "Kunming" },
];

const DAYS_OPTIONS = [5, 7, 10, 14];

const BUDGETS = [
  { id: "bajo", label: "Mochilero", desc: "~¥200/día" },
  { id: "medio", label: "Medio", desc: "~¥500/día" },
  { id: "alto", label: "Cómodo", desc: "~¥1000/día" },
];

const INTERESTS = [
  { id: "cultura", label: "Cultura" },
  { id: "comida", label: "Comida" },
  { id: "naturaleza", label: "Naturaleza" },
  { id: "compras", label: "Compras" },
  { id: "familia", label: "Familia" },
  { id: "aventura", label: "Aventura" },
  { id: "nightlife", label: "Vida nocturna" },
  { id: "fotografia", label: "Fotografía" },
];

const NATIONALITIES = [
  { id: "espana", label: "España" },
  { id: "mexico", label: "México" },
  { id: "argentina", label: "Argentina" },
  { id: "colombia", label: "Colombia" },
  { id: "chile", label: "Chile" },
  { id: "peru", label: "Perú" },
  { id: "brasil", label: "Brasil" },
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
    setCities((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));
  };

  const toggleInterest = (id: string) => {
    setInterests((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const interestLabelMap: Record<string, string> = {
    cultura: "cultura",
    comida: "comida",
    naturaleza: "naturaleza",
    compras: "compras",
    familia: "familia",
    aventura: "aventura",
    nightlife: "vida nocturna",
    fotografia: "fotografía",
  };

  const handleSubmit = () => {
    onSubmit({
      cities,
      days,
      budget,
      interests: interests.map((item) => interestLabelMap[item] || item),
      nationality,
    });
    onClose();
  };

  const canProceed = () => {
    if (step === 1) return cities.length > 0;
    if (step === 2) return days > 0 && budget !== "";
    if (step === 3) return interests.length > 0;
    return true;
  };

  const selectedCityNames = cities.map((id) => CITIES.find((city) => city.id === id)?.name || id).join(", ");
  const selectedInterestNames = interests.map((id) => INTERESTS.find((item) => item.id === id)?.label || id).join(", ");

  const optionClass = (selected: boolean) =>
    `rounded-2xl border px-4 py-3 text-left text-sm transition hover:-translate-y-0.5 ${
      selected
        ? "border-transparent bg-[linear-gradient(135deg,var(--ink-blue)_0%,var(--jade)_100%)] text-white shadow-[var(--shadow-soft)]"
        : "border-[rgba(226,232,240,0.95)] bg-white text-[var(--slate-700)] hover:border-[rgba(15,118,110,0.28)] hover:bg-[rgba(15,118,110,0.05)]"
    }`;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[rgba(15,23,42,0.62)] backdrop-blur-sm" onClick={onClose} />

      <div className="surface-panel relative max-h-[88vh] w-full max-w-[560px] overflow-hidden rounded-[32px] bg-white shadow-[var(--shadow-hover)]">
        <div className="sticky top-0 z-10 border-b border-[rgba(226,232,240,0.9)] bg-white/92 px-6 py-5 backdrop-blur-xl sm:px-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--jade)]">Planificador IA</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-[var(--slate-900)]">Diseña tu ruta por China</h2>
              <p className="mt-1 text-sm text-[var(--slate-500)]">Paso {step} de 4</p>
            </div>
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(226,232,240,0.9)] bg-white text-lg text-[var(--slate-500)] transition hover:bg-[var(--porcelain)] hover:text-[var(--slate-900)]"
              aria-label="Cerrar"
            >
              ×
            </button>
          </div>
          <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-[var(--porcelain)]">
            <div
              className="h-full rounded-full bg-[linear-gradient(135deg,var(--ink-blue)_0%,var(--jade)_100%)] transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        <div className="max-h-[calc(88vh-160px)] overflow-y-auto px-6 py-6 sm:px-7">
          {step === 1 && (
            <div>
              <h3 className="text-lg font-semibold text-[var(--slate-900)]">¿Qué ciudades quieres visitar?</h3>
              <p className="mt-2 text-sm leading-7 text-[var(--slate-700)]">Selecciona una o más ciudades para que la IA entienda el eje del viaje.</p>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {CITIES.map((city) => (
                  <button key={city.id} onClick={() => toggleCity(city.id)} className={optionClass(cities.includes(city.id))}>
                    <span className="font-semibold">{city.name}</span>
                  </button>
                ))}
              </div>
              {cities.length > 0 && (
                <p className="mt-4 rounded-2xl bg-[rgba(15,118,110,0.07)] px-4 py-3 text-sm font-medium text-[var(--jade)]">
                  {cities.length} ciudad{cities.length > 1 ? "es" : ""} seleccionada{cities.length > 1 ? "s" : ""}
                </p>
              )}
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="text-lg font-semibold text-[var(--slate-900)]">¿Cuántos días y qué presupuesto?</h3>
              <p className="mt-2 text-sm leading-7 text-[var(--slate-700)]">Esto ayuda a ajustar ritmo, transporte y nivel de comodidad.</p>

              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--slate-500)]">Días de viaje</p>
              <div className="mt-3 grid grid-cols-4 gap-3">
                {DAYS_OPTIONS.map((item) => (
                  <button key={item} onClick={() => setDays(item)} className={optionClass(days === item)}>
                    <span className="block text-center font-semibold">{item}</span>
                  </button>
                ))}
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--slate-500)]">Presupuesto diario</p>
              <div className="mt-3 space-y-3">
                {BUDGETS.map((item) => (
                  <button key={item.id} onClick={() => setBudget(item.id)} className={`w-full ${optionClass(budget === item.id)}`}>
                    <span className="block font-semibold">{item.label}</span>
                    <span className={`mt-1 block text-xs ${budget === item.id ? "text-white/72" : "text-[var(--slate-500)]"}`}>{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="text-lg font-semibold text-[var(--slate-900)]">¿Qué te interesa más?</h3>
              <p className="mt-2 text-sm leading-7 text-[var(--slate-700)]">Elige los intereses principales para orientar el itinerario.</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {INTERESTS.map((item) => (
                  <button key={item.id} onClick={() => toggleInterest(item.id)} className={optionClass(interests.includes(item.id))}>
                    <span className="font-semibold">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h3 className="text-lg font-semibold text-[var(--slate-900)]">¿Desde qué país viajas?</h3>
              <p className="mt-2 text-sm leading-7 text-[var(--slate-700)]">Lo usaremos para que el asistente revise requisitos de visado con más contexto.</p>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {NATIONALITIES.map((item) => (
                  <button key={item.id} onClick={() => setNationality(item.id)} className={optionClass(nationality === item.id)}>
                    <span className="font-semibold">{item.label}</span>
                  </button>
                ))}
              </div>

              <div className="mt-6 rounded-[24px] border border-[rgba(226,232,240,0.92)] bg-[var(--warm-rice)] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--slate-500)]">Resumen</p>
                <div className="mt-3 space-y-2 text-sm leading-7 text-[var(--slate-700)]">
                  <p><span className="font-semibold text-[var(--slate-900)]">Ciudades:</span> {selectedCityNames}</p>
                  <p><span className="font-semibold text-[var(--slate-900)]">Días:</span> {days}</p>
                  <p><span className="font-semibold text-[var(--slate-900)]">Presupuesto:</span> {BUDGETS.find((item) => item.id === budget)?.label}</p>
                  <p><span className="font-semibold text-[var(--slate-900)]">Intereses:</span> {selectedInterestNames}</p>
                  <p><span className="font-semibold text-[var(--slate-900)]">Nacionalidad:</span> {NATIONALITIES.find((item) => item.id === nationality)?.label}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 flex gap-3 border-t border-[rgba(226,232,240,0.9)] bg-white/92 px-6 py-5 backdrop-blur-xl sm:px-7">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="rounded-full border border-[rgba(18,53,91,0.12)] bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-blue)] transition hover:bg-[rgba(18,53,91,0.04)]"
            >
              Atrás
            </button>
          )}
          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className="flex-1 rounded-full bg-[var(--slate-900)] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Siguiente
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex-1 rounded-full bg-[linear-gradient(135deg,var(--ink-blue)_0%,var(--jade)_100%)] px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5"
            >
              Generar mi ruta
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
