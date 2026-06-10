const jsonHeaders = {
  "Content-Type": "application/json",
};

function supabaseConfig() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !serviceKey || !anonKey) return null;
  return { url: url.replace(/\/$/, ""), serviceKey, anonKey };
}

function configError() {
  const error = new Error("SUPABASE_URL, SUPABASE_ANON_KEY or SUPABASE_SERVICE_ROLE_KEY is not configured");
  error.status = 500;
  return error;
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

async function supabaseRest(path, options = {}) {
  const config = supabaseConfig();
  if (!config) throw configError();

  const response = await fetch(`${config.url}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: config.serviceKey,
      Authorization: `Bearer ${config.serviceKey}`,
      ...jsonHeaders,
      ...(options.headers || {}),
    },
  });

  const data = await readJson(response);
  if (!response.ok) {
    const error = new Error(data?.message || data?.hint || "Supabase request failed");
    error.status = response.status;
    throw error;
  }
  return data;
}

async function verifyUser(request) {
  const config = supabaseConfig();
  if (!config) throw configError();
  const token = String(request.headers.authorization || "").replace(/^Bearer\s+/i, "").trim();
  if (!token) {
    const error = new Error("Missing user token");
    error.status = 401;
    throw error;
  }

  const response = await fetch(`${config.url}/auth/v1/user`, {
    headers: {
      apikey: config.anonKey,
      Authorization: `Bearer ${token}`,
    },
  });
  const user = await readJson(response);
  if (!response.ok || !user?.id) {
    const error = new Error("Invalid or expired user token");
    error.status = 401;
    throw error;
  }
  return user;
}

function safeText(value, fallback = "") {
  return String(value || fallback).trim();
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function uniqueBy(items, keyFn) {
  const seen = new Set();
  return items.filter((item) => {
    const key = keyFn(item);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function upsertProfile(user, account = {}) {
  const payload = {
    auth_user_id: user.id,
    email: safeText(user.email || account.email),
    display_name: safeText(account.name, "Viajero invitado"),
    language: "es",
    travel_style: safeText(account.travelStyle, "Primer viaje practico"),
    budget_level: safeText(account.budget, "Equilibrado"),
    interests: safeText(account.interests),
    memory_text: safeText(account.memory),
    last_synced_at: new Date().toISOString(),
  };

  const rows = await supabaseRest("profiles?on_conflict=auth_user_id", {
    method: "POST",
    headers: {
      Prefer: "resolution=merge-duplicates,return=representation",
    },
    body: JSON.stringify(payload),
  });

  return rows?.[0];
}

async function replaceRows(table, profileId, rows) {
  await supabaseRest(`${table}?profile_id=eq.${profileId}`, { method: "DELETE" });
  if (!rows.length) return [];
  return supabaseRest(table, {
    method: "POST",
    headers: {
      Prefer: "return=representation",
    },
    body: JSON.stringify(rows),
  });
}

function mapCities(favoriteCityIds = [], cityNames = {}) {
  return uniqueBy(
    asArray(favoriteCityIds).map((cityId) => ({
      city_id: safeText(cityId),
      city_name: safeText(cityNames[cityId], cityId),
      note: "",
      source: "web",
    })),
    (item) => item.city_id,
  );
}

function mapPlaces(places = []) {
  return uniqueBy(
    asArray(places).map((place) => ({
      place_id: safeText(place.id || place.place_id || place.name),
      place_name: safeText(place.name || place.place_name, "Lugar"),
      city_id: safeText(place.cityId || place.city_id),
      city_name: safeText(place.cityName || place.city_name),
      source: safeText(place.source, "web"),
      note: safeText(place.note || place.why || place.booking_note),
      raw_data: place || {},
    })),
    (item) => item.place_id,
  );
}

function mapRoutes(routes = []) {
  return asArray(routes)
    .map((route) => ({
      title: safeText(route.name || route.title, "Ruta viajaachina"),
      city_ids: asArray(route.cityIds || route.city_ids),
      segments: asArray(route.segments),
      days: safeText(route.days || route.duration),
      budget: safeText(route.budget),
      interests: safeText(route.interests),
      source: safeText(route.source, "web"),
      created_at: route.createdAt || route.created_at || new Date().toISOString(),
    }))
    .filter((route) => route.title);
}

function mapPrepTasks(tasks = []) {
  const validStatuses = ["saved", "todo", "doing", "done", "skipped"];
  return uniqueBy(
    asArray(tasks).map((task) => ({
      task_id: safeText(task.id || task.task_id || task.task),
      category: safeText(task.category, "prep"),
      task: safeText(task.task),
      priority: ["alta", "media", "baja"].includes(task.priority) ? task.priority : "media",
      status: validStatuses.includes(task.status) ? task.status : "saved",
      note: safeText(task.note),
      created_at: task.createdAt || task.created_at || new Date().toISOString(),
    })),
    (item) => item.task_id,
  ).filter((task) => task.task);
}

function mapMemories(account = {}) {
  const memories = [];
  if (safeText(account.memory)) {
    memories.push({
      memory_type: "profile",
      content: safeText(account.memory),
      source: "profile",
      raw_data: {},
    });
  }
  asArray(account.aiMemories).forEach((memory) => {
    const content = typeof memory === "string" ? memory : memory.content;
    if (safeText(content)) {
      memories.push({
        memory_type: safeText(memory.type, "ai"),
        content: safeText(content),
        source: safeText(memory.source, "ai"),
        raw_data: typeof memory === "object" ? memory : {},
      });
    }
  });
  return memories.slice(0, 20);
}

async function loadAccount(user) {
  const rows = await supabaseRest(`profiles?auth_user_id=eq.${user.id}&limit=1`);
  const profile = rows?.[0] || null;
  if (!profile) return null;
  const query = `profile_id=eq.${profile.id}`;
  const [cities, places, routes, prepTasks, memories] = await Promise.all([
    supabaseRest(`saved_cities?${query}&order=created_at.desc`),
    supabaseRest(`saved_places?${query}&order=created_at.desc`),
    supabaseRest(`saved_routes?${query}&order=created_at.desc`),
    supabaseRest(`prep_progress?${query}&order=created_at.desc`),
    supabaseRest(`chat_memories?${query}&order=created_at.desc&limit=20`),
  ]);

  return {
    profile,
    saved_cities: cities || [],
    saved_places: places || [],
    saved_routes: routes || [],
    prep_progress: prepTasks || [],
    chat_memories: memories || [],
  };
}

async function saveAccount(user, body = {}) {
  const account = body.account || {};
  const profile = await upsertProfile(user, account);
  const profileId = profile.id;

  const cityRows = mapCities(account.favoriteCityIds || body.favoriteCityIds, body.cityNames).map((row) => ({
    ...row,
    profile_id: profileId,
  }));
  const placeRows = mapPlaces(account.favoritePlaces || body.favoritePlaces).map((row) => ({
    ...row,
    profile_id: profileId,
  }));
  const routeRows = mapRoutes(account.savedRoutes || body.savedRoutes).map((row) => ({
    ...row,
    profile_id: profileId,
  }));
  const prepRows = mapPrepTasks(account.savedPrepTasks || body.savedPrepTasks).map((row) => ({
    ...row,
    profile_id: profileId,
  }));
  const memoryRows = mapMemories(account).map((row) => ({
    ...row,
    profile_id: profileId,
  }));

  const [savedCities, savedPlaces, savedRoutes, prepTasks, memories] = await Promise.all([
    replaceRows("saved_cities", profileId, cityRows),
    replaceRows("saved_places", profileId, placeRows),
    replaceRows("saved_routes", profileId, routeRows),
    replaceRows("prep_progress", profileId, prepRows),
    replaceRows("chat_memories", profileId, memoryRows),
  ]);

  return {
    profile,
    counts: {
      saved_cities: savedCities.length,
      saved_places: savedPlaces.length,
      saved_routes: savedRoutes.length,
      prep_progress: prepTasks.length,
      chat_memories: memories.length,
    },
  };
}

export default async function handler(request, response) {
  try {
    const user = await verifyUser(request);

    if (request.method === "GET") {
      const account = await loadAccount(user);
      return response.status(200).json({ ok: true, user: { id: user.id, email: user.email }, account });
    }

    if (request.method === "POST") {
      const result = await saveAccount(user, request.body || {});
      return response.status(200).json({ ok: true, user: { id: user.id, email: user.email }, ...result });
    }

    response.setHeader("Allow", "GET, POST");
    return response.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    return response.status(error.status || 500).json({
      ok: false,
      error: error instanceof Error ? error.message : "Account request failed",
    });
  }
}
