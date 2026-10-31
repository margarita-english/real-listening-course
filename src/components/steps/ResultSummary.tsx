interface Props {
  correct: number
  total: number
  answered?: number  // defaults to total (every view requires all items before Check)
}

// Results panel shown after Check: correct count, % completed, % success.
export default function ResultSummary({ correct, total, answered = total }: Props) {
  const success = total > 0 ? Math.round((correct / total) * 100) : 0
  const completed = total > 0 ? Math.round((answered / total) * 100) : 0

  const tone =
    success >= 80
      ? { box: 'bg-green-50 border-green-300', text: 'text-green-700', bar: 'bg-green-500', message: success === 100 ? 'Excellent! Everything is correct.' : 'Great job!' }
      : success >= 50
        ? { box: 'bg-amber-50 border-amber-300', text: 'text-amber-700', bar: 'bg-amber-500', message: 'Good try! Look at the corrections above.' }
        : { box: 'bg-red-50 border-red-300', text: 'text-red-700', bar: 'bg-red-500', message: 'Keep practising. Look at the corrections above.' }

  return (
    <div role="status" className={`rounded-xl border-2 p-4 ${tone.box}`}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className={`text-2xl font-bold ${tone.text}`}>
            ✓ {correct} / {total} correct
          </p>
          <p className="text-sm text-slate-600 mt-0.5">{tone.message}</p>
        </div>
        <div className="text-right shrink-0">
          <p className={`text-3xl font-extrabold leading-none ${tone.text}`}>{success}%</p>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500 mt-1">success</p>
        </div>
      </div>

      <div className="mt-3 space-y-2">
        <Bar label="Completed" value={completed} color="bg-teal-500" />
        <Bar label="Success" value={success} color={tone.bar} />
      </div>
    </div>
  )
}

function Bar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div
        className="h-2.5 rounded-full bg-white/80 border border-slate-200 overflow-hidden"
        role="progressbar"
        aria-label={label}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}
