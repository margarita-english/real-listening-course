import type { ErrorCorrectionItem } from '../types'

// Lowercase, straight apostrophes, no punctuation (except ' and -), single spaces.
function normalise(s: string) {
  return ' ' + s
    .toLowerCase()
    .replace(/[‘’`]/g, "'")
    .replace(/[^a-z0-9'\- ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim() + ' '
}

const contains = (text: string, phrase: string) => text.includes(normalise(phrase))

export function isCorrection(item: ErrorCorrectionItem, rewrite: string) {
  const t = normalise(rewrite)
  return item.accept.some(p => contains(t, p)) && !item.reject.some(p => contains(t, p))
}
