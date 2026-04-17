import Image from 'next/image'
import { ShieldCheck, Truck, RotateCcw } from 'lucide-react'

interface BuyBlockProps {
  price?: number
  buyLink?: string
  material?: string
}

export default function BuyBlock({ price, buyLink, material }: BuyBlockProps) {
  return (
    <div className="sticky top-24 space-y-6">
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

      {/* CTA-Button */}
      <a
        href={buyLink ?? '#'}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center bg-primary text-primary-foreground px-8 py-4 rounded-full text-base font-semibold hover:bg-primary-600 active:scale-[0.98] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        aria-label="Jetzt kaufen — öffnet externen Shop"
      >
        Jetzt kaufen
      </a>

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
          <span>SSL-gesicherte Zahlung</span>
        </div>
      </div>

      {/* Material (optional — nur wenn vorhanden) */}
      {material && (
        <div className="text-sm text-muted-foreground border-t border-border pt-4">
          <span className="font-medium text-foreground">Material: </span>
          {material}
        </div>
      )}

      {/* Zahlungslogos */}
      <div className="border-t border-border pt-4">
        <p className="text-xs text-muted-foreground mb-3">Sichere Zahlung mit</p>
        <div className="flex items-center gap-3 flex-wrap">
          {[
            { src: '/icons/paypal.svg', alt: 'PayPal', w: 64, h: 20 },
            { src: '/icons/klarna.svg', alt: 'Klarna', w: 56, h: 20 },
            { src: '/icons/visa.svg', alt: 'Visa', w: 48, h: 16 },
            { src: '/icons/mastercard.svg', alt: 'Mastercard', w: 36, h: 22 },
          ].map((logo) => (
            <div key={logo.alt} className="bg-white rounded px-2 py-1 border border-border">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.w}
                height={logo.h}
                className="h-5 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
