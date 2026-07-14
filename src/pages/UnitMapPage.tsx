import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import unit11 from '../data/unit11'
import type { Unit } from '../types'
import ExerciseReview from '../components/ExerciseReview'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

const UNITS: Record<string, Unit> = { 'unit11-scott': unit11 }

interface Attempt {
  step_id: string
  answers: unknown
  score: number | null
  submitted_at: string
}

const KIND_ICON: Record<string, string> = {
  info: '📖',
  mcq: '☑️',
  gapFill: '✏️',
  qa: '💬',
  wordBank: '🔤',
  noticeListen: '👂',
}

export default function UnitMapPage() {
  const { slug } = useParams<{ slug: string }>()
  const unit = slug ? UNITS[slug] : null
  const { user } = useAuth()
  const navigate = useNavigate()

  const [attempts, setAttempts] = useState<Record<string, Attempt>>({})
  const [loaded, setLoaded] = useState(false)
  const [openStepId, setOpenStepId] = useState<string | null>(null)

  useEffect(() => {
    if (!user || !slug) return
    supabase
      .from('student_answers')
      .select('step_id, answers, score, submitted_at')
      .eq('user_id', user.id)
      .eq('unit_slug', slug)
      .then(({ data, error }) => {
        if (error) { console.error('Failed to load progress:', error.message); return }
        const byStep: Record<string, Attempt> = {}
        for (const row of (data ?? []) as Attempt[]) byStep[row.step_id] = row
        setAttempts(byStep)
        setLoaded(true)
      })
  }, [user, slug])

  if (!unit) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Unit not found. <Link to="/" className="ml-2 text-teal-600 underline">Go home</Link>
      </div>
    )
  }

  // The next unattempted step, in order, is the only "future" step unlocked for now.
  const unlockedIndex = unit.steps.findIndex(s => !attempts[s.id])
  const completedCount = unlockedIndex === -1 ? unit.steps.length : unlockedIndex

  // Group steps by section while keeping their overall index.
  const sections: { label: string; steps: { step: typeof unit.steps[number]; index: number }[] }[] = []
  unit.steps.forEach((step, index) => {
    let section = sections.find(s => s.label === step.sectionLabel)
    if (!section) { section = { label: step.sectionLabel, steps: [] }; sections.push(section) }
    section.steps.push({ step, index })
  })

  function nodeStatus(index: number): 'done' | 'current' | 'locked' {
    if (unlockedIndex === -1 || index < unlockedIndex) return 'done'
    if (index === unlockedIndex) return 'current'
    return 'locked'
  }

  function handleNodeClick(stepId: string, index: number) {
    const status = nodeStatus(index)
    if (status === 'locked') return
    if (status === 'current') {
      navigate(`/unit/${slug}/play?step=${index}`)
      return
    }
    setOpenStepId(openStepId === stepId ? null : stepId)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3">
        <Link to="/" className="text-slate-400 hover:text-slate-600 text-sm shrink-0">← Units</Link>
        <div className="flex-1 min-w-0">
          <span className="text-sm font-medium text-slate-700 truncate block">{unit.title}</span>
        </div>
        <Link
          to={`/unit/${slug}/reference`}
          className="text-xs text-slate-400 hover:text-teal-600 shrink-0"
          title="Transcript & Glossary"
        >
          📄
        </Link>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 pb-16">
        <div className="mb-6">
          <h1 className="text-lg font-bold text-slate-900">{unit.title}</h1>
          <p className="text-sm text-slate-500">{unit.subtitle}</p>
          <p className="mt-2 text-sm text-teal-700 font-medium">
            {completedCount} / {unit.steps.length} tasks completed
          </p>
          <div className="mt-2 h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-teal-500 rounded-full transition-all duration-300"
              style={{ width: `${Math.round((completedCount / unit.steps.length) * 100)}%` }}
            />
          </div>
        </div>

        {!loaded ? (
          <p className="text-sm text-slate-400">Loading your progress…</p>
        ) : (
          <div className="space-y-6">
            {sections.map(section => (
              <div key={section.label}>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">{section.label}</p>
                <div className="flex flex-wrap gap-3">
                  {section.steps.map(({ step, index }) => {
                    const status = nodeStatus(index)
                    const attempt = attempts[step.id]
                    return (
                      <button
                        key={step.id}
                        onClick={() => handleNodeClick(step.id, index)}
                        disabled={status === 'locked'}
                        title={status === 'locked' ? 'Complete previous tasks first' : step.part}
                        className={[
                          'w-16 h-16 rounded-2xl flex flex-col items-center justify-center gap-0.5 border-2 transition-colors shrink-0',
                          status === 'done' && 'bg-green-50 border-green-400 text-green-700 hover:bg-green-100 cursor-pointer',
                          status === 'current' && 'bg-teal-600 border-teal-600 text-white shadow-md cursor-pointer animate-pulse',
                          status === 'locked' && 'bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed',
                        ].filter(Boolean).join(' ')}
                      >
                        {status === 'locked' ? (
                          <span className="text-lg">🔒</span>
                        ) : (
                          <span className="text-lg">{KIND_ICON[step.kind] ?? '•'}</span>
                        )}
                        <span className="text-[10px] font-semibold">
                          {status === 'done'
                            ? (attempt?.score !== null && attempt?.score !== undefined ? `${Math.round(attempt.score * 100)}%` : '✓')
                            : `#${index + 1}`}
                        </span>
                      </button>
                    )
                  })}
                </div>

                {section.steps.map(({ step, index }) => (
                  openStepId === step.id && nodeStatus(index) === 'done' && (
                    <div key={step.id} className="mt-3 bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
                      <p className="text-sm font-semibold text-slate-800 mb-3">{step.part}</p>
                      <ExerciseReview step={step} attempt={attempts[step.id]} />
                    </div>
                  )
                ))}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
