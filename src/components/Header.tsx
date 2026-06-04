"use client";

import Link from "next/link";

export default function Header() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold">
        <span className="text-[var(--red)]">Viaja</span>
        <span className="text-[var(--gold)]">AChina</span>
      </Link>

      <div className="hidden md:flex items-center gap-6">
        <Link href="#ciudades" className="text-sm text-gray-500 font-medium hover:text-[var(--red)] transition-colors">
          Ciudades
        </Link>
        <Link href="#guias" className="text-sm text-gray-500 font-medium hover:text-[var(--red)] transition-colors">
          Guías
        </Link>
        <Link href="#mapa" className="text-sm text-gray-500 font-medium hover:text-[var(--red)] transition-colors">
          Mapa
        </Link>
        <button className="bg-[var(--red)] text-white px-4 py-2 rounded-full text-sm font-semibold hover:scale-105 transition-transform">
          🤖 Chat con IA
        </button>
      </div>
    </nav>
  );
}
