'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import type { SetPart } from '@/lib/sanity/types'

interface SetOverviewProps {
  parts: SetPart[]
}

function getPartIcon(partName: string): React.ReactNode {
  const name = partName.toLowerCase()

  // XL cube — must come before L check
  if (name.includes('xl')) return (
    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="6" y="10" width="28" height="22" rx="2"/>
      <path d="M6 16h28"/>
      <path d="M14 10V6h12v4"/>
    </svg>
  )

  // L cube
  if (name.includes(' l') || name.endsWith(' l') || name === 'packwürfel l') return (
    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="8" y="11" width="24" height="20" rx="2"/>
      <path d="M8 17h24"/>
      <path d="M15 11V7h10v4"/>
    </svg>
  )

  // M cube
  if (name.includes(' m') || name.endsWith(' m') || name === 'packwürfel m') return (
    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="12" width="22" height="18" rx="2"/>
      <path d="M9 18h22"/>
      <path d="M15 12V8h10v4"/>
    </svg>
  )

  // Shoe bag / Schuhbeutel
  if (name.includes('schuh')) return (
    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 28l4-14h16l4 14H8z"/>
      <path d="M12 14c0-4 16-4 16 0"/>
      <path d="M10 22h20"/>
    </svg>
  )

  // Toiletry bag / Kulturbeutel
  if (name.includes('kultur')) return (
    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="7" y="16" width="26" height="18" rx="3"/>
      <path d="M13 16v-4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4"/>
      <path d="M20 22v6"/>
      <path d="M17 25h6"/>
    </svg>
  )

  // Laundry bag / Wäschebeutel
  if (name.includes('wäsche')) return (
    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 8h12l3 5v19a2 2 0 0 1-2 2H13a2 2 0 0 1-2-2V13l3-5z"/>
      <path d="M11 13h18"/>
      <path d="M20 18v10"/>
      <path d="M16 22l4-4 4 4"/>
    </svg>
  )

  // S cube — default fallback (also catches "s (1)" and "s (2)")
  return (
    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="11" y="13" width="18" height="16" rx="2"/>
      <path d="M11 19h18"/>
      <path d="M16 13V9h8v4"/>
    </svg>
  )
}

const MAGNETIC_RADIUS = 140
const MAGNETIC_MAX_TRANSLATE = 10

export default function SetOverview({ parts }: SetOverviewProps) {
  const gridRef = useRef<HTMLDivElement | null>(null)
  const cardsRef = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    // Skip magnetic effect on touch devices and when reduced motion is requested
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (coarsePointer || reducedMotion) return

    let rafId: number | null = null
    let pointerX = 0
    let pointerY = 0
    let active = false

    const apply = () => {
      rafId = null
      const cards = cardsRef.current
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i]
        if (!card) continue
        const rect = card.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = pointerX - cx
        const dy = pointerY - cy
        const dist = Math.hypot(dx, dy)

        if (active && dist < MAGNETIC_RADIUS) {
          const falloff = 1 - dist / MAGNETIC_RADIUS
          const tx = (dx / MAGNETIC_RADIUS) * MAGNETIC_MAX_TRANSLATE * falloff * 2
          const ty = (dy / MAGNETIC_RADIUS) * MAGNETIC_MAX_TRANSLATE * falloff * 2
          const clampedX = Math.max(-MAGNETIC_MAX_TRANSLATE, Math.min(MAGNETIC_MAX_TRANSLATE, tx))
          const clampedY = Math.max(-MAGNETIC_MAX_TRANSLATE, Math.min(MAGNETIC_MAX_TRANSLATE, ty))
          card.style.transform = `translate3d(${clampedX.toFixed(2)}px, ${clampedY.toFixed(2)}px, 0)`
        } else {
          card.style.transform = 'translate3d(0, 0, 0)'
        }
      }
    }

    const schedule = () => {
      if (rafId !== null) return
      rafId = window.requestAnimationFrame(apply)
    }

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      pointerX = e.clientX
      pointerY = e.clientY
      active = true
      schedule()
    }

    const handlePointerLeave = () => {
      active = false
      schedule()
    }

    grid.addEventListener('pointermove', handlePointerMove)
    grid.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      grid.removeEventListener('pointermove', handlePointerMove)
      grid.removeEventListener('pointerleave', handlePointerLeave)
      if (rafId !== null) window.cancelAnimationFrame(rafId)
      // Reset any lingering transforms
      cardsRef.current.forEach((card) => {
        if (card) card.style.transform = ''
      })
    }
  }, [parts])

  if (!parts || parts.length === 0) return null

  return (
    <section aria-label="Set-Übersicht">
      <div className="flex items-end justify-between mb-8 gap-6 flex-wrap">
        <div>
          <div className="inline-flex items-center gap-2 text-accent text-[10px] font-bold tracking-[0.3em] uppercase mb-3">
            <span className="w-6 h-px bg-accent" /> 8-teiliges Set
          </div>
          <h2 className="font-serif text-balance text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-[1.05] tracking-tightest">
            Das Set im <em className="font-handwrite text-primary">Überblick.</em>
          </h2>
        </div>
        <p className="text-sm text-muted-foreground max-w-xs">
          Acht durchdacht abgestimmte Teile, für jede Reisesituation der passende Begleiter.
        </p>
      </div>
      <div
        ref={gridRef}
        className={[
          // Mobile: native snap carousel for app-like feel
          'flex md:grid md:grid-cols-4',
          'gap-3 md:gap-5',
          'snap-x snap-mandatory overflow-x-auto md:overflow-visible',
          '-mx-4 px-4 md:mx-0 md:px-0 no-scrollbar',
          'scroll-pl-4 md:scroll-pl-0',
        ].join(' ')}
      >
        {parts.map((part, index) => (
          <div
            key={index}
            ref={(el) => {
              cardsRef.current[index] = el
            }}
            style={{
              willChange: 'transform',
              transition: 'transform 350ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className={[
              'group relative bg-white rounded-3xl p-5 flex flex-col items-center text-center gap-3',
              'border border-black/[0.05] shadow-soft lift overflow-hidden',
              // Mobile snap sizing
              'snap-start shrink-0 basis-[62%] min-w-[62%] md:basis-auto md:min-w-0',
            ].join(' ')}
          >
            {/* Subtle hover wash */}
            <span className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {part.icon?.asset ? (
              <div className="relative w-16 h-16">
                <Image
                  src={urlFor(part.icon).width(64).height(64).url()}
                  alt={part.partName}
                  fill
                  className="object-contain"
                  sizes="64px"
                />
              </div>
            ) : (
              <div className="w-16 h-16 flex items-center justify-center bg-primary/5 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                {getPartIcon(part.partName)}
              </div>
            )}

            <p className="relative font-semibold text-sm text-foreground leading-tight">{part.partName}</p>

            {part.dimensions && (
              <p className="relative text-[11px] font-mono tabular-nums text-muted-foreground">{part.dimensions}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
