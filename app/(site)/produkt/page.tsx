import type { Metadata } from 'next'
import { getProduct, getAllReviews, getFaqItems } from '@/lib/sanity/queries'
import ProductHero from './components/ProductHero'
import ProductDescription from './components/ProductDescription'
import SetOverview from './components/SetOverview'
import SizeChart from './components/SizeChart'
import CompressionExplainer from './components/CompressionExplainer'
import VorherNachherSlider from './components/VorherNachherSlider'
import ProductReviews from './components/ProductReviews'
import ProductFaq from './components/ProductFaq'

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
        <ProductHero product={product} />

        {/* ─── Ausführliche Produktbeschreibung ─── */}
        {product.description && (
          <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-10 md:py-16">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-8">
              Produktdetails
            </h2>
            <ProductDescription content={product.description} />
          </section>
        )}

        {/* ─── Set-Übersicht ─── */}
        {product.setParts && product.setParts.length > 0 && (
          <section className="bg-muted/40 py-10 md:py-16">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">
              <SetOverview parts={product.setParts} />
            </div>
          </section>
        )}

        {/* ─── Maßtabelle ─── */}
        <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-10 md:py-16">
          <SizeChart />
        </section>

        {/* ─── Kompressions-Erklärung ─── */}
        <section className="bg-muted/20 py-8 md:py-14">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8">
            <CompressionExplainer />
          </div>
        </section>

        {/* ─── Vorher/Nachher-Slider ─── */}
        <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-10 md:py-16">
          <VorherNachherSlider />
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

        {/* ─── Bottom CTA ─── */}
        <section className="bg-primary py-16 md:py-24">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8 text-center">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Bereit für stressfreies Reisen?
            </h2>
            <p className="text-white/70 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Dein 8-teiliges Kompressions-Packwürfel-Set wartet auf dich — jetzt versandkostenfrei bestellen und Koffer-Chaos beenden.
            </p>
            <a
              href={product.buyLink ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent text-accent-foreground px-12 py-5 rounded-full text-lg font-bold hover:bg-accent-400 active:scale-[0.98] transition-all duration-300 shadow-xl shadow-black/10 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
              style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
            >
              Jetzt Pack-Set sichern
            </a>
            <p className="mt-6 text-white/40 text-xs">
              Sicherer Checkout · 30 Tage Rückgaberecht · Kostenloser Versand
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
