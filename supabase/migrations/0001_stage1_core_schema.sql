-- ============================================================
-- MORE English Listening Course — Stage 1 core schema
-- Applied to project: more-english-listening (xcqgilvzdcggbqhoqvyk)
-- ============================================================

-- ---------- Profiles (one row per auth user) ----------
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'student' check (role in ('student','teacher')),
  full_name text,
  native_language text check (native_language in ('ru','es','en') or native_language is null),
  created_at timestamptz not null default now()
);

-- Helper: is the current user a teacher? SECURITY DEFINER avoids RLS recursion.
create or replace function public.is_teacher()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'teacher'
  );
$$;

-- Auto-create a profile when a new auth user signs up (defaults to student).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- Content: levels -> modules -> exercises ----------
create table public.levels (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug in ('easy','medium','difficult')),
  name text not null,
  sort_order int not null default 0
);

create table public.modules (
  id uuid primary key default gen_random_uuid(),
  level_id uuid not null references public.levels(id) on delete cascade,
  title text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table public.exercises (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.modules(id) on delete cascade,
  type text not null default 'listening' check (type in ('listening','vocab','grammar')),
  title text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- Audio + transcript segments + gaps ----------
create table public.audio_clips (
  id uuid primary key default gen_random_uuid(),
  exercise_id uuid not null references public.exercises(id) on delete cascade,
  storage_path text not null,
  kind text not null default 'dictation' check (kind in ('dictation','micro')),
  duration_seconds numeric,
  sort_order int not null default 0
);

create table public.segments (
  id uuid primary key default gen_random_uuid(),
  audio_clip_id uuid not null references public.audio_clips(id) on delete cascade,
  text text not null,
  ipa text,
  gap_format text not null default 'blanks' check (gap_format in ('blanks','full')),
  start_time numeric,
  end_time numeric,
  sort_order int not null default 0
);

create table public.gaps (
  id uuid primary key default gen_random_uuid(),
  segment_id uuid not null references public.segments(id) on delete cascade,
  answer_text text not null,
  position int not null default 0
);

-- ---------- Connected-speech feature catalogue ----------
create table public.features (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  explanation text not null,
  example text
);

create table public.segment_features (
  segment_id uuid not null references public.segments(id) on delete cascade,
  feature_id uuid not null references public.features(id) on delete cascade,
  primary key (segment_id, feature_id)
);

-- ---------- Attempts (per gap submission) ----------
create table public.attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  gap_id uuid references public.gaps(id) on delete cascade,
  exercise_id uuid references public.exercises(id) on delete cascade,
  submitted_text text,
  is_correct boolean not null default false,
  attempt_number int not null default 1,
  replays int not null default 0,
  created_at timestamptz not null default now()
);

create index attempts_user_idx on public.attempts(user_id);
create index attempts_exercise_idx on public.attempts(exercise_id);
create index modules_level_idx on public.modules(level_id);
create index exercises_module_idx on public.exercises(module_id);

-- ============================================================
-- Row Level Security
-- ============================================================
alter table public.profiles enable row level security;
alter table public.levels enable row level security;
alter table public.modules enable row level security;
alter table public.exercises enable row level security;
alter table public.audio_clips enable row level security;
alter table public.segments enable row level security;
alter table public.gaps enable row level security;
alter table public.features enable row level security;
alter table public.segment_features enable row level security;
alter table public.attempts enable row level security;

-- Profiles: a user sees/edits their own; teachers see all.
create policy "own profile readable" on public.profiles
  for select using (id = auth.uid() or public.is_teacher());
create policy "own profile updatable" on public.profiles
  for update using (id = auth.uid());

-- Content tables: readable by any authenticated user; writable only by teachers.
do $$
declare t text;
begin
  foreach t in array array['levels','modules','exercises','audio_clips','segments','gaps','features','segment_features']
  loop
    execute format('create policy "content readable" on public.%I for select to authenticated using (true);', t);
    execute format('create policy "content writable by teacher" on public.%I for all to authenticated using (public.is_teacher()) with check (public.is_teacher());', t);
  end loop;
end $$;

-- Attempts: students manage their own; teachers can read all.
create policy "own attempts readable" on public.attempts
  for select using (user_id = auth.uid() or public.is_teacher());
create policy "own attempts insertable" on public.attempts
  for insert with check (user_id = auth.uid());
create policy "own attempts updatable" on public.attempts
  for update using (user_id = auth.uid());
