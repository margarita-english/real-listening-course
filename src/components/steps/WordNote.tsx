import { useState } from 'react'
import type { WordNote as WordNoteData } from '../../types'

// "Do you know what X is?" Yes/No check under a sentence, with a
// "Learn more" toggle that reveals a short explanation.
export default function WordNote({ note }: { note: WordNoteData }) {
  const [known, setKnown] = useState<boolean | null>(null)
  const [open, setOpen] = useState(false)

  return (
    <div className="mt-1.5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm leading-relaxed">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-slate-700">
          💡 Do you know what <strong>{note.term}</strong> is?
        </span>
        <span className="flex gap-1.5" role="group" aria-label={`Do you know what ${note.term} is?`}>
          {([true, false] as const).map(value => (
            <button
              key={String(value)}
              type="button"
              aria-pressed={known === value}
              onClick={() => {
                setKnown(value)
                if (!value) setOpen(true)
              }}
              className={[
                'px-2.5 py-0.5 rounded-full border text-xs font-medium transition-colors',
                known === value
                  ? 'bg-amber-500 border-amber-500 text-white'
                  : 'bg-white border-amber-300 text-amber-800 hover:bg-amber-100',
              ].join(' ')}
            >
              {value ? 'Yes' : 'No'}
            </button>
          ))}
        </span>
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
          className="text-xs font-medium text-teal-700 underline underline-offset-2 hover:text-teal-900"
        >
          {open ? 'Hide' : 'Learn more'}
        </button>
      </div>
      {known === true && !open && (
        <p className="mt-1 text-xs text-amber-800">Great! Click Learn more to check.</p>
      )}
      {open && (
        <div className="mt-2 space-y-1.5 text-slate-700">
          {note.explanation.map((line, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: line }} />
          ))}
        </div>
      )}
    </div>
  )
}
