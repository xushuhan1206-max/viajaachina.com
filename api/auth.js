const jsonHeaders = {
  "Content-Type": "application/json",
};

function supabaseConfig() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  if (!/^https:\/\/.+\.supabase\.co\/?$/.test(url)) {
    const error = new Error("SUPABASE_URL must look like https://YOUR_PROJECT_ID.supabase.co. It is not the anon/publishable key.");
    error.status = 500;
    throw error;
  }
  return { url: url.replace(/\/$/, ""), anonKey };
}

async function readJson(response) {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch (error) {
    return { message: text };
  }
}

function cleanEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function normalizeSession(data) {
  if (!data || typeof data !== "object") return {};
  const session = data.session || data;
  const user = data.user || session.user || {};
  return {
    accessToken: session.access_token,
    refreshToken: session.refresh_token,
    expiresAt: session.expires_at,
    user: {
      id: user.id,
      email: user.email,
    },
  };
}

function requestBody(request) {
  if (typeof request.body === "string") {
    try {
      return JSON.parse(request.body);
    } catch (error) {
      return {};
    }
  }
  return request.body || {};
}

export default async function handler(request, response) {
  try {
    if (request.method !== "POST") {
      response.setHeader("Allow", "POST");
      return response.status(405).json({ ok: false, error: "Method not allowed" });
    }

    const config = supabaseConfig();
    if (!config) {
      return response.status(500).json({ ok: false, error: "SUPABASE_URL or SUPABASE_ANON_KEY is not configured" });
    }

    const body = requestBody(request);
    const { action, password } = body;
    const email = cleanEmail(body.email);
    if (!["signup", "signin"].includes(action)) {
      return response.status(400).json({ ok: false, error: "Invalid auth action" });
    }
    if (!email || !password || String(password).length < 6) {
      return response.status(400).json({ ok: false, error: "Email and password are required" });
    }

    const endpoint =
      action === "signup" ? `${config.url}/auth/v1/signup` : `${config.url}/auth/v1/token?grant_type=password`;

    const authResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        ...jsonHeaders,
        apikey: config.anonKey,
        Authorization: `Bearer ${config.anonKey}`,
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await readJson(authResponse);

    if (!authResponse.ok) {
      return response.status(authResponse.status).json({
        ok: false,
        error: data?.msg || data?.message || data?.error_description || "Supabase auth failed",
      });
    }

    const session = normalizeSession(data);
    if (!session.accessToken) {
      return response.status(200).json({
        ok: true,
        pendingConfirmation: true,
        user: data?.user ? { id: data.user.id, email: data.user.email } : { email },
        message: "Cuenta creada. Revisa tu email para confirmar la cuenta y luego inicia sesión.",
      });
    }

    return response.status(200).json({ ok: true, session });
  } catch (error) {
    return response.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : "Auth function failed",
    });
  }
}
