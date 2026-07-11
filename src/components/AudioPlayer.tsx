import { useEffect, useRef, useState } from 'react'

interface Props {
  src: string
  label?: string
}

const SPEEDS = [1, 0.75, 0.5] as const
type Speed = typeof SPEEDS[number]

function formatTime(seconds: number) {
  if (!isFinite(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function AudioPlayer({ src, label }: Props) {
  const ref = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState<Speed>(1)
  const [missing, setMissing] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    setPlaying(false)
    setMissing(false)
    setDuration(0)
    setCurrentTime(0)
  }, [src])

  function togglePlay() {
    const el = ref.current
    if (!el || missing) return
    if (playing) { el.pause(); setPlaying(false) }
    else { el.play().catch(() => setMissing(true)); setPlaying(true) }
  }

  function replay() {
    const el = ref.current
    if (!el || missing) return
    el.currentTime = 0
    el.play().catch(() => setMissing(true))
    setPlaying(true)
  }

  function cycleSpeed() {
    const el = ref.current
    if (!el) return
    const next = SPEEDS[(SPEEDS.indexOf(speed) + 1) % SPEEDS.length]
    setSpeed(next)
    el.playbackRate = next
  }

  function seek(e: React.ChangeEvent<HTMLInputElement>) {
    const el = ref.current
    if (!el || missing) return
    const time = Number(e.target.value)
    el.currentTime = time
    setCurrentTime(time)
  }

  return (
    <div className="flex flex-col gap-1.5 px-3 py-2 bg-teal-50 border border-teal-200 rounded-xl text-sm">
      <audio
        ref={ref}
        src={src}
        onEnded={() => setPlaying(false)}
        onError={() => setMissing(true)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
      />

      {missing ? (
        <span className="text-amber-600 text-xs flex items-center gap-1">
          🎵 Audio not available yet — {label ?? 'audio file pending'}
        </span>
      ) : (
        <>
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-teal-600 hover:bg-teal-700 text-white transition-colors shrink-0"
              title={playing ? 'Pause' : 'Play'}
            >
              {playing ? '⏸' : '▶'}
            </button>

            <button
              onClick={replay}
              className="w-7 h-7 flex items-center justify-center rounded-full border border-teal-300 hover:bg-teal-100 text-teal-700 transition-colors text-xs shrink-0"
              title="Replay from start"
            >
              ↩
            </button>

            <button
              onClick={cycleSpeed}
              className="px-2 py-0.5 rounded border border-teal-300 hover:bg-teal-100 text-teal-700 text-xs font-mono transition-colors shrink-0"
              title="Change playback speed"
            >
              {speed}×
            </button>

            {label && <span className="text-teal-600 text-xs truncate">{label}</span>}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-teal-700 text-xs font-mono shrink-0 w-8 text-right">
              {formatTime(currentTime)}
            </span>

            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.01}
              value={currentTime}
              onChange={seek}
              className="flex-1 accent-teal-600 h-1 min-w-0"
              title="Seek to a moment in the audio"
            />

            <span className="text-teal-700 text-xs font-mono shrink-0 w-8">
              {formatTime(duration)}
            </span>
          </div>
        </>
      )}
    </div>
  )
}
