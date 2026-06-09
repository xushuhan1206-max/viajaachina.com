export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.DIFY_API_KEY;
  const apiBase = process.env.DIFY_API_BASE || "https://api.dify.ai/v1";

  if (!apiKey) {
    return response.status(500).json({ error: "DIFY_API_KEY is not configured" });
  }

  try {
    const { message, context = {}, conversationId = "", userId = "viajaachina-demo" } = request.body || {};

    if (!message || typeof message !== "string") {
      return response.status(400).json({ error: "Missing message" });
    }

    const difyResponse = await fetch(`${apiBase.replace(/\/$/, "")}/chat-messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: {
          travel_context: JSON.stringify(context),
          intent: context.intent || "",
          duration: context.duration || "",
          budget: context.budget || "",
          interests: context.interests || "",
          cities: context.cities || "",
          support: context.support || "",
          favorites: (context.favorites || []).join(", "),
          selected_cities: (context.selectedCities || []).join(", "),
          memory: context.memory || "",
          mode: context.mode || "chat",
        },
        query: message,
        response_mode: "blocking",
        conversation_id: conversationId,
        user: userId,
      }),
    });

    const data = await difyResponse.json();

    if (!difyResponse.ok) {
      return response.status(difyResponse.status).json({
        error: data.message || data.error || "Dify request failed",
      });
    }

    return response.status(200).json({
      answer: data.answer || "",
      conversationId: data.conversation_id || conversationId,
      messageId: data.message_id || "",
    });
  } catch (error) {
    return response.status(500).json({ error: "Unable to call Dify" });
  }
}
