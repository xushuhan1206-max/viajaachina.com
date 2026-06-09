"use client";

import Link from "next/link";

const footerLinks = [
  { label: "Sobre nosotros", href: "#" },
  { label: "Privacidad", href: "#" },
  { label: "Contacto", href: "mailto:contacto@viajaachina.com" },
  { label: "Mapa del sitio", href: "#mapa" },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--slate-900)] px-4 py-10 text-center text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1000px]">
        <div className="text-2xl font-bold tracking-[-0.03em]">
          <span className="text-white">China</span>
          <span className="text-[var(--imperial-gold)]">Viaja</span>
        </div>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-white/60">
          Tu guía de viaje a China con inteligencia artificial. Información actualizada, rutas personalizadas y todo en español.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-5 text-xs text-white/40">
          {footerLinks.map((link) =>
            link.href.startsWith("mailto:") ? (
              <a key={link.label} href={link.href} className="transition-colors hover:text-[var(--imperial-gold)]">
                {link.label}
              </a>
            ) : (
              <Link key={link.label} href={link.href} className="transition-colors hover:text-[var(--imperial-gold)]">
                {link.label}
              </Link>
            )
          )}
        </div>

        <p className="mt-6 text-xs text-white/35">© 2026 ChinaViaja. Contenido generado con IA y verificado por expertos.</p>
      </div>
    </footer>
  );
}
