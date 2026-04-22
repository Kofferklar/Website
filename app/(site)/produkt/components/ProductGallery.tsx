'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { urlFor } from '@/lib/sanity/image'
import type { SanityImage, ColorVariant } from '@/lib/sanity/types'
import type { LocalImage } from '@/lib/product-images'


interface ProductGalleryProps {
  images: SanityImage[]
  localImages?: LocalImage[]
  productName: string
  colorVariants?: ColorVariant[]
  selectedColorIndex?: number
  onColorChange?: (index: number) => void
  fillHeight?: boolean
}

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%' }),
  center: { x: 0 },
  exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%' }),
}

const slideTransition = { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }

export default function ProductGallery({
  images,
  localImages,
  productName,
  colorVariants,
  selectedColorIndex,
  onColorChange,
  fillHeight,
}: ProductGalleryProps) {
  const [[activeIndex, direction], setPage] = useState<[number, number]>([0, 0])
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    setPage([0, 0])
  }, [selectedColorIndex])

  const useLocal = (localImages?.length ?? 0) > 0

  const activeImages: SanityImage[] = useLocal ? [] : (
    colorVariants?.[selectedColorIndex ?? 0]?.images?.length
      ? (colorVariants[selectedColorIndex ?? 0].images as SanityImage[])
      : images
  )

  const imageCount = useLocal ? (localImages?.length ?? 0) : activeImages.length

  function goTo(index: number, dir: number) {
    setPage([index, dir])
  }

  function goPrev() {
    const prev = activeIndex - 1 < 0 ? imageCount - 1 : activeIndex - 1
    goTo(prev, -1)
  }

  function goNext() {
    const next = activeIndex + 1 > imageCount - 1 ? 0 : activeIndex + 1
    goTo(next, 1)
  }

  useEffect(() => {
    if (!lightboxOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false)
      else if (e.key === 'ArrowRight') {
        const next = activeIndex + 1 > imageCount - 1 ? 0 : activeIndex + 1
        setPage([next, 1])
      } else if (e.key === 'ArrowLeft') {
        const prev = activeIndex - 1 < 0 ? imageCount - 1 : activeIndex - 1
        setPage([prev, -1])
      }
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightboxOpen, activeIndex, imageCount])

  const hasImages = imageCount > 0
  const activeImage = !useLocal && hasImages ? activeImages[activeIndex] : null
  const mainImageSrc = useLocal
    ? (localImages![activeIndex % imageCount]?.src ?? null)
    : (activeImage?.asset ? urlFor(activeImage).width(800).height(600).url() : null)
  const mainImageAlt = useLocal
    ? (localImages![activeIndex % imageCount]?.alt ?? productName)
    : (activeImage?.alt ?? productName)

  return (
    <div className={`w-full flex flex-col${fillHeight ? ' h-full min-h-0' : ''}`}>
      {/* Hero image slider */}
      <div
        className={[
          'relative w-full overflow-hidden rounded-xl bg-white',
          fillHeight ? 'flex-1 min-h-0' : 'aspect-square md:aspect-[4/3]',
        ].join(' ')}
      >
        {hasImages ? (
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
              onClick={() => setLightboxOpen(true)}
              className="absolute inset-0 w-full h-full cursor-zoom-in bg-white"
            >
              {mainImageSrc ? (
                <Image
                  src={mainImageSrc}
                  alt={mainImageAlt}
                  fill
                  priority={activeIndex === 0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover pointer-events-none"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">Bild wird geladen…</span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-muted-foreground text-sm">Kein Bild verfügbar</span>
          </div>
        )}

        {/* Desktop prev/next arrows */}
        {hasImages && imageCount > 1 && (
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
      {hasImages && imageCount > 1 && (
        <div className="flex justify-center gap-1.5 mt-2">
          {Array.from({ length: imageCount }, (_, i) => i).map((i) => (
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

      {/* Color card grid — compact */}
      {colorVariants && colorVariants.length > 1 && (
        <div className={`flex flex-wrap gap-2 pt-2${fillHeight ? '' : ' mt-1'}`}>
          {colorVariants.map((variant, i) => {
            const firstImageUrl = variant.images?.[0]?.asset
              ? urlFor(variant.images[0]).width(80).height(80).url()
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
                  'relative flex flex-col items-center gap-1 p-1 rounded-xl border-2 transition-all duration-200',
                  'w-[56px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  !variant.inStock ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
                  isSelected
                    ? 'border-primary shadow-sm'
                    : 'border-border hover:border-foreground/30',
                ].join(' ')}
              >
                <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  {firstImageUrl ? (
                    <Image
                      src={firstImageUrl}
                      alt={variant.colorName}
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full"
                      style={{ backgroundColor: variant.colorHex }}
                    />
                  )}
                </div>
                <span className="text-[9px] font-semibold text-foreground text-center leading-tight truncate w-full px-0.5">
                  {variant.colorName}
                </span>
              </button>
            )
          })}
        </div>
      )}

      {/* Lightbox */}
      {mounted && lightboxOpen && createPortal(
        <div
          className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            aria-label="Schließen"
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {imageCount > 1 && (
            <>
              <button
                type="button"
                aria-label="Vorheriges Bild"
                onClick={(e) => {
                  e.stopPropagation()
                  const prev = activeIndex - 1 < 0 ? imageCount - 1 : activeIndex - 1
                  setPage([prev, -1])
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                aria-label="Nächstes Bild"
                onClick={(e) => {
                  e.stopPropagation()
                  const next = activeIndex + 1 > imageCount - 1 ? 0 : activeIndex + 1
                  setPage([next, 1])
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <div
            className="relative w-[92vw] h-[88vh] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {mainImageSrc && (
              <Image
                src={mainImageSrc}
                alt={mainImageAlt}
                fill
                sizes="92vw"
                className="object-contain"
                priority
              />
            )}
          </div>

          {imageCount > 1 && (
            <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
              {Array.from({ length: imageCount }, (_, i) => i).map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setPage([i, i > activeIndex ? 1 : -1])
                  }}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === activeIndex ? 'bg-white w-6' : 'bg-white/40 w-3 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          )}
        </div>,
        document.body
      )}
    </div>
  )
}
