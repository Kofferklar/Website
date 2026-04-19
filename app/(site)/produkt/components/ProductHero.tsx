'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Truck, RotateCcw, ShieldCheck } from 'lucide-react'
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
    <section className="max-w-[1400px] mx-auto px-4 md:px-8">
      {/* ── MOBILE: 100svh hero ── */}
      <div className="md:hidden h-[calc(100svh-72px)] flex flex-col px-0 pt-4 pb-4 gap-3">
        {/* Heading */}
        <h1 className="font-serif text-3xl font-bold text-foreground leading-tight shrink-0">
          {product.name}
        </h1>

        {/* Gallery — fills remaining space */}
        <div className="flex-1 min-h-0">
          <ProductGallery
            fillHeight
            images={product.images ?? []}
            productName={product.name}
            colorVariants={product.colorVariants}
            selectedColorIndex={selectedColorIndex}
            onColorChange={setSelectedColorIndex}
          />
        </div>

        {/* Short description */}
        {product.shortDescription && (
          <p className="text-muted-foreground text-sm leading-relaxed shrink-0">
            {product.shortDescription}
          </p>
        )}

        {/* Price row */}
        <div className="flex items-baseline gap-2 shrink-0">
          <span className="font-serif text-3xl font-bold text-foreground">
            {product.price
              ? `${product.price.toFixed(2).replace('.', ',')} €`
              : '–'}
          </span>
          <span className="text-sm text-muted-foreground">inkl. MwSt.</span>
        </div>

        {/* CTA button */}
        <Link
          href="/checkout"
          className="block w-full text-center bg-primary text-primary-foreground px-8 py-4 rounded-full text-base font-semibold hover:bg-primary/95 active:scale-[0.98] transition-all duration-300 shadow-xl shadow-primary/20 shrink-0"
          style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
          aria-label="Jetzt kaufen"
        >
          Jetzt kaufen
        </Link>
      </div>

      {/* ── MOBILE: Below-fold section (trust / material / payment) ── */}
      <div className="md:hidden px-0 py-6 space-y-6 border-t border-border">
        {/* Trust badges */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Truck className="w-4 h-4 flex-shrink-0 text-foreground" aria-hidden="true" />
            <span>Kostenloser Versand ab 49&nbsp;€ · 2–4&nbsp;Werktage</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <RotateCcw className="w-4 h-4 flex-shrink-0 text-foreground" aria-hidden="true" />
            <span>30&nbsp;Tage Rückgabe — kein Aufwand</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <ShieldCheck className="w-4 h-4 flex-shrink-0 text-foreground" aria-hidden="true" />
            <span>Sicherer Bezahlvorgang</span>
          </div>
        </div>

        {/* Material */}
        {product.material && (
          <div className="text-sm text-muted-foreground border-t border-border pt-4">
            <span className="font-medium text-foreground block mb-1">Material:</span>
            {product.material.split('\n').filter(Boolean).map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </div>
        )}

        {/* Payment logos */}
        <div className="border-t border-border pt-4">
          <p className="text-xs text-muted-foreground mb-3">Sichere Zahlung mit</p>
          <div className="flex items-center gap-3 flex-wrap">
            {[
              { src: '/icons/paypal.svg',     alt: 'PayPal' },
              { src: '/icons/klarna.svg',     alt: 'Klarna' },
              { src: '/icons/visa.svg',       alt: 'Visa' },
              { src: '/icons/mastercard.svg', alt: 'Mastercard' },
            ].map((logo) => (
              <div key={logo.alt} className="h-8 w-14 flex items-center justify-center bg-white rounded border border-border px-1.5">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={48}
                  height={28}
                  className="max-h-[18px] w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile video — below fold */}
      {product.videoUrl && (
        <div className="md:hidden px-0 pb-8">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Video-Einblick
          </h3>
          <ProductVideo videoUrl={product.videoUrl} title={product.name} />
        </div>
      )}

      {/* Desktop 2-column grid */}
      <div className="hidden md:grid md:grid-cols-[1fr_380px] gap-12 lg:gap-20 items-start">
        {/* Left: full viewport-height flex column */}
        <div className="h-[calc(100svh-72px)] flex flex-col py-8 gap-4">
          {/* Heading — shrink-0 */}
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] shrink-0">
            {product.name}
          </h1>

          {/* Short description — shrink-0 */}
          {product.shortDescription && (
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl shrink-0">
              {product.shortDescription}
            </p>
          )}

          {/* Gallery — takes all remaining space */}
          <div className="flex-1 min-h-0">
            <ProductGallery
              fillHeight
              images={product.images ?? []}
              productName={product.name}
              colorVariants={product.colorVariants}
              selectedColorIndex={selectedColorIndex}
              onColorChange={setSelectedColorIndex}
            />
          </div>
        </div>

        {/* Right: BuyBlock sticky sidebar (unchanged) */}
        <aside className="h-full pt-8">
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

      {/* Video — below the 100svh section on desktop (outside the grid) */}
      {product.videoUrl && (
        <div className="hidden md:block pt-10 pb-8">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Video-Einblick
          </h3>
          <ProductVideo videoUrl={product.videoUrl} title={product.name} />
        </div>
      )}
    </section>
  )
}
