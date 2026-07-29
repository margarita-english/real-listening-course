const STOPWORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'in', 'on', 'at', 'to', 'of', 'and', 'or',
  'but', 'from', 'with', 'for', 'it', 'its', 'this', 'that', 'these', 'those', 'he', 'she',
  'they', 'you', 'i', 'we', 'his', 'her', 'their', 'your', 'my', 'our', 'be', 'do', 'does',
  'did', 'has', 'have', 'had', 'not', 'no', 'so', 'as', 'by', 'if', 'when', 'what', 'which',
  'who', 'whom', 'where', 'why', 'how',
])

function normalize(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9\s']/g, ' ').replace(/\s+/g, ' ').trim()
}

function keywords(modelAnswer: string) {
  return normalize(modelAnswer).split(' ').filter(w => w && !STOPWORDS.has(w))
}

// Lenient grading: correct if the student's answer contains most of the
// model answer's key content words, regardless of exact phrasing.
export function isQaAnswerCorrect(studentAnswer: string, modelAnswer: string) {
  const kw = keywords(modelAnswer)
  if (kw.length === 0) return false
  const studentNorm = normalize(studentAnswer)
  const matched = kw.filter(w => studentNorm.includes(w))
  return matched.length / kw.length >= 0.5
}

// Strict grading for dictation: the point is catching every word, so this
// requires all words to match (ignoring case, punctuation and apostrophes),
// not just most of the key content words like isQaAnswerCorrect above.
export function isDictationCorrect(studentAnswer: string, modelAnswer: string) {
  const strip = (s: string) => s.toLowerCase().replace(/['’]/g, '').replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim()
  return strip(studentAnswer) === strip(modelAnswer)
}
