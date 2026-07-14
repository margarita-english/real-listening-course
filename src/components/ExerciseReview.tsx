import type { Step } from '../types'
import { isQaAnswerCorrect } from '../lib/qaGrading'

interface Attempt {
  answers: unknown
  score: number | null
  submitted_at: string
}

interface Props {
  step: Step
  attempt: Attempt | undefined
}

function wordBankIsCorrect(input: string, answer: string) {
  const norm = input.toLowerCase().trim()
  if (answer.includes(' / ')) {
    return answer.split(' / ').map(s => s.toLowerCase().trim()).every(p => norm.includes(p))
  }
  return norm === answer.toLowerCase()
}

export default function ExerciseReview({ step, attempt }: Props) {
  if (!attempt) {
    return <p className="text-sm text-slate-400 italic">Not attempted yet.</p>
  }

  if (step.kind === 'info' || step.kind === 'noticeListen') {
    return <p className="text-sm text-slate-500">✓ Viewed {new Date(attempt.submitted_at).toLocaleDateString()}</p>
  }

  if (step.kind === 'mcq') {
    const selected = (attempt.answers ?? {}) as Record<number, string>
    return (
      <div className="space-y-3">
        {step.questions.map(q => (
          <div key={q.number} className="text-sm">
            <p className="font-medium text-slate-800 mb-1">{q.number}. <span dangerouslySetInnerHTML={{ __html: q.stem }} /></p>
            <div className="flex flex-wrap gap-2">
              {q.options.map(opt => {
                const isSelected = selected[q.number] === opt
                const isCorrect = opt === q.answer
                let cls = 'px-3 py-1 rounded-full border text-xs font-medium '
                if (isSelected && isCorrect) cls += 'bg-green-500 border-green-500 text-white'
                else if (isSelected && !isCorrect) cls += 'bg-red-400 border-red-400 text-white'
                else if (!isSelected && isCorrect) cls += 'bg-green-100 border-green-400 text-green-800'
                else cls += 'border-slate-200 text-slate-400'
                return <span key={opt} className={cls}>{opt}</span>
              })}
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (step.kind === 'gapFill') {
    const inputs = (attempt.answers ?? []) as string[][]
    return (
      <div className="space-y-2">
        {step.questions.map((q, qi) => (
          <p key={q.number} className="text-sm text-slate-800">
            <span className="text-slate-500 font-medium mr-1">{q.number}.</span>
            {q.text.split('___').map((part, i) => (
              <span key={i}>
                {part}
                {i < q.answers.length && (
                  <span className={
                    (inputs[qi]?.[i] ?? '').toLowerCase().trim() === q.answers[i].toLowerCase()
                      ? 'text-green-700 font-medium mx-0.5'
                      : 'text-red-600 font-medium mx-0.5'
                  }>
                    {inputs[qi]?.[i] || '(blank)'}
                  </span>
                )}
              </span>
            ))}
            <span className="text-xs text-slate-400 ml-1">— correct: {q.answers.join(' / ')}</span>
          </p>
        ))}
      </div>
    )
  }

  if (step.kind === 'qa') {
    const answers = (attempt.answers ?? []) as string[]
    return (
      <div className="space-y-3">
        {step.questions.map((q, i) => {
          if (q.modelAnswer === undefined) {
            return (
              <div key={q.number} className="text-sm">
                <p className="font-medium text-slate-800 mb-1">{q.number}. {q.question}</p>
                <p className="text-teal-700">
                  {answers[i] || <em className="text-teal-400">left blank</em>}
                </p>
              </div>
            )
          }
          const correct = isQaAnswerCorrect(answers[i] ?? '', q.modelAnswer)
          return (
            <div key={q.number} className="text-sm">
              <p className="font-medium text-slate-800 mb-1">{q.number}. {q.question}</p>
              <p className={correct ? 'text-green-700' : 'text-red-600'}>
                {answers[i] || <em className="text-red-400">left blank</em>}
              </p>
              <p className="text-xs text-slate-400">Model answer: {q.modelAnswer}</p>
            </div>
          )
        })}
      </div>
    )
  }

  if (step.kind === 'wordBank') {
    const inputs = (attempt.answers ?? []) as string[]
    return (
      <div className="space-y-2">
        {step.questions.map((q, qi) => (
          <p key={q.number} className="text-sm text-slate-800">
            <span className="text-slate-500 font-medium mr-1">{q.number}.</span>
            {q.text.split('___')[0]}
            <span className={wordBankIsCorrect(inputs[qi] ?? '', q.answer) ? 'text-green-700 font-medium mx-0.5' : 'text-red-600 font-medium mx-0.5'}>
              {inputs[qi] || '(blank)'}
            </span>
            {q.text.split('___')[1]}
            <span className="text-xs text-slate-400 ml-1">— correct: {q.answer}</span>
          </p>
        ))}
      </div>
    )
  }

  return null
}
