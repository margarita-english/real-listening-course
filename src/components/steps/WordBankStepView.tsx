import { useState } from 'react'
import type { WordBankStep, StepAttemptPayload } from '../../types'
import AudioPlayer from '../AudioPlayer'

interface Props {
  step: WordBankStep
  onComplete: (payload: StepAttemptPayload) => void
}

export default function WordBankStepView({ step, onComplete }: Props) {
  const [inputs, setInputs] = useState<string[]>(step.questions.map(() => ''))
  const [checked, setChecked] = useState(false)

  const allFilled = inputs.every(v => v.trim() !== '')

  // For questions where answer contains ' / ' (two blanks), split into multiple inputs
  function isMulti(answer: string) { return answer.includes(' / ') }

  function isCorrect(qi: number) {
    const q = step.questions[qi]
    const input = inputs[qi].toLowerCase().trim()
    if (isMulti(q.answer)) {
      const parts = q.answer.split(' / ').map(s => s.toLowerCase().trim())
      return parts.every(p => input.includes(p))
    }
    return input === q.answer.toLowerCase()
  }

  const correct = step.questions.filter((_, qi) => isCorrect(qi)).length

  return (
    <div className="space-y-4">
      {step.audioFile && (
        <AudioPlayer src={`/audio/${step.audioFile}`} label={step.audioLabel} />
      )}

      <p className="text-slate-600 text-sm leading-relaxed">{step.instruction}</p>

      {/* Word bank */}
      <div className="flex flex-wrap gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl">
        {step.bank.map((w, i) => (
          <span key={i} className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-sm text-slate-700 font-medium shadow-sm">
            {w}
          </span>
        ))}
      </div>

      <div className="space-y-3">
        {step.questions.map((q, qi) => {
          const multi = isMulti(q.answer)
          return (
            <div key={q.number} className="flex gap-2 text-sm text-slate-800">
              <span className="shrink-0 font-medium text-slate-500 w-5 text-right pt-0.5">{q.number}.</span>
              <div className="flex-1">
                <span className="leading-7">
                  {q.text.split('___').map((part, pi) => (
                    <span key={pi}>
                      <span dangerouslySetInnerHTML={{ __html: part }} />
                      {pi === 0 && (
                        <input
                          type="text"
                          value={inputs[qi]}
                          disabled={checked}
                          onChange={e => setInputs(prev => prev.map((v, i) => i === qi ? e.target.value : v))}
                          className={[
                            'inline-block border-b-2 text-sm px-1 py-0 mx-0.5 focus:outline-none bg-transparent transition-colors',
                            multi ? 'w-32' : 'w-20',
                            !checked
                              ? 'border-slate-400 focus:border-teal-500'
                              : isCorrect(qi)
                                ? 'border-green-500 text-green-700'
                                : 'border-red-400 text-red-600',
                          ].join(' ')}
                          placeholder={multi ? 'word / word' : 'word'}
                        />
                      )}
                    </span>
                  ))}
                </span>
                {checked && !isCorrect(qi) && (
                  <span className="ml-1 text-xs text-green-700">✓ {q.answer}</span>
                )}
              </div>
            </div>
          )
        })}
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
          <p className="text-sm text-green-700 font-medium">✓ {correct} / {step.questions.length} correct</p>
          <button
            onClick={() => onComplete({ answers: inputs, score: correct / step.questions.length })}
            className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-sm transition-colors"
          >
            Continue →
          </button>
        </div>
      )}
    </div>
  )
}
