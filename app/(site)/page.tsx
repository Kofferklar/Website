import type { Metadata } from 'next'
import { getHomePageData } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import RabattBanner from './components/RabattBanner'
import HeroSection from './components/HeroSection'
import HomeVorherNachher from './components/HomeVorherNachher'
import ReviewStrip from './components/ReviewStrip'
import NewsletterSignup from './components/NewsletterSignup'
import KofferklarChallenge from './components/KofferklarChallenge'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const { product } = await getHomePageData()

  return {
    title: 'KofferKlar | Ordnung und Platz im Koffer | 8-teiliges Set',
    description: 'Entdecke das 8-teilige Kompressions-Packwürfel-Set von KofferKlar. Sortiere Kleidung klarer, nutze dein Gepäck besser aus und reise organisierter.',
    openGraph: {
      title: 'KofferKlar | Die Revolution für deinen Koffer',
      description: 'Mehr Platz, weniger Stress. Das ultimative Kompressions-Set für Reisende.',
      images: product?.images?.[0]
        ? [{ url: urlFor(product.images[0]).width(1200).height(630).url() }]
        : [],
    }
  }
}

/**
 * Startseite Page Component (Phase 3)
 * Assembles the homepage with high-end Taste design components.
 */
export default async function Startseite() {
  const { product, reviews, reviewCount } = await getHomePageData()

  if (!product) {
    return (
      <main id="main-content" className="min-h-screen pt-[72px] flex items-center justify-center">
        <p className="text-muted-foreground">Inhalte konnten nicht geladen werden.</p>
      </main>
    )
  }

  return (
    <>
      {/* JSON-LD Organization Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'KofferKlar',
            url: 'https://kofferklar.de',
            logo: 'https://kofferklar.de/LogoKofferklar.png',
            email: 'hallo@kofferklar.de'
          })
        }}
      />

      {/*
        Note: RabattBanner is placed inside the page for now.
        The pt-[72px] ensures content starts below the fixed Header.
      */}
      <div className="pt-[72px]">
        <RabattBanner />

        <main id="main-content">
          {/* Hero Section: Asymmetric Split */}
          <HeroSection reviewCount={reviewCount} />

          {/* Narrative / Visual Comparison Section */}
          <div className="bg-white border-y border-black/5">
            <HomeVorherNachher product={product} />
          </div>

          {/* Bewertungen */}
          <ReviewStrip reviews={reviews} reviewCount={reviewCount} />

          <KofferklarChallenge />

          {/* Community / Newsletter Section */}
          <NewsletterSignup />

          {/* Secondary CTA Section (High-End Ending) */}
          <section className="py-24 md:py-40 lg:py-48 bg-white text-center overflow-hidden relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 relative z-10">
               <div className="text-accent text-[10px] font-bold tracking-[0.4em] uppercase mb-8">Nächster Halt</div>
               <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-10 leading-[1.1]">
                 Bereit für dein nächstes <br />
                 <span className="italic text-primary">großes Abenteuer?</span>
               </h2>
               <p className="text-muted-foreground text-lg md:text-xl lg:text-2xl mb-14 max-w-2xl mx-auto leading-relaxed">
                 Sichere dir jetzt dein KofferKlar Set. Unsere KofferKlar Erfahrungen zeigen, dass das Koffer Organizer Set dir hilft, deinen Koffer platzsparend packen zu können.
               </p>

               <Link
                 href="/produkt?utm_source=website&utm_medium=secondary-cta&utm_campaign=kofferklar-launch&utm_content=homepage-bottom"
                 className="group inline-flex items-center gap-5 bg-primary text-primary-foreground px-12 py-6 rounded-full text-xl font-bold hover:bg-primary/95 transition-all duration-300 active:scale-[0.98] shadow-[0_25px_50px_-12px_rgba(30,58,95,0.25)]"
                 style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
               >
                 Jetzt Pack-Set sichern
                 <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-2 transition-transform duration-500">
                    <ArrowRight size={20} />
                 </div>
               </Link>

               <p className="mt-8 text-xs font-bold text-muted-foreground/60 tracking-widest uppercase">
                 Kostenloser Versand · 30 Tage Rückgaberecht
               </p>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
