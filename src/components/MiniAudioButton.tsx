import { useRef, useState } from 'react'

interface Props {
  src: string
  label: string
}

// A compact play button for a single short example clip — no seek bar or
// speed control, unlike the full AudioPlayer used for track-length audio.
export default function MiniAudioButton({ src, label }: Props) {
  const ref = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [missing, setMissing] = useState(false)

  function toggle() {
    const el = ref.current
    if (!el || missing) return
    if (playing) { el.pause(); setPlaying(false) }
    else { el.currentTime = 0; el.play().catch(() => setMissing(true)); setPlaying(true) }
  }

  return (
    <button
      onClick={toggle}
      disabled={missing}
      className={[
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-sm font-medium transition-colors',
        missing
          ? 'border-amber-200 text-amber-500 cursor-not-allowed'
          : 'border-teal-300 text-teal-700 hover:bg-teal-50',
      ].join(' ')}
    >
      <audio
        ref={ref}
        src={src}
        onEnded={() => setPlaying(false)}
        onError={() => setMissing(true)}
      />
      <span>{missing ? '🎵' : playing ? '⏸' : '▶'}</span>
      {label}
    </button>
  )
}
