import type { Metadata } from 'next'
import Link from 'next/link'
import { getProduct, getAllReviews, getFaqItems } from '@/lib/sanity/queries'
import { SLIDER_IMAGES } from '@/lib/product-images'
import ProductHero from './components/ProductHero'
import ProductDescription from './components/ProductDescription'
import SetOverview from './components/SetOverview'
import SizeChart from './components/SizeChart'
import CompressionExplainer from './components/CompressionExplainer'
import VorherNachherSlider from './components/VorherNachherSlider'
import ProductReviews from './components/ProductReviews'
import ProductFaq from './components/ProductFaq'
import ProductProofSection from './components/ProductProofSection'
import ExitIntentPopup from './components/ExitIntentPopup'
import PackCalculator from './components/PackCalculator'
import StickyAddToCartBar from './components/StickyAddToCartBar'
import CompareTable from './components/CompareTable'
import PackPyramid from '../components/PackPyramid'
import { urlFor } from '@/lib/sanity/image'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const product = await getProduct()
  return {
    title: product?.seo?.title ?? product?.name ?? 'KofferKlar | Packwürfel-Set',
    description:
      product?.seo?.description ??
      product?.shortDescription ??
      'Das 8-teilige Kompressions-Packwürfel-Set für stressfreies Reisen.',
  }
}

function calcAvgRating(reviews: { rating: number }[]): number {
  if (!reviews.length) return 0
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0)
  return Math.round((sum / reviews.length) * 10) / 10
}

function buildProductJsonLd(
  product: NonNullable<Awaited<ReturnType<typeof getProduct>>>,
  reviews: Awaited<ReturnType<typeof getAllReviews>>
) {
  const avg = calcAvgRating(reviews)
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription ?? '',
    offers: {
      '@type': 'Offer',
      price: product.price ?? 0,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: 'https://kofferklar.de/produkt',
    },
  }

  if (reviews.length > 0) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: avg,
      reviewCount: reviews.length,
      bestRating: 5,
      worstRating: 1,
    }
  }

  return JSON.stringify(schema)
}

function ProductDetailsSection({
  content,
}: {
  content: NonNullable<Awaited<ReturnType<typeof getProduct>>>['description']
}) {
  return (
    <section className="pt-8 md:pt-4">
      <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-8">
        Produktdetails
      </h2>
      <ProductDescription content={content} />
    </section>
  )
}

function CollapsibleProductDetailsMobile({
  content,
}: {
  content: NonNullable<Awaited<ReturnType<typeof getProduct>>>['description']
}) {
  return (
    <details className="group rounded-2xl border-2 border-border bg-muted/30 overflow-hidden">
      <summary className="flex items-center justify-between cursor-pointer list-none px-5 py-4 hover:bg-muted/50 transition-colors">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-base font-bold">+</span>
          <h2 className="font-serif text-xl font-bold text-foreground">
            Produktdetails
          </h2>
        </div>
        <span className="text-foreground/60 transition-transform duration-300 group-open:rotate-180" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </summary>
      <div className="px-5 pb-5 pt-2 bg-background">
        <ProductDescription content={content} />
      </div>
    </details>
  )
}

