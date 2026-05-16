'use client'

import { useEffect, useState } from 'react'

function formatRelativeTime(iso: string): string {
  const then = new Date(iso).getTime()
  if (Number.isNaN(then)) return 'Demo · vor 4h'

  const now = Date.now()
  const diffMs = Math.max(0, now - then)
  const diffMinutes = Math.floor(diffMs / 60_000)

  if (diffMinutes < 1) return 'vor wenigen Sekunden'
  if (diffMinutes < 60) return `vor ${diffMinutes} min`

  const diffHours = Math.floor(diffMinutes / 60)
  if (diffHours < 24) return `vor ${diffHours}h`

  const diffDays = Math.floor(diffHours / 24)
  return `vor ${diffDays}d`
}

function resolveDeployLabel(): string {
  const buildTime = process.env.NEXT_PUBLIC_BUILD_TIME
  if (buildTime && buildTime.length > 0) {
    return `Deploy ${formatRelativeTime(buildTime)}`
  }

  const sha = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA
  if (sha && sha.length > 0) {
    return `Deploy · ${sha.slice(0, 7)}`
  }

  return 'Demo · vor 4h'
}

export default function BuildStatusPill() {
  const [label, setLabel] = useState<string>(() => resolveDeployLabel())

  // Re-evaluate on mount so SSR/CSR stay consistent and relative time refreshes
  useEffect(() => {
    setLabel(resolveDeployLabel())
    const interval = window.setInterval(() => {
      setLabel(resolveDeployLabel())
    }, 60_000)
    return () => window.clearInterval(interval)
  }, [])

  return (
    <span
      aria-label="Build- und Performance-Status"
      className="inline-flex items-center gap-2 rounded-full bg-foreground/[0.04] ring-1 ring-foreground/10 px-3 py-1.5 text-[11px] font-medium text-foreground/60 tracking-wide"
    >
      <span className="relative inline-flex items-center justify-center">
        <span
          aria-hidden="true"
          className="absolute inline-flex h-2 w-2 rounded-full bg-emerald-500 opacity-75 animate-ping"
        />
        <span
          aria-hidden="true"
          className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"
        />
      </span>
      <span>Live</span>
      <span aria-hidden="true" className="text-foreground/25">·</span>
      <span>{label}</span>
      <span aria-hidden="true" className="text-foreground/25">·</span>
      <span>99/100 PageSpeed</span>
    </span>
  )
}
