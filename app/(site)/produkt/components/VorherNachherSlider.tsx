'use client'

import Image from 'next/image'
import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

interface VorherNachherSliderProps {
  beforeSrc?: string
  afterSrc?: string
  beforeAlt?: string
  afterAlt?: string
  initialPosition?: number // 0–100, default 50
}

// SVG placeholder data URIs for when no real images are provided
const BEFORE_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500' viewBox='0 0 800 500'%3E%3Crect width='800' height='500' fill='%23F2F2F0'/%3E%3Ctext x='400' y='240' text-anchor='middle' dominant-baseline='middle' fill='%236B7280' font-family='system-ui%2C sans-serif' font-size='22' font-weight='500'%3EVorher%3C/text%3E%3Ctext x='400' y='272' text-anchor='middle' dominant-baseline='middle' fill='%236B7280' font-family='system-ui%2C sans-serif' font-size='14'%3EKoffer ungepackt%3C/text%3E%3C/svg%3E"

const AFTER_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500' viewBox='0 0 800 500'%3E%3Crect width='800' height='500' fill='%23EEF3FA'/%3E%3Ctext x='400' y='240' text-anchor='middle' dominant-baseline='middle' fill='%231E3A5F' font-family='system-ui%2C sans-serif' font-size='22' font-weight='600'%3ENachher%3C/text%3E%3Ctext x='400' y='272' text-anchor='middle' dominant-baseline='middle' fill='%231E3A5F' font-family='system-ui%2C sans-serif' font-size='14'%3EMit KofferKlar gepackt%3C/text%3E%3C/svg%3E"

export default function VorherNachherSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = 'Vorher — Koffer ungepackt',
  afterAlt = 'Nachher — Koffer mit KofferKlar gepackt',
  initialPosition = 50,
}: VorherNachherSliderProps) {
  const [position, setPosition] = useState(initialPosition)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const beforeUrl = beforeSrc ?? BEFORE_PLACEHOLDER
  const afterUrl = afterSrc ?? AFTER_PLACEHOLDER

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setPosition((x / rect.width) * 100)
  }, [])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }, [])

  const handleContainerPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return
      updatePosition(e.clientX)
    },
    [updatePosition],
  )

  const handlePointerUp = useCallback(() => {
    isDragging.current = false
  }, [])

  return (
    <section aria-label="Vorher-Nachher-Vergleich" className="py-16 md:py-20">
      {/* Eyebrow tag */}
      <motion.div
        className="flex justify-center mb-5"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.18em] font-semibold bg-accent/10 text-accent border border-accent/20">
          Vorher / Nachher
        </span>
      </motion.div>

      <motion.h2
        className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-8 text-center"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
      >
        Der Unterschied ist spürbar
      </motion.h2>

      {/* Slider container — outer shell (double-bezel) */}
      <motion.div
        className="p-1.5 rounded-[2rem] bg-muted/40 ring-1 ring-black/5 mx-auto max-w-3xl"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Inner core — the actual slider */}
        <div
          ref={containerRef}
          className="relative w-full aspect-[4/3] md:aspect-video overflow-hidden rounded-[calc(2rem-0.375rem)] select-none cursor-col-resize"
          onPointerMove={handleContainerPointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          {/* Nachher-Bild (Basis — vollständig sichtbar) */}
          <Image
            src={afterUrl}
            alt={afterAlt}
            fill
            className="object-cover pointer-events-none"
            sizes="(max-width: 768px) 100vw, 80vw"
            priority
          />

          {/* Vorher-Bild (überlagert — durch clip-path auf linken Bereich begrenzt) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <Image
              src={beforeUrl}
              alt={beforeAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </div>

          {/* Labels */}
          <div
            className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full pointer-events-none"
            aria-hidden="true"
          >
            Vorher
          </div>
          <div
            className="absolute top-4 right-4 bg-primary/80 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full pointer-events-none"
            aria-hidden="true"
          >
            Nachher
          </div>

          {/* Divider-Linie */}
          <div
            className="absolute top-0 bottom-0 w-px bg-white/90 shadow-[0_0_8px_rgba(255,255,255,0.6)]"
            style={{ left: `${position}%` }}
            aria-hidden="true"
          >
            {/* Handle-Kreis — interaktiver Drag-Punkt */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-white rounded-full shadow-[0_2px_16px_rgba(0,0,0,0.18)] flex items-center justify-center cursor-col-resize touch-none"
              onPointerDown={handlePointerDown}
              role="slider"
              aria-label="Vergleichs-Schieberegler"
              aria-valuenow={Math.round(position)}
              aria-valuemin={0}
              aria-valuemax={100}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'ArrowLeft') setPosition((p) => Math.max(0, p - 5))
                if (e.key === 'ArrowRight') setPosition((p) => Math.min(100, p + 5))
              }}
            >
              {/* Chevron-Pfeile */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-foreground"
                aria-hidden="true"
              >
                <path d="m9 18 6-6-6-6" />
                <path d="m15 18-6-6 6-6" />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.p
        className="text-center text-xs text-muted-foreground mt-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        Schieberegler ziehen zum Vergleichen
      </motion.p>
    </section>
  )
}
