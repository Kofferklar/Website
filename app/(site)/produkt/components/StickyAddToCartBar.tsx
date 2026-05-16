'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCart } from '@/app/(site)/components/CartProvider'

interface StickyAddToCartBarProps {
  name: string
  price: number
  imageUrl: string
}

export default function StickyAddToCartBar({
  name,
  price,
  imageUrl,
}: StickyAddToCartBarProps) {
  const { addToCart } = useCart()
  const router = useRouter()
  const [visible, setVisible] = useState(false)
  const [added, setAdded] = useState(false)
  const [feedback, setFeedback] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  // Detect reduced-motion preference
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Observe #kaufbereich sentinel — show bar after hero leaves viewport
  useEffect(() => {
    if (typeof window === 'undefined') return
    const target = document.getElementById('kaufbereich')
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hero still partially visible → hide; hero scrolled past → show
        const bottomAboveViewport =
          entry.boundingClientRect.bottom < 0
        setVisible(!entry.isIntersecting && bottomAboveViewport)
      },
      { threshold: 0, rootMargin: '0px 0px -80% 0px' },
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  // Reset "Hinzugefügt ✓" feedback after a short moment
  useEffect(() => {
    if (!feedback) return
    const id = setTimeout(() => setFeedback(false), 900)
    return () => clearTimeout(id)
  }, [feedback])

  const handleClick = () => {
    if (added && !feedback) {
      router.push('/checkout')
      return
    }
    addToCart({
      color: 'Standard',
      colorLabel: 'Standard',
      price: price ?? 0,
    })
    setAdded(true)
    setFeedback(true)
  }

  const buttonLabel = feedback
    ? 'Hinzugefügt ✓'
    : added
      ? 'Zur Kasse →'
      : 'In den Warenkorb'

  const translateClass = reducedMotion
    ? 'translate-y-0'
    : visible
      ? 'translate-y-0'
      : 'translate-y-[140%]'

  return (
    <div
      role="region"
      aria-label="Schnellkauf"
      aria-hidden={!visible}
      className={[
        'md:hidden fixed inset-x-0 bottom-0 z-40',
        'px-3 pt-2',
        'pb-[calc(env(safe-area-inset-bottom,0px)+0.625rem)]',
        'transition-transform duration-500 ease-out will-change-transform',
        translateClass,
      ].join(' ')}
      style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
    >
      <div className="mx-auto max-w-md rounded-3xl bg-white/85 backdrop-blur-xl backdrop-saturate-150 ring-1 ring-black/5 shadow-elevated">
        <div className="flex items-center gap-3 p-2.5">
          {/* Thumbnail */}
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl bg-muted ring-1 ring-black/5">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={name}
                fill
                sizes="48px"
                className="object-cover"
              />
            ) : null}
          </div>

          {/* Name + Preis */}
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-[13px] font-semibold text-foreground">
              {name}
            </p>
            <p className="mt-0.5 text-[12px] font-bold text-foreground">
              {price ? `${price.toFixed(2).replace('.', ',')} €` : '–'}
              <span className="ml-1 text-[10px] font-medium text-muted-foreground">
                inkl. MwSt.
              </span>
            </p>
          </div>

          {/* CTA */}
          <button
            type="button"
            onClick={handleClick}
            className={[
              'shrink-0 rounded-full px-4 py-3 text-[13px] font-bold',
              'bg-primary text-primary-foreground',
              'shadow-lg shadow-primary/20',
              'active:scale-[0.97] transition-all duration-300',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
            ].join(' ')}
            style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
