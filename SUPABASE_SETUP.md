# viajaachina Supabase Setup

This guide replaces the old first-version Supabase demo tables with the current auth-backed `Mi Viaje` data model.

## 1. What This Schema Stores

- `profiles`: registered Supabase Auth user profile, interests, budget, travel style, memory text.
- `saved_cities`: cities saved by the user.
- `saved_places`: attractions/places saved from city cards or AI output.
- `saved_routes`: generated or manually saved routes.
- `prep_progress`: preparation checklist tasks saved from AI or the prep center.
- `chat_memories`: small memory notes from profile or AI.

## 2. Reset Old Supabase Tables

Open:

Supabase Dashboard -> SQL Editor -> New query

Paste and run:

`supabase-reset-schema.sql`

Important:

This script drops the old demo tables:

- `favorites`
- `trips`
- old versions of `profiles`, `saved_cities`, `saved_places`, `saved_routes`, `prep_progress`, `chat_memories`

Run it only if you are ready to replace old data.

## 3. Vercel Environment Variables

In Vercel:

Project -> Settings -> Environment Variables

Add:

```text
SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
SUPABASE_ANON_KEY=YOUR_ANON_PUBLIC_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
```

Do not put `SUPABASE_SERVICE_ROLE_KEY` in frontend code.
`SUPABASE_ANON_KEY` is used by the Vercel auth route to call Supabase Auth.

## 3.1 Supabase Auth Setting

For the first public demo, the fastest setup is:

Supabase Dashboard -> Authentication -> Providers -> Email

- Enable Email provider.
- For MVP testing, turn off `Confirm email` so users can register and immediately use the account.
- If `Confirm email` stays on, viajaachina will show a message asking the user to confirm their email before signing in.

If registration fails, check these first:

- `/api/health` must show `hasSupabaseAnonKey: true`.
- The password must have at least 6 characters.
- The email must be new, or use `Iniciar sesión` instead of creating a duplicate account.
- Local static preview with Python does not run Vercel API routes; test registration on Vercel or with a Vercel dev server.

Keep existing:

```text
DIFY_API_KEY=app-...
DIFY_API_BASE=https://api.dify.ai/v1
```

## 4. Verify Deployment

After redeploying, open:

```text
https://viajaachina.com/api/health
```

Expected:

```json
{
  "ok": true,
  "hasDifyApiKey": true,
  "hasSupabaseUrl": true,
  "hasSupabaseAnonKey": true,
  "hasSupabaseServiceRoleKey": true
}
```

## 5. Auth and Account APIs

The project now includes:

```text
POST /api/auth
GET  /api/account
POST /api/account
```

`POST /api/auth` body:

```json
{
  "action": "signup",
  "email": "demo@viajaachina.com",
  "password": "12345678"
}
```

`GET /api/account` and `POST /api/account` require:

```text
Authorization: Bearer USER_ACCESS_TOKEN
```

`POST /api/account` body example:

```json
{
  "account": {
    "name": "Demo User",
    "email": "demo@viajaachina.com",
    "travelStyle": "Primer viaje practico",
    "budget": "Equilibrado",
    "interests": "Historia, comida local, tren",
    "memory": "Prefiere pocos cambios de hotel.",
    "favoriteCityIds": ["beijing", "xian"],
    "favoritePlaces": [],
    "savedRoutes": [],
    "savedPrepTasks": []
  },
  "cityNames": {
    "beijing": "Beijing",
    "xian": "Xi'an"
  }
}
```

## 6. Current Status

Current implementation:

- Database schema is ready.
- Serverless Auth API is ready.
- Serverless Account API verifies the Supabase user token before saving.
- Frontend still uses localStorage for instant UX and automatically saves to Supabase after login.
- Registration modal creates/logs into a free account.

Manual test:

1. Run `supabase-reset-schema.sql` in Supabase SQL Editor.
2. Add `SUPABASE_URL`, `SUPABASE_ANON_KEY` and `SUPABASE_SERVICE_ROLE_KEY` in Vercel.
3. Redeploy.
4. Open `/api/health` and confirm all Supabase flags are `true`.
5. Open the account modal, create a free account, save a city/place/route, then confirm the status says `Guardado en tu cuenta`.
6. In Supabase SQL Editor, verify:

```sql
select * from profiles order by created_at desc limit 5;
select * from saved_cities order by created_at desc limit 5;
select * from saved_places order by created_at desc limit 5;
select * from saved_routes order by created_at desc limit 5;
select * from prep_progress order by created_at desc limit 5;
select * from chat_memories order by created_at desc limit 5;
```

Later, add password reset and optional email magic-link login.
