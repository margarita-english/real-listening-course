-- Info cards and notice-and-listen steps have no student answer to record,
-- only that the student viewed them — so `answers` must allow null.
alter table public.student_answers alter column answers drop not null;
