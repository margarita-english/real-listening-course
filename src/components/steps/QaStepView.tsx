import { useState } from 'react'
import type { QaStep } from '../../types'
import AudioPlayer from '../AudioPlayer'

interface Props {
  step: QaStep
  onComplete: () => void
}

export default function QaStepView({ step, onComplete }: Props) {
  const [answers, setAnswers] = useState<string[]>(step.questions.map(() => ''))
  const [submitted, setSubmitted] = useState(false)

  const allFilled = answers.every(a => a.trim() !== '')

  return (
    <div className="space-y-4">
      {step.audioFile && (
        <AudioPlayer src={`/audio/${step.audioFile}`} label={step.audioLabel} />
      )}

      <p className="text-slate-600 text-sm leading-relaxed">{step.instruction}</p>

      <div className="space-y-4">
        {step.questions.map((q, i) => (
          <div key={q.number}>
            <p className="text-sm font-medium text-slate-800 mb-1">
              {q.number}.&nbsp;{q.question}
            </p>
            {!submitted ? (
              <textarea
                rows={2}
                value={answers[i]}
                onChange={e => setAnswers(prev => prev.map((v, idx) => idx === i ? e.target.value : v))}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none"
                placeholder="Your answer…"
              />
            ) : (
              <div className="space-y-1.5">
                <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700">
                  <span className="text-slate-400 text-xs font-medium uppercase tracking-wide block mb-0.5">Your answer</span>
                  {answers[i] || <em className="text-slate-400">left blank</em>}
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2 text-sm text-green-800">
                  <span className="text-green-600 text-xs font-medium uppercase tracking-wide block mb-0.5">Model answer</span>
                  {q.modelAnswer}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {!submitted ? (
        <button
          disabled={!allFilled}
          onClick={() => setSubmitted(true)}
          className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 disabled:opacity-40 text-white font-semibold rounded-xl text-sm transition-colors"
        >
          Submit &amp; see answers
        </button>
      ) : (
        <button
          onClick={onComplete}
          className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-sm transition-colors"
        >
          Continue →
        </button>
      )}
    </div>
  )
}
