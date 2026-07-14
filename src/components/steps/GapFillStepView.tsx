import { useState, useRef } from 'react'
import type { GapFillStep, StepAttemptPayload } from '../../types'
import AudioPlayer from '../AudioPlayer'

interface Props {
  step: GapFillStep
  onComplete: (payload: StepAttemptPayload) => void
}

// Split sentence text on ___ into parts; render each gap as an input
function SentenceWithGaps({
  text,
  answers,
  values,
  checked,
  onChange,
}: {
  text: string
  answers: string[]
  values: string[]
  checked: boolean
  onChange: (idx: number, val: string) => void
}) {
  const parts = text.split('___')
  return (
    <span>
      {parts.map((part, i) => (
        <span key={i}>
          <span dangerouslySetInnerHTML={{ __html: part }} />
          {i < answers.length && (
            <input
              type="text"
              value={values[i] ?? ''}
              disabled={checked}
              onChange={e => onChange(i, e.target.value)}
              className={[
                'inline-block border-b-2 text-sm px-1 py-0 mx-0.5 w-20 focus:outline-none bg-transparent transition-colors',
                !checked
                  ? 'border-slate-400 focus:border-teal-500'
                  : values[i]?.toLowerCase().trim() === answers[i].toLowerCase()
                    ? 'border-green-500 text-green-700'
                    : 'border-red-400 text-red-600',
              ].join(' ')}
            />
          )}
        </span>
      ))}
    </span>
  )
}

export default function GapFillStepView({ step, onComplete }: Props) {
  // inputs[questionIndex][gapIndex] = typed value
  const [inputs, setInputs] = useState<string[][]>(
    step.questions.map(q => q.answers.map(() => ''))
  )
  const [checked, setChecked] = useState(false)
  const firstInputRef = useRef<HTMLInputElement>(null)

  const allFilled = inputs.every(row => row.every(v => v.trim() !== ''))

  function handleChange(qi: number, gi: number, val: string) {
    setInputs(prev => prev.map((row, ri) => ri === qi ? row.map((v, vi) => vi === gi ? val : v) : row))
  }

  function countCorrect() {
    return step.questions.reduce((sum, q, qi) =>
      sum + q.answers.filter((ans, gi) =>
        (inputs[qi][gi] ?? '').toLowerCase().trim() === ans.toLowerCase()
      ).length
    , 0)
  }

  const totalGaps = step.questions.reduce((s, q) => s + q.answers.length, 0)

  return (
    <div className="space-y-4">
      {step.audioFile && (
        <AudioPlayer src={`/audio/${step.audioFile}`} label={step.audioLabel} />
      )}

      <p className="text-slate-600 text-sm leading-relaxed">{step.instruction}</p>

      <div className="space-y-3" ref={firstInputRef as any}>
        {step.questions.map((q, qi) => (
          <div key={q.number} className="flex gap-2 text-sm text-slate-800">
            <span className="shrink-0 font-medium text-slate-500 w-5 text-right">{q.number}.</span>
            <span className="leading-7">
              <SentenceWithGaps
                text={q.text}
                answers={q.answers}
                values={inputs[qi]}
                checked={checked}
                onChange={(gi, val) => handleChange(qi, gi, val)}
              />
              {checked && inputs[qi].some((v, gi) => v.toLowerCase().trim() !== q.answers[gi].toLowerCase()) && (
                <span className="ml-2 text-xs text-slate-500">
                  ✓ <span className="text-green-700">{q.answers.join(' / ')}</span>
                </span>
              )}
            </span>
          </div>
        ))}
      </div>

      {!checked ? (
        <button
          disabled={!allFilled}
          onClick={() => setChecked(true)}
          className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 disabled:opacity-40 text-white font-semibold rounded-xl text-sm transition-colors"
        >
          Check answers
        </button>
      ) : (
        <div className="space-y-2">
          <p className="text-sm text-green-700 font-medium">
            ✓ {countCorrect()} / {totalGaps} correct
          </p>
          <button
            onClick={() => onComplete({ answers: inputs, score: countCorrect() / totalGaps })}
            className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-sm transition-colors"
          >
            Continue →
          </button>
        </div>
      )}
    </div>
  )
}
