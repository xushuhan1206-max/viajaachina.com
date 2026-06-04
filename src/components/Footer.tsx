export default function Footer() {
  return (
    <footer className="bg-[var(--dark)] py-10 px-6 text-center">
      <div className="text-xl font-bold mb-2">
        <span className="text-white">Viaja</span>
        <span className="text-[var(--gold)]">AChina</span>
      </div>
      <p className="text-white/60 text-sm mb-4">
        Tu guía de viaje a China con inteligencia artificial. Información actualizada, rutas personalizadas y todo en español.
      </p>
      <div className="flex justify-center gap-5 text-xs text-white/40">
        <a href="#" className="hover:text-[var(--gold)] transition-colors">Sobre nosotros</a>
        <a href="#" className="hover:text-[var(--gold)] transition-colors">Privacidad</a>
        <a href="#" className="hover:text-[var(--gold)] transition-colors">Contacto</a>
        <a href="#" className="hover:text-[var(--gold)] transition-colors">Mapa del sitio</a>
      </div>
      <p className="text-[11px] text-white/25 mt-5">
        © 2026 ViajaAChina.com — Contenido generado con IA y verificado por expertos.
      </p>
    </footer>
  );
}
