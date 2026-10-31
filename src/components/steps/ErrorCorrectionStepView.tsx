import { useState } from 'react'
import type { ErrorCorrectionItem, ErrorCorrectionStep, StepAttemptPayload } from '../../types'
import { isCorrection } from '../../lib/errorCorrection'
import StepInstruction from './StepInstruction'
import ResultSummary from './ResultSummary'

interface Props {
  step: ErrorCorrectionStep
  onComplete: (payload: StepAttemptPayload) => void
}

// The sentence as given; with hints on, the mistake is highlighted (not corrected).
function Sentence({ item, highlight }: { item: ErrorCorrectionItem; highlight: boolean }) {
  const at = item.text.indexOf(item.mistake)
  if (!highlight || at < 0) return <p className="text-slate-800">{item.text}</p>
  return (
    <p className="text-slate-800">
      {item.text.slice(0, at)}
      <mark className="bg-amber-200 text-slate-900 rounded px-0.5 underline decoration-amber-500 decoration-wavy underline-offset-4">
        {item.mistake}
      </mark>
      {item.text.slice(at + item.mistake.length)}
    </p>
  )
}

// Rewrite each sentence without its mistake. "Give me some hints" highlights
// where the mistakes are; after the first check, wrong sentences get one
// more try before the answers are shown.
export default function ErrorCorrectionStepView({ step, onComplete }: Props) {
  const [values, setValues] = useState(() => step.items.map(i => i.text))
  const [firstTry, setFirstTry] = useState<string[] | null>(null)
  const [round, setRound] = useState<0 | 1 | 2>(0)  // 0 first try, 1 second chance, 2 finished
  const [hints, setHints] = useState(false)

  const correct = values.map((v, i) => isCorrection(step.items[i], v))
  const correctCount = correct.filter(Boolean).length
  // A sentence is locked once it was right at a check.
  const locked = (i: number) => round === 2 || (round === 1 && firstTry !== null && isCorrection(step.items[i], firstTry[i]))

  function check() {
    if (round === 0) {
      setFirstTry(values)
      setRound(correct.every(Boolean) ? 2 : 1)
    } else {
      setRound(2)
    }
  }

  const wrongAfterFirst = round === 1 ? correct.filter(c => !c).length : 0

  return (
    <div className="space-y-4">
      <StepInstruction step={step} />

      <ol className="space-y-4">
        {step.items.map((item, i) => {
          const done = locked(i)
          const showRight = round > 0 && done && correct[i]
          const showWrong = round === 2 && !correct[i]
          return (
            <li key={item.number} className="flex gap-2 text-sm">
              <span className="shrink-0 font-medium text-slate-500 w-5 text-right pt-0.5">{item.number}.</span>
              <div className="flex-1 min-w-0 space-y-1.5 leading-relaxed">
                <Sentence item={item} highlight={hints && !done} />
                <label className="sr-only" htmlFor={`${step.id}-fix-${item.number}`}>
                  Your corrected sentence {item.number}
                </label>
                <textarea
                  id={`${step.id}-fix-${item.number}`}
                  rows={3}
                  value={values[i]}
                  disabled={done}
                  spellCheck={false}
                  onChange={e => setValues(prev => prev.map((v, vi) => (vi === i ? e.target.value : v)))}
                  className={[
                    'w-full [field-sizing:content] min-h-[4.5rem] rounded-lg border px-3 py-2 text-sm leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-teal-300',
                    showRight
                      ? 'border-green-400 bg-green-50 text-green-800'
                      : showWrong
                        ? 'border-red-300 bg-red-50 text-red-700'
                        : round === 1
                          ? 'border-amber-400 bg-white'
                          : 'border-slate-300 bg-white',
                  ].join(' ')}
                />
                {round === 1 && !done && (
                  <p className="text-xs font-medium text-amber-700">✗ Not yet – try again.</p>
                )}
                {round === 2 && (
                  <div className="rounded-lg bg-slate-50 border border-slate-200 px-3 py-2 text-xs text-slate-600">
                    <span className={correct[i] ? 'text-green-700 font-semibold' : 'text-red-600 font-semibold'}>
                      {correct[i] ? '✓ Correct' : '✗ Correct answer:'}
                    </span>{' '}
                    <strong className="text-slate-800">{item.answer}</strong> –{' '}
                    <span dangerouslySetInnerHTML={{ __html: item.explanation }} />
                  </div>
                )}
              </div>
            </li>
          )
        })}
      </ol>

      {round < 2 ? (
        <div className="space-y-2">
          {round === 1 && (
            <p role="status" className="rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-800">
              {step.items.length - wrongAfterFirst} / {step.items.length} correct. Fix the {wrongAfterFirst === 1 ? 'sentence' : `${wrongAfterFirst} sentences`} in orange – you have one more chance.
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={() => setHints(true)}
              disabled={hints}
              className="sm:flex-1 py-2.5 rounded-xl border-2 border-amber-300 bg-amber-50 text-amber-800 font-semibold text-sm hover:bg-amber-100 disabled:opacity-50 transition-colors"
            >
              💡 {hints ? 'Mistakes highlighted' : 'Give me some hints'}
            </button>
            <button
              type="button"
              onClick={check}
              className="sm:flex-1 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-sm transition-colors"
            >
              {round === 0 ? 'Check answers' : 'Check again'}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <ResultSummary correct={correctCount} total={step.items.length} />
          <button
            onClick={() => onComplete({ answers: { firstTry, final: values, hintsUsed: hints }, score: correctCount / step.items.length })}
            className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-sm transition-colors"
          >
            Continue →
          </button>
        </div>
      )}
    </div>
  )
}
