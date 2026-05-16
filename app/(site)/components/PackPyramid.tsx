'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * Pure CSS 3D visualization of the 8-piece pack set as a stacked pyramid.
 * - 4 cubes on the base, 3 in the middle, 1 on top.
 * - Idle: slow ambient rotation.
 * - On scroll: rotateY tracks scrollY for an interactive feel.
 * - Respects prefers-reduced-motion.
 */

const PALETTE = ['#1E3A5F', '#C9A84C', '#F5F1E8', '#1E3A5F', '#C9A84C', '#F5F1E8', '#1E3A5F', '#C9A84C']

interface CubeProps {
  size: number
  x: number
  y: number
  z: number
  color: string
}

function Cube({ size, x, y, z, color }: CubeProps) {
  const half = size / 2
  const face: React.CSSProperties = {
    position: 'absolute',
    width: size,
    height: size,
    background: color,
    border: '1px solid rgba(0,0,0,0.08)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15)',
  }

  return (
    <div
      style={{
        position: 'absolute',
        width: size,
        height: size,
        transformStyle: 'preserve-3d',
        transform: `translate3d(${x}px, ${y}px, ${z}px)`,
        left: '50%',
        top: '50%',
        marginLeft: -half,
        marginTop: -half,
      }}
    >
      <div style={{ ...face, transform: `translateZ(${half}px)` }} />
      <div style={{ ...face, transform: `translateZ(${-half}px) rotateY(180deg)` }} />
      <div style={{ ...face, transform: `rotateY(90deg) translateZ(${half}px)`, filter: 'brightness(0.88)' }} />
      <div style={{ ...face, transform: `rotateY(-90deg) translateZ(${half}px)`, filter: 'brightness(0.88)' }} />
      <div style={{ ...face, transform: `rotateX(90deg) translateZ(${half}px)`, filter: 'brightness(1.12)' }} />
      <div style={{ ...face, transform: `rotateX(-90deg) translateZ(${half}px)`, filter: 'brightness(0.75)' }} />
    </div>
  )
}

export default function PackPyramid() {
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const stageRef = useRef<HTMLDivElement | null>(null)
  const [size, setSize] = useState(360)
  const reduced = useReducedMotion()

  useEffect(() => {
    const handle = () => setSize(window.innerWidth < 768 ? 260 : 360)
    handle()
    window.addEventListener('resize', handle)
    return () => window.removeEventListener('resize', handle)
  }, [])

  useEffect(() => {
    if (reduced) return
    let frame = 0
    let lastY = window.scrollY
    let rotY = 0

    const tick = () => {
      const stage = stageRef.current
      if (stage) {
        const dy = window.scrollY - lastY
        rotY += dy * 0.18
        lastY = window.scrollY
        stage.style.transform = `rotateX(-15deg) rotateY(${rotY}deg)`
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(frame)
  }, [reduced])

  // Pyramid geometry. Cube size relative to container; tighter on mobile.
  const cubeSize = Math.round(size * 0.18)
  const gap = cubeSize * 1.08
  const baseY = cubeSize * 1.1

  // 4 base + 3 middle + 1 top
  const positions: Array<{ x: number; y: number; z: number }> = [
    { x: -gap * 1.5, y: baseY, z: -gap * 0.6 },
    { x: -gap * 0.5, y: baseY, z: gap * 0.6 },
    { x: gap * 0.5, y: baseY, z: -gap * 0.6 },
    { x: gap * 1.5, y: baseY, z: gap * 0.6 },
    { x: -gap, y: 0, z: 0 },
    { x: 0, y: 0, z: gap * 0.4 },
    { x: gap, y: 0, z: -gap * 0.4 },
    { x: 0, y: -baseY, z: 0 },
  ]

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto"
      style={{ width: size, height: size, perspective: 1200 }}
    >
      <motion.div
        ref={stageRef}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: 'rotateX(-15deg) rotateY(0deg)',
        }}
        animate={reduced ? undefined : { rotateY: [0, 360] }}
        transition={reduced ? undefined : { duration: 40, ease: 'linear', repeat: Infinity }}
      >
        {positions.map((pos, i) => (
          <Cube
            key={i}
            size={cubeSize}
            x={pos.x}
            y={pos.y}
            z={pos.z}
            color={PALETTE[i % PALETTE.length]}
          />
        ))}
      </motion.div>

      {/* Soft ground shadow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full blur-2xl bg-black/20 pointer-events-none"
        style={{
          width: size * 0.7,
          height: size * 0.08,
          bottom: size * 0.06,
        }}
      />
    </div>
  )
}
