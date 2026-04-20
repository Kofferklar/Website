'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ShieldCheck, Truck, RotateCcw } from 'lucide-react'
import type { ColorVariant } from '@/lib/sanity/types'
import { useCart } from '@/app/(site)/components/CartProvider'

interface BuyBlockProps {
  price?: number
  buyLink?: string
  material?: string
  shortDescription?: string
  colorVariants?: ColorVariant[]
  selectedColorIndex?: number
  onColorChange?: (index: number) => void
}

export default function BuyBlock({
  price,
  material,
  shortDescription,
  colorVariants,
  selectedColorIndex,
  onColorChange,
}: BuyBlockProps) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  // Feedback timeout with cleanup (prevents memory leak if user navigates away before 2s)
  useEffect(() => {
    if (!added) return
    const id = setTimeout(() => setAdded(false), 2000)
    return () => clearTimeout(id)
  }, [added])

  const handleAddToCart = () => {
    const variant = colorVariants?.[selectedColorIndex ?? 0]
    addToCart({
      color: variant?.colorName ?? 'Standard',
      colorLabel: variant?.colorName ?? 'Standard',
      price: price ?? 0,
      // qty omitted — defaults to 1 inside CartProvider.addToCart
    })
    setAdded(true)
  }

  return (
    <div className="md:sticky md:top-24 space-y-6">
      {/* Preis */}
      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2">
          Preis
        </p>
        <div className="flex items-baseline gap-2">
          <span className="font-serif text-4xl font-bold text-foreground">
            {price ? `${price.toFixed(2).replace('.', ',')} €` : '–'}
          </span>
          <span className="text-sm text-muted-foreground">inkl. MwSt.</span>
        </div>
      </div>

      {/* Kurzbeschreibung (mobile only — appears after price) */}
      {shortDescription && (
        <p className="md:hidden text-muted-foreground text-sm leading-relaxed">
          {shortDescription}
        </p>
      )}

      {/* Farbauswahl (desktop only — mobile uses gallery color cards) */}
      {colorVariants && colorVariants.length > 0 && (
        <div className="hidden md:block">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2">
            Farbe:{' '}
            <span className="text-foreground normal-case tracking-normal font-semibold">
              {colorVariants[selectedColorIndex ?? 0]?.colorName ?? ''}
            </span>
          </p>
          <div className="flex items-center gap-2">
            {colorVariants.map((variant, i) => (
              <button
                key={variant.colorName}
                type="button"
                title={variant.colorName}
                aria-label={`Farbe ${variant.colorName} wählen`}
                aria-pressed={i === (selectedColorIndex ?? 0)}
                onClick={() => onColorChange?.(i)}
                className={[
                  'w-7 h-7 rounded-full border-2 transition-all duration-200',
                  !variant.inStock ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
                  i === (selectedColorIndex ?? 0)
                    ? 'border-primary scale-110 shadow-md'
                    : 'border-border hover:border-foreground/40',
                ].join(' ')}
                style={{ backgroundColor: variant.colorHex }}
                disabled={!variant.inStock}
              />
            ))}
          </div>
        </div>
      )}

      {/* CTA-Button */}
      <button
        onClick={handleAddToCart}
        className="block w-full text-center bg-primary text-primary-foreground px-8 py-4 rounded-full text-base font-semibold hover:bg-primary/95 active:scale-[0.98] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 shadow-xl shadow-primary/20"
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        {added ? 'Hinzugefügt ✓' : 'In den Warenkorb'}
      </button>

      {/* Trust-Badges (Versand, Rückgabe, Sicherheit) */}
      <div className="space-y-3 border-t border-border pt-4">
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

      {/* Material (optional — nur wenn vorhanden) */}
      {material && (
        <div className="text-sm text-muted-foreground border-t border-border pt-4">
          <span className="font-medium text-foreground block mb-1">Material:</span>
          {material.split('\n').filter(Boolean).map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </div>
      )}

      {/* Zahlungslogos */}
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
  )
}
