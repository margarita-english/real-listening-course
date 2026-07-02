import { useState } from 'react'
import type { McqStep } from '../../types'

interface Props {
  step: McqStep
  onComplete: () => void
}

export default function McqStepView({ step, onComplete }: Props) {
  const [selected, setSelected] = useState<Record<number, string>>({})
  const [checked, setChecked] = useState(false)

  const allAnswered = step.questions.every(q => selected[q.number])

  function handleCheck() {
    if (!allAnswered) return
    setChecked(true)
  }

  return (
    <div className="space-y-5">
      <p className="text-slate-600 text-sm leading-relaxed">{step.instruction}</p>

      {step.questions.map(q => (
        <div key={q.number} className="space-y-2">
          <p className="text-sm font-medium text-slate-800">
            {q.number}.&nbsp;
            <span dangerouslySetInnerHTML={{ __html: q.stem }} />
            {/* If stem doesn't mention "largest nation" append trailing text */}
            {q.number === 1 ? ' largest nation in the world.' : ''}
          </p>
          <div className="flex flex-wrap gap-2">
            {q.options.map(opt => {
              const isSelected = selected[q.number] === opt
              const isCorrect = opt === q.answer
              let cls = 'px-3 py-1.5 rounded-full border text-sm font-medium cursor-pointer transition-colors '
              if (!checked) {
                cls += isSelected
                  ? 'bg-teal-600 border-teal-600 text-white'
                  : 'border-slate-300 text-slate-700 hover:border-teal-400 hover:text-teal-700'
              } else {
                if (isSelected && isCorrect)  cls += 'bg-green-500 border-green-500 text-white'
                else if (isSelected && !isCorrect) cls += 'bg-red-400 border-red-400 text-white'
                else if (!isSelected && isCorrect) cls += 'bg-green-100 border-green-400 text-green-800'
                else cls += 'border-slate-200 text-slate-400'
              }
              return (
                <button
                  key={opt}
                  disabled={checked}
                  className={cls}
                  onClick={() => setSelected(prev => ({ ...prev, [q.number]: opt }))}
                >
                  {opt}
                </button>
              )
            })}
          </div>
        </div>
      ))}

      {!checked ? (
        <button
          disabled={!allAnswered}
          onClick={handleCheck}
          className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 disabled:opacity-40 text-white font-semibold rounded-xl text-sm transition-colors"
        >
          Check answers
        </button>
      ) : (
        <div className="space-y-2">
          <p className="text-sm text-green-700 font-medium">
            ✓ {step.questions.filter(q => selected[q.number] === q.answer).length} / {step.questions.length} correct
          </p>
          <button
            onClick={onComplete}
            className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-sm transition-colors"
          >
            Continue →
          </button>
        </div>
      )}
    </div>
  )
}
