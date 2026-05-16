'use client'

import { useEffect } from 'react'

/**
 * Registers the KofferKlar service worker so users can install the site as a
 * PWA and read /ratgeber posts offline. Skips registration in non-production
 * builds (dev/localhost) to avoid cache pollution during development.
 */
export default function PWARegister(): null {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!('serviceWorker' in navigator)) return

    if (process.env.NODE_ENV !== 'production') {
      console.info('[PWA] Service Worker registration skipped (dev mode).')
      return
    }

    const register = () => {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .catch((err) => {
          console.warn('[PWA] Service Worker registration failed:', err)
        })
    }

    // Defer until the browser is idle so we don't compete with hydration/LCP
    const idle = (
      window as Window & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
      }
    ).requestIdleCallback

    if (typeof idle === 'function') {
      idle(register, { timeout: 4000 })
    } else {
      window.setTimeout(register, 2000)
    }
  }, [])

  return null
}
