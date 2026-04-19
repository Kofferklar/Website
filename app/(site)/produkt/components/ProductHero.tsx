'use client'

import { useState } from 'react'
import ProductGallery from './ProductGallery'
import ProductVideo from './ProductVideo'
import BuyBlock from './BuyBlock'
import type { Product } from '@/lib/sanity/types'

interface ProductHeroProps {
  product: Product
}

export default function ProductHero({ product }: ProductHeroProps) {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0)

  return (
    <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 md:py-10">
      {/* Mobile layout */}
      <div className="md:hidden space-y-6 mb-8">
        <h1 className="font-serif text-3xl font-bold text-foreground">
          {product.name}
        </h1>
        <ProductGallery
          images={product.images ?? []}
          productName={product.name}
          colorVariants={product.colorVariants}
          selectedColorIndex={selectedColorIndex}
          onColorChange={setSelectedColorIndex}
        />
        <BuyBlock
          price={product.price}
          buyLink={product.buyLink}
          material={product.material}
          colorVariants={product.colorVariants}
          selectedColorIndex={selectedColorIndex}
          onColorChange={setSelectedColorIndex}
        />
        {product.shortDescription && (
          <p className="text-muted-foreground text-sm leading-relaxed">
            {product.shortDescription}
          </p>
        )}
        {product.videoUrl && (
          <div className="pt-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Video-Einblick</h3>
            <ProductVideo videoUrl={product.videoUrl} title={product.name} />
          </div>
        )}
      </div>

      {/* Desktop: 2-Spalten-Grid */}
      <div className="hidden md:grid md:grid-cols-[1fr_380px] gap-12 lg:gap-20 items-start">
        {/* Links: Info + Galerie + Video */}
        <div className="space-y-10">
          <div className="space-y-4">
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-foreground leading-[1.1]">
              {product.name}
            </h1>
            {product.shortDescription && (
              <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
                {product.shortDescription}
              </p>
            )}
          </div>

          <ProductGallery
            images={product.images ?? []}
            productName={product.name}
            colorVariants={product.colorVariants}
            selectedColorIndex={selectedColorIndex}
            onColorChange={setSelectedColorIndex}
          />

          {product.videoUrl && (
            <div className="pt-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                Video-Einblick
              </h3>
              <ProductVideo videoUrl={product.videoUrl} title={product.name} />
            </div>
          )}
        </div>

        {/* Rechts: BuyBlock (sticky) */}
        <aside className="h-full">
          <BuyBlock
            price={product.price}
            buyLink={product.buyLink}
            material={product.material}
            colorVariants={product.colorVariants}
            selectedColorIndex={selectedColorIndex}
            onColorChange={setSelectedColorIndex}
          />
        </aside>
      </div>

    </section>
  )
}
