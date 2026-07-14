const NUMBER_WORDS: Record<string, string> = {
  zero: '0', one: '1', two: '2', three: '3', four: '4', five: '5',
  six: '6', seven: '7', eight: '8', nine: '9', ten: '10',
  eleven: '11', twelve: '12', thirteen: '13', fourteen: '14', fifteen: '15',
  sixteen: '16', seventeen: '17', eighteen: '18', nineteen: '19', twenty: '20',
}

const DIGIT_WORDS: Record<string, string> = Object.fromEntries(
  Object.entries(NUMBER_WORDS).map(([word, digit]) => [digit, word]),
)

function toDigits(s: string): string {
  return NUMBER_WORDS[s] ?? s
}

// Case-insensitive, trims whitespace, and treats a number word ("ten") and
// its digit form ("10") as the same answer either way round.
export function answersMatch(input: string, correct: string): boolean {
  const a = input.toLowerCase().trim()
  const b = correct.toLowerCase().trim()
  return a === b || toDigits(a) === toDigits(b)
}

// A part's own text plus its number-word/digit equivalent, if any —
// for "contains one of these" checks (e.g. inside a longer typed phrase).
export function equivalentForms(part: string): string[] {
  const p = part.toLowerCase().trim()
  const forms = [p]
  if (NUMBER_WORDS[p]) forms.push(NUMBER_WORDS[p])
  if (DIGIT_WORDS[p]) forms.push(DIGIT_WORDS[p])
  return forms
}
