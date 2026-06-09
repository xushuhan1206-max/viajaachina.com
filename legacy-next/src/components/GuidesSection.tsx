const guides = [
  { icon: "🛂", title: "Visa y entrada", desc: "Política sin visa de 30 días para España y Latinoamérica. ¿Aplica para ti?", color: "bg-amber-50 border-amber-200" },
  { icon: "💳", title: "Pagos y dinero", desc: "Alipay, WeChat Pay, tarjetas internacionales. Guía paso a paso.", color: "bg-red-50 border-red-200" },
  { icon: "🚄", title: "Transporte", desc: "Tren bala, metro, taxis. Cómo moverte por China sin hablar chino.", color: "bg-green-50 border-green-200" },
];

export default function GuidesSection() {
  return (
    <section className="max-w-[1000px] mx-auto px-6 pb-16" id="guias">
      <h2 className="text-2xl font-bold mb-2">Guías esenciales</h2>
      <p className="text-sm text-gray-500 mb-7">Todo lo que necesitas saber antes de viajar a China</p>
      <div className="grid md:grid-cols-3 gap-4">
        {guides.map((g) => (
          <div
            key={g.title}
            className={`${g.color} border rounded-xl p-6 text-center cursor-pointer transition-all hover:shadow-lg hover:border-[var(--red)]`}
          >
            <div className="text-3xl mb-3">{g.icon}</div>
            <h3 className="text-sm font-semibold mb-1">{g.title}</h3>
            <p className="text-xs text-gray-500">{g.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
