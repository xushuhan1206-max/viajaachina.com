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

  useEffect(() => { if (isOpen) { setMode(initialMode); setMessage(null); setEmail(""); setPassword(""); setConfirmPwd(""); } }, [isOpen, initialMode]);
  if (!isOpen) return null;

  const showMessage = (text: string, type: "error" | "success") => {
    setMessage({ text, type });
    if (type === "success") setTimeout(onClose, 2000);
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
    setLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return showMessage(error.message, "error");
      showMessage("¡Bienvenido! Redirigiendo...", "success");
    } catch (error) {
      showMessage(getReadableError(error), "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPwd) return showMessage("Las contraseñas no coinciden", "error");
    if (password.length < 6) return showMessage("La contraseña debe tener al menos 6 caracteres", "error");
    setLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
      });
      if (error) return showMessage(getReadableError(error), "error");
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
    setLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      if (error) return showMessage(getReadableError(error), "error");
      showMessage("Enviado! Revisa tu email para restablecer la contraseña.", "success");
    } catch (error) {
      showMessage(getReadableError(error), "error");
    } finally {
      setLoading(false);
    }
  };

  const title = mode === "login" ? "Iniciar sesión" : mode === "signup" ? "Crear cuenta" : "Restablecer contraseña";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-[400px] bg-white rounded-2xl shadow-2xl p-7 md:p-8 animate-[fadeIn_0.2s_ease-out]">
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors text-lg">✕</button>

        {/* Logo */}
        <div className="text-center mb-6">
          <span className="text-2xl font-bold">
            <span className="text-[#C62828]">Viaja</span><span className="text-[#FFB300]">AChina</span>
          </span>
        </div>

        <h2 className="text-lg font-bold text-center mb-5">{title}</h2>

        {/* Message */}
        {message && (
          <div className={`text-[12px] px-3 py-2 rounded-lg mb-4 ${message.type === "error" ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>
            {message.text}
          </div>
        )}

        {/* Login Form */}
        {mode === "login" && (
          <form onSubmit={handleLogin} className="space-y-3.5">
            <div>
              <label className="block text-[12px] font-medium text-gray-600 mb-1">Email</label>
              <input
                type="email" required
                value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-[14px] outline-none focus:border-[#C62828] focus:ring-2 focus:ring-[#C62828]/15 transition-all"
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-gray-600 mb-1">Contraseña</label>
              <input
                type="password" required minLength={6}
                value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-[14px] outline-none focus:border-[#C62828] focus:ring-2 focus:ring-[#C62828]/15 transition-all"
                placeholder="••••••"
              />
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-[#C62828] text-white font-semibold py-2.5 rounded-lg text-[14px] hover:bg-[#B71C1C] transition-colors disabled:opacity-50">
              {loading ? "Entrando..." : "Entrar"}
            </button>
            <div className="flex justify-between text-[12px]">
              <button type="button" onClick={() => setMode("signup")} className="text-[#C62828] font-medium hover:underline">Crear cuenta</button>
              <button type="button" onClick={() => setMode("reset")} className="text-gray-400 hover:text-gray-600">¿Olvidaste tu contraseña?</button>
            </div>
          </form>
        )}

        {/* Signup Form */}
        {mode === "signup" && (
          <form onSubmit={handleSignup} className="space-y-3.5">
            <div>
              <label className="block text-[12px] font-medium text-gray-600 mb-1">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-[14px] outline-none focus:border-[#C62828] focus:ring-2 focus:ring-[#C62828]/15 transition-all"
                placeholder="tu@email.com" />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-gray-600 mb-1">Contraseña</label>
              <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-[14px] outline-none focus:border-[#C62828] focus:ring-2 focus:ring-[#C62828]/15 transition-all"
                placeholder="Mínimo 6 caracteres" />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-gray-600 mb-1">Confirmar contraseña</label>
              <input type="password" required minLength={6} value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-[14px] outline-none focus:border-[#C62828] focus:ring-2 focus:ring-[#C62828]/15 transition-all"
                placeholder="Repite la contraseña" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-[#C62828] text-white font-semibold py-2.5 rounded-lg text-[14px] hover:bg-[#B71C1C] transition-colors disabled:opacity-50">
              {loading ? "Registrando..." : "Crear cuenta"}
            </button>
            <p className="text-[11px] text-gray-400 text-center">¿Ya tienes cuenta?
              <button type="button" onClick={() => setMode("login")} className="text-[#C62828] font-medium hover:underline ml-1">Iniciar sesión</button>
            </p>
          </form>
        )}

        {/* Reset Form */}
        {mode === "reset" && (
          <form onSubmit={handleReset} className="space-y-3.5">
            <p className="text-[13px] text-gray-500 leading-relaxed">Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña.</p>
            <div>
              <label className="block text-[12px] font-medium text-gray-600 mb-1">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-[14px] outline-none focus:border-[#C62828] focus:ring-2 focus:ring-[#C62828]/15 transition-all"
                placeholder="tu@email.com" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-[#C62828] text-white font-semibold py-2.5 rounded-lg text-[14px] hover:bg-[#B71C1C] transition-colors disabled:opacity-50">
              {loading ? "Enviando..." : "Enviar enlace"}
            </button>
            <p className="text-[12px] text-center">
              <button type="button" onClick={() => setMode("login")} className="text-[#C62828] font-medium hover:underline">← Volver a iniciar sesión</button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
