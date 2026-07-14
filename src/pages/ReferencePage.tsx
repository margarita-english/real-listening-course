import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import unit11 from '../data/unit11'
import type { Unit } from '../types'
import AudioPlayer from '../components/AudioPlayer'
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

export default function ReferencePage() {
  const { slug } = useParams<{ slug: string }>()
  const unit = slug ? UNITS[slug] : null
  const { user } = useAuth()
  const [tab, setTab] = useState<'exercises' | 'transcript' | 'glossary'>('exercises')
  const [attempts, setAttempts] = useState<Record<string, Attempt>>({})
  const [openStepId, setOpenStepId] = useState<string | null>(null)

  useEffect(() => {
    if (!user || !slug) return
    supabase
      .from('student_answers')
      .select('step_id, answers, score, submitted_at')
      .eq('user_id', user.id)
      .eq('unit_slug', slug)
      .then(({ data, error }) => {
        if (error) { console.error('Failed to load past answers:', error.message); return }
        const byStep: Record<string, Attempt> = {}
        for (const row of (data ?? []) as Attempt[]) byStep[row.step_id] = row
        setAttempts(byStep)
      })
  }, [user, slug])

  if (!unit) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Unit not found. <Link to="/" className="ml-2 text-teal-600 underline">Go home</Link>
      </div>
    )
  }

  // Progress made before answer history existed only lives in localStorage —
  // treat those steps as completed too, so they don't wrongly show "not attempted".
  const legacyCount = (() => {
    if (!slug) return 0
    const saved = localStorage.getItem(`progress:${slug}`)
    const n = saved ? parseInt(saved, 10) : 0
    return isNaN(n) ? 0 : Math.min(n, unit.steps.length)
  })()
  const completedCount = Math.max(Object.keys(attempts).length, legacyCount)

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3">
        <Link to={`/unit/${slug}`} className="text-slate-400 hover:text-slate-600 text-sm shrink-0">← Back to unit</Link>
        <span className="text-sm font-medium text-slate-700 flex-1 truncate">{unit.title} — Reference</span>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-5">
          {(['exercises', 'transcript', 'glossary'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={[
                'px-4 py-2 rounded-xl text-sm font-medium transition-colors',
                tab === t ? 'bg-teal-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50',
              ].join(' ')}
            >
              {t === 'exercises' ? '✅ My Exercises' : t === 'transcript' ? '🎙 Transcript' : '📚 Words & Phrases'}
            </button>
          ))}
        </div>

        {tab === 'exercises' && (
          <div className="space-y-3">
            <p className="text-sm text-slate-500">
              {completedCount} / {unit.steps.length} exercises completed
            </p>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100">
              {unit.steps.map((step, i) => {
                const attempt = attempts[step.id]
                const isLegacyDone = !attempt && i < legacyCount
                const isOpen = openStepId === step.id
                return (
                  <div key={step.id}>
                    <button
                      onClick={() => setOpenStepId(isOpen ? null : step.id)}
                      className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-slate-50 transition-colors"
                    >
                      <span className="text-sm text-slate-700 min-w-0 truncate">
                        <span className="text-slate-400 mr-2">{i + 1}.</span>
                        {step.part}
                      </span>
                      <span className="shrink-0 text-xs">
                        {!attempt && !isLegacyDone ? (
                          <span className="text-slate-300">not attempted</span>
                        ) : attempt?.score == null ? (
                          <span className="text-slate-400">✓ viewed</span>
                        ) : (
                          <span className={attempt.score >= 0.5 ? 'text-green-600 font-medium' : 'text-red-500 font-medium'}>
                            {Math.round(attempt.score * 100)}%
                          </span>
                        )}
                        <span className="ml-2 text-slate-300">{isOpen ? '▲' : '▼'}</span>
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4">
                        {attempt ? (
                          <ExerciseReview step={step} attempt={attempt} />
                        ) : isLegacyDone ? (
                          <p className="text-sm text-slate-400 italic">
                            You completed this before answer history was added, so there's nothing saved to show here.
                          </p>
                        ) : (
                          <ExerciseReview step={step} attempt={attempt} />
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {tab === 'transcript' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100">
            <div className="px-4 py-3 bg-slate-50 rounded-t-2xl space-y-2">
              {unit.transcriptAudioFile && (
                <AudioPlayer src={`/audio/${unit.transcriptAudioFile}`} label="Full transcript" />
              )}
              <p className="text-xs text-slate-500">
                <strong>I</strong> = Interviewer &nbsp;|&nbsp; <strong>S</strong> = Scott
              </p>
            </div>
            {unit.transcript.map((line, i) => (
              <div key={i} className="flex gap-3 px-4 py-3">
                <span className={`shrink-0 font-bold text-sm w-4 ${line.speaker === 'S' ? 'text-teal-600' : 'text-slate-400'}`}>
                  {line.speaker}:
                </span>
                <p className="text-sm text-slate-700 leading-relaxed">{line.text}</p>
              </div>
            ))}
          </div>
        )}

        {tab === 'glossary' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100">
            {unit.glossary.map(entry => (
              <div key={entry.number} className="flex gap-3 px-4 py-3">
                <span className="shrink-0 text-xs font-semibold text-teal-600 w-5 pt-0.5">{entry.number}</span>
                <div>
                  <span className="font-semibold text-sm text-slate-800">{entry.term}</span>
                  <span className="text-slate-400 text-sm mx-1">—</span>
                  <span className="text-sm text-slate-600">{entry.definition}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
