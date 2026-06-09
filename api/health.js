export default function handler(request, response) {
  response.status(200).json({
    ok: true,
    hasDifyApiKey: Boolean(process.env.DIFY_API_KEY),
    difyApiBase: process.env.DIFY_API_BASE || "https://api.dify.ai/v1",
  });
}
