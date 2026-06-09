"use client";

import { useState, useEffect } from "react";
import { getSupabaseClient } from "@/lib/supabase/client";

type Mode = "login" | "signup" | "reset";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: Mode;
}

export default function AuthModal({ isOpen, onClose, initialMode = "login" }: AuthModalProps) {
  const supabase = getSupabaseClient();
  const [mode, setMode] = useState<Mode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "error" | "success" } | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const timer = window.setTimeout(() => {
      setMode(initialMode);
      setMessage(null);
      setEmail("");
      setPassword("");
      setConfirmPwd("");
    }, 0);

    return () => window.clearTimeout(timer);
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const showMessage = (text: string, type: "error" | "success") => {
    setMessage({ text, type });
    if (type === "success") setTimeout(onClose, 2000);
  };

  const getClientOrShowError = () => {
    if (supabase) return supabase;
    showMessage("No se pudo iniciar el servicio de autenticación. Revisa la configuración de Supabase.", "error");
    return null;
  };

  const getReadableError = (error: unknown) => {
    const message = error instanceof Error ? error.message : String(error || "");

    if (message.includes("Failed to fetch")) {
      return "No se pudo conectar con el servicio de autenticación. Recarga la página e inténtalo de nuevo.";
    }

    if (message.includes("over_email_send_rate_limit")) {
      return "Has solicitado demasiados correos en poco tiempo. Espera un momento antes de volver a intentarlo.";
    }

    if (message.includes("email rate limit exceeded")) {
      return "El envío de correos está temporalmente limitado. Espera un momento y vuelve a intentarlo.";
    }

    return message || "Ha ocurrido un error inesperado.";
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const client = getClientOrShowError();
    if (!client) return;

    setLoading(true);
    setMessage(null);

    try {
      const { error } = await client.auth.signInWithPassword({ email, password });
      if (error) return showMessage(error.message, "error");
      showMessage("Bienvenido. Redirigiendo...", "success");
    } catch (error) {
      showMessage(getReadableError(error), "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const client = getClientOrShowError();
    if (!client) return;
    if (password !== confirmPwd) return showMessage("Las contraseñas no coinciden", "error");
    if (password.length < 6) return showMessage("La contraseña debe tener al menos 6 caracteres", "error");

    setLoading(true);
    setMessage(null);

    try {
      const { data, error } = await client.auth.signUp({
        email,
        password,
      });
      if (error) return showMessage(getReadableError(error), "error");
      if (data.session) {
        showMessage("Cuenta creada. Has iniciado sesión automáticamente.", "success");
        return;
      }
      setMode("login");
      setPassword("");
      setConfirmPwd("");
      showMessage("Cuenta creada. Ya puedes iniciar sesión.", "success");
    } catch (error) {
      showMessage(getReadableError(error), "error");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    const client = getClientOrShowError();
    if (!client) return;

    setLoading(true);
    setMessage(null);

    try {
      const { error } = await client.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      if (error) return showMessage(getReadableError(error), "error");
      showMessage("Enviado. Revisa tu email para restablecer la contraseña.", "success");
    } catch (error) {
      showMessage(getReadableError(error), "error");
    } finally {
      setLoading(false);
    }
  };

  const title = mode === "login" ? "Iniciar sesión" : mode === "signup" ? "Crear cuenta" : "Restablecer contraseña";
  const subtitle = mode === "login"
    ? "Guarda destinos y continúa tu viaje desde cualquier dispositivo."
    : mode === "signup"
    ? "Crea una cuenta para sincronizar favoritos y rutas."
    : "Te enviaremos un enlace para crear una nueva contraseña.";

  const inputClass = "w-full rounded-2xl border border-[rgba(226,232,240,0.95)] bg-[var(--porcelain)] px-4 py-3 text-sm text-[var(--slate-900)] outline-none transition placeholder:text-[var(--slate-500)] focus:border-[rgba(15,118,110,0.35)] focus:ring-4 focus:ring-[rgba(15,118,110,0.10)]";
  const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-[var(--slate-500)]";
  const primaryButtonClass = "w-full rounded-full bg-[linear-gradient(135deg,var(--ink-blue)_0%,var(--jade)_100%)] py-3 text-sm font-semibold text-white shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50";
  const linkButtonClass = "font-semibold text-[var(--jade)] transition hover:text-[var(--ink-blue)]";

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[rgba(15,23,42,0.62)] backdrop-blur-sm" onClick={onClose} />

      <div className="surface-panel relative w-full max-w-[440px] overflow-hidden rounded-[32px] bg-white p-6 shadow-[var(--shadow-hover)] sm:p-8">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(226,232,240,0.9)] bg-white text-lg text-[var(--slate-500)] transition hover:bg-[var(--porcelain)] hover:text-[var(--slate-900)]"
          aria-label="Cerrar"
        >
          ×
        </button>

        <div className="mb-7">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--ink-blue)_0%,var(--jade)_100%)] text-sm font-semibold text-white shadow-[var(--shadow-soft)]">
              VA
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--slate-500)]">ViajaAChina</p>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--slate-900)]">{title}</h2>
            </div>
          </div>
          <p className="mt-4 text-sm leading-7 text-[var(--slate-700)]">{subtitle}</p>
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

        {mode === "login" && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label className={labelClass}>Contraseña</label>
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
            <button type="submit" disabled={loading} className={primaryButtonClass}>
              {loading ? "Entrando..." : "Entrar"}
            </button>
            <div className="flex items-center justify-between gap-3 text-xs text-[var(--slate-500)]">
              <button type="button" onClick={() => setMode("signup")} className={linkButtonClass}>
                Crear cuenta
              </button>
              <button type="button" onClick={() => setMode("reset")} className="transition hover:text-[var(--ink-blue)]">
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </form>
        )}

        {mode === "signup" && (
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label className={labelClass}>Contraseña</label>
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
              <label className={labelClass}>Confirmar contraseña</label>
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
            <button type="submit" disabled={loading} className={primaryButtonClass}>
              {loading ? "Registrando..." : "Crear cuenta"}
            </button>
            <p className="text-center text-xs text-[var(--slate-500)]">
              ¿Ya tienes cuenta?
              <button type="button" onClick={() => setMode("login")} className={`${linkButtonClass} ml-1`}>
                Iniciar sesión
              </button>
            </p>
          </form>
        )}

        {mode === "reset" && (
          <form onSubmit={handleReset} className="space-y-4">
            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                placeholder="tu@email.com"
              />
            </div>
            <button type="submit" disabled={loading} className={primaryButtonClass}>
              {loading ? "Enviando..." : "Enviar enlace"}
            </button>
            <p className="text-center text-xs text-[var(--slate-500)]">
              <button type="button" onClick={() => setMode("login")} className={linkButtonClass}>
                Volver a iniciar sesión
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
