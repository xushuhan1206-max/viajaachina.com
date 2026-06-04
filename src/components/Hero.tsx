"use client";

const quickTags = [
  "¿Necesito visa?",
  "¿Cómo pago en China?",
  "Ruta 10 días",
  "Beijing vs Shanghai",
  "Tren bala",
];

export default function Hero() {
  return (
    <section className="relative min-h-[480px] flex items-center justify-center overflow-hidden mt-14">
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
          <source
            src="https://videos.pexels.com/video-files/2888567/2888567-hd_1920_1080_30fps.mp4"
            type="video/mp4"
          />
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--dark)]/85 via-[var(--dark2)]/80 to-[#1a0a2e]/87" />
      </div>

      {/* Decorative circles */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[var(--red)]/10 z-[1]" />
      <div className="absolute -bottom-12 left-[20%] w-48 h-48 rounded-full bg-[var(--gold)]/8 z-[1]" />

      {/* Content */}
      <div className="relative z-10 max-w-[680px] mx-auto px-6 py-16">
        <p className="text-[var(--gold)] text-xs font-semibold tracking-[2px] uppercase mb-3">
          Tu guía de viaje con IA
        </p>
        <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight mb-3">
          Descubre China.<br />En tu idioma.
        </h1>
        <p className="text-white/70 text-base mb-7">
          Planifica tu viaje a China con nuestro asistente de inteligencia artificial. 
          Rutas personalizadas, información actualizada y todo en español.
        </p>

        {/* AI Input */}
        <div className="bg-white/8 border border-white/15 rounded-[14px] px-4 py-3 flex items-center gap-3 focus-within:border-[var(--gold)] transition-colors">
          <div className="w-6 h-6 rounded-full bg-[var(--red)] flex-shrink-0" />
          <input
            type="text"
            placeholder="Pregúntame sobre China... (visa, pagos, rutas, ciudades...)"
            className="flex-1 bg-transparent border-none text-white text-[15px] outline-none placeholder:text-white/40"
          />
          <button className="w-8 h-8 rounded-lg bg-[var(--red)] flex-shrink-0 flex items-center justify-center hover:scale-105 transition-transform">
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
              className="bg-[var(--gold)]/12 text-[var(--gold)] text-xs px-3 py-1.5 rounded-full border border-[var(--gold)]/25 cursor-pointer hover:bg-[var(--gold)]/25 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
