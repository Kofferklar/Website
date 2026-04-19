'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
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

export default function ProductGallery({
  images,
  productName,
  colorVariants,
  selectedColorIndex,
  onColorChange,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  // Reset thumbnail selection when color variant changes
  useEffect(() => {
    setActiveIndex(0)
  }, [selectedColorIndex])

  // Use variant images if available, fall back to product images
  const activeImages =
    colorVariants?.[selectedColorIndex ?? 0]?.images?.length
      ? colorVariants[selectedColorIndex ?? 0].images!
      : images

  if (!activeImages || activeImages.length === 0) {
    return (
      <div className="w-full aspect-square md:aspect-[4/3] rounded-xl bg-muted flex items-center justify-center">
        <span className="text-muted-foreground text-sm">Kein Bild verfügbar</span>
      </div>
    )
  }

  const handleThumbnailClick = (index: number) => setActiveIndex(index)

  const activeImage = activeImages[activeIndex]
  const mainImageUrl =
    activeImage?.asset ? urlFor(activeImage).width(800).height(600).url() : null

  const visibleThumbnails = activeImages.slice(0, 4)

  return (
    <div className="w-full">
      {/* Color dot selector (above thumbnail strip) */}
      {colorVariants && colorVariants.length > 1 && (
        <div className="flex items-center gap-2 mb-3">
          {colorVariants.map((variant, i) => (
            <button
              key={variant.colorName}
              type="button"
              title={variant.colorName}
              aria-label={`Farbe ${variant.colorName} wählen`}
              aria-pressed={i === (selectedColorIndex ?? 0)}
              onClick={() => onColorChange?.(i)}
              className={[
                'w-6 h-6 rounded-full border-2 transition-all duration-200',
                !variant.inStock ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
                i === (selectedColorIndex ?? 0)
                  ? 'border-primary scale-110'
                  : 'border-border hover:border-foreground/40',
              ].join(' ')}
              style={{ backgroundColor: variant.colorHex }}
              disabled={!variant.inStock}
            />
          ))}
        </div>
      )}

      {/* Main image */}
      <div className="relative aspect-square md:aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted ring-1 ring-black/[0.06]">
        {mainImageUrl ? (
          <Image
            src={mainImageUrl}
            alt={activeImage?.alt ?? productName}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-opacity duration-300"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-muted-foreground text-sm">Bild wird geladen…</span>
          </div>
        )}
      </div>

      {/* Thumbnail grid */}
      {activeImages.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-2">
          {visibleThumbnails.map((image, index) => {
            const thumbnailUrl = image?.asset
              ? urlFor(image).width(160).height(160).url()
              : null
            const isActive = index === activeIndex

            return (
              <button
                key={image.asset._ref}
                type="button"
                onClick={() => handleThumbnailClick(index)}
                aria-label={`Bild ${index + 1} von ${activeImages.length} anzeigen`}
                aria-pressed={isActive}
                className={[
                  'relative aspect-square overflow-hidden rounded-lg cursor-pointer',
                  'ring-2 transition-all duration-200',
                  isActive
                    ? 'ring-primary'
                    : 'ring-transparent hover:ring-accent',
                ].join(' ')}
              >
                {thumbnailUrl ? (
                  <Image
                    src={thumbnailUrl}
                    alt={image.alt ?? `${productName} — Bild ${index + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                  />
                ) : (
                  <div className="w-full h-full bg-muted" />
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
