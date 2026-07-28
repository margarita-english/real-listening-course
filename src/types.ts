export type StepKind =
  | 'info'          // read-only explanation card, click Continue
  | 'mcq'           // circle the correct answer (no audio)
  | 'gapFill'       // fill blanks in numbered sentences (with or without audio)
  | 'qa'            // open-ended questions (show model answers after submit)
  | 'wordBank'      // fill blanks using words from a provided bank
  | 'noticeListen'  // listen and observe a feature, no grading

export interface McqQuestion {
  number: number
  stem: string        // text before the options
  options: string[]   // choices to click
  answer: string      // correct option text
}

// A gap is marked with ___ in the sentence string.
// `answers` lists the correct text for each ___ in order.
export interface GapSentence {
  number: number
  text: string        // sentence with ___ for each blank
  answers: string[]   // one entry per blank
}

export interface QaQuestion {
  number: number
  question: string
  // Omit for open-ended/opinion questions that have no single correct
  // answer — those are just saved, not graded.
  modelAnswer?: string
  // Per-question clip, e.g. one short dictation excerpt per item, distinct
  // from the single step-level BaseStep.audioFile.
  audioFile?: string
  audioLabel?: string
}

export interface WordBankItem {
  number: number
  text: string        // sentence with one ___
  answer: string
}

export interface NoticeItem {
  number: number
  text: string        // excerpt shown in italics (HTML-safe)
  ipa?: string         // phonemic transcription shown under the text (HTML-safe)
  // Per-item clip, e.g. one short clip per stress example, distinct from
  // the single step-level BaseStep.audioFile.
  audioFile?: string
  audioLabel?: string
  // For interactive items (see NoticeListenStep.markUnit): indices of the
  // correct click targets, 0-based over `text.split(/\s+/)`. In 'word' mode
  // each index is a word; in 'gap' mode each index i is the gap between
  // word i and word i+1 (i.e. a linking point).
  markIndices?: number[]
  // Shown solved, not clickable — teaches the student the mechanic before
  // they try the rest of the items themselves.
  isExample?: boolean
}

export interface BaseStep {
  id: string
  sectionLabel: string  // e.g. "1. Pre-Listening Comprehension"
  part: string          // e.g. "A  Schema building"
  instruction: string
  audioFile?: string    // relative to /audio/, e.g. "unit11/176.mp3"
  audioLabel?: string   // e.g. "Track 176"
}

// Word/phrase shown as normally spelled, its phonemic script, and a
// tap-to-play clip — used for pronunciation examples like elision.
export interface AudioExample {
  written: string
  ipa: string       // e.g. "/aɪ dʌnoʊ/"
  audioFile: string
}

// A distinct, separately-headed sub-topic within an info step — e.g. an
// info step introducing two unrelated features must render them as two
// clearly separate blocks, not interleaved.
export interface InfoSection {
  heading: string
  body: string[]        // paragraphs (HTML-safe strings)
  examples?: string[]   // plain example list, shown in a bordered box
  audioExamples?: AudioExample[]
}

export interface InfoStep extends BaseStep {
  kind: 'info'
  body: string[]  // paragraphs / bullet points (HTML-safe strings)
  excerpts?: string[]
  // Ordered sub-topics, each rendered as its own labeled block, in order.
  sections?: InfoSection[]
}

export interface McqStep extends BaseStep {
  kind: 'mcq'
  questions: McqQuestion[]
}

export interface GapFillStep extends BaseStep {
  kind: 'gapFill'
  questions: GapSentence[]
}

export interface QaStep extends BaseStep {
  kind: 'qa'
  questions: QaQuestion[]
}

export interface WordBankStep extends BaseStep {
  kind: 'wordBank'
  bank: string[]
  questions: WordBankItem[]
}

export interface NoticeListenStep extends BaseStep {
  kind: 'noticeListen'
  intro: string       // explanation paragraph
  items: NoticeItem[]
  revealLabel?: string  // label on the reveal-answer button (non-interactive steps only)
  revealContent?: string // content shown after reveal (non-interactive steps only)
  // Presence of this field switches the step into click-to-mark-then-check
  // mode: 'word' — student clicks words (e.g. stressed syllables); 'gap' —
  // student clicks the space between two words (e.g. linking points).
  markUnit?: 'word' | 'gap'
  checkLabel?: string  // label on the check-answers button; defaults to "Check answers"
}

export type Step =
  | InfoStep
  | McqStep
  | GapFillStep
  | QaStep
  | WordBankStep
  | NoticeListenStep

export interface Unit {
  slug: string
  title: string
  subtitle: string
  intervieweeName: string  // e.g. "Scott" — used for the transcript speaker legend
  steps: Step[]
  transcript: TranscriptLine[]
  transcriptAudioFile?: string
  glossary: GlossaryEntry[]
}

export interface TranscriptLine {
  speaker: 'I' | 'S'
  text: string
}

export interface GlossaryEntry {
  number: number
  term: string
  definition: string
}

// Emitted by a step view when the student finishes it, so the answers can
// be persisted for later review. `score` is a 0–1 fraction, or null for
// steps that aren't graded (info cards, notice-and-listen).
export interface StepAttemptPayload {
  answers: unknown
  score: number | null
}
