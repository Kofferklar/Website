'use client'

import { useEffect, useRef, useState } from 'react'

interface ScrollRailSection {
  id: string
  label: string
}

interface ScrollRailProps {
  sections: ScrollRailSection[]
}

/**
 * Sticky right-edge rail.
 * Single vertical line with dots positioned evenly along it.
 * Active dot expands; on hover, label flies in from the right.
 * Desktop-only; gated on pointer-fine + non-reduced-motion.
 */
export default function ScrollRail({ sections }: ScrollRailProps) {
  const [progress, setProgress] = useState(0)
  const [activeId, setActiveId] = useState<string | null>(sections[0]?.id ?? null)
  const [enabled, setEnabled] = useState(false)
  const tickingRef = useRef(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const pointer = window.matchMedia('(pointer: fine)').matches
    setEnabled(!reduced && pointer && window.innerWidth >= 1024)
  }, [])

  useEffect(() => {
    if (!enabled) return

    const onScroll = () => {
      if (tickingRef.current) return
      tickingRef.current = true
      requestAnimationFrame(() => {
        const doc = document.documentElement
        const scrolled = window.scrollY
        const max = doc.scrollHeight - window.innerHeight
        setProgress(max > 0 ? Math.min(1, scrolled / max) : 0)
        tickingRef.current = false
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [enabled])

  useEffect(() => {
    if (!enabled) return

    const observed = sections
      .map((s) => document.getElementById(s.id))
      .filter((n): n is HTMLElement => !!n)

    if (!observed.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-30% 0px -40% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    )

    observed.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  }, [enabled, sections])

  if (!enabled) return null

  const RAIL_HEIGHT = 240
  const lastIndex = Math.max(1, sections.length - 1)

  return (
    <aside
      aria-hidden="true"
      className="fixed right-5 top-1/2 -translate-y-1/2 z-30 hidden lg:block pointer-events-none"
      style={{ height: RAIL_HEIGHT }}
    >
      {/* Single vertical track */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-px bg-foreground/12 overflow-hidden"
        style={{ height: RAIL_HEIGHT }}
      >
        <div
          className="absolute inset-x-0 top-0 bg-gradient-to-b from-accent via-accent/80 to-primary"
          style={{
            height: `${progress * 100}%`,
            transition: 'height 0.18s linear',
          }}
        />
      </div>

      {/* Dots positioned along the same track */}
      <ul className="relative pointer-events-auto" style={{ height: RAIL_HEIGHT }}>
        {sections.map((s, i) => {
          const active = activeId === s.id
          const top = (i / lastIndex) * 100
          return (
            <li
              key={s.id}
              className="group absolute left-1/2 -translate-x-1/2"
              style={{ top: `${top}%`, transform: 'translate(-50%, -50%)' }}
            >
              <a
                href={`#${s.id}`}
                aria-label={s.label}
                className="block p-2 -m-2"
                onClick={(e) => {
                  const target = document.getElementById(s.id)
                  if (target) {
                    e.preventDefault()
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                }}
              >
                <span
                  className={[
                    'block rounded-full transition-all duration-300 ring-2 ring-background',
                    active
                      ? 'bg-accent w-2.5 h-2.5 shadow-glow-gold'
                      : 'bg-foreground/30 w-1.5 h-1.5 group-hover:bg-foreground/60',
                  ].join(' ')}
                  style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                />
              </a>
              <span
                className={[
                  'absolute right-5 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.22em] text-foreground/75',
                  'rounded-full bg-white/90 backdrop-blur px-2.5 py-1 ring-1 ring-black/5 shadow-soft',
                  'opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0',
                  'transition-all duration-300 pointer-events-none',
                ].join(' ')}
              >
                {s.label}
              </span>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
