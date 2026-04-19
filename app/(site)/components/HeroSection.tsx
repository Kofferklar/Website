'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity/image'
import { ArrowRight, Star } from 'lucide-react'

interface HeroSectionProps {
  product: {
    name: string
    shortDescription?: string
    images?: Array<{ asset: { _ref: string } }>
    buyLink?: string
    price?: number
  }
}

/**
 * HeroSection Client Component
 * Asymmetric Split Layout: Left Typography + CTA | Right Double-Bezel Image
 */
export default function HeroSection({ product }: HeroSectionProps) {
  // Use the first image from the product
  const heroImage = product?.images?.[0]

  return (
    <section className="relative min-h-[85dvh] flex items-center overflow-hidden py-16 md:py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-24 items-center">
        
        {/* --- Left Column: Typography & CTAs --- */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          {/* Eyebrow Tag */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-8 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold tracking-[0.2em] uppercase"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            Wieder auf Lager
          </motion.div>
          
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl xl:text-8xl font-bold text-foreground leading-[1.05] tracking-tight mb-10">
            Reisen <br />
            <span className="text-primary italic relative tracking-normal">
              neu definiert.
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-accent/30" viewBox="0 0 300 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 15C50 5 150 5 295 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>
          
          <p className="text-muted-foreground text-lg md:text-xl lg:text-2xl mb-12 leading-relaxed max-w-[45ch]">
            {product?.shortDescription || "Das 8-teilige Kompressions-Packwürfel-Set für stressfreies Reisen. Mehr Platz, weniger Chaos."}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-8">
            {/* Main CTA */}
            <Link 
              href="/produkt"
              className="group relative inline-flex items-center gap-5 bg-primary text-primary-foreground px-10 py-5 rounded-full text-lg font-bold hover:bg-primary/95 transition-all duration-300 active:scale-[0.98] shadow-2xl shadow-primary/20"
              style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
            >
              Pack-Set entdecken
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1.5 transition-transform duration-500">
                <ArrowRight size={18} />
              </div>
            </Link>
            
            {/* Social Proof Link */}
            <Link 
              href="#bewertungen" 
              className="group text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors flex items-center gap-3"
            >
              <div className="flex -space-x-3" aria-label="Kundenbewertungen">
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
                  47 Bewertungen
                </span>
              </div>
            </Link>
          </div>
        </motion.div>

        {/* --- Right Column: Asymmetric Double-Bezel Image --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 60 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative lg:justify-self-end w-full"
        >
          {/* Background Glows */}
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/20 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute -top-20 -right-10 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />

          {/* Double-Bezel Architecture */}
          <div className="relative p-2.5 md:p-5 rounded-[4rem] bg-black/5 ring-1 ring-black/5 backdrop-blur-sm shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] overflow-hidden">
            <div className="relative overflow-hidden rounded-[calc(4rem-1.25rem)] bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] aspect-[4/5] md:aspect-square lg:aspect-[4/5] w-full max-w-[600px] mx-auto">
              {heroImage ? (
                <Image
                  src={urlFor(heroImage).width(1000).height(1250).url()}
                  alt={product?.name || "KofferKlar Packwürfel-Set"}
                  fill
                  className="object-cover hover:scale-[1.03] transition-transform duration-[2000ms] ease-out"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground p-12 text-center font-serif text-2xl italic">
                  Visual Excellence <br /> Loading...
                </div>
              )}
              
              {/* Product Info Float Overlay */}
              <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/90 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold text-accent tracking-[0.2em] uppercase mb-1">Bestseller</div>
                  <div className="text-sm font-bold text-foreground">KofferKlar 8-Teile Set</div>
                </div>
                <div className="text-lg font-serif font-bold text-primary">
                  {product?.price ? `${product.price}€` : "€--"}
                </div>
              </div>
            </div>
          </div>
          
          {/* Subtle Float Animation */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-8 top-20 hidden xl:block w-32 h-32 rounded-3xl bg-white/80 backdrop-blur-md shadow-xl border border-white/40 p-4 flex flex-col items-center justify-center text-center gap-2"
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
