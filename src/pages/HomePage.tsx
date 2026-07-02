import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const UNITS = [
  { slug: 'unit11-scott', title: 'Unit 11 — Scott', subtitle: 'A Place I Know Well', total: 21 },
]

export default function HomePage() {
  const { user, signOut } = useAuth()

  function getProgress(slug: string) {
    const saved = localStorage.getItem(`progress:${slug}`)
    return saved ? parseInt(saved, 10) : 0
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-4 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-600">MORE English</p>
          <h1 className="text-lg font-bold text-slate-900">Real Listening Course</h1>
        </div>
        <button
          onClick={signOut}
          className="text-xs text-slate-400 hover:text-slate-600"
        >
          Sign out
        </button>
      </header>

      <main className="max-w-xl mx-auto px-4 py-8 space-y-4">
        <p className="text-sm text-slate-500">Welcome back, {user?.email}</p>

        {UNITS.map(u => {
          const step = getProgress(u.slug)
          const pct = Math.round((step / u.total) * 100)
          return (
            <Link
              key={u.slug}
              to={`/unit/${u.slug}`}
              className="block bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:border-teal-300 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-bold text-slate-900 text-base">{u.title}</h2>
                  <p className="text-sm text-slate-500 mt-0.5">{u.subtitle}</p>
                </div>
                {step > 0 && (
                  <span className="shrink-0 text-xs font-semibold text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-full">
                    {pct}%
                  </span>
                )}
              </div>

              {step > 0 && (
                <div className="mt-3 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-500 rounded-full" style={{ width: `${pct}%` }} />
                </div>
              )}

              <p className="mt-3 text-xs text-teal-600 font-medium">
                {step === 0 ? '▶ Start unit' : step >= u.total ? '✓ Completed' : `▶ Continue — step ${step + 1} of ${u.total}`}
              </p>
            </Link>
          )
        })}
      </main>
    </div>
  )
}
