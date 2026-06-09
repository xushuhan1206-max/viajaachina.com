"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabase/client";

export default function AuthCallbackPage() {
  const supabase = getSupabaseClient();
  const [status, setStatus] = useState<"processing" | "success" | "error">("processing");
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!supabase) {
      const timer = window.setTimeout(() => {
        setStatus("error");
        setMessage("No se pudo iniciar el servicio de autenticación.");
      }, 0);
      return () => window.clearTimeout(timer);
    }

    const handleCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) throw error;

        if (data.session) {
          setStatus("success");
          setMessage("Sesión iniciada correctamente.");
          setTimeout(() => router.push("/"), 1500);
        } else {
          const hash = window.location.hash;
          if (hash.includes("type=recovery")) {
            setStatus("success");
            setMessage("Redirigiendo...");
            setTimeout(() => router.push("/auth/reset-password"), 1000);
          } else {
            setStatus("error");
            setMessage("No se pudo confirmar la sesión. Intenta iniciar sesión de nuevo.");
          }
        }
      } catch (err: unknown) {
        setStatus("error");
        setMessage(err instanceof Error ? err.message : "Error desconocido");
      }
    };

    handleCallback();
  }, [router, supabase]);

  const statusLabel = status === "processing" ? "Confirmando tu cuenta..." : status === "success" ? "Todo listo" : "Algo salió mal";
  const statusBadge = status === "processing" ? "Procesando" : status === "success" ? "Conectado" : "Revisar";

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-28">
      <div className="surface-panel w-full max-w-[440px] rounded-[32px] bg-white p-6 text-center shadow-[var(--shadow-hover)] sm:p-8">
        <div
          className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full text-sm font-semibold ${
            status === "success"
              ? "bg-[rgba(15,118,110,0.10)] text-[var(--jade)]"
              : status === "error"
              ? "bg-[rgba(194,65,12,0.10)] text-[var(--cinnabar)]"
              : "bg-[rgba(18,53,91,0.08)] text-[var(--ink-blue)]"
          }`}
        >
          {statusBadge}
        </div>
        <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--jade)]">ViajaAChina</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[var(--slate-900)]">{statusLabel}</h1>
        <p className="mt-3 text-sm leading-7 text-[var(--slate-700)]">{message || "Por favor espera..."}</p>

        {status === "error" && (
          <button
            onClick={() => router.push("/")}
            className="mt-6 rounded-full bg-[linear-gradient(135deg,var(--ink-blue)_0%,var(--jade)_100%)] px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5"
          >
            Volver al inicio
          </button>
        )}
      </div>
    </div>
  );
}
