"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "error" | "success" } | null>(null);
  const [ready, setReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Supabase 会自动从 URL hash 读取 recovery token 并设置 session
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setReady(true);
      } else {
        setMessage({ text: "Enlace inválido o expirado. Solicita un nuevo restablecimiento.", type: "error" });
      }
    };
    checkSession();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPwd) return setMessage({ text: "Las contraseñas no coinciden", type: "error" });
    if (password.length < 6) return setMessage({ text: "Mínimo 6 caracteres", type: "error" });
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) return setMessage({ text: error.message, type: "error" });
    setMessage({ text: "¡Contraseña actualizada! Redirigiendo...", type: "success" });
    setTimeout(() => router.push("/"), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F7FE] px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-[400px] w-full">
        <h1 className="text-lg font-bold text-center mb-1">Nueva contraseña</h1>
        <p className="text-[12px] text-gray-400 text-center mb-6">Ingresa tu nueva contraseña</p>

        {message && (
          <div className={`text-[12px] px-3 py-2 rounded-lg mb-4 ${message.type === "error" ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>
            {message.text}
          </div>
        )}

        {!ready && message?.type !== "error" && (
          <div className="text-center text-gray-400 text-sm py-8">Verificando enlace...</div>
        )}

        {ready && (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-[12px] font-medium text-gray-600 mb-1">Nueva contraseña</label>
              <input
                type="password" required minLength={6}
                value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-[14px] outline-none focus:border-[#C62828] transition-colors"
                placeholder="Mínimo 6 caracteres"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-gray-600 mb-1">Confirmar contraseña</label>
              <input
                type="password" required minLength={6}
                value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-[14px] outline-none focus:border-[#C62828] transition-colors"
                placeholder="Repite la contraseña"
              />
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-[#C62828] text-white font-semibold py-2.5 rounded-lg text-[14px] hover:bg-[#B71C1C] transition-colors disabled:opacity-50">
              {loading ? "Guardando..." : "Guardar nueva contraseña"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
