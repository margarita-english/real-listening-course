import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { UNIT_META } from '../data/units'

interface Student {
  id: string
  full_name: string | null
  native_language: string | null
  created_at: string
  email?: string
}

interface Attempt {
  user_id: string
  unit_slug: string
  step_id: string
  score: number | null
}

interface UnitProgress {
  slug: string
  title: string
  completed: number
  total: number
  avgScore: number | null
}

export default function AdminPage() {
  const { signOut } = useAuth()
  const [students, setStudents] = useState<Student[]>([])
  const [progress, setProgress] = useState<Record<string, UnitProgress[]>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    supabase
      .from('profiles')
      .select('id, full_name, native_language, created_at')
      .eq('role', 'student')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) setError(error.message)
        else setStudents(data ?? [])
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    supabase
      .from('student_answers')
      .select('user_id, unit_slug, step_id, score')
      .then(({ data, error }) => {
        if (error) { console.error('Failed to load student progress:', error.message); return }

        // studentId -> unitSlug -> { steps: Set<stepId>, scores: number[] }
        const byStudent = new Map<string, Map<string, { steps: Set<string>; scores: number[] }>>()
        for (const row of (data ?? []) as Attempt[]) {
          if (!byStudent.has(row.user_id)) byStudent.set(row.user_id, new Map())
          const units = byStudent.get(row.user_id)!
          if (!units.has(row.unit_slug)) units.set(row.unit_slug, { steps: new Set(), scores: [] })
          const entry = units.get(row.unit_slug)!
          entry.steps.add(row.step_id)
          if (row.score !== null) entry.scores.push(row.score)
        }

        const result: Record<string, UnitProgress[]> = {}
        for (const [userId, units] of byStudent) {
          result[userId] = [...units.entries()]
            .map(([slug, entry]) => {
              const meta = UNIT_META.find(u => u.slug === slug)
              return {
                slug,
                title: meta?.title ?? slug,
                completed: entry.steps.size,
                total: meta?.total ?? entry.steps.size,
                avgScore: entry.scores.length > 0 ? entry.scores.reduce((a, b) => a + b, 0) / entry.scores.length : null,
              }
            })
            .sort((a, b) => a.title.localeCompare(b.title))
        }
        setProgress(result)
      })
  }, [])

  const langLabel: Record<string, string> = { ru: '🇷🇺 Russian', es: '🇪🇸 Spanish', en: '🇬🇧 English' }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-4 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-600">MORE English · Teacher</p>
          <h1 className="text-lg font-bold text-slate-900">Student accounts</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/" className="text-xs text-slate-500 hover:text-slate-700">← Units</Link>
          <button onClick={signOut} className="text-xs text-slate-400 hover:text-slate-600">Sign out</button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">

        {/* Info box */}
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 text-sm text-teal-800 space-y-1">
          <p className="font-semibold">How students get access</p>
          <p>Students register themselves at <strong>/signup</strong> with their email and a password they choose. Supabase sends them a confirmation email — their account activates when they click the link.</p>
          <p className="mt-2">🔒 Passwords are stored by Supabase using <strong>bcrypt</strong> — they are never visible to you, to us, or stored in plain text anywhere.</p>
        </div>

        {/* Student list */}
        {loading && <p className="text-sm text-slate-400">Loading students…</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}

        {!loading && students.length === 0 && (
          <p className="text-sm text-slate-500">No students yet. Share the signup link with your students.</p>
        )}

        {students.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100">
            <div className="px-4 py-2 bg-slate-50 rounded-t-2xl">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{students.length} student{students.length !== 1 ? 's' : ''}</p>
            </div>
            {students.map(s => {
              const units = progress[s.id] ?? []
              return (
                <div key={s.id} className="px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-800">{s.full_name ?? '(no name)'}</p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {s.native_language ? langLabel[s.native_language] ?? s.native_language : '—'}
                        &ensp;·&ensp;Joined {new Date(s.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  </div>

                  {units.length === 0 ? (
                    <p className="text-xs text-slate-400 italic mt-2">No progress yet</p>
                  ) : (
                    <div className="mt-2.5 space-y-2">
                      {units.map(u => {
                        const pct = Math.round((u.completed / u.total) * 100)
                        return (
                          <div key={u.slug}>
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="text-slate-600 font-medium">{u.title}</span>
                              <span className="text-slate-500 shrink-0 ml-2">
                                {u.completed}/{u.total} · {pct}%
                                {u.avgScore !== null && (
                                  <span className="text-teal-600 font-medium">
                                    &ensp;·&ensp;{Math.round(u.avgScore * 100)}% avg score
                                  </span>
                                )}
                              </span>
                            </div>
                            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-teal-500 rounded-full" style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Share link */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2">
          <p className="text-sm font-medium text-slate-700">Student signup link</p>
          <p className="text-xs text-slate-500">Send this to your students so they can create their own account:</p>
          <div className="flex items-center gap-2">
            <code className="flex-1 text-xs bg-slate-50 border border-slate-200 rounded px-3 py-2 break-all text-slate-600">
              {window.location.origin}/signup
            </code>
            <button
              onClick={() => navigator.clipboard.writeText(`${window.location.origin}/signup`)}
              className="shrink-0 text-xs px-3 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
            >
              Copy
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
