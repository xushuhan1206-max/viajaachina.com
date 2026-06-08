"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import AuthModal from "./AuthModal";

export default function Header() {
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    setShowMenu(false);
    await supabase.auth.signOut();
  };

  const openLogin = () => { setAuthMode("login"); setShowAuth(true); };
  const openSignup = () => { setAuthMode("signup"); setShowAuth(true); };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          <span className="text-[#C62828]">Viaja</span>
          <span className="text-[#FFB300]">AChina</span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Nav links - hidden on mobile */}
          <div className="hidden md:flex items-center gap-5">
            <Link href="#ciudades" className="text-sm text-gray-500 font-medium hover:text-[#C62828] transition-colors">
              Ciudades
            </Link>
            <Link href="#guias" className="text-sm text-gray-500 font-medium hover:text-[#C62828] transition-colors">
              Guías
            </Link>
            <Link href="#mapa" className="text-sm text-gray-500 font-medium hover:text-[#C62828] transition-colors">
              Mapa
            </Link>
          </div>

          {/* Auth section */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="w-8 h-8 rounded-full bg-[#C62828] text-white text-sm font-bold flex items-center justify-center hover:scale-105 transition-transform"
              >
                {(user.email?.[0] || "U").toUpperCase()}
              </button>
              {showMenu && (
                <div className="absolute right-0 top-10 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-[12px] text-gray-400">Conectado como</p>
                    <p className="text-[13px] font-medium truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => { setShowMenu(false); /* TODO: link to /mi-viaje */ }}
                    className="w-full text-left px-4 py-2 text-[13px] text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    🗺️ Mi viaje
                  </button>
                  <button
                    onClick={() => { setShowMenu(false); /* TODO: link to /perfil */ }}
                    className="w-full text-left px-4 py-2 text-[13px] text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    ⚙️ Mi perfil
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-[13px] text-red-500 hover:bg-red-50 transition-colors"
                  >
                    ↗️ Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <button
                onClick={openLogin}
                className="text-sm font-medium text-gray-500 hover:text-[#C62828] transition-colors"
              >
                Iniciar sesión
              </button>
              <button
                onClick={openSignup}
                className="bg-[#C62828] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#B71C1C] transition-colors"
              >
                Registrarse
              </button>
            </div>
          )}

          {/* Chat button */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-chat"))}
            className="bg-[#C62828] text-white px-4 py-2 rounded-full text-sm font-semibold hover:scale-105 transition-transform hidden sm:block"
          >
            🤖 Chat con IA
          </button>
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        initialMode={authMode}
      />
    </>
  );
}
