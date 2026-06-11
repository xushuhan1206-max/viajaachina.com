export default function handler(request, response) {
  const rawSupabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseUrl = String(rawSupabaseUrl)
    .trim()
    .replace(/\/rest\/v1\/?$/i, "")
    .replace(/\/$/, "");
  response.status(200).json({
    ok: true,
    hasDifyApiKey: Boolean(process.env.DIFY_API_KEY),
    difyApiBase: process.env.DIFY_API_BASE || "https://api.dify.ai/v1",
    hasSupabaseUrl: Boolean(rawSupabaseUrl),
    supabaseUrlLooksValid: /^https:\/\/.+\.supabase\.co\/?$/.test(supabaseUrl),
    hasSupabaseAnonKey: Boolean(process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    hasSupabaseServiceRoleKey: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
  });
}
