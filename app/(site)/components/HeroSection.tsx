'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Star, Sparkles } from 'lucide-react'
import Magnetic from './Magnetic'
import CursorSpotlight from './CursorSpotlight'
import LiveViewers from './LiveViewers'
import Tilt3D from './Tilt3D'

interface HeroSectionProps {
  reviewCount?: number
}

export default function HeroSection({ reviewCount }: HeroSectionProps) {
  const [titleNumber, setTitleNumber] = useState(0)
  const titles = useMemo(
    () => ['definiert.', 'gedacht.', 'organisiert.', 'erleben.', 'gepackt.'],
    []
  )

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((n) => (n === titles.length - 1 ? 0 : n + 1))
    }, 3000)
    return () => clearTimeout(timeoutId)
  }, [titleNumber, titles])

  return (
    <section className="relative min-h-[calc(100dvh-72px)] lg:min-h-[88dvh] flex items-stretch lg:items-start overflow-hidden pt-6 md:pt-12 lg:pt-20 pb-8 md:pb-20 lg:pb-32">
      {/* Whisper-soft background — single subtle aurora */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="aurora" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
      </div>
      <CursorSpotlight color="rgba(201,168,76,0.18)" size={520} />

      <div className="max-w-[1400px] w-full mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-24 items-stretch lg:items-center">

        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 lg:order-1 flex flex-col justify-between gap-7 lg:block lg:gap-0"
        >
          {/* Eyebrow pill */}
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/70 backdrop-blur-md px-3.5 py-1.5 text-[10px] font-bold tracking-[0.22em] uppercase text-foreground/70 ring-1 ring-black/[0.06] shadow-soft mb-5 md:mb-7">
            <Sparkles size={12} className="text-accent" />
            Neue Reise-Kollektion 2026
          </div>

          <div>
            <h1 className="font-display text-balance text-[2.6rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-bold text-foreground leading-[1.02] tracking-tightest mb-6 md:mb-9 lg:mb-11">
              Reisen <br />
              <span className="text-primary relative tracking-normal inline-flex align-top">
                <span className="inline-flex items-baseline gap-[0.18em]">
                  neu
                  <span className="relative inline-block font-handwrite font-normal text-accent leading-[1] align-baseline">
                    {titles.map((title, index) => (
                      <motion.span
                        key={index}
                        className="absolute left-0 bottom-0 whitespace-nowrap"
                        initial={{ opacity: 0, y: '40%', rotate: -3 }}
                        transition={{
                          type: 'spring',
                          stiffness: 50,
                          damping: 14,
                          mass: 1,
                          opacity: { duration: 0.5 },
                        }}
                        animate={
                          titleNumber === index
                            ? { y: 0, opacity: 1, rotate: 0 }
                            : { y: titleNumber > index ? '-60%' : '60%', opacity: 0, rotate: titleNumber > index ? -4 : 4 }
                        }
                      >
                        {title}
                      </motion.span>
                    ))}
                    {/* Ghost word for width + baseline alignment */}
                    <span className="opacity-0 select-none pointer-events-none whitespace-nowrap">
                      organisiert.
                    </span>
                  </span>
                </span>
                <svg className="absolute -bottom-1 left-0 w-full h-3 text-accent/60 pointer-events-none" viewBox="0 0 300 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <motion.path
                    d="M5 15C50 5 150 5 295 15"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1.2, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                </svg>
              </span>
            </h1>

            <p className="text-muted-foreground text-pretty text-base sm:text-lg md:text-xl lg:text-[1.35rem] leading-relaxed max-w-[44ch] lg:mb-12">
              Das 8-teilige Kompressions-Packwürfel-Set. Pack klüger und reise leichter.
            </p>
          </div>

          {/* Mobile Vorher/Nachher */}
          <div className="lg:hidden">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-black/5 shadow-soft">
                  <Image
                    src="/images/images_kofferklar/vorher-koffer.png"
                    alt="Chaos im Koffer"
                    fill
                    className="object-cover"
                    sizes="45vw"
                  />
                </div>
                <p className="text-center font-handwrite text-muted-foreground text-sm">Vorher.</p>
              </div>
              <div className="space-y-2 pt-7">
                <div className="relative aspect-[3/4] rounded-[1.75rem] overflow-hidden border-2 border-accent/40 shadow-glow-gold">
                  <Image
                    src="/images/images_kofferklar/nachher-koffer.png"
                    alt="Ordnung mit KofferKlar"
                    fill
                    className="object-cover"
                    sizes="45vw"
                  />
                </div>
                <p className="text-center font-handwrite text-foreground font-semibold text-sm">Nachher.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-5 lg:gap-8">
            <Magnetic strength={12} radius={110}>
              <Link
                href="/produkt?utm_source=website&utm_medium=hero-cta&utm_campaign=kofferklar-launch&utm_content=homepage"
                className="group relative overflow-hidden inline-flex items-center gap-3 lg:gap-5 bg-primary text-primary-foreground px-7 py-3.5 lg:px-10 lg:py-5 rounded-full text-sm lg:text-lg font-semibold tracking-wide hover:bg-primary-600 transition-all duration-500 active:scale-[0.98] shadow-glow-navy"
                style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
              >
                <span className="relative z-10">Pack-Set entdecken</span>
                <div className="relative z-10 w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-white/15 flex items-center justify-center group-hover:translate-x-1.5 transition-transform duration-500">
                  <ArrowRight size={16} />
                </div>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent group-hover:translate-x-full transition-transform duration-1000" />
              </Link>
            </Magnetic>

            <Link
              href="#bewertungen"
              className="group text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors flex flex-col lg:flex-row items-center gap-1.5 lg:gap-3"
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
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center justify-center lg:justify-start gap-1 text-accent mb-0.5">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={12} fill="currentColor" />)}
                </div>
                <span className="text-[11px] tracking-wide uppercase font-bold text-foreground/60 group-hover:text-foreground transition-colors text-center lg:text-left">
                  {reviewCount ?? 47} Bewertungen · 4.8/5
                </span>
              </div>
            </Link>
          </div>

          {/* Inline trust strip */}
          <div className="mt-8 hidden md:flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Auf Lager · sofort versandfertig
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Kostenloser Versand ab 49&nbsp;€
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              30 Tage Rückgabe
            </span>
            <LiveViewers />
          </div>
        </motion.div>

        {/* Right Column — Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 60 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative lg:justify-self-end w-full lg:order-2 hidden lg:block"
        >
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/20 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute -top-20 -right-10 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />

          <div className="grid grid-cols-2 gap-6 md:gap-12 w-full max-w-[600px] mx-auto">
            <div className="space-y-6">
              <Tilt3D maxTilt={5} scale={1.015} glare>
                <div className="relative aspect-[3/4.5] rounded-[2.5rem] overflow-hidden border border-black/5 shadow-elevated">
                  <Image
                    src="/images/images_kofferklar/vorher-koffer.png"
                    alt="Chaos im Koffer, unorganisierte Kleidung"
                    fill
                    className="object-cover transition-transform duration-[1800ms]"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    priority
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                  <span className="absolute bottom-4 left-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/90">Chaos</span>
                </div>
              </Tilt3D>
              <div className="text-center">
                <div className="font-handwrite text-muted-foreground text-xl">Vorher.</div>
              </div>
            </div>

            <div className="space-y-6 pt-16 md:pt-24">
              <Tilt3D maxTilt={6} scale={1.02} glare>
                <div className="relative aspect-[3/4.5] rounded-[3.5rem] overflow-hidden border-[3px] border-accent/40 shadow-premium">
                  <Image
                    src="/images/images_kofferklar/nachher-koffer.png"
                    alt="Ordnung mit KofferKlar, organisierte Packwürfel"
                    fill
                    className="object-cover transition-transform duration-[1800ms]"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    priority
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-primary/40 to-transparent pointer-events-none" />
                  <span className="absolute bottom-4 left-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white">Ordnung</span>
                </div>
              </Tilt3D>
              <div className="text-center">
                <div className="font-handwrite text-foreground font-semibold text-2xl">Nachher.</div>
              </div>
            </div>
          </div>

          {/* Floating premium badge */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -right-4 top-16 hidden xl:flex w-36 h-36 rounded-3xl glass-light shadow-elevated p-4 flex-col items-center justify-center text-center gap-2"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent-600 flex items-center justify-center text-accent-foreground shadow-glow-gold">
              <Star size={22} fill="currentColor" />
            </div>
            <div className="text-[10px] font-bold leading-tight tracking-[0.16em] uppercase">Premium<br/>Qualität</div>
          </motion.div>
        </motion.div>
      </div>

    </section>
  )
}
