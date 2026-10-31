import { useState } from 'react'
import type { AudioExample, ExplanationLang } from '../types'

const LANGS: { code: ExplanationLang; flag: string; label: string; heading: string }[] = [
  { code: 'ru', flag: '🇷🇺', label: 'Русский', heading: 'Что здесь происходит?' },
  { code: 'es', flag: '🇪🇸', label: 'Español', heading: '¿Qué pasa aquí?' },
]

const STORAGE_KEY = 'explanationLang'

function readSaved(): ExplanationLang | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    return v === 'ru' || v === 'es' ? v : null
  } catch {
    return null
  }
}

// Flag switch + per-example explanation in the student's own language.
// The chosen language is remembered on this device.
export default function NativeExplanations({ examples }: { examples: AudioExample[] }) {
  const [lang, setLang] = useState<ExplanationLang | null>(readSaved)
  const withText = examples.filter(ex => ex.explanations)
  if (withText.length === 0) return null

  function choose(code: ExplanationLang) {
    const next = lang === code ? null : code
    setLang(next)
    try {
      if (next) localStorage.setItem(STORAGE_KEY, next)
      else localStorage.removeItem(STORAGE_KEY)
    } catch {
      // storage unavailable: the choice just isn't remembered
    }
  }

  const active = LANGS.find(l => l.code === lang)

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-slate-500">Explanation in your language:</span>
        {LANGS.map(l => (
          <button
            key={l.code}
            type="button"
            aria-pressed={lang === l.code}
            onClick={() => choose(l.code)}
            className={[
              'inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-sm font-medium transition-colors',
              lang === l.code
                ? 'bg-teal-600 border-teal-600 text-white'
                : 'bg-white border-slate-300 text-slate-700 hover:border-teal-400',
            ].join(' ')}
          >
            <span aria-hidden="true" className="text-base leading-none">{l.flag}</span>
            {l.label}
          </button>
        ))}
      </div>

      {active && (
        <div lang={active.code} className="space-y-2.5">
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">{active.heading}</p>
          {withText.map((ex, i) => (
            <div key={i} className="bg-white rounded-lg border border-slate-200 px-3 py-2 text-sm leading-relaxed">
              <p className="font-semibold text-slate-800">
                {ex.written} <span className="font-mono font-normal text-teal-700">{ex.ipa}</span>
              </p>
              <p className="text-slate-700" dangerouslySetInnerHTML={{ __html: ex.explanations![active.code] }} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
