"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase/client";
import AuthModal from "./AuthModal";

export default function Header() {
  const supabase = getSupabaseClient();
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, [supabase]);

  const openLogin = () => {
    setAuthMode("login");
    setShowAuth(true);
    setShowMobileMenu(false);
  };

  const openSignup = () => {
    setAuthMode("signup");
    setShowAuth(true);
    setShowMobileMenu(false);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setShowMobileMenu(false);
    setShowUserMenu(false);
  };

  const handleLogout = async () => {
    setShowUserMenu(false);
    if (!supabase) return;
    await supabase.auth.signOut();
  };

  const navItems = [
    { label: "Ciudades", action: () => scrollToSection("ciudades") },
    { label: "Guías", action: () => scrollToSection("guias") },
    { label: "Mapa", action: () => scrollToSection("mapa") },
  ];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[rgba(15,23,42,0.78)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="text-xl font-bold tracking-[-0.03em]">
              <span className="text-white">China</span>
              <span className="text-[var(--imperial-gold)]">Viaja</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className="text-sm font-medium text-white/72 transition-colors hover:text-[var(--china-red)]"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent("open-chat"));
                setShowUserMenu(false);
                setShowMobileMenu(false);
              }}
              className="rounded-full bg-[var(--china-red)] px-4 py-2 text-sm font-semibold text-white transition hover:scale-105"
            >
              Chat con IA
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu((prev) => !prev)}
                  className="flex items-center gap-3 rounded-full border border-white/12 bg-white/8 px-3 py-2 text-left text-white backdrop-blur-xl transition hover:bg-white/12"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--imperial-gold)] text-sm font-semibold text-[var(--slate-900)]">
                    {(user.email?.[0] || "U").toUpperCase()}
                  </span>
                  <span className="max-w-[180px] truncate text-sm text-white/80">{user.email}</span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 top-14 w-72 rounded-[24px] border border-white/10 bg-[rgba(15,23,42,0.95)] p-3 shadow-[0_24px_60px_rgba(0,0,0,0.28)]">
                    <div className="rounded-[20px] bg-white/6 p-4">
                      <p className="text-xs uppercase tracking-[0.16em] text-white/45">Conectado como</p>
                      <p className="mt-1 truncate text-sm font-semibold text-white">{user.email}</p>
                    </div>
                    <div className="mt-3 space-y-2">
                      <button
                        onClick={() => scrollToSection("favoritos")}
                        className="w-full rounded-2xl px-4 py-3 text-left text-sm text-white/72 transition hover:bg-white/6 hover:text-[var(--imperial-gold)]"
                      >
                        Ver mis favoritos
                      </button>
                      <button
                        onClick={() => {
                          window.dispatchEvent(new CustomEvent("open-chat"));
                          setShowUserMenu(false);
                        }}
                        className="w-full rounded-2xl px-4 py-3 text-left text-sm text-white/72 transition hover:bg-white/6 hover:text-[var(--imperial-gold)]"
                      >
                        Abrir asistente IA
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full rounded-2xl px-4 py-3 text-left text-sm text-[var(--china-red)] transition hover:bg-[rgba(194,65,12,0.12)]"
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={openLogin}
                  className="rounded-full px-4 py-2 text-sm font-medium text-white/72 transition hover:text-white"
                >
                  Iniciar sesión
                </button>
                <button
                  onClick={openSignup}
                  className="rounded-full border border-[rgba(244,183,64,0.35)] bg-[rgba(244,183,64,0.12)] px-4 py-2 text-sm font-semibold text-[var(--imperial-gold)] transition hover:bg-[rgba(244,183,64,0.22)]"
                >
                  Registrarse
                </button>
              </>
            )}
          </div>

          <button
            onClick={() => setShowMobileMenu((prev) => !prev)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/8 text-white backdrop-blur-xl lg:hidden"
            aria-label="Abrir menú"
          >
            <span className="space-y-1.5">
              <span className="block h-0.5 w-5 rounded-full bg-current" />
              <span className="block h-0.5 w-5 rounded-full bg-current" />
              <span className="block h-0.5 w-5 rounded-full bg-current" />
            </span>
          </button>
        </div>

        {showMobileMenu && (
          <div className="border-t border-white/10 bg-[rgba(15,23,42,0.95)] px-4 py-4 shadow-[0_20px_40px_rgba(0,0,0,0.22)] lg:hidden">
            <div className="mx-auto max-w-[1120px] space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="w-full rounded-2xl px-4 py-3 text-left text-sm font-medium text-white/78 transition hover:bg-white/6 hover:text-[var(--imperial-gold)]"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent("open-chat"));
                  setShowMobileMenu(false);
                }}
                className="w-full rounded-2xl bg-[var(--china-red)] px-4 py-3 text-sm font-semibold text-white"
              >
                Abrir IA
              </button>
              <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/10 pt-3">
                {user ? (
                  <>
                    <button
                      onClick={() => scrollToSection("favoritos")}
                      className="rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold text-white/78"
                    >
                      Favoritos
                    </button>
                    <button
                      onClick={handleLogout}
                      className="rounded-2xl border border-[rgba(194,65,12,0.24)] px-4 py-3 text-sm font-semibold text-[var(--china-red)]"
                    >
                      Salir
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={openLogin}
                      className="rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold text-white/78"
                    >
                      Iniciar sesión
                    </button>
                    <button
                      onClick={openSignup}
                      className="rounded-2xl bg-[rgba(244,183,64,0.14)] px-4 py-3 text-sm font-semibold text-[var(--imperial-gold)]"
                    >
                      Registrarse
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} initialMode={authMode} />
    </>
  );
}
