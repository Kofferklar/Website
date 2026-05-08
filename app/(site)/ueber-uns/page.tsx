import type { Metadata } from 'next'
import Link from 'next/link'
import { getPageBySlug } from '@/lib/sanity/queries'
import FounderSection from './components/FounderSection'
import SustainabilityBlock from './components/SustainabilityBlock'
import PostBody from '../components/PostBody' // Reuse existing renderer

export const revalidate = 86400

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('ueber-uns')
  
  return {
    title: page?.seo?.title || 'Über uns | Die Vision von KofferKlar',
    description: page?.seo?.description || 'Lerne die Geschichte hinter KofferKlar und die Gründer Yasar Heidt und Nico Pandrock kennen. Erfahre mehr über unser Versprechen für Qualität und Ordnung.',
    openGraph: {
      title: 'KofferKlar | Unsere Story',
      description: 'Von Reisenden für Reisende. Entdecke, wie wir Ordnung ins Gepäck bringen.',
    }
  }
}

/**
 * Über uns Page (Phase 3)
 * High-end editorial page presenting the brand's vision and founders.
 */
export default async function UeberUnsPage() {
  const page = await getPageBySlug('ueber-uns')

  return (
    <main id="main-content" className="pt-[72px] bg-white min-h-screen">
      
      {/* Editorial Header */}
      <header className="py-24 md:py-32 lg:py-48 bg-muted/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 -skew-x-12 translate-x-1/4 pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10 text-center">
           <div className="max-w-4xl mx-auto">
              <div className="text-accent text-[10px] font-bold tracking-[0.4em] uppercase mb-8">Unsere Mission</div>
              <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl font-bold text-foreground leading-[1.05] tracking-tight mb-12">
                Die Kunst des <br />
                <span className="italic text-primary">einfachen Reisens.</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto">
                KofferKlar ist mehr als nur ein Packwürfel-Set. Es ist das Ergebnis der Suche nach der perfekten Balance zwischen System und Spontanität.
              </p>
           </div>
        </div>
      </header>

      {/* Founder Story Section */}
      <FounderSection />

      {/* Optional: Sanity Content (if available) */}
      {page?.body && (
        <section className="py-24 md:py-32 lg:py-40 border-t border-black/5">
           <div className="max-w-[1400px] mx-auto px-4 md:px-8">
              <div className="max-w-[75ch] mx-auto">
                 <PostBody content={page.body} />
              </div>
           </div>
        </section>
      )}

      {/* Sustainability & Values */}
      <SustainabilityBlock />

      {/* Final Brand Callout */}
      <section className="py-24 md:py-40 bg-white text-center">
         <div className="max-w-4xl mx-auto px-4">
            <h2 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-12 leading-tight">
               Bereit, deine Reise <br /> neu zu organisieren?
            </h2>
            <Link
              href="https://kofferklar.vercel.app/produkt?utm_source=website&utm_medium=navigation&utm_campaign=kofferklar-launch"
              className="inline-block bg-primary text-primary-foreground px-12 py-5 rounded-full text-lg font-bold hover:bg-primary/95 transition-all duration-300 shadow-2xl active:scale-[0.98]"
            >
              Zum Produkt
            </Link>
         </div>
      </section>

    </main>
  )
}
