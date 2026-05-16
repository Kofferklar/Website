'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

interface ConfettiEventDetail {
  x?: number
  y?: number
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  rotation: number
  rotationSpeed: number
  color: string
  life: number
  maxLife: number
  width: number
  height: number
}

const BRAND_COLORS = ['#C9A84C', '#1E3A5F', '#FAFAF8', '#FFFFFF']
const GRAVITY = 0.45
const PARTICLE_LIFETIME_MS = 1500
const PARTICLE_COUNT = 24

export function fireConfetti(opts?: { x?: number; y?: number }) {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent<ConfettiEventDetail>('kk:confetti', { detail: opts ?? {} }))
}

export default function Confetti() {
  const [mounted, setMounted] = useState(false)
  const [active, setActive] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number>(0)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!mounted) return

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const handler = (e: Event) => {
      if (prefersReducedMotion) return
      const evt = e as CustomEvent<ConfettiEventDetail>
      const detail = evt.detail ?? {}

      const originX = typeof detail.x === 'number' ? detail.x : window.innerWidth / 2
      const originY = typeof detail.y === 'number' ? detail.y : window.innerHeight / 2

      const newParticles: Particle[] = []
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = 4 + Math.random() * 6
        newParticles.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.4,
          color: BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)] as string,
          life: 0,
          maxLife: PARTICLE_LIFETIME_MS,
          width: 3,
          height: 6,
        })
      }
      particlesRef.current = [...particlesRef.current, ...newParticles]
      setActive(true)
    }

    window.addEventListener('kk:confetti', handler as EventListener)
    return () => window.removeEventListener('kk:confetti', handler as EventListener)
  }, [mounted])

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    lastTimeRef.current = performance.now()

    const loop = (now: number) => {
      const delta = now - lastTimeRef.current
      lastTimeRef.current = now

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const surviving: Particle[] = []
      for (const p of particlesRef.current) {
        p.life += delta
        if (p.life >= p.maxLife) continue

        p.vy += GRAVITY * (delta / 16.6667)
        p.x += p.vx * (delta / 16.6667)
        p.y += p.vy * (delta / 16.6667)
        p.rotation += p.rotationSpeed * (delta / 16.6667)

        const alpha = 1 - p.life / p.maxLife

        ctx.save()
        ctx.globalAlpha = Math.max(0, alpha)
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height)
        ctx.restore()

        surviving.push(p)
      }

      particlesRef.current = surviving

      if (surviving.length > 0) {
        rafRef.current = requestAnimationFrame(loop)
      } else {
        rafRef.current = null
        setActive(false)
      }
    }

    rafRef.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('resize', resize)
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [active])

  if (!mounted || !active) return null

  return createPortal(
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100]"
    />,
    document.body
  )
}
