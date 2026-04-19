'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { urlFor } from '@/lib/sanity/image'
import type { SanityImage, ColorVariant } from '@/lib/sanity/types'

const BLUR_DATA_URL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='

interface ProductGalleryProps {
  images: SanityImage[]
  productName: string
  colorVariants?: ColorVariant[]
  selectedColorIndex?: number
  onColorChange?: (index: number) => void
}

/** Slide animation variants for the hero image slider */
const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
}

const slideTransition = { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }

export default function ProductGallery({
  images,
  productName,
  colorVariants,
  selectedColorIndex,
  onColorChange,
}: ProductGalleryProps) {
  // [activeIndex, direction] — typed as tuple to satisfy TS
  const [[activeIndex, direction], setPage] = useState<[number, number]>([0, 0])

  // Reset slider to first image when color variant changes
  useEffect(() => {
    setPage([0, 0])
  }, [selectedColorIndex])

  // Use variant images if available, fall back to product images
  const activeImages: SanityImage[] =
    colorVariants?.[selectedColorIndex ?? 0]?.images?.length
      ? (colorVariants[selectedColorIndex ?? 0].images as SanityImage[])
      : images

  // Navigate to a specific index with direction
  function goTo(index: number, dir: number) {
    setPage([index, dir])
  }

  function goPrev() {
    const prev = activeIndex - 1 < 0 ? activeImages.length - 1 : activeIndex - 1
    goTo(prev, -1)
  }

  function goNext() {
    const next = activeIndex + 1 > activeImages.length - 1 ? 0 : activeIndex + 1
    goTo(next, 1)
  }

  if (!activeImages || activeImages.length === 0) {
    return (
      <div className="w-full aspect-square md:aspect-[4/3] rounded-xl bg-muted flex items-center justify-center">
        <span className="text-muted-foreground text-sm">Kein Bild verfügbar</span>
      </div>
    )
  }

  const activeImage = activeImages[activeIndex]
  const mainImageUrl = activeImage?.asset
    ? urlFor(activeImage).width(800).height(600).url()
    : null

  return (
    <div className="w-full">
      {/* Color card grid */}
      {colorVariants && colorVariants.length > 1 && (
        <div className="flex flex-wrap gap-3 mb-4">
          {colorVariants.map((variant, i) => {
            const firstImageUrl = variant.images?.[0]?.asset
              ? urlFor(variant.images[0]).width(112).height(112).url()
              : null
            const isSelected = i === (selectedColorIndex ?? 0)

            return (
              <button
                key={variant.colorName}
                type="button"
                aria-label={`Farbe ${variant.colorName} wählen`}
                aria-pressed={isSelected}
                onClick={() => onColorChange?.(i)}
                disabled={!variant.inStock}
                className={[
                  'relative flex flex-col items-center gap-2 p-1.5 rounded-2xl border-2 transition-all duration-200',
                  'w-[72px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  !variant.inStock ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
                  isSelected
                    ? 'border-primary shadow-md'
                    : 'border-border hover:border-foreground/30',
                ].join(' ')}
              >
                {/* Image area: 56×56 */}
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                  {firstImageUrl ? (
                    <Image
                      src={firstImageUrl}
                      alt={variant.colorName}
                      fill
                      sizes="56px"
                      className="object-cover"
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                    />
                  ) : (
                    <div
                      className="w-full h-full"
                      style={{ backgroundColor: variant.colorHex }}
                    />
                  )}
                </div>
                {/* Color name label */}
                <span className="text-[10px] font-semibold text-foreground text-center leading-tight truncate w-full px-1">
                  {variant.colorName}
                </span>
              </button>
            )
          })}
        </div>
      )}

      {/* Hero image slider */}
      <div className="relative aspect-square md:aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted ring-1 ring-black/[0.06]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={slideTransition}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(_, info) => {
              if (info.offset.x < -50) goNext()
              else if (info.offset.x > 50) goPrev()
            }}
            className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
          >
            {mainImageUrl ? (
              <Image
                src={mainImageUrl}
                alt={activeImage?.alt ?? productName}
                fill
                priority={activeIndex === 0}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover pointer-events-none"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-muted-foreground text-sm">Bild wird geladen…</span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Desktop prev/next arrows */}
        {activeImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Vorheriges Bild"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/90 shadow-md items-center justify-center hover:bg-white transition-colors hidden md:flex"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Nächstes Bild"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/90 shadow-md items-center justify-center hover:bg-white transition-colors hidden md:flex"
            >
              <ChevronRight className="w-5 h-5 text-foreground" aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      {/* Pagination dots */}
      {activeImages.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-3">
          {activeImages.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i, i > activeIndex ? 1 : -1)}
              aria-label={`Bild ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'bg-primary w-4'
                  : 'w-1.5 bg-black/20 hover:bg-black/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
