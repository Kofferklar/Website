'use client'

import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion'
import { Plane } from 'lucide-react'
import { useState, useMemo, useRef } from 'react'

/**
 * AirplaneScroll Component
 * Animates an airplane icon across the screen based on scroll progress.
 * The airplane always points in the direction of its flight path.
 */
export default function AirplaneScroll() {
  const { scrollYProgress } = useScroll()
  const [rotation, setRotation] = useState(0)
  const lastLatest = useRef(0)
  
  // Smooth the scroll progress for a more fluid flight path
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 25,
    damping: 35,
    restDelta: 0.001
  })

  // Define the flight path coordinates
  const points = useMemo(() => [
    { p: 0.00, x: 110, y: 5 },
    { p: 0.05, x: 90,  y: 10 },
    { p: 0.10, x: 50,  y: 20 },
    { p: 0.20, x: 10,  y: 30 },
    { p: 0.30, x: 30,  y: 40 },
    { p: 0.40, x: 80,  y: 50 },
    { p: 0.50, x: 60,  y: 60 },
    { p: 0.60, x: 5,   y: 70 },
    { p: 0.70, x: 40,  y: 80 },
    { p: 0.80, x: 85,  y: 85 },
    { p: 0.90, x: 50,  y: 90 },
    { p: 1.00, x: -20, y: 110 },
  ], [])

  const pValues = points.map(pt => pt.p)
  const xValues = points.map(pt => `${pt.x}vw`)
  const yValues = points.map(pt => `${pt.y}vh`)

  const x = useTransform(smoothProgress, pValues, xValues)
  const y = useTransform(smoothProgress, pValues, yValues)

  // Track the changes to calculate direction
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const isScrollingUp = latest < lastLatest.current
    lastLatest.current = latest

    // Find the current segment in our points array
    const index = points.findIndex(pt => pt.p >= latest)
    if (index > 0) {
      const p1 = points[index - 1]
      const p2 = points[index]
      
      const dx = p2.x - p1.x
      const dy = p2.y - p1.y
      
      let angle = Math.atan2(dy, dx) * (180 / Math.PI)
      
      // If scrolling up, flip the plane 180 degrees
      if (isScrollingUp) {
        angle += 180
      }
      
      // Offset by 45 because the icon itself is diagonal (points top-right)
      setRotation(angle + 45)
    }
  })

  // Scale and Opacity for depth and entry/exit
  const opacity = useTransform(smoothProgress, [0, 0.02, 0.98, 1], [0, 0.4, 0.4, 0])
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1.2, 0.8])

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      <motion.div
        style={{ 
          x, 
          y, 
          rotate: rotation, 
          opacity,
          scale
        }}
        className="text-primary/30 flex items-center justify-center w-16 h-16"
      >
        {/* The Plane Icon */}
        <Plane 
          size={40} 
          className="fill-current" 
          strokeWidth={1.5}
        />
        
        {/* Subtle trail effect */}
        <div className="absolute top-1/2 right-[10%] w-24 h-8 pointer-events-none -translate-y-1/2 rotate-180">
          <div className="w-full h-full bg-gradient-to-r from-primary/10 to-transparent blur-md rounded-full" />
        </div>

        {/* Animated wind lines */}
        <motion.div
          animate={{ x: [-10, 10, -10], opacity: [0, 0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-4 -left-8 w-12 h-[1px] bg-primary/20"
        />
        <motion.div
          animate={{ x: [10, -10, 10], opacity: [0, 0.3, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          className="absolute -bottom-2 -left-12 w-16 h-[1px] bg-primary/10"
        />
      </motion.div>
    </div>
  )
}
