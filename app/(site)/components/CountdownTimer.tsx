'use client'

import { useEffect, useState } from 'react'

type Variant = 'banner' | 'card' | 'inline'

interface CountdownTimerProps {
  /** Visual variant. */
  variant?: Variant
  /** Optional German label shown next to the countdown (banner + inline). */
  label?: string
  /** Optional className passthrough for the outer wrapper. */
  className?: string
}

interface TimeParts {
  hours: number
  minutes: number
  seconds: number
}

/**
 * Returns time remaining until today 23:59:59 (local browser time).
 * When the target has already passed, rolls to the next day automatically.
 */
function computeRemaining(): TimeParts {
  const now = new Date()
  const target = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59,
    999,
  )
  let diff = target.getTime() - now.getTime()
  if (diff <= 0) {
    // Rolled past midnight, target next day.
    target.setDate(target.getDate() + 1)
    diff = target.getTime() - now.getTime()
  }
  const totalSeconds = Math.max(0, Math.floor(diff / 1000))
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return { hours, minutes, seconds }
}

function pad(value: number): string {
  return value.toString().padStart(2, '0')
}

/**
 * CountdownTimer
 * Live HH:MM:SS countdown that resets daily at 23:59:59 local time.
 * Renders a stable SSR placeholder, then computes the real value after mount
 * to avoid hydration mismatches.
 */
export default function CountdownTimer({
  variant = 'inline',
  label,
  className,
}: CountdownTimerProps) {
  const [mounted, setMounted] = useState(false)
  const [time, setTime] = useState<TimeParts>({ hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    setMounted(true)
    setTime(computeRemaining())
    const id = window.setInterval(() => {
      setTime(computeRemaining())
    }, 1000)
    return () => window.clearInterval(id)
  }, [])

  const hh = mounted ? pad(time.hours) : '--'
  const mm = mounted ? pad(time.minutes) : '--'
  const ss = mounted ? pad(time.seconds) : '--'

  if (variant === 'banner') {
    return (
      <span
        className={`inline-flex items-center gap-2 ${className ?? ''}`}
        aria-live="polite"
        aria-label={label ? `${label} ${hh}:${mm}:${ss}` : `${hh}:${mm}:${ss}`}
      >
        {label && (
          <span className="hidden sm:inline text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">
            {label}
          </span>
        )}
        <span className="inline-flex items-center gap-1 font-mono tabular-nums text-[11px] font-bold">
          <span className="rounded bg-white/15 px-1.5 py-0.5 text-white">{hh}</span>
          <span className="text-white/50">:</span>
          <span className="rounded bg-white/15 px-1.5 py-0.5 text-white">{mm}</span>
          <span className="text-white/50">:</span>
          <span
            key={ss}
            className="rounded bg-white/15 px-1.5 py-0.5 text-accent-200 kk-countdown-pulse"
          >
            {ss}
          </span>
        </span>
      </span>
    )
  }

  if (variant === 'card') {
    return (
      <div
        className={`inline-flex flex-col items-center gap-2 rounded-2xl border-2 border-accent/60 bg-primary p-4 text-primary-foreground shadow-soft ${className ?? ''}`}
        aria-live="polite"
        aria-label={label ? `${label} ${hh}:${mm}:${ss}` : `${hh}:${mm}:${ss}`}
      >
        {label && (
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent-200">
            {label}
          </span>
        )}
        <div className="flex items-end gap-2 font-mono tabular-nums">
          <div className="flex flex-col items-center">
            <span className="rounded-lg border border-accent/40 bg-white/10 px-3 py-2 text-3xl font-bold leading-none">
              {hh}
            </span>
            <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
              Std
            </span>
          </div>
          <span className="pb-6 text-2xl font-bold text-accent-200">:</span>
          <div className="flex flex-col items-center">
            <span className="rounded-lg border border-accent/40 bg-white/10 px-3 py-2 text-3xl font-bold leading-none">
              {mm}
            </span>
            <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
              Min
            </span>
          </div>
          <span className="pb-6 text-2xl font-bold text-accent-200">:</span>
          <div className="flex flex-col items-center">
            <span
              key={ss}
              className="rounded-lg border border-accent/40 bg-white/10 px-3 py-2 text-3xl font-bold leading-none kk-countdown-pulse"
            >
              {ss}
            </span>
            <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
              Sek
            </span>
          </div>
        </div>
      </div>
    )
  }

  // inline
  return (
    <span
      className={`inline-flex items-center gap-2 font-mono tabular-nums ${className ?? ''}`}
      aria-live="polite"
      aria-label={label ? `${label} ${hh}:${mm}:${ss}` : `${hh}:${mm}:${ss}`}
    >
      {label && (
        <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </span>
      )}
      <span className="text-sm font-bold text-primary">
        {hh}:{mm}:
        <span key={ss} className="kk-countdown-pulse inline-block">
          {ss}
        </span>
      </span>
    </span>
  )
}
