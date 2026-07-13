import { useState } from 'react'
import type { QaStep } from '../../types'
import AudioPlayer from '../AudioPlayer'

interface Props {
  step: QaStep
  onComplete: () => void
}

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
function isCorrect(studentAnswer: string, modelAnswer: string) {
  const kw = keywords(modelAnswer)
  if (kw.length === 0) return false
  const studentNorm = normalize(studentAnswer)
  const matched = kw.filter(w => studentNorm.includes(w))
  return matched.length / kw.length >= 0.5
}

export default function QaStepView({ step, onComplete }: Props) {
  const [answers, setAnswers] = useState<string[]>(step.questions.map(() => ''))
  const [submitted, setSubmitted] = useState(false)

  const allFilled = answers.every(a => a.trim() !== '')
  const correctCount = step.questions.filter((q, i) => isCorrect(answers[i], q.modelAnswer)).length

  return (
    <div className="space-y-4">
      {step.audioFile && (
        <AudioPlayer src={`/audio/${step.audioFile}`} label={step.audioLabel} />
      )}

      <p className="text-slate-600 text-sm leading-relaxed">{step.instruction}</p>

      <div className="space-y-4">
        {step.questions.map((q, i) => (
          <div key={q.number}>
            <p className="text-sm font-medium text-slate-800 mb-1">
              {q.number}.&nbsp;{q.question}
            </p>
            {!submitted ? (
              <textarea
                rows={2}
                value={answers[i]}
                onChange={e => setAnswers(prev => prev.map((v, idx) => idx === i ? e.target.value : v))}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none"
                placeholder="Your answer…"
              />
            ) : (
              <div className="space-y-1.5">
                <div
                  className={[
                    'border rounded-lg px-3 py-2 text-sm',
                    isCorrect(answers[i], q.modelAnswer)
                      ? 'bg-green-50 border-green-200 text-green-800'
                      : 'bg-red-50 border-red-200 text-red-700',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'text-xs font-medium uppercase tracking-wide block mb-0.5',
                      isCorrect(answers[i], q.modelAnswer) ? 'text-green-600' : 'text-red-500',
                    ].join(' ')}
                  >
                    Your answer
                  </span>
                  {answers[i] || <em className="text-red-400">left blank</em>}
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2 text-sm text-green-800">
                  <span className="text-green-600 text-xs font-medium uppercase tracking-wide block mb-0.5">Model answer</span>
                  {q.modelAnswer}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {!submitted ? (
        <button
          disabled={!allFilled}
          onClick={() => setSubmitted(true)}
          className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 disabled:opacity-40 text-white font-semibold rounded-xl text-sm transition-colors"
        >
          Submit &amp; see answers
        </button>
      ) : (
        <div className="space-y-2">
          <p className="text-sm text-green-700 font-medium">
            ✓ {correctCount} / {step.questions.length} correct
          </p>
          <button
            onClick={onComplete}
            className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-sm transition-colors"
          >
            Continue →
          </button>
        </div>
      )}
    </div>
  )
}
