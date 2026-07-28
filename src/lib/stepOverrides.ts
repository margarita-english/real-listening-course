import { supabase } from './supabase'
import type { Step, Unit } from '../types'

export interface StepOverride {
  instruction: string | null
  body: string[] | null
}

export type StepOverrideMap = Record<string, StepOverride>

export async function fetchStepOverrides(unitSlug: string): Promise<StepOverrideMap> {
  const { data, error } = await supabase
    .from('step_overrides')
    .select('step_id, instruction, body')
    .eq('unit_slug', unitSlug)

  if (error) {
    console.error('Failed to load step overrides:', error.message)
    return {}
  }

  const map: StepOverrideMap = {}
  for (const row of data ?? []) {
    map[row.step_id] = { instruction: row.instruction, body: row.body }
  }
  return map
}

export async function saveStepOverride(
  unitSlug: string,
  stepId: string,
  patch: Partial<StepOverride>,
): Promise<string | null> {
  const { error } = await supabase
    .from('step_overrides')
    .upsert(
      { unit_slug: unitSlug, step_id: stepId, updated_at: new Date().toISOString(), ...patch },
      { onConflict: 'unit_slug,step_id' },
    )
  return error ? error.message : null
}

// Replaces the instruction line (and, for info steps, the body paragraphs)
// with whatever the teacher has saved in the admin panel, leaving anything
// not overridden as the hardcoded default from the unit data file.
export function applyStepOverrides(unit: Unit, overrides: StepOverrideMap): Unit {
  if (Object.keys(overrides).length === 0) return unit

  return {
    ...unit,
    steps: unit.steps.map((step): Step => {
      const o = overrides[step.id]
      if (!o) return step

      const patched = { ...step, instruction: o.instruction ?? step.instruction }
      if (patched.kind === 'info' && o.body && o.body.length > 0) {
        patched.body = o.body
      }
      return patched
    }),
  }
}
