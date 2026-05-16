'use client'

import { useEffect, useState } from 'react'

/**
 * Reading Progress Bar
 * Sits below the sticky header (top-[72px]) and fills as the user scrolls the article.
 */
export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handler = () => {
      const doc = document.documentElement
      const scrollTop = window.scrollY || doc.scrollTop
      const max = (doc.scrollHeight - doc.clientHeight) || 1
      const pct = Math.min(100, Math.max(0, (scrollTop / max) * 100))
      setProgress(pct)
    }
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    window.addEventListener('resize', handler)
    return () => {
      window.removeEventListener('scroll', handler)
      window.removeEventListener('resize', handler)
    }
  }, [])

  return (
    <div
      className="fixed top-[72px] left-0 right-0 h-[2px] z-40 pointer-events-none bg-transparent"
      aria-hidden
    >
      <div
        className="h-full bg-accent will-change-transform origin-left transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
