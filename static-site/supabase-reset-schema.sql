-- ============================================================
-- viajaachina Supabase reset schema
-- Run in Supabase Dashboard > SQL Editor.
--
-- WARNING: this script replaces the old demo schema.
-- It drops old viajaachina tables and deletes their data.
-- ============================================================

create extension if not exists pgcrypto;

drop table if exists public.chat_memories cascade;
drop table if exists public.prep_progress cascade;
drop table if exists public.saved_routes cascade;
drop table if exists public.saved_places cascade;
drop table if exists public.saved_cities cascade;
drop table if exists public.trips cascade;
drop table if exists public.favorites cascade;
drop table if exists public.profiles cascade;

create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid not null unique,
  email text not null unique,
  display_name text not null default 'Viajero invitado',
  language text not null default 'es',
  travel_style text not null default 'Primer viaje practico',
  budget_level text not null default 'Equilibrado',
  interests text not null default '',
  memory_text text not null default '',
  last_synced_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.saved_cities (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  city_id text not null,
  city_name text not null,
  note text not null default '',
  source text not null default 'manual',
  created_at timestamptz not null default now(),
  unique(profile_id, city_id)
);

create table public.saved_places (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  place_id text not null,
  place_name text not null,
  city_id text not null default '',
  city_name text not null default '',
  source text not null default 'manual',
  note text not null default '',
  raw_data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique(profile_id, place_id)
);

create table public.saved_routes (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  city_ids jsonb not null default '[]'::jsonb,
  segments jsonb not null default '[]'::jsonb,
  days text not null default '',
  budget text not null default '',
  interests text not null default '',
  source text not null default 'manual',
  created_at timestamptz not null default now()
);

create table public.prep_progress (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  task_id text not null,
  category text not null default 'prep',
  task text not null,
  priority text not null default 'media' check (priority in ('alta', 'media', 'baja')),
  status text not null default 'saved' check (status in ('saved', 'todo', 'doing', 'done', 'skipped')),
  note text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(profile_id, task_id)
);

create table public.chat_memories (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  memory_type text not null default 'note',
  content text not null,
  source text not null default 'user',
  raw_data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger prep_progress_set_updated_at
before update on public.prep_progress
for each row execute function public.set_updated_at();

create index profiles_email_idx on public.profiles(email);
create index profiles_auth_user_id_idx on public.profiles(auth_user_id);
create index saved_cities_profile_idx on public.saved_cities(profile_id);
create index saved_places_profile_idx on public.saved_places(profile_id);
create index saved_routes_profile_idx on public.saved_routes(profile_id);
create index prep_progress_profile_idx on public.prep_progress(profile_id);
create index chat_memories_profile_idx on public.chat_memories(profile_id);

alter table public.profiles enable row level security;
alter table public.saved_cities enable row level security;
alter table public.saved_places enable row level security;
alter table public.saved_routes enable row level security;
alter table public.prep_progress enable row level security;
alter table public.chat_memories enable row level security;

-- No public RLS policies are created in this demo schema.
-- The browser should not access these tables directly.
-- Use Vercel API routes with SUPABASE_SERVICE_ROLE_KEY.

comment on table public.profiles is 'viajaachina registered user profile and personal memory.';
comment on table public.saved_cities is 'Cities saved in Mi Viaje.';
comment on table public.saved_places is 'Places/attractions saved in Mi Viaje.';
comment on table public.saved_routes is 'Routes generated or saved by the user.';
comment on table public.prep_progress is 'Preparation checklist tasks saved from AI or manual flow.';
comment on table public.chat_memories is 'Small memory notes extracted from chat or typed by user.';
