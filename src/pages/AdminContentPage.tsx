import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import unit11 from '../data/unit11'
import type { Step, Unit } from '../types'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { fetchStepOverrides, saveStepOverride, type StepOverrideMap } from '../lib/stepOverrides'

const UNITS: Record<string, Unit> = {
  'unit11-scott': unit11,
}

function bodyToText(body: string[]) {
  return body.join('\n\n')
}

function textToBody(text: string) {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0)
}

function StepEditorCard({
  unitSlug,
  step,
  override,
}: {
  unitSlug: string
  step: Step
  override: StepOverrideMap[string] | undefined
}) {
  const defaultInstruction = override?.instruction ?? step.instruction
  const defaultBody = step.kind === 'info' ? (override?.body ?? step.body) : null

  const [instruction, setInstruction] = useState(defaultInstruction)
  const [bodyText, setBodyText] = useState(defaultBody ? bodyToText(defaultBody) : '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const dirty = instruction !== defaultInstruction || (defaultBody !== null && bodyText !== bodyToText(defaultBody))

  async function handleSave() {
    setSaving(true)
    setError(null)
    const patch = step.kind === 'info' ? { instruction, body: textToBody(bodyText) } : { instruction }
    const err = await saveStepOverride(unitSlug, step.id, patch)
    setSaving(false)
    if (err) {
      setError(err)
    } else {
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3">
      <div>
        <span className="inline-block bg-slate-100 text-slate-500 text-xs font-semibold px-2 py-0.5 rounded-full mb-1">
          {step.sectionLabel}
        </span>
        <p className="text-sm font-semibold text-slate-800">{step.part}</p>
      </div>

      <label className="block space-y-1">
        <span className="text-xs font-medium text-slate-500">Instruction</span>
        <textarea
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          rows={2}
          className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
      </label>

      {defaultBody !== null && (
        <label className="block space-y-1">
          <span className="text-xs font-medium text-slate-500">Info-card text (blank line = new paragraph)</span>
          <textarea
            value={bodyText}
            onChange={(e) => setBodyText(e.target.value)}
            rows={5}
            className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </label>
      )}

      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={!dirty || saving}
          className="text-xs px-3 py-1.5 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-lg font-medium transition-colors"
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
        {saved && <span className="text-xs text-teal-600">Saved ✓</span>}
        {error && <span className="text-xs text-red-600">{error}</span>}
      </div>
    </div>
  )
}

export default function AdminContentPage() {
  const { slug } = useParams<{ slug: string }>()
  const { user, signOut } = useAuth()
  const unit = slug ? UNITS[slug] : null

  const [authChecked, setAuthChecked] = useState(false)
  const [isTeacher, setIsTeacher] = useState(false)
  const [overrides, setOverrides] = useState<StepOverrideMap>({})

  useEffect(() => {
    if (!user) return
    supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()
      .then(({ data }) => {
        setIsTeacher(data?.role === 'teacher')
        setAuthChecked(true)
      })
  }, [user])

  useEffect(() => {
    if (!slug) return
    fetchStepOverrides(slug).then(setOverrides)
  }, [slug])

  if (!authChecked) {
    return <div className="min-h-screen flex items-center justify-center text-slate-400 text-sm">Loading…</div>
  }

  if (!isTeacher) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 text-sm">
        This page is for teachers only. <Link to="/" className="ml-2 text-teal-600 underline">Go home</Link>
      </div>
    )
  }

  if (!unit) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Unit not found. <Link to="/" className="ml-2 text-teal-600 underline">Go home</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-4 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-600">MORE English · Teacher</p>
          <h1 className="text-lg font-bold text-slate-900">Edit exercise texts — {unit.title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/" className="text-xs text-slate-500 hover:text-slate-700">← Units</Link>
          <button onClick={signOut} className="text-xs text-slate-400 hover:text-slate-600">Sign out</button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-4">
        <p className="text-sm text-slate-500">
          Edit the instruction line for any exercise, and the paragraph text on info cards. Changes save per exercise and
          appear for students immediately.
        </p>
        {unit.steps.map((step) => (
          <StepEditorCard key={step.id} unitSlug={unit.slug} step={step} override={overrides[step.id]} />
        ))}
      </main>
    </div>
  )
}
