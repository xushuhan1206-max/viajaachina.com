import { NextRequest } from "next/server";

export async function GET() {
  return Response.json({
    difyConfigured: !!DIFY_API_KEY,
    difyKeyPrefix: DIFY_API_KEY ? DIFY_API_KEY.slice(0, 8) + "..." : null,
    apiUrl: DIFY_API_URL,
  });
}

const DIFY_API_KEY = process.env.DIFY_API_KEY || "";
const DIFY_API_URL = "https://api.dify.ai/v1/chat-messages";

export async function POST(req: NextRequest) {
  try {
    const { message, conversation_id = "" } = await req.json();

    if (!message || typeof message !== "string") {
      return Response.json({ error: "Message required" }, { status: 400 });
    }

    if (!DIFY_API_KEY) {
      return Response.json(
        { error: "Dify API not configured. Set DIFY_API_KEY env variable." },
        { status: 500 }
      );
    }

    // Call Dify Chatflow API (streaming)
    const difyRes = await fetch(DIFY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${DIFY_API_KEY}`,
      },
      body: JSON.stringify({
        inputs: {},
        query: message,
        user: "web-user",
        response_mode: "streaming",
        conversation_id,
      }),
    });

    if (!difyRes.ok) {
      const errText = await difyRes.text();
      console.error("Dify API error:", difyRes.status, errText);
      return Response.json(
        { error: `Dify API error ${difyRes.status}: ${errText}` },
        { status: 502 }
      );
    }

    // Stream Dify response back to client
    // Dify streaming format: "data: {JSON}\n\n"
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const reader = difyRes.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        const decoder = new TextDecoder();
        let buffer = "";
        let conversationId = conversation_id;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const dataStr = line.slice(6).trim();
            if (dataStr === "[DONE]") {
              controller.close();
              return;
            }

            try {
              const parsed = JSON.parse(dataStr);
              const event = parsed.event;
              const data = parsed.data || {};

              // Capture conversation_id from the first message
              if (data.conversation_id && !conversationId) {
                conversationId = data.conversation_id;
              }

              if (event === "message") {
                // Dify returns answer chunks in data.answer
                const answer = data.answer || "";
                if (answer) {
                  controller.enqueue(encoder.encode(answer));
                }
              }

              if (event === "message_end") {
                // Send conversation_id to client as a special token
                if (conversationId) {
                  controller.enqueue(
                    encoder.encode(`\n__CONV_ID__:${conversationId}\n`)
                  );
                }
                continue;
              }

              if (event === "error") {
                console.error("Dify stream error:", data);
                controller.enqueue(
                  encoder.encode(`[Error: ${data.message || "Unknown error"}]`)
                );
              }
            } catch {
              // Skip malformed JSON lines
            }
          }
        }

        // Flush remaining buffer
        if (buffer.startsWith("data: ")) {
          try {
            const dataStr = buffer.slice(6).trim();
            const parsed = JSON.parse(dataStr);
            if (parsed.event === "message" && parsed.data?.answer) {
              controller.enqueue(encoder.encode(parsed.data.answer));
            }
          } catch {
            // ignore
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
  } catch (error: any) {
    console.error("Chat API error:", error);
    return Response.json(
      { error: `Internal server error: ${error?.message || String(error)}` },
      { status: 500 }
    );
  }
}
