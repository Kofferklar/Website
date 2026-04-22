'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity/image'
import { HERO_FALLBACK_IMAGE } from '@/lib/product-images'
import { ArrowRight, Star } from 'lucide-react'

interface HeroSectionProps {
  product: {
    name: string
    shortDescription?: string
    images?: Array<{ asset: { _ref: string } }>
    buyLink?: string
    price?: number
  }
  reviewCount?: number
}

export default function HeroSection({ product, reviewCount }: HeroSectionProps) {
  const heroImage = product?.images?.[0]

  return (
    <section className="relative min-h-[calc(100dvh-72px)] lg:min-h-[85dvh] flex items-stretch lg:items-start overflow-hidden pt-4 md:pt-10 lg:pt-20 pb-6 md:pb-16 lg:pb-32">
      <div className="max-w-[1400px] w-full mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-24 items-stretch lg:items-center">

        {/* --- Left Column: Typography & CTAs --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 lg:order-1 flex flex-col justify-between gap-6 lg:block lg:gap-0"
        >
          <div>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl font-bold text-foreground leading-[1.05] tracking-tight mb-5 md:mb-8 lg:mb-10">
              Reisen <br />
              <span className="text-primary italic relative tracking-normal">
                neu definiert.
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-accent/30" viewBox="0 0 300 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 15C50 5 150 5 295 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>

            <p className="text-muted-foreground text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-[45ch] lg:mb-12">
              Das 8-teilige Kompressions-Packwürfel-Set — packst du klüger, reist du leichter.
            </p>
          </div>

          {/* Mobile-only Vorher/Nachher */}
          <div className="lg:hidden">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <div className="relative aspect-[3/4] rounded-[1.5rem] overflow-hidden border border-black/5 shadow-inner">
                  <Image
                    src="/images/images_kofferklar/vorher-koffer.png"
                    alt="Chaos im Koffer"
                    fill
                    className="object-cover"
                    sizes="45vw"
                  />
                </div>
                <p className="text-center font-serif italic text-muted-foreground text-xs">Vorher.</p>
              </div>
              <div className="space-y-2 pt-6">
                <div className="relative aspect-[3/4] rounded-[1.75rem] overflow-hidden border-2 border-accent/30 shadow-[0_20px_40px_-10px_rgba(201,168,76,0.15)]">
                  <Image
                    src="/images/images_kofferklar/nachher-koffer.png"
                    alt="Ordnung mit KofferKlar"
                    fill
                    className="object-cover"
                    sizes="45vw"
                  />
                </div>
                <p className="text-center font-serif italic text-foreground font-bold text-xs">Nachher.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-5 lg:gap-8">
            {/* Main CTA */}
            <Link
              href="/produkt"
              className="group relative inline-flex items-center gap-3 lg:gap-5 bg-primary text-primary-foreground px-7 py-3.5 lg:px-10 lg:py-5 rounded-full text-sm lg:text-lg font-bold hover:bg-primary/95 transition-all duration-300 active:scale-[0.98] shadow-2xl shadow-primary/20"
              style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
            >
              Pack-Set entdecken
              <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1.5 transition-transform duration-500">
                <ArrowRight size={16} />
              </div>
            </Link>

            {/* Social Proof Link */}
            <Link
              href="#bewertungen"
              className="group text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors flex items-center gap-3"
            >
              <div className="hidden lg:flex -space-x-3" aria-label="Kundenbewertungen">
                {[
                  { initials: 'LK', from: 'from-primary', to: 'to-accent' },
                  { initials: 'MS', from: 'from-accent', to: 'to-primary' },
                  { initials: 'AT', from: 'from-primary/80', to: 'to-accent/80' },
                ].map((a, i) => (
                  <div
                    key={i}
                    className={`w-9 h-9 rounded-full border-2 border-background bg-gradient-to-br ${a.from} ${a.to} flex items-center justify-center text-white text-[10px] font-bold tracking-wide shadow-inner`}
                    aria-hidden="true"
                  >
                    {a.initials}
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-accent">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={12} fill="currentColor" />)}
                </div>
                <span className="text-[11px] tracking-wide uppercase font-bold text-foreground/60 group-hover:text-foreground transition-colors">
                  {reviewCount ?? 47} Bewertungen
                </span>
              </div>
            </Link>
          </div>

        </motion.div>

        {/* --- Right Column: Asymmetric Double-Bezel Image — desktop only --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 60 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative lg:justify-self-end w-full lg:order-2 hidden lg:block"
        >
          {/* Background Glows */}
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/20 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute -top-20 -right-10 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />

          {/* Double-Bezel Architecture */}
          <div className="relative p-1.5 md:p-5 rounded-[3rem] md:rounded-[4rem] bg-black/5 ring-1 ring-black/5 backdrop-blur-sm shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] overflow-hidden">
            <div className="relative overflow-hidden rounded-[calc(3rem-0.375rem)] md:rounded-[calc(4rem-1.25rem)] bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] aspect-[3/2] md:aspect-square lg:aspect-[4/5] w-full max-w-[600px] mx-auto">
              {heroImage ? (
                <Image
                  src={urlFor(heroImage).width(1000).height(1250).url()}
                  alt={product?.name || "KofferKlar Packwürfel-Set"}
                  fill
                  className="object-cover hover:scale-[1.03] transition-transform duration-[2000ms] ease-out"
                  priority
                />
              ) : (
                <Image
                  src={HERO_FALLBACK_IMAGE.src}
                  alt={HERO_FALLBACK_IMAGE.alt}
                  fill
                  className="object-cover hover:scale-[1.03] transition-transform duration-[2000ms] ease-out"
                  priority
                />
              )}
            </div>
          </div>

          {/* Subtle Float Animation */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-8 top-20 hidden xl:flex w-32 h-32 rounded-3xl bg-white/80 backdrop-blur-md shadow-xl border border-white/40 p-4 flex-col items-center justify-center text-center gap-2"
          >
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
              <Star size={20} fill="currentColor" />
            </div>
            <div className="text-[10px] font-bold leading-tight">PREMIUM QUALITÄT</div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
