import type { InfoStep } from '../../types'
import AudioPlayer from '../AudioPlayer'

interface Props {
  step: InfoStep
  onComplete: () => void
}

export default function InfoCard({ step, onComplete }: Props) {
  return (
    <div className="space-y-4">
      {step.audioFile && (
        <AudioPlayer src={`/audio/${step.audioFile}`} label={step.audioLabel} />
      )}

      <p className="text-slate-600 text-sm leading-relaxed">{step.instruction}</p>

      <div className="space-y-2">
        {step.body.map((line, i) => (
          <p
            key={i}
            className="text-slate-700 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: line }}
          />
        ))}
      </div>

      {step.excerpts && step.excerpts.length > 0 && (
        <div className="pl-4 border-l-4 border-teal-300 space-y-1.5 my-3">
          {step.excerpts.map((ex, i) => (
            <p
              key={i}
              className="text-slate-600 text-sm italic leading-relaxed"
              dangerouslySetInnerHTML={{ __html: ex }}
            />
          ))}
        </div>
      )}

      <button
        onClick={onComplete}
        className="mt-2 w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-sm transition-colors"
      >
        Continue →
      </button>
    </div>
  )
}
