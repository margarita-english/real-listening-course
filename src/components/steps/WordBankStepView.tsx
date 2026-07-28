import { useState } from 'react'
import type { WordBankStep, StepAttemptPayload } from '../../types'
import AudioPlayer from '../AudioPlayer'

interface Props {
  step: WordBankStep
  onComplete: (payload: StepAttemptPayload) => void
}

// placed[qi][gi] = index into step.bank filling that gap, or null
type Placed = (number | null)[][]

export default function WordBankStepView({ step, onComplete }: Props) {
  const gapsPerQuestion = step.questions.map(q => q.text.split('___').length - 1)
  const requiredWords = step.questions.map(q => q.answer.split('/').map(s => s.trim()))

  const [placed, setPlaced] = useState<Placed>(gapsPerQuestion.map(n => Array(n).fill(null)))
  const [selected, setSelected] = useState<number | null>(null)
  const [checked, setChecked] = useState(false)

  const usedIndices = new Set(placed.flat().filter((i): i is number => i !== null))
  const availableBank = step.bank
    .map((word, index) => ({ word, index }))
    .filter(b => !usedIndices.has(b.index))

  const allFilled = placed.every(row => row.every(v => v !== null))

  function place(qi: number, gi: number, bankIndex: number) {
    setPlaced(prev => prev.map((row, ri) => (ri === qi ? row.map((v, gi2) => (gi2 === gi ? bankIndex : v)) : row)))
    setSelected(null)
  }

  function clear(qi: number, gi: number) {
    setPlaced(prev => prev.map((row, ri) => (ri === qi ? row.map((v, gi2) => (gi2 === gi ? null : v)) : row)))
  }

  function handleGapClick(qi: number, gi: number) {
    if (checked) return
    const current = placed[qi][gi]
    if (selected !== null) {
      place(qi, gi, selected)
    } else if (current !== null) {
      clear(qi, gi)
    }
  }

  function handleGapDrop(qi: number, gi: number, e: React.DragEvent) {
    e.preventDefault()
    if (checked) return
    const bankIndex = parseInt(e.dataTransfer.getData('text/plain'), 10)
    if (!isNaN(bankIndex)) place(qi, gi, bankIndex)
  }

  function isCorrect(qi: number, gi: number) {
    const bankIndex = placed[qi][gi]
    if (bankIndex === null) return false
    return step.bank[bankIndex].toLowerCase() === requiredWords[qi][gi]?.toLowerCase()
  }

  const totalGaps = gapsPerQuestion.reduce((a, b) => a + b, 0)
  const totalCorrect = step.questions.reduce((sum, _, qi) => sum + placed[qi].filter((_, gi) => isCorrect(qi, gi)).length, 0)

  return (
    <div className="space-y-4">
      {step.audioFile && (
        <AudioPlayer src={`/audio/${step.audioFile}`} label={step.audioLabel} />
      )}

      <p className="text-slate-600 text-sm leading-relaxed">{step.instruction}</p>

      {/* Word bank — tap or drag a word into a gap below */}
      <div className="flex flex-wrap gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl min-h-[3rem]">
        {availableBank.length === 0 && <span className="text-xs text-slate-400 italic">All words placed</span>}
        {availableBank.map(({ word, index }) => (
          <button
            key={index}
            draggable={!checked}
            onDragStart={e => e.dataTransfer.setData('text/plain', String(index))}
            onClick={() => !checked && setSelected(selected === index ? null : index)}
            className={[
              'px-2.5 py-1 rounded-lg text-sm font-medium shadow-sm border transition-colors cursor-grab active:cursor-grabbing',
              selected === index
                ? 'bg-teal-600 border-teal-600 text-white'
                : 'bg-white border-slate-300 text-slate-700 hover:border-teal-400',
            ].join(' ')}
          >
            {word}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {step.questions.map((q, qi) => {
          let gapCounter = 0
          return (
            <div key={q.number} className="flex gap-2 text-sm text-slate-800">
              <span className="shrink-0 font-medium text-slate-500 w-5 text-right pt-0.5">{q.number}.</span>
              <div className="flex-1">
                <span className="leading-8">
                  {q.text.split('___').map((part, pi, arr) => {
                    const isLast = pi === arr.length - 1
                    const gi = isLast ? -1 : gapCounter++
                    const bankIndex = gi >= 0 ? placed[qi][gi] : null
                    return (
                      <span key={pi}>
                        <span dangerouslySetInnerHTML={{ __html: part }} />
                        {!isLast && (
                          <span
                            onClick={() => handleGapClick(qi, gi)}
                            onDragOver={e => e.preventDefault()}
                            onDrop={e => handleGapDrop(qi, gi, e)}
                            className={[
                              'inline-flex items-center justify-center min-w-[4.5rem] px-2 py-0.5 mx-1 rounded-lg border-2 border-dashed text-sm font-medium transition-colors',
                              bankIndex === null
                                ? 'border-slate-300 text-slate-300 cursor-pointer hover:border-teal-400'
                                : !checked
                                  ? 'border-teal-400 bg-teal-50 text-teal-800 cursor-pointer border-solid'
                                  : isCorrect(qi, gi)
                                    ? 'border-green-500 bg-green-50 text-green-700 border-solid'
                                    : 'border-red-400 bg-red-50 text-red-600 border-solid',
                            ].join(' ')}
                          >
                            {bankIndex !== null ? step.bank[bankIndex] : '···'}
                          </span>
                        )}
                      </span>
                    )
                  })}
                </span>
                {checked && placed[qi].some((_, gi) => !isCorrect(qi, gi)) && (
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
          <p className="text-sm text-green-700 font-medium">✓ {totalCorrect} / {totalGaps} correct</p>
          <button
            onClick={() => onComplete({ answers: placed, score: totalCorrect / totalGaps })}
            className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-sm transition-colors"
          >
            Continue →
          </button>
        </div>
      )}
    </div>
  )
}
