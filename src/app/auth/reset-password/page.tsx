"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const supabase = getSupabaseClient();
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "error" | "success" } | null>(null);
  const [ready, setReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!supabase) {
      const timer = window.setTimeout(() => {
        setMessage({ text: "No se pudo iniciar el servicio de autenticación.", type: "error" });
      }, 0);
      return () => window.clearTimeout(timer);
    }

    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setReady(true);
      } else {
        setMessage({ text: "Enlace inválido o expirado. Solicita un nuevo restablecimiento.", type: "error" });
      }
    };

    checkSession();
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return setMessage({ text: "No se pudo iniciar el servicio de autenticación.", type: "error" });
    if (password !== confirmPwd) return setMessage({ text: "Las contraseñas no coinciden", type: "error" });
    if (password.length < 6) return setMessage({ text: "Mínimo 6 caracteres", type: "error" });

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) return setMessage({ text: error.message, type: "error" });
    setMessage({ text: "Contraseña actualizada. Redirigiendo...", type: "success" });
    setTimeout(() => router.push("/"), 2000);
  };

  const inputClass = "w-full rounded-2xl border border-[rgba(226,232,240,0.95)] bg-[var(--porcelain)] px-4 py-3 text-sm text-[var(--slate-900)] outline-none transition placeholder:text-[var(--slate-500)] focus:border-[rgba(15,118,110,0.35)] focus:ring-4 focus:ring-[rgba(15,118,110,0.10)]";

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-28">
      <div className="surface-panel w-full max-w-[440px] rounded-[32px] bg-white p-6 shadow-[var(--shadow-hover)] sm:p-8">
        <div className="mb-7 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--jade)]">ViajaAChina</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[var(--slate-900)]">Nueva contraseña</h1>
          <p className="mt-2 text-sm text-[var(--slate-500)]">Ingresa tu nueva contraseña para volver a tu cuenta.</p>
        </div>

        {message && (
          <div
            className={`mb-5 rounded-2xl px-4 py-3 text-sm leading-6 ${
              message.type === "error"
                ? "border border-[rgba(194,65,12,0.18)] bg-[rgba(194,65,12,0.07)] text-[var(--cinnabar)]"
                : "border border-[rgba(15,118,110,0.18)] bg-[rgba(15,118,110,0.07)] text-[var(--jade)]"
            }`}
          >
            {message.text}
          </div>
        )}

        {!ready && message?.type !== "error" && (
          <div className="rounded-2xl bg-[var(--porcelain)] px-4 py-8 text-center text-sm text-[var(--slate-500)]">Verificando enlace...</div>
        )}

        {ready && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-[var(--slate-500)]">Nueva contraseña</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
                placeholder="Mínimo 6 caracteres"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-[var(--slate-500)]">Confirmar contraseña</label>
              <input
                type="password"
                required
                minLength={6}
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
                className={inputClass}
                placeholder="Repite la contraseña"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[linear-gradient(135deg,var(--ink-blue)_0%,var(--jade)_100%)] py-3 text-sm font-semibold text-white shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Guardando..." : "Guardar nueva contraseña"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
