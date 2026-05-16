'use client'

import { useEffect, useRef, useState } from 'react'

interface CursorSpotlightProps {
  color?: string
  size?: number
}

export default function CursorSpotlight({
  color = 'rgba(201,168,76,0.18)',
  size = 500,
}: CursorSpotlightProps) {
  const spotlightRef = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const pendingCoords = useRef<{ x: number; y: number } | null>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setEnabled(fine && !reduced)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const spotlight = spotlightRef.current
    if (!spotlight) return
    const parent = spotlight.parentElement
    if (!parent) return

    const flush = () => {
      rafRef.current = null
      const coords = pendingCoords.current
      if (!coords) return
      spotlight.style.setProperty('--x', `${coords.x}px`)
      spotlight.style.setProperty('--y', `${coords.y}px`)
    }

    const onMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect()
      pendingCoords.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(flush)
      }
    }

    parent.addEventListener('mousemove', onMove)
    return () => {
      parent.removeEventListener('mousemove', onMove)
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={spotlightRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        background: `radial-gradient(circle ${size}px at var(--x) var(--y), ${color}, transparent 70%)`,
      }}
    />
  )
}
