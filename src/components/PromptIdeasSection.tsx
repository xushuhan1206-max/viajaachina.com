"use client";

const guideCards = [
  {
    icon: "🛂",
    title: "Visa y entrada",
    description: "Política sin visa de 30 días para España y varios países de Latinoamérica. Comprueba si aplica para ti.",
    prompt: "Explícame si necesito visa para viajar a China y qué documentos debo llevar.",
    tone: "bg-amber-50 border-amber-200",
  },
  {
    icon: "💳",
    title: "Pagos y dinero",
    description: "Alipay, WeChat Pay, tarjetas internacionales y el paso a paso más simple para pagar desde el primer día.",
    prompt: "Cuéntame cómo pagar en China y qué apps necesito configurar antes del viaje.",
    tone: "bg-red-50 border-red-200",
  },
  {
    icon: "🚄",
    title: "Transporte",
    description: "Tren bala, metro, taxis y cómo moverte por China sin hablar chino ni perder tiempo.",
    prompt: "Explícame cómo moverme por China usando tren bala, metro y apps de transporte.",
    tone: "bg-green-50 border-green-200",
  },
];

export default function PromptIdeasSection() {
  return (
    <section id="guias" className="px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
      <div className="mx-auto max-w-[1000px]">
        <h2 className="text-2xl font-bold text-[var(--slate-900)] sm:text-[32px]">Guías esenciales</h2>
        <p className="mt-2 text-sm text-[var(--slate-500)]">
          Todo lo que necesitas saber antes de viajar a China.
        </p>

        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {guideCards.map((item) => (
            <button
              key={item.title}
              onClick={() => window.dispatchEvent(new CustomEvent("chatbot-send-message", { detail: { message: item.prompt } }))}
              className={`${item.tone} rounded-2xl border p-6 text-center transition-all hover:border-[var(--china-red)] hover:shadow-lg`}
            >
              <div className="text-3xl">{item.icon}</div>
              <h3 className="mt-3 text-sm font-semibold text-[var(--slate-900)]">{item.title}</h3>
              <p className="mt-2 text-xs leading-6 text-[var(--slate-500)]">{item.description}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
