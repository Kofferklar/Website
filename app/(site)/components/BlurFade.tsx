'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

interface BlurFadeProps {
  children: ReactNode
  delay?: number
  duration?: number
  y?: number
  blur?: number
  className?: string
  once?: boolean
}

export default function BlurFade({
  children,
  delay = 0,
  duration = 0.9,
  y = 14,
  blur = 8,
  className,
  once = true,
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, filter: `blur(${blur}px)` }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ delay, duration, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
