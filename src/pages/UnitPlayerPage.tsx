import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import unit11 from '../data/unit11'
import type { StepAttemptPayload, Unit } from '../types'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import InfoCard from '../components/steps/InfoCard'
import McqStepView from '../components/steps/McqStepView'
import GapFillStepView from '../components/steps/GapFillStepView'
import QaStepView from '../components/steps/QaStepView'
import WordBankStepView from '../components/steps/WordBankStepView'
import NoticeListenStepView from '../components/steps/NoticeListenStepView'

const UNITS: Record<string, Unit> = {
  'unit11-scott': unit11,
}

const STORAGE_KEY = (slug: string) => `progress:${slug}`

export default function UnitPlayerPage() {
  const { slug } = useParams<{ slug: string }>()
  const unit = slug ? UNITS[slug] : null
  const { user } = useAuth()

  const [stepIndex, setStepIndex] = useState(0)
  const [finished, setFinished] = useState(false)

  // Restore saved progress
  useEffect(() => {
    if (!slug) return
    const saved = localStorage.getItem(STORAGE_KEY(slug))
    if (saved) {
      const n = parseInt(saved, 10)
      if (!isNaN(n) && n < (unit?.steps.length ?? 0)) setStepIndex(n)
    }
  }, [slug])

  if (!unit) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Unit not found. <Link to="/" className="ml-2 text-teal-600 underline">Go home</Link>
      </div>
    )
  }

  function advance(payload: StepAttemptPayload) {
    if (!slug) return

    if (user) {
      supabase
        .from('student_answers')
        .upsert(
          {
            user_id: user.id,
            unit_slug: slug,
            step_id: step.id,
            answers: payload.answers,
            score: payload.score,
            submitted_at: new Date().toISOString(),
          },
          { onConflict: 'user_id,unit_slug,step_id' },
        )
        .then(({ error }) => {
          if (error) console.error('Failed to save answer:', error.message)
        })
    }

    const next = stepIndex + 1
    if (next >= unit!.steps.length) {
      localStorage.removeItem(STORAGE_KEY(slug))
      setFinished(true)
    } else {
      localStorage.setItem(STORAGE_KEY(slug), String(next))
      setStepIndex(next)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  if (finished) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="text-5xl">🎉</div>
          <h2 className="text-2xl font-bold text-slate-900">Unit complete!</h2>
          <p className="text-slate-500 text-sm">You've finished all exercises in <strong>{unit.title}</strong>.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              to={`/unit/${slug}/reference`}
              className="px-4 py-2 border border-teal-300 text-teal-700 rounded-xl text-sm font-medium hover:bg-teal-50"
            >
              📄 Transcript &amp; Glossary
            </Link>
            <Link to="/" className="px-4 py-2 bg-teal-600 text-white rounded-xl text-sm font-semibold hover:bg-teal-700">
              Back to units
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const step = unit.steps[stepIndex]
  const progress = Math.round(((stepIndex) / unit.steps.length) * 100)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <header className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3">
        <Link to="/" className="text-slate-400 hover:text-slate-600 text-sm shrink-0">← Units</Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-slate-400 truncate">{unit.title}</span>
            <span className="text-xs text-slate-400 shrink-0 ml-2">{stepIndex + 1} / {unit.steps.length}</span>
          </div>
          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-teal-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <Link
          to={`/unit/${slug}/reference`}
          className="text-xs text-slate-400 hover:text-teal-600 shrink-0"
          title="Transcript & Glossary"
        >
          📄
        </Link>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-4 py-6 pb-16">
        {/* Section + part label */}
        <div className="mb-4">
          <span className="inline-block bg-teal-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-2">
            {step.sectionLabel}
          </span>
          <h2 className="text-lg font-bold text-slate-900">{step.part}</h2>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          {step.kind === 'info'         && <InfoCard               step={step} onComplete={advance} />}
          {step.kind === 'mcq'          && <McqStepView            step={step} onComplete={advance} />}
          {step.kind === 'gapFill'      && <GapFillStepView        step={step} onComplete={advance} />}
          {step.kind === 'qa'           && <QaStepView             step={step} onComplete={advance} />}
          {step.kind === 'wordBank'     && <WordBankStepView       step={step} onComplete={advance} />}
          {step.kind === 'noticeListen' && <NoticeListenStepView   step={step} onComplete={advance} />}
        </div>
      </main>
    </div>
  )
}
