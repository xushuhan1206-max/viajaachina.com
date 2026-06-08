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
    const handleCallback = async () => {
      try {
        // Supabase 客户端会自动从 URL hash 中读取 token 并设置 session
        const { data, error } = await supabase.auth.getSession();

        if (error) throw error;

        if (data.session) {
          setStatus("success");
          setMessage("¡Sesión iniciada correctamente!");
          setTimeout(() => router.push("/"), 1500);
        } else {
          // 也有可能是 password recovery 类型的链接
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
      } catch (err: any) {
        setStatus("error");
        setMessage(err.message || "Error desconocido");
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F7FE] px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-[400px] w-full text-center">
        <div className="mb-4 text-3xl">
          {status === "processing" && "⏳"}
          {status === "success" && "✅"}
          {status === "error" && "❌"}
        </div>
        <h2 className="text-lg font-bold mb-2">
          {status === "processing" && "Confirmando tu cuenta..."}
          {status === "success" && "¡Todo listo!"}
          {status === "error" && "Algo salió mal"}
        </h2>
        <p className="text-[13px] text-gray-500">{message || "Por favor espera..."}</p>
        {status === "error" && (
          <button
            onClick={() => router.push("/")}
            className="mt-4 bg-[#C62828] text-white px-5 py-2 rounded-lg text-[13px] font-medium"
          >
            Volver al inicio
          </button>
        )}
      </div>
    </div>
  );
}
