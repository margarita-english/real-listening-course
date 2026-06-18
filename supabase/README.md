# Supabase — database

Project: **more-english-listening** (ref `xcqgilvzdcggbqhoqvyk`).

`migrations/` holds the SQL that defines the database, applied in order:

1. `0001_stage1_core_schema.sql` — tables (profiles, levels, modules, exercises, audio_clips, segments, gaps, features, segment_features, attempts), the `is_teacher()` helper, the new-user trigger, and Row Level Security.
2. `0002_stage1_harden_function_grants.sql` — restrict the helper functions from public/anon access.

## Accounts

Two accounts were seeded for testing (see Stage 1). Passwords are **temporary** — change them after first login:

| Role | Email | Temp password |
|---|---|---|
| Teacher | margarita@more-idiomas.com | _(shared privately — change on first login)_ |
| Demo student | demo.student@more-english.com | _(shared privately — change on first login)_ |

New students are added by the teacher; a profile row is auto-created on signup and defaults to the `student` role.
