'use client'

import { useEffect, useRef, useState } from 'react'

type AnimatedCounterProps = {
  to: number
  from?: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
  decimals?: number
}

const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3)

export default function AnimatedCounter({
  to,
  from = 0,
  duration = 1200,
  suffix = '',
  prefix = '',
  className = '',
  decimals = 0,
}: AnimatedCounterProps) {
  const spanRef = useRef<HTMLSpanElement | null>(null)
  const hasAnimatedRef = useRef(false)
  const rafRef = useRef<number | null>(null)
  const [value, setValue] = useState<number>(from)

  useEffect(() => {
    const node = spanRef.current
    if (!node) return

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const runAnimation = () => {
      if (hasAnimatedRef.current) return
      hasAnimatedRef.current = true

      if (prefersReducedMotion) {
        setValue(to)
        return
      }

      const start = performance.now()
      const delta = to - from

      const tick = (now: number) => {
        const elapsed = now - start
        const progress = Math.min(1, elapsed / duration)
        const eased = easeOutCubic(progress)
        setValue(from + delta * eased)

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick)
        } else {
          setValue(to)
          rafRef.current = null
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            runAnimation()
            observer.disconnect()
            break
          }
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [to, from, duration])

  const formatted = value.toLocaleString('de-DE', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span ref={spanRef} className={`tabular-nums ${className}`.trim()}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
