'use client'

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react'

interface Tilt3DProps {
  children: ReactNode
  maxTilt?: number
  scale?: number
  glare?: boolean
  className?: string
  style?: CSSProperties
}

export default function Tilt3D({
  children,
  maxTilt = 6,
  scale = 1.02,
  glare = true,
  className,
  style,
}: Tilt3DProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const targetRef = useRef<{ x: number; y: number; gx: number; gy: number } | null>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return

    const finePointer = window.matchMedia('(pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const update = () => {
      setEnabled(finePointer.matches && !reducedMotion.matches)
    }

    update()

    finePointer.addEventListener('change', update)
    reducedMotion.addEventListener('change', update)

    return () => {
      finePointer.removeEventListener('change', update)
      reducedMotion.removeEventListener('change', update)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [])

  const applyTransform = useCallback(
    (nx: number, ny: number, gx: number, gy: number, withTransition: boolean) => {
      const el = wrapperRef.current
      if (!el) return

      const rotateY = nx * maxTilt
      const rotateX = -ny * maxTilt

      el.style.transition = withTransition
        ? 'transform 600ms cubic-bezier(0.16, 1, 0.3, 1)'
        : 'transform 0ms linear'
      el.style.transform = `perspective(1200px) rotateX(${rotateX.toFixed(3)}deg) rotateY(${rotateY.toFixed(3)}deg) scale(${withTransition ? 1 : scale})`

      const glareEl = glareRef.current
      if (glareEl) {
        if (withTransition) {
          glareEl.style.transition = 'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1)'
          glareEl.style.opacity = '0'
        } else {
          glareEl.style.transition = 'opacity 0ms linear'
          glareEl.style.opacity = '1'
          glareEl.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.12) 25%, rgba(255,255,255,0) 60%)`
        }
      }
    },
    [maxTilt, scale],
  )

  const flush = useCallback(() => {
    rafRef.current = null
    const t = targetRef.current
    if (!t) return
    applyTransform(t.x, t.y, t.gx, t.gy, false)
  }, [applyTransform])

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!enabled) return
      const el = wrapperRef.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return

      const px = (event.clientX - rect.left) / rect.width
      const py = (event.clientY - rect.top) / rect.height
      const nx = Math.max(-1, Math.min(1, px * 2 - 1))
      const ny = Math.max(-1, Math.min(1, py * 2 - 1))

      targetRef.current = {
        x: nx,
        y: ny,
        gx: px * 100,
        gy: py * 100,
      }

      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(flush)
      }
    },
    [enabled, flush],
  )

  const handlePointerLeave = useCallback(() => {
    if (!enabled) return
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    targetRef.current = null
    applyTransform(0, 0, 50, 50, true)
  }, [enabled, applyTransform])

  const handlePointerEnter = useCallback(() => {
    if (!enabled) return
    const el = wrapperRef.current
    if (!el) return
    el.style.transition = 'transform 0ms linear'
  }, [enabled])

  if (!enabled) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    )
  }

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{
        ...style,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        position: style?.position ?? 'relative',
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerEnter={handlePointerEnter}
    >
      {children}
      {glare ? (
        <div
          ref={glareRef}
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            borderRadius: 'inherit',
            opacity: 0,
            mixBlendMode: 'screen',
          }}
        />
      ) : null}
    </div>
  )
}
