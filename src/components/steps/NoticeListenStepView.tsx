import { useState } from 'react'
import type { NoticeItem, NoticeListenStep, StepAttemptPayload } from '../../types'
import AudioPlayer from '../AudioPlayer'

interface Props {
  step: NoticeListenStep
  onComplete: (payload: StepAttemptPayload) => void
}

function tokenize(text: string) {
  return text.split(/\s+/)
}

// Static, already-solved rendering used for `isExample` items — teaches the
// student the mechanic before they try the rest on their own.
function ExampleItem({ item, markUnit }: { item: NoticeItem; markUnit: 'word' | 'gap' }) {
  const words = tokenize(item.text)
  const marks = new Set(item.markIndices ?? [])

  if (markUnit === 'word') {
    return (
      <span className="leading-8">
        {words.map((w, i) => (
          <span
            key={i}
            className={
              'inline-block px-0.5 mr-1 rounded ' +
              (marks.has(i) ? 'bg-green-100 text-green-800 underline decoration-2 decoration-green-500' : '')
            }
          >
            {w}
          </span>
        ))}
      </span>
    )
  }

  return (
    <span className="leading-8">
      {words.map((w, i) => (
        <span key={i}>
          <span>{w}</span>
          {i < words.length - 1 && (
            <span className={'inline-block px-1 font-bold ' + (marks.has(i) ? 'text-green-600' : 'text-slate-200')}>
              ‿
            </span>
          )}
          {' '}
        </span>
      ))}
    </span>
  )
}

function InteractiveItem({
  item,
  markUnit,
  selected,
  checked,
  onToggle,
}: {
  item: NoticeItem
  markUnit: 'word' | 'gap'
  selected: Set<number>
  checked: boolean
  onToggle: (idx: number) => void
}) {
  const words = tokenize(item.text)
  const correct = new Set(item.markIndices ?? [])

  function wordClass(i: number) {
    const isSelected = selected.has(i)
    const isCorrect = correct.has(i)
    if (!checked) return isSelected ? 'bg-teal-100 text-teal-800 underline decoration-2' : 'hover:bg-slate-100'
    if (isCorrect && isSelected) return 'bg-green-100 text-green-800 underline decoration-2 decoration-green-500'
    if (isCorrect && !isSelected) return 'bg-amber-50 text-amber-700 underline decoration-2 decoration-amber-400 decoration-dashed'
    if (!isCorrect && isSelected) return 'bg-red-100 text-red-700 line-through'
    return ''
  }

  function gapClass(i: number) {
    const isSelected = selected.has(i)
    const isCorrect = correct.has(i)
    if (!checked) return isSelected ? 'text-teal-700 bg-teal-100' : 'text-slate-300 hover:text-slate-500'
    if (isCorrect && isSelected) return 'text-green-700 bg-green-100'
    if (isCorrect && !isSelected) return 'text-amber-600 bg-amber-50'
    if (!isCorrect && isSelected) return 'text-red-600 bg-red-100 line-through'
    return 'text-slate-200'
  }

  const foundCount = [...correct].filter(i => selected.has(i)).length

  return (
    <div>
      <span className="leading-8">
        {markUnit === 'word'
          ? words.map((w, i) => (
              <span
                key={i}
                onClick={() => !checked && onToggle(i)}
                className={`inline-block px-0.5 mr-1 rounded cursor-pointer transition-colors ${wordClass(i)}`}
              >
                {w}
              </span>
            ))
          : words.map((w, i) => (
              <span key={i}>
                <span>{w}</span>
                {i < words.length - 1 && (
                  <span
                    onClick={() => !checked && onToggle(i)}
                    className={`inline-block px-1 font-bold cursor-pointer transition-colors ${gapClass(i)}`}
                  >
                    ‿
                  </span>
                )}
                {' '}
              </span>
            ))}
      </span>
      {checked && (
        <span className={`ml-2 text-xs font-medium ${foundCount === correct.size ? 'text-green-700' : 'text-amber-600'}`}>
          {foundCount}/{correct.size}
        </span>
      )}
    </div>
  )
}

export default function NoticeListenStepView({ step, onComplete }: Props) {
  const [revealed, setRevealed] = useState(false)
  const [selected, setSelected] = useState<Record<number, Set<number>>>({})
  const [checked, setChecked] = useState(false)

  const interactive = step.markUnit !== undefined

  function toggle(itemNumber: number, idx: number) {
    setSelected(prev => {
      const next = new Set(prev[itemNumber] ?? [])
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      return { ...prev, [itemNumber]: next }
    })
  }

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

      <ol className="space-y-3">
        {step.items.map(item => (
          <li key={item.number} className="flex gap-2 text-sm text-slate-800">
            <span className="shrink-0 font-medium text-slate-500 w-5 text-right">{item.number}.</span>
            <div className="flex-1">
              {item.isExample && (
                <span className="inline-block text-[10px] font-semibold uppercase tracking-wide text-slate-400 bg-slate-100 rounded-full px-2 py-0.5 mb-1">
                  Example
                </span>
              )}
              {interactive && item.markIndices ? (
                item.isExample ? (
                  <ExampleItem item={item} markUnit={step.markUnit!} />
                ) : (
                  <InteractiveItem
                    item={item}
                    markUnit={step.markUnit!}
                    selected={selected[item.number] ?? new Set()}
                    checked={checked}
                    onToggle={idx => toggle(item.number, idx)}
                  />
                )
              ) : (
                <span className="italic leading-relaxed" dangerouslySetInnerHTML={{ __html: item.text }} />
              )}
              {item.ipa && (
                <div className="font-mono text-xs text-teal-700 mt-1" dangerouslySetInnerHTML={{ __html: item.ipa }} />
              )}
            </div>
          </li>
        ))}
      </ol>

      {interactive && !checked && (
        <button
          onClick={() => setChecked(true)}
          className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-sm transition-colors"
        >
          {step.checkLabel ?? 'Check answers'}
        </button>
      )}

      {!interactive && step.revealContent && !revealed && (
        <button
          onClick={() => setRevealed(true)}
          className="w-full py-2 border border-teal-300 text-teal-700 hover:bg-teal-50 font-medium rounded-xl text-sm transition-colors"
        >
          {step.revealLabel ?? 'Show answers'}
        </button>
      )}

      {!interactive && revealed && step.revealContent && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-600 mb-2">Answers</p>
          <div
            className="text-sm text-slate-700 leading-relaxed whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: step.revealContent }}
          />
        </div>
      )}

      {(!interactive || checked) && (
        <button
          onClick={() => onComplete({ answers: null, score: null })}
          className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-sm transition-colors"
        >
          Continue →
        </button>
      )}
    </div>
  )
}
