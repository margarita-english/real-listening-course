import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

const UNITS = [
  { slug: 'unit11-scott', title: 'Unit 11 — Scott', subtitle: 'A Place I Know Well', total: 22 },
]

export default function HomePage() {
  const { user, signOut } = useAuth()
  const [isTeacher, setIsTeacher] = useState(false)

  useEffect(() => {
    if (!user) return
    supabase.from('profiles').select('role').eq('id', user.id).single()
      .then(({ data }) => { if (data?.role === 'teacher') setIsTeacher(true) })
  }, [user])

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
        <div className="flex items-center gap-3">
          {isTeacher && (
            <Link to="/admin" className="text-xs text-teal-600 hover:text-teal-800 font-medium">
              👩‍🏫 Students
            </Link>
          )}
          <button onClick={signOut} className="text-xs text-slate-400 hover:text-slate-600">Sign out</button>
        </div>
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
