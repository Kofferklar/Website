'use client'

import Image from 'next/image'
import { useState } from 'react'
import { urlFor } from '@/lib/sanity/image'
import type { SanityImage } from '@/lib/sanity/types'

const BLUR_DATA_URL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='

interface ProductGalleryProps {
  images: SanityImage[]
  productName: string
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square md:aspect-[4/3] rounded-xl bg-muted flex items-center justify-center">
        <span className="text-muted-foreground text-sm">Kein Bild verfügbar</span>
      </div>
    )
  }

  const handleThumbnailClick = (index: number) => setActiveIndex(index)

  const activeImage = images[activeIndex]
  const mainImageUrl =
    activeImage?.asset ? urlFor(activeImage).width(800).height(600).url() : null

  const visibleThumbnails = images.slice(0, 4)

  return (
    <div className="w-full">
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
      {images.length > 1 && (
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
                aria-label={`Bild ${index + 1} von ${images.length} anzeigen`}
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
