import type { InfoStep, StepAttemptPayload } from '../../types'
import AudioPlayer from '../AudioPlayer'
import MiniAudioButton from '../MiniAudioButton'

interface Props {
  step: InfoStep
  onComplete: (payload: StepAttemptPayload) => void
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

      {step.sections && step.sections.length > 0 && (
        <div className="space-y-5">
          {step.sections.map((section, si) => (
            <div key={si} className="border border-slate-200 rounded-xl p-4 space-y-2.5">
              <h3 className="font-bold text-slate-900 text-sm">{section.heading}</h3>

              {section.body.map((line, i) => (
                <p
                  key={i}
                  className="text-slate-600 text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: line }}
                />
              ))}

              {section.examples && section.examples.length > 0 && (
                <div className="pl-4 border-l-4 border-teal-300 space-y-1.5">
                  {section.examples.map((ex, i) => (
                    <p
                      key={i}
                      className="text-slate-600 text-sm italic leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: ex }}
                    />
                  ))}
                </div>
              )}

              {section.audioExamples && section.audioExamples.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {section.audioExamples.map((ex, i) => (
                    <MiniAudioButton key={i} src={`/audio/${ex.audioFile}`} written={ex.written} ipa={ex.ipa} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => onComplete({ answers: null, score: null })}
        className="mt-2 w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-sm transition-colors"
      >
        Continue →
      </button>
    </div>
  )
}
