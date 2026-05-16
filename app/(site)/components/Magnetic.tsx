'use client'

import { useEffect, useRef, useState } from 'react'

interface MagneticProps {
  children: React.ReactNode
  /** Max pull distance in px. Default 14. */
  strength?: number
  /** Activation radius in px. Default 90. */
  radius?: number
  className?: string
}

/**
 * Wraps a CTA so the cursor exerts subtle magnetic pull within `radius`.
 * Touch + reduced-motion users get a no-op static wrapper.
 */
export default function Magnetic({
  children,
  strength = 14,
  radius = 90,
  className,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const hasPointer = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setEnabled(hasPointer && !reduced)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const el = ref.current
    if (!el) return

    let frame = 0
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy)
      if (dist > radius) {
        cancelAnimationFrame(frame)
        frame = requestAnimationFrame(() => {
          el.style.transform = 'translate3d(0,0,0)'
        })
        return
      }
      const falloff = 1 - dist / radius
      const tx = (dx / radius) * strength * falloff
      const ty = (dy / radius) * strength * falloff
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`
      })
    }

    const onLeave = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        el.style.transform = 'translate3d(0,0,0)'
      })
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onLeave, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(frame)
    }
  }, [enabled, radius, strength])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: enabled ? 'transform' : undefined,
        display: 'inline-block',
      }}
    >
      {children}
    </div>
  )
}
