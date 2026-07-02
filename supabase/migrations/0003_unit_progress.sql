-- Unit progress: tracks which step a student is on per unit
create table public.unit_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  unit_slug text not null,
  current_step int not null default 0,
  completed boolean not null default false,
  updated_at timestamptz not null default now(),
  unique (user_id, unit_slug)
);

alter table public.unit_progress enable row level security;

create policy "own progress readable" on public.unit_progress
  for select using (user_id = auth.uid() or public.is_teacher());

create policy "own progress insertable" on public.unit_progress
  for insert with check (user_id = auth.uid());

create policy "own progress updatable" on public.unit_progress
  for update using (user_id = auth.uid());
