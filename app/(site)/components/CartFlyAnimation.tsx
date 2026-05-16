'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

interface FlyEventDetail {
  imageUrl: string
  originRect: DOMRect | { left: number; top: number; width: number; height: number }
}

interface FlightItem {
  id: number
  imageUrl: string
  startX: number
  startY: number
  startW: number
  startH: number
  midX: number
  midY: number
  endX: number
  endY: number
}

export default function CartFlyAnimation() {
  const [flights, setFlights] = useState<FlightItem[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const handler = (e: Event) => {
      const evt = e as CustomEvent<FlyEventDetail>
      const detail = evt.detail
      if (!detail?.imageUrl || !detail?.originRect) return

      // Reduced motion: skip animation, just bump cart
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.dispatchEvent(new CustomEvent('kk:cart-bumped'))
        return
      }

      const cartEl = document.querySelector('[data-cart-icon]') as HTMLElement | null
      if (!cartEl) {
        window.dispatchEvent(new CustomEvent('kk:cart-bumped'))
        return
      }

      const cartRect = cartEl.getBoundingClientRect()
      const origin = detail.originRect

      const startX = origin.left
      const startY = origin.top
      const endX = cartRect.left + cartRect.width / 2 - origin.width * 0.1
      const endY = cartRect.top + cartRect.height / 2 - origin.height * 0.1

      // Arc: midpoint lifted upward for a graceful parabola
      const midX = (startX + endX) / 2
      const midY = Math.min(startY, endY) - 120

      const id = Date.now() + Math.random()
      const item: FlightItem = {
        id,
        imageUrl: detail.imageUrl,
        startX,
        startY,
        startW: origin.width,
        startH: origin.height,
        midX,
        midY,
        endX,
        endY,
      }

      setFlights(prev => [...prev, item])
    }

    window.addEventListener('kk:fly-to-cart', handler as EventListener)
    return () => window.removeEventListener('kk:fly-to-cart', handler as EventListener)
  }, [])

  const removeFlight = (id: number) => {
    setFlights(prev => prev.filter(f => f.id !== id))
    window.dispatchEvent(new CustomEvent('kk:cart-bumped'))

    // Fire confetti at the cart icon's center to celebrate the add-to-cart.
    const cartEl = document.querySelector('[data-cart-icon]') as HTMLElement | null
    if (cartEl) {
      const r = cartEl.getBoundingClientRect()
      window.dispatchEvent(
        new CustomEvent('kk:confetti', {
          detail: { x: r.left + r.width / 2, y: r.top + r.height / 2 },
        })
      )
    }
  }

  if (!mounted) return null

  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-[300]" aria-hidden="true">
      <AnimatePresence>
        {flights.map((f) => (
          <motion.img
            key={f.id}
            src={f.imageUrl}
            alt=""
            initial={{
              x: f.startX,
              y: f.startY,
              width: f.startW,
              height: f.startH,
              scale: 1,
              opacity: 1,
              borderRadius: 16,
            }}
            animate={{
              x: [f.startX, f.midX, f.endX],
              y: [f.startY, f.midY, f.endY],
              scale: [1, 0.55, 0.2],
              opacity: [1, 1, 0.6],
              borderRadius: [16, 24, 999],
            }}
            transition={{
              duration: 0.7,
              ease: [0.34, 1.56, 0.64, 1],
              times: [0, 0.5, 1],
            }}
            onAnimationComplete={() => removeFlight(f.id)}
            style={{
              position: 'fixed',
              left: 0,
              top: 0,
              objectFit: 'cover',
              boxShadow: '0 20px 50px -10px rgba(0,0,0,0.35)',
              willChange: 'transform, opacity',
            }}
          />
        ))}
      </AnimatePresence>
    </div>,
    document.body
  )
}
