"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1A1A2E] text-white/70 text-sm">
      {/* Main Footer */}
      <div className="max-w-[1000px] mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h3 className="text-white font-bold text-base mb-3">ViajaAChina</h3>
          <p className="text-[13px] leading-relaxed">
            Tu guía de viaje con IA. Planifica tu viaje a China en español, con información actualizada y rutas personalizadas.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold text-[13px] mb-3">Enlaces rápidos</h4>
          <ul className="space-y-2 text-[13px]">
            <li><Link href="/" className="hover:text-[#FFB300] transition-colors">Inicio</Link></li>
            <li><Link href="/cities" className="hover:text-[#FFB300] transition-colors">Ciudades</Link></li>
            <li><Link href="/blog" className="hover:text-[#FFB300] transition-colors">Blog</Link></li>
            <li><Link href="/contacto" className="hover:text-[#FFB300] transition-colors">Contacto</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-white font-semibold text-[13px] mb-3">Recursos</h4>
          <ul className="space-y-2 text-[13px]">
            <li><Link href="/visa" className="hover:text-[#FFB300] transition-colors">Visa para China</Link></li>
            <li><Link href="/pagos" className="hover:text-[#FFB300] transition-colors">Cómo pagar en China</Link></li>
            <li><Link href="/transporte" className="hover:text-[#FFB300] transition-colors">Transporte</Link></li>
            <li><Link href="/faq" className="hover:text-[#FFB300] transition-colors">Preguntas frecuentes</Link></li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h4 className="text-white font-semibold text-[13px] mb-3">Síguenos</h4>
          <div className="flex gap-3 mb-4">
            {/* WeChat */}
            <a href="#" className="w-8 h-8 rounded-full bg-white/[0.08] flex items-center justify-center hover:bg-[#FFB300]/20 transition-colors">
              <span className="text-[11px]">💬</span>
            </a>
            {/* Instagram */}
            <a href="#" className="w-8 h-8 rounded-full bg-white/[0.08] flex items-center justify-center hover:bg-[#FFB300]/20 transition-colors">
              <span className="text-[11px]">📸</span>
            </a>
            {/* Xiaohongshu */}
            <a href="#" className="w-8 h-8 rounded-full bg-white/[0.08] flex items-center justify-center hover:bg-[#FFB300]/20 transition-colors">
              <span className="text-[11px]">📕</span>
            </a>
          </div>
          <p className="text-[12px]">contacto@viajachina.com</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.08]">
        <div className="max-w-[1000px] mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-[12px]">
          <span>© 2026 ViajaAChina. Todos los derechos reservados.</span>
          <div className="flex items-center gap-4">
            <Link href="/privacidad" className="hover:text-[#FFB300] transition-colors">Privacidad</Link>
            <Link href="/terminos" className="hover:text-[#FFB300] transition-colors">Términos</Link>
            <button className="hover:text-[#FFB300] transition-colors">🇪🇸 ES</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
