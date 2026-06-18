# MORE English — Real Listening Course

A web platform that trains adult ESL students to **decode connected speech** (elisions, linking, glottal stops, weak forms). Students listen to audio and type what they hear; feedback highlights spelling and teaches the pronunciation feature.

- **Stack:** React + TypeScript + Vite, Tailwind CSS, Supabase (Postgres / Auth / Storage)
- **Deploy:** Railway (auto-deploy from this GitHub repo)
- **Spec & roadmap:** see [`ROADMAP.md`](./ROADMAP.md)

## Local development

```bash
npm install
cp .env.example .env   # then fill in the Supabase keys
npm run dev
```

The app runs at the URL Vite prints (default http://localhost:5173). When configured correctly the landing page shows "✓ Supabase connected".

## Environment variables

| Name | Description |
|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable (anon) key |

Set the same variables in Railway for deployment. Never commit `.env`.