export default async function ProduktPage() {
  const [product, reviews, faqItems] = await Promise.all([
    getProduct(),
    getAllReviews(),
    getFaqItems(),
  ])

  if (!product) {
    return (
      <main id="main-content" className="min-h-screen pt-[72px] flex items-center justify-center">
        <p className="text-muted-foreground">Produkt konnte nicht geladen werden.</p>
      </main>
    )
  }

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildProductJsonLd(product, reviews) }}
      />

      <main id="main-content" className="min-h-screen pt-[72px]">
        {/* ─── Hero-Sektion: Galerie + BuyBlock (client wrapper) ─── */}
        <div id="kaufbereich">
          <ProductHero
            product={product}
            mobileDetailsContent={
              product.description ? (
                <CollapsibleProductDetailsMobile key="mobile-product-details" content={product.description} />
              ) : null
            }
            desktopDetailsContent={
              product.description ? (
                <ProductDetailsSection key="desktop-product-details" content={product.description} />
              ) : null
            }
          />
        </div>

        <section id="produktbeweis" className="max-w-[1400px] mx-auto px-4 md:px-8 pb-10 md:pb-16">
          <ProductProofSection />
        </section>

        {/* ─── 3D Pack-Pyramide ─── */}
        <section className="relative bg-muted/10 py-12 md:py-20 overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-accent text-[10px] font-bold tracking-[0.3em] uppercase mb-3">
                <span className="w-6 h-px bg-accent" /> Das System
              </div>
              <h2 className="font-display text-balance text-3xl md:text-5xl font-bold leading-[1.05] tracking-tightest mb-4">
                Acht Teile, ein <span className="font-handwrite text-primary">Plan.</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-md">
                Jeder Würfel hat seine Rolle. Zusammen schaffen sie Ordnung, die du beim Auspacken nicht mehr verlieren willst.
              </p>
            </div>
            <PackPyramid />
          </div>
        </section>

        {/* ─── Set-Übersicht ─── */}
        {product.setParts && product.setParts.length > 0 && (
          <section className="bg-muted/40 py-10 md:py-16">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">
              <SetOverview parts={product.setParts} />
            </div>
          </section>
        )}

        {/* ─── Maßtabelle (collapsible) — direkt unter Set-Übersicht ─── */}
        <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-10 md:py-16">
          <SizeChart />
        </section>

        {/* ─── Pack-Kalkulator (Welche Würfel brauchst du) ─── */}
        <section className="bg-muted/10 py-10 md:py-16">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8">
            <PackCalculator />
          </div>
        </section>

        {/* ─── Vorher/Nachher-Slider (Der Unterschied ist spürbar) ─── */}
        <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-10 md:py-16">
          <VorherNachherSlider
            beforeSrc={SLIDER_IMAGES.before.src}
            afterSrc={SLIDER_IMAGES.after.src}
            beforeAlt={SLIDER_IMAGES.before.alt}
            afterAlt={SLIDER_IMAGES.after.alt}
          />
        </section>

        {/* ─── Wir vs. die anderen ─── */}
        <section className="bg-white py-10 md:py-16">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8">
            <CompareTable />
          </div>
        </section>

        {/* ─── Kompressions-Erklärung — weiter unten ─── */}
        <section className="bg-muted/20 py-8 md:py-14">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8">
            <CompressionExplainer />
            <div className="mt-8 text-center">
              <Link href="/ratgeber/handgepaeck-guide-eine-woche" className="text-primary hover:underline font-semibold">Packanleitung für Handgepäck lesen &rarr;</Link>
            </div>
          </div>
        </section>

        {/* ─── Kundenbewertungen ─── */}
        <section id="bewertungen" className="bg-muted/40 py-10 md:py-16">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8">
            <ProductReviews reviews={reviews} />
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-10 md:py-16">
          <div className="max-w-3xl">
            <ProductFaq items={faqItems} />
          </div>
        </section>

        {/* ─── Bottom CTA: compact card ─── */}
        <section className="relative py-20 md:py-28 bg-background overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-accent/8 blur-[140px] rounded-full pointer-events-none" />

          <div className="relative max-w-2xl mx-auto px-4 md:px-6">
            <div className="relative rounded-[2rem] md:rounded-[2.5rem] bg-primary text-white p-7 md:p-10 shadow-elevated overflow-hidden">
              <div className="absolute -top-12 -right-12 w-44 h-44 bg-accent/25 blur-[60px] rounded-full pointer-events-none" />

              <div className="relative flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/8 px-3 py-1 text-[10px] font-bold tracking-[0.22em] uppercase text-accent-200 ring-1 ring-white/10 mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Nächste Reise
                </div>

                <h2 className="font-display text-balance text-2xl md:text-[2rem] font-bold leading-[1.1] tracking-tightest mb-3">
                  Bereit für stressfreies <span className="font-handwrite text-accent-200">Reisen?</span>
                </h2>
                <p className="text-white/65 text-sm md:text-[15px] leading-relaxed mb-7 max-w-md mx-auto">
                  Mit dem 8-teiligen Kofferklar Koffer Organizer Set bringst du Ordnung in dein Handgepäck. Jetzt dein neues Kompressions-Packwürfel Set sichern.
                </p>

                <a
                  href={product.buyLink ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden inline-flex items-center gap-3 bg-accent text-accent-foreground px-7 py-3.5 rounded-full text-sm md:text-base font-bold hover:bg-accent-400 active:scale-[0.98] transition-all duration-500 shadow-glow-gold focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                >
                  <span className="relative z-10">Packwürfel Set kaufen</span>
                  <span className="relative z-10 inline-flex items-center justify-center w-7 h-7 rounded-full bg-black/10 group-hover:translate-x-1 transition-transform duration-500">→</span>
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:translate-x-full transition-transform duration-1000" />
                </a>

                <p className="mt-5 text-white/50 text-[10px] tracking-[0.18em] uppercase font-bold">
                  Sicherer Checkout · 30 Tage Rückgabe · Kostenloser Versand
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <StickyAddToCartBar
        name={product.name}
        price={product.price ?? 0}
        imageUrl={
          product.images && product.images[0]
            ? urlFor(product.images[0]).width(120).height(120).url()
            : ''
        }
      />

      <ExitIntentPopup />
    </>
  )
}
