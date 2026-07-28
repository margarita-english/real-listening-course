import type { Unit } from '../types'
import unit1 from './unit1'
import unit11 from './unit11'

export type Level = 'elementary' | 'intermediate' | 'advanced'

export interface UnitMeta {
  slug: string
  title: string
  subtitle: string
  level: Level
  total: number
}

export const UNITS: Record<string, Unit> = {
  'unit1-jackie': unit1,
  'unit11-scott': unit11,
}

export const UNIT_META: UnitMeta[] = [
  { slug: 'unit1-jackie', title: 'Unit 1 — Jackie', subtitle: 'My Family', level: 'elementary', total: unit1.steps.length },
  { slug: 'unit11-scott', title: 'Unit 11 — Scott', subtitle: 'A Place I Know Well', level: 'advanced', total: unit11.steps.length },
]

export const LEVEL_LABELS: Record<Level, string> = {
  elementary: 'Elementary',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

export const LEVEL_ORDER: Level[] = ['elementary', 'intermediate', 'advanced']
