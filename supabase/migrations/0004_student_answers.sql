-- Student answers: records what a student submitted for each graded step,
-- so they can review past exercises later. One row per (student, unit, step).
create table public.student_answers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  unit_slug text not null,
  step_id text not null,
  answers jsonb not null,
  score numeric,
  submitted_at timestamptz not null default now(),
  unique (user_id, unit_slug, step_id)
);

alter table public.student_answers enable row level security;

create policy "own answers readable" on public.student_answers
  for select using (user_id = auth.uid() or public.is_teacher());

create policy "own answers insertable" on public.student_answers
  for insert with check (user_id = auth.uid());

create policy "own answers updatable" on public.student_answers
  for update using (user_id = auth.uid());

create index student_answers_user_unit_idx on public.student_answers (user_id, unit_slug);
