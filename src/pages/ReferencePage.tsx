import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import unit11 from '../data/unit11'
import type { Unit } from '../types'
import AudioPlayer from '../components/AudioPlayer'

const UNITS: Record<string, Unit> = { 'unit11-scott': unit11 }

export default function ReferencePage() {
  const { slug } = useParams<{ slug: string }>()
  const unit = slug ? UNITS[slug] : null
  const [tab, setTab] = useState<'transcript' | 'glossary'>('transcript')

  if (!unit) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Unit not found. <Link to="/" className="ml-2 text-teal-600 underline">Go home</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3">
        <Link to={`/unit/${slug}`} className="text-slate-400 hover:text-slate-600 text-sm shrink-0">← Back to unit</Link>
        <span className="text-sm font-medium text-slate-700 flex-1 truncate">{unit.title} — Reference</span>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-5">
          {(['transcript', 'glossary'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={[
                'px-4 py-2 rounded-xl text-sm font-medium transition-colors',
                tab === t ? 'bg-teal-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50',
              ].join(' ')}
            >
              {t === 'transcript' ? '🎙 Transcript' : '📚 Words & Phrases'}
            </button>
          ))}
        </div>

        {tab === 'transcript' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100">
            <div className="px-4 py-3 bg-slate-50 rounded-t-2xl space-y-2">
              {unit.transcriptAudioFile && (
                <AudioPlayer src={`/audio/${unit.transcriptAudioFile}`} label="Full transcript" />
              )}
              <p className="text-xs text-slate-500">
                <strong>I</strong> = Interviewer &nbsp;|&nbsp; <strong>S</strong> = Scott
              </p>
            </div>
            {unit.transcript.map((line, i) => (
              <div key={i} className="flex gap-3 px-4 py-3">
                <span className={`shrink-0 font-bold text-sm w-4 ${line.speaker === 'S' ? 'text-teal-600' : 'text-slate-400'}`}>
                  {line.speaker}:
                </span>
                <p className="text-sm text-slate-700 leading-relaxed">{line.text}</p>
              </div>
            ))}
          </div>
        )}

        {tab === 'glossary' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100">
            {unit.glossary.map(entry => (
              <div key={entry.number} className="flex gap-3 px-4 py-3">
                <span className="shrink-0 text-xs font-semibold text-teal-600 w-5 pt-0.5">{entry.number}</span>
                <div>
                  <span className="font-semibold text-sm text-slate-800">{entry.term}</span>
                  <span className="text-slate-400 text-sm mx-1">—</span>
                  <span className="text-sm text-slate-600">{entry.definition}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
