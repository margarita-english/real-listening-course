import { useEffect, useId, useRef, useState } from 'react'
import type { Step } from '../../types'
import { getStepHelp } from '../../lib/stepHelp'

// The step's instruction line plus an ⓘ button that explains, in very simple
// English, what to do. Opens on hover (mouse) or click/tap/Enter; closes on
// a second click, Escape, or a click outside.
export default function StepInstruction({ step }: { step: Step }) {
  const [pinned, setPinned] = useState(false)
  const [hovered, setHovered] = useState(false)
  const open = pinned || hovered
  const wrapRef = useRef<HTMLSpanElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelId = useId()

  useEffect(() => {
    if (!open) return
    function onPointerDown(e: PointerEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) {
        setPinned(false)
        setHovered(false)
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setPinned(false)
        setHovered(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const help = getStepHelp(step)

  return (
    <div className="flex items-start gap-2">
      {/* Instructions may contain simple inline HTML, e.g. a highlighted focus letter. */}
      <p className="flex-1 text-slate-600 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: step.instruction }} />
      <span
        ref={wrapRef}
        className="relative shrink-0"
        onPointerEnter={e => e.pointerType === 'mouse' && setHovered(true)}
        onPointerLeave={e => e.pointerType === 'mouse' && setHovered(false)}
      >
        <button
          ref={buttonRef}
          type="button"
          aria-label="How to do this exercise"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => {
            setPinned(p => !p)
            setHovered(false)
          }}
          className={[
            'w-6 h-6 rounded-full border text-xs font-bold italic font-serif flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400',
            open
              ? 'bg-teal-600 border-teal-600 text-white'
              : 'bg-white border-teal-300 text-teal-600 hover:bg-teal-50',
          ].join(' ')}
        >
          i
        </button>
        {open && (
          <div
            id={panelId}
            role="tooltip"
            className="absolute right-0 top-8 z-20 w-64 max-w-[calc(100vw-2rem)] bg-white border border-teal-200 rounded-xl shadow-lg p-3 text-sm text-slate-700 leading-relaxed"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-teal-600 mb-1">What to do</p>
            <ol className="list-decimal pl-4 space-y-1">
              {help.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ol>
          </div>
        )}
      </span>
    </div>
  )
}
