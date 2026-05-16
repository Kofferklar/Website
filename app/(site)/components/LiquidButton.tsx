'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { useState, type ReactNode } from 'react'

interface LiquidButtonProps {
  href: string
  variant?: 'primary' | 'accent'
  className?: string
  children: ReactNode
  ariaLabel?: string
  prefetch?: boolean
}

const BASE_BLOB_D =
  'M0,40 C40,10 90,0 150,12 C210,24 260,8 320,18 C360,26 400,18 400,40 L400,80 L0,80 Z'

const ALT_BLOB_D =
  'M0,40 C50,30 100,52 160,40 C220,28 270,58 330,46 C370,38 400,52 400,40 L400,80 L0,80 Z'

const VARIANT_CLASSES: Record<NonNullable<LiquidButtonProps['variant']>, string> = {
  primary: 'bg-primary text-primary-foreground',
  accent: 'bg-accent text-accent-foreground',
}

const BASE_CLASSES =
  'relative inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-semibold overflow-hidden'

export default function LiquidButton({
  href,
  variant = 'primary',
  className,
  children,
  ariaLabel,
  prefetch,
}: LiquidButtonProps) {
  const [hover, setHover] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const targetD = !prefersReducedMotion && hover ? ALT_BLOB_D : BASE_BLOB_D

  const mergedClassName = [BASE_CLASSES, VARIANT_CLASSES[variant], className]
    .filter(Boolean)
    .join(' ')

  return (
    <Link
      href={href}
      prefetch={prefetch}
      aria-label={ariaLabel}
      className={mergedClassName}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 400 80"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full pointer-events-none"
      >
        <motion.path
          d={BASE_BLOB_D}
          fill="currentColor"
          fillOpacity={0.18}
          initial={false}
          animate={{ d: targetD }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      </svg>
      <span className="relative z-10 inline-flex items-center gap-3">{children}</span>
    </Link>
  )
}
