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
  modelAnswer: string
}

export interface WordBankItem {
  number: number
  text: string        // sentence with one ___
  answer: string
}

export interface NoticeItem {
  number: number
  text: string        // excerpt shown in italics
}

export interface BaseStep {
  id: string
  sectionLabel: string  // e.g. "1. Pre-Listening Comprehension"
  part: string          // e.g. "A  Schema building"
  instruction: string
  audioFile?: string    // relative to /audio/, e.g. "unit11/176.mp3"
  audioLabel?: string   // e.g. "Track 176"
}

export interface InfoStep extends BaseStep {
  kind: 'info'
  body: string[]  // paragraphs / bullet points (HTML-safe strings)
  excerpts?: string[]
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
  revealLabel?: string  // label on the reveal-answer button
  revealContent?: string // content shown after reveal (e.g. underlined words)
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
