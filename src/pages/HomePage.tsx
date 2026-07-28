import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { UNIT_META, LEVEL_LABELS, LEVEL_ORDER } from '../data/units'

export default function HomePage() {
  const { user, signOut } = useAuth()
  const [isTeacher, setIsTeacher] = useState(false)
  const [completedCounts, setCompletedCounts] = useState<Record<string, number>>({})

  useEffect(() => {
    if (!user) return
    supabase.from('profiles').select('role').eq('id', user.id).single()
      .then(({ data }) => { if (data?.role === 'teacher') setIsTeacher(true) })
  }, [user])

  useEffect(() => {
    if (!user) return
    supabase
      .from('student_answers')
      .select('unit_slug')
      .eq('user_id', user.id)
      .then(({ data, error }) => {
        if (error) { console.error('Failed to load progress:', error.message); return }
        const counts: Record<string, number> = {}
        for (const row of (data ?? []) as { unit_slug: string }[]) {
          counts[row.unit_slug] = (counts[row.unit_slug] ?? 0) + 1
        }
        setCompletedCounts(counts)
      })
  }, [user])

  // Progress made before answer history existed only lives in localStorage —
  // treat it as a floor so students who already got ahead don't see 0%.
  function getProgress(slug: string) {
    const saved = localStorage.getItem(`progress:${slug}`)
    const legacy = saved ? parseInt(saved, 10) : 0
    return Math.max(completedCounts[slug] ?? 0, isNaN(legacy) ? 0 : legacy)
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

      <main className="max-w-xl mx-auto px-4 py-8 space-y-8">
        <p className="text-sm text-slate-500">Welcome back, {user?.email}</p>

        {LEVEL_ORDER.map(level => {
          const units = UNIT_META.filter(u => u.level === level)
          if (units.length === 0) return null
          return (
            <div key={level} className="space-y-3">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400">{LEVEL_LABELS[level]}</h2>
              <div className="space-y-4">
                {units.map(u => {
                  const step = getProgress(u.slug)
                  const pct = Math.round((step / u.total) * 100)
                  return (
                    <div key={u.slug} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-teal-300 transition-colors">
                      <Link to={`/unit/${u.slug}`} className="block p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-bold text-slate-900 text-base">{u.title}</h3>
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
                          {step === 0 ? '▶ Start unit' : step >= u.total ? '✓ Completed — view tasks' : `▶ Continue — ${step} of ${u.total} done`}
                        </p>
                      </Link>
                      {isTeacher && (
                        <Link
                          to={`/admin/content/${u.slug}`}
                          className="block px-5 py-2 border-t border-slate-100 text-xs text-teal-600 hover:text-teal-800 font-medium"
                        >
                          ✏️ Edit texts
                        </Link>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </main>
    </div>
  )
}
