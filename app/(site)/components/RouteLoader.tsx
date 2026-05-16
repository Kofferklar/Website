'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function RouteLoader() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const [enabled, setEnabled] = useState(false)

  const rampTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastKeyRef = useRef<string>('')

  useEffect(() => {
    if (typeof window === 'undefined') return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setEnabled(!reduced)
  }, [])

  const clearTimers = () => {
    if (rampTimerRef.current) {
      clearTimeout(rampTimerRef.current)
      rampTimerRef.current = null
    }
    if (fadeTimerRef.current) {
      clearTimeout(fadeTimerRef.current)
      fadeTimerRef.current = null
    }
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current)
      resetTimerRef.current = null
    }
  }

  const startLoading = () => {
    if (!enabled) return
    clearTimers()
    setVisible(true)
    setProgress(0)
    // next frame -> ramp to 80%
    requestAnimationFrame(() => {
      setProgress(0.8)
    })
  }

  const completeLoading = () => {
    if (!enabled) return
    requestAnimationFrame(() => {
      setProgress(1)
      fadeTimerRef.current = setTimeout(() => {
        setVisible(false)
        resetTimerRef.current = setTimeout(() => {
          setProgress(0)
        }, 200)
      }, 200)
    })
  }

  // Listen for clicks on internal anchor links to start the loader immediately.
  useEffect(() => {
    if (!enabled) return

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return
      if (e.button !== 0) return
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return

      const target = e.target as Element | null
      if (!target) return
      const anchor = target.closest('a') as HTMLAnchorElement | null
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href) return

      // Skip non-navigational
      if (
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        anchor.target === '_blank' ||
        anchor.hasAttribute('download')
      ) {
        return
      }

      try {
        const url = new URL(anchor.href, window.location.href)
        if (url.origin !== window.location.origin) return
        // Same URL? skip.
        if (
          url.pathname === window.location.pathname &&
          url.search === window.location.search
        ) {
          return
        }
        startLoading()
      } catch {
        // ignore
      }
    }

    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled])

  // When pathname / search changes, complete the loading.
  useEffect(() => {
    if (!enabled) return
    const key = `${pathname}?${searchParams?.toString() ?? ''}`
    if (lastKeyRef.current === '') {
      lastKeyRef.current = key
      return
    }
    if (key !== lastKeyRef.current) {
      lastKeyRef.current = key
      // If a load wasn't started (e.g., back/forward), start it briefly first.
      if (!visible) {
        startLoading()
        rampTimerRef.current = setTimeout(() => completeLoading(), 250)
      } else {
        completeLoading()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams, enabled])

  useEffect(() => {
    return () => clearTimers()
  }, [])

  if (!enabled) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-[2px] bg-accent"
      style={{
        transform: `scaleX(${progress})`,
        transformOrigin: 'left center',
        transition: 'transform 250ms ease-out, opacity 200ms ease-out',
        opacity: visible ? 1 : 0,
      }}
    />
  )
}
