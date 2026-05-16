'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Sitewide smooth-scroll wrapper.
 *
 * - Uses Lenis for inertia-based scrolling on desktop pointer devices.
 * - Disabled on touch (let the OS handle momentum) and reduced-motion.
 * - Cleans up on unmount.
 *
 * Renders nothing; just installs and ticks the scroller.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const pointerFine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!pointerFine || reduced) return

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      lerp: 0.1,
    })

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])

  return null
}
