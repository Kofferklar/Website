'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

/**
 * Page transition shell for every navigation inside the (site) segment.
 * Skips the very first mount so the LCP image is never faded in —
 * keeps cold-load times unchanged. On subsequent route changes a
 * subtle fade + rise plays.
 */
export default function SiteTemplate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const firstMount = useRef(true)
  const [shouldAnimate, setShouldAnimate] = useState(false)

  useEffect(() => {
    if (firstMount.current) {
      firstMount.current = false
      return
    }
    setShouldAnimate(true)
  }, [pathname])

  return (
    <motion.div
      key={pathname}
      initial={shouldAnimate ? { opacity: 0, y: 8 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
