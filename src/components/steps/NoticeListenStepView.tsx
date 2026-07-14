import { useState } from 'react'
import type { NoticeListenStep, StepAttemptPayload } from '../../types'
import AudioPlayer from '../AudioPlayer'

interface Props {
  step: NoticeListenStep
  onComplete: (payload: StepAttemptPayload) => void
}

export default function NoticeListenStepView({ step, onComplete }: Props) {
  const [revealed, setRevealed] = useState(false)

  return (
    <div className="space-y-4">
      {step.audioFile && (
        <AudioPlayer src={`/audio/${step.audioFile}`} label={step.audioLabel} />
      )}

      <p className="text-slate-600 text-sm leading-relaxed">{step.instruction}</p>

      <div
        className="text-slate-600 text-sm leading-relaxed whitespace-pre-line bg-slate-50 rounded-xl p-4 border border-slate-200"
        dangerouslySetInnerHTML={{ __html: step.intro }}
      />

      <ol className="space-y-2">
        {step.items.map(item => (
          <li key={item.number} className="flex gap-2 text-sm text-slate-800">
            <span className="shrink-0 font-medium text-slate-500 w-5 text-right">{item.number}.</span>
            <span className="italic leading-relaxed" dangerouslySetInnerHTML={{ __html: item.text }} />
          </li>
        ))}
      </ol>

      {step.revealContent && !revealed && (
        <button
          onClick={() => setRevealed(true)}
          className="w-full py-2 border border-teal-300 text-teal-700 hover:bg-teal-50 font-medium rounded-xl text-sm transition-colors"
        >
          {step.revealLabel ?? 'Show answers'}
        </button>
      )}

      {revealed && step.revealContent && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-600 mb-2">Answers</p>
          <div
            className="text-sm text-slate-700 leading-relaxed whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: step.revealContent }}
          />
        </div>
      )}

      <button
        onClick={() => onComplete({ answers: null, score: null })}
        className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-sm transition-colors"
      >
        Continue →
      </button>
    </div>
  )
}
