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

## ⬜ Stage 2 — Listening exercise (core)
- [ ] Load a module's listening exercise from Supabase
- [ ] Audio player: play/pause, **replay the phrase**, **slow-down (0.75× / 0.5×)**
- [ ] Both gap formats: selected blanks + full dictation
- [ ] Answer checking with spelling highlighting + first-attempt tracking
- [ ] Decoding feedback: correct text + connected-speech feature label (+ IPA if present)
- [ ] Seed with **Margarita's first real audio + transcript**
- **Test:** complete the exercise end-to-end with the real clip
- **Commit:** listening exercise

## ⬜ Stage 3 — Levels, modules & navigation
- [ ] 3 levels (Easy/Medium/Difficult), 1 module each
- [ ] Browse level → module → exercise
- [ ] Student progress as % (module + level), first-attempt rate
- **Test:** navigate the full structure as a student
- **Commit:** navigation + progress

## ⬜ Stage 4 — Teacher dashboard
- [ ] Teacher sees all students' progress (%, first-attempt, weak features)
- **Test:** view dashboard as teacher
- **Commit:** teacher dashboard

## 🔄 Stage 5 — Deploy to Railway
- [x] Railway-ready config: `start` script (serve dist), Node pin, `railway.json`
- [x] Verified production build + SPA serving locally
- [ ] Connect GitHub repo to Railway + set env vars (needs Margarita's Railway account)
- [ ] Confirm live URL loads
- **Commit:** deploy config

---

## Later (not now)
- Vocabulary & grammar exercises (matching, gap-fill, MCQ, flashcards)
- Richer analytics (group weak-spot analysis)
- Content admin panel (so Margarita adds audio without a developer)
- Phonemic (IPA) auto-generation; spaced repetition
