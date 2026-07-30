# Roadmap — MORE English Real Listening Course

Build order. Each stage ends with a **test/verification** (run the app and confirm it works) and a **commit + push**. We keep things simple and don't over-build.

Full product spec: `~/Desktop/AI Projects/Listening Course Platform/more-english-listening-platform-spec.md`

---

## ✅ Stage 0 — Project skeleton
- [x] Clone GitHub repo `margarita-english/real-listening-course`
- [x] Scaffold React + TypeScript + Vite app
- [x] Add Tailwind CSS
- [x] Add Supabase client + `.env` wiring (project `more-english-listening`)
- [x] Landing page that confirms the Supabase connection
- [x] `ROADMAP.md`
- **Test:** app runs locally and shows "✓ Supabase connected"
- **Commit:** initial project skeleton

## ✅ Stage 1 — Database schema + auth
- [x] Create tables: levels, modules, exercises, audio_clips, segments, gaps, features, profiles, attempts
- [x] Row Level Security (students see only their own data; teacher sees all)
- [x] Create a teacher login (Margarita) + one demo student login
- **Test:** ✓ both accounts log in; ✓ student sees only own profile, teacher sees all (RLS verified); ✓ security advisor clean of errors
- **Commit:** database schema + auth

## ✅ Stage 2 — Unit 11 (Scott) — full digitised unit
- [x] Login page (email + password via Supabase Auth) + auth guard
- [x] Home page — unit list with progress bar (localStorage)
- [x] **Unit 11 "Scott" fully digitised** (22 steps from the PDF):
  - Section 1: Pre-Listening — MCQ, Discussion info card, Normalisation gap-fill (track 176)
  - Section 2: Listening Comprehension — Q&A (tracks 177,179,181) + Gap-fill (tracks 178,180,182)
  - Section 3: Language Points — grammar info cards, Australian accent notice-listen (tracks 183,184)
  - Section 4: Further Listening — sentence stress (185), linking (186/187), elision gap-fill (188)
  - Section 5: Language Development — extension word bank, phrasal verbs, colloquial English
- [x] Audio player: play/pause, replay, 0.75×/0.5× slowdown; placeholder shown when file missing
- [x] Auto-advance: each step requires completion before Continue is enabled
- [x] Inline answer checking with colour feedback for gap-fill + MCQ; model answers for Q&A
- [x] Transcript (Part 6) + Glossary (Part 7) on separate /reference route (📄 icon in header)
- [x] Progress saved in localStorage; restores on reload
- [x] **Audio files added** — `public/audio/unit11/176.mp3` … `189.mp3`, all wired into steps (187 is its own "Linking (continued)" step; 189 plays on the Reference/Transcript page)
- [ ] Migration `0003_unit_progress.sql` ready — apply once Supabase project is reactivated
- **Test:** build passes ✓; login → home → unit → steps → transcript/glossary all navigate correctly
- **Commit:** Stage 2 — Unit 11 full digitised unit

## 🟡 Stage 3 — Levels & navigation (in progress)
- [x] 3 levels (Elementary/Intermediate/Advanced) — home page groups units by level via `src/data/units.ts`
- [x] Unit 11 (Scott) = Advanced; **Unit 1 "Jackie" digitised = Elementary** (22 steps, 30 tracks, from "Real Listening — Elementary")
- [ ] Intermediate level — no unit yet
- [ ] Modules within a level (currently each level is just a flat list of units)
- [ ] First-attempt rate in progress tracking (currently just % complete)
- **Test:** ✓ navigated the full Unit 1 structure as a student; home page correctly groups by level
- **Commit:** ✓ "Add level differentiation... and Unit 1 Jackie"

## 🟡 Stage 4 — Teacher dashboard (in progress)
- [x] Teacher sees all students' progress — per unit, completed/total steps + % + average score, on `/admin`
- [ ] First-attempt rate
- [ ] Weak-feature analysis (which connected-speech features a student struggles with)
- **Test:** ✓ viewed dashboard as teacher against real student data (4 students)
- **Commit:** ✓ "Show per-student progress on the teacher dashboard"

## ✅ Stage 5 — Deploy to Railway
- [x] Railway-ready config: `start` script (serve dist on 0.0.0.0:3000), Node pin, `railway.json`
- [x] Verified production build + SPA serving locally
- [x] Connected GitHub repo to Railway (project `tender-stillness`) + env vars set
- [x] Live URL confirmed: https://real-listening-course-production.up.railway.app
- **Test:** ✓ homepage 200, ✓ Supabase URL + key baked into build, ✓ SPA routing works
- **Note:** auto-deploys on every push to `main`. Custom domain (course.more-idiomas.com) can be added later for resilience.

---

## Later (not now)
- Vocabulary & grammar exercises (matching, gap-fill, MCQ, flashcards)
- Richer analytics (group weak-spot analysis)
- Phonemic (IPA) auto-generation; spaced repetition

## Done, not originally staged
- ✅ Content admin panel — teacher can edit exercise instruction text + info-card
  paragraphs at `/admin/content/:slug` without a developer (`step_overrides` table)
