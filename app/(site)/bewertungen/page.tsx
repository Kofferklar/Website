import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getAllReviews } from '@/lib/sanity/queries'
import BewertungenClient from './components/BewertungenClient'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Alle Bewertungen | KofferKlar',
  description: 'Lies alle Kundenbewertungen für das KofferKlar Kompressions-Packwürfel-Set. Filtere nach Sternanzahl.',
}

export default async function BewertungenPage() {
  const reviews = await getAllReviews()

  return (
    <div className="pt-[72px]">
      <main id="main-content" className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">

          {/* Back link */}
          <Link
            href="https://kofferklar.vercel.app/produkt?utm_source=website&utm_medium=navigation&utm_campaign=kofferklar-launch"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors mb-12"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            Zurück zum Produkt
          </Link>

          {/* Header */}
          <div className="mb-16">
            <div className="text-accent text-[10px] font-bold tracking-[0.3em] uppercase mb-4">
              Social Proof
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1]">
              Was Reisende über <br />
              <span className="italic text-primary">KofferKlar sagen.</span>
            </h1>
          </div>

          <BewertungenClient reviews={reviews} reviewCount={reviews.length} />
        </div>
      </main>
    </div>
  )
}
