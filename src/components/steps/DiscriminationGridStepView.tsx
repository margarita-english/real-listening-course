import { useState } from 'react'
import type { DiscriminationGridStep, StepAttemptPayload } from '../../types'
import AudioPlayer from '../AudioPlayer'

interface Props {
  step: DiscriminationGridStep
  onComplete: (payload: StepAttemptPayload) => void
}

export default function DiscriminationGridStepView({ step, onComplete }: Props) {
  const [answers, setAnswers] = useState<Record<number, (('A' | 'B') | null)[]>>(
    Object.fromEntries(step.pairs.map(p => [p.number, p.sequence.map(() => null)]))
  )
  const [checked, setChecked] = useState(false)

  const allFilled = step.pairs.every(p => answers[p.number].every(v => v !== null))

  function pick(pairNumber: number, repeatIndex: number, choice: 'A' | 'B') {
    if (checked) return
    setAnswers(prev => ({
      ...prev,
      [pairNumber]: prev[pairNumber].map((v, i) => (i === repeatIndex ? choice : v)),
    }))
  }

  function countCorrect(pairNumber: number) {
    const pair = step.pairs.find(p => p.number === pairNumber)!
    return pair.sequence.filter((correct, i) => answers[pairNumber][i] === correct).length
  }

  const totalRepeats = step.pairs.reduce((sum, p) => sum + p.sequence.length, 0)
  const totalCorrect = step.pairs.reduce((sum, p) => sum + countCorrect(p.number), 0)

  return (
    <div className="space-y-5">
      {step.audioFile && (
        <AudioPlayer src={`/audio/${step.audioFile}`} label={step.audioLabel} />
      )}

      <p className="text-slate-600 text-sm leading-relaxed">{step.instruction}</p>

      <div className="space-y-4">
        {step.pairs.map(pair => (
          <div key={pair.number}>
            <p className="text-sm font-medium text-slate-800 mb-1.5">
              {pair.number}.&nbsp;<em>{pair.wordA}</em> / <em>{pair.wordB}</em>
            </p>
            <div className="flex flex-wrap gap-2">
              {pair.sequence.map((correct, i) => {
                const picked = answers[pair.number][i]
                return (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <span className="text-[10px] text-slate-400">{i + 1}</span>
                    <div className="flex rounded-lg overflow-hidden border border-slate-300">
                      {(['A', 'B'] as const).map(choice => {
                        const word = choice === 'A' ? pair.wordA : pair.wordB
                        const isPicked = picked === choice
                        let cls = 'px-2 py-1 text-xs font-medium transition-colors '
                        if (!checked) {
                          cls += isPicked ? 'bg-teal-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'
                        } else {
                          const isCorrectChoice = correct === choice
                          if (isPicked && isCorrectChoice) cls += 'bg-green-500 text-white'
                          else if (isPicked && !isCorrectChoice) cls += 'bg-red-400 text-white'
                          else if (!isPicked && isCorrectChoice) cls += 'bg-green-100 text-green-800'
                          else cls += 'bg-white text-slate-300'
                        }
                        return (
                          <button
                            key={choice}
                            disabled={checked}
                            onClick={() => pick(pair.number, i, choice)}
                            className={cls}
                          >
                            {word}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
              {checked && (
                <span className={`ml-2 self-center text-xs font-medium ${countCorrect(pair.number) === pair.sequence.length ? 'text-green-700' : 'text-amber-600'}`}>
                  {countCorrect(pair.number)}/{pair.sequence.length}
                </span>
              )}
            </div>
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
          <p className="text-sm text-green-700 font-medium">✓ {totalCorrect} / {totalRepeats} correct</p>
          <button
            onClick={() => onComplete({ answers, score: totalCorrect / totalRepeats })}
            className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-sm transition-colors"
          >
            Continue →
          </button>
        </div>
      )}
    </div>
  )
}
