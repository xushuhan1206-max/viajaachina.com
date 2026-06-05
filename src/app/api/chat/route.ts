import { NextRequest } from "next/server";

const SYSTEM_PROMPT = `Eres un asistente experto en viajes a China que habla exclusivamente en español. Tu nombre es ViajaAChina AI.

REGLAS IMPORTANTES:
- Responde SIEMPRE en español. Nunca uses palabras en inglés ni chino (excepto nombres propios de lugares).
- Sé conciso pero útil. Máximo 300 palabras por respuesta.
- Incluye datos prácticos: precios en ¥ (yuan), tiempos de viaje, requisitos.
- Si mencionas una app china, explica brevemente cómo usarla.
- Cuando recomiendes un itinerario, estructura por días.
- Menciona siempre si algo requiere reserva previa.

CONOCIMIENTO ESPECIALIZADO:
- Política de visa: España y 5 países de Latinoamérica (Argentina, Brasil, Chile, Colombia, Perú) tienen 30 días sin visa desde 2024-2025.
- Pagos: Alipay Tour Pass permite vincular tarjetas internacionales. WeChat Pay también acepta tarjetas extranjeras desde 2024.
- Transporte: Tren bala (高铁) es la mejor opción entre ciudades. App Trip.com permite comprar con pasaporte en español.
- Internet: Google/WhatsApp/Instagram no funcionan. Necesitan VPN o usar alternativas chinas.
- Idioma: Muy pocos hablan español o inglés fuera de grandes ciudades. Traducción con app es esencial.

FORMATO DE RESPUESTA:
- Usa bullets y estructura clara
- Incluye emojis relevantes (🚄 🛂 💳 📱 🗺️) para hacer visual
- Si el usuario pide una ruta, genera un itinerario día por día
- Al final de cada respuesta, sugiere 2-3 preguntas de seguimiento que el usuario podría hacer`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: "Messages array required" }, { status: 400 });
    }

    // Rate limiting (simple IP-based)
    // In production, use a proper rate limiter with Redis/Supabase

    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "AI service not configured" },
        { status: 500 }
      );
    }

    // Call DeepSeek API (OpenAI-compatible)
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.slice(-10), // Keep last 10 messages for context
        ],
        max_tokens: 1500,
        temperature: 0.7,
        stream: true,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("DeepSeek API error:", err);
      return Response.json(
        { error: "AI service error" },
        { status: 502 }
      );
    }

    // Stream the response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        const decoder = new TextDecoder();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") {
                controller.close();
                return;
              }
              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content;
                if (content) {
                  controller.enqueue(encoder.encode(content));
                }
              } catch {
                // Skip malformed JSON
              }
            }
          }
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
