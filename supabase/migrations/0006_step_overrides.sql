-- Lets the teacher edit the instruction line and info-card text of any
-- exercise step from the admin panel, without touching the hardcoded
-- unit data files. Null columns mean "use the hardcoded default".
create table public.step_overrides (
  unit_slug text not null,
  step_id text not null,
  instruction text,
  body text[],
  updated_at timestamptz not null default now(),
  primary key (unit_slug, step_id)
);

alter table public.step_overrides enable row level security;

create policy "step overrides readable" on public.step_overrides
  for select to authenticated using (true);
create policy "step overrides writable by teacher" on public.step_overrides
  for all to authenticated using (public.is_teacher()) with check (public.is_teacher());
