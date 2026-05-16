import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin, Sparkles, Users } from 'lucide-react'
import { getPageBySlug } from '@/lib/sanity/queries'
import FounderSection from './components/FounderSection'
import SustainabilityBlock from './components/SustainabilityBlock'
import PostBody from '../components/PostBody'
import Magnetic from '../components/Magnetic'

export const revalidate = 86400

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('ueber-uns')

  return {
    title: page?.seo?.title || 'Über uns | Die Vision von KofferKlar',
    description:
      page?.seo?.description ||
      'Lerne die Geschichte hinter KofferKlar und die Gründer Yasar Heidt und Nico Pandrock kennen. Erfahre mehr über unser Versprechen für Qualität und Ordnung.',
    openGraph: {
      title: 'KofferKlar | Unsere Story',
      description: 'Von Reisenden für Reisende. Entdecke, wie wir Ordnung ins Gepäck bringen.',
    },
  }
}

const STATS = [
  { icon: Users, label: '2 Gründer', sub: 'aus Leidenschaft' },
  { icon: MapPin, label: 'Seit 2024', sub: 'aus Deutschland' },
  { icon: Sparkles, label: '8-teiliges Set', sub: 'durchdacht bis ins Detail' },
]

export default async function UeberUnsPage() {
  const page = await getPageBySlug('ueber-uns')

  return (
    <main id="main-content" className="pt-[72px] bg-background min-h-screen">
      {/* ─── Editorial Hero (asymmetric) ─── */}
      <header className="relative overflow-hidden pt-12 md:pt-20 lg:pt-24 pb-16 md:pb-24">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-1/3 -right-20 w-[520px] h-[520px] bg-accent/10 blur-[140px] rounded-full" />
          <div className="absolute -top-10 -left-20 w-[420px] h-[420px] bg-primary/10 blur-[140px] rounded-full" />
        </div>

        <div className="max-w-[1400px] mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-20 items-center">
          {/* Copy */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur-md px-3.5 py-1.5 text-[10px] font-bold tracking-[0.22em] uppercase text-foreground/70 ring-1 ring-black/[0.06] shadow-soft mb-7">
              <Sparkles size={12} className="text-accent" />
              Unsere Mission
            </div>

            <h1 className="font-display text-balance text-5xl md:text-7xl lg:text-[5.5rem] xl:text-[6.25rem] font-bold text-foreground leading-[1.02] tracking-tightest mb-8">
              Die Kunst des
              <br />
              <span className="text-primary inline-flex items-baseline relative">
                <span className="font-handwrite font-normal text-accent">einfachen</span>
                <span>&nbsp;Reisens.</span>
                <svg
                  className="absolute -bottom-1 left-0 w-full h-3 text-accent/60 pointer-events-none"
                  viewBox="0 0 300 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 15C50 5 150 5 295 15"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-muted-foreground text-pretty text-lg md:text-xl lg:text-2xl leading-relaxed max-w-[52ch]">
              KofferKlar ist mehr als ein Packwürfel-Set. Es ist die Suche nach
              der Balance zwischen System und Spontanität — gebaut von Reisenden, für Reisende.
            </p>
          </div>

          {/* Image collage */}
          <div className="relative w-full max-w-[300px] sm:max-w-[420px] mx-auto lg:max-w-none">
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-4 md:space-y-6">
                <div className="relative aspect-[3/4] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-black/5 shadow-elevated">
                  <Image
                    src="/images/images_kofferklar/lissabon.jpg"
                    alt="Reise nach Lissabon"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 45vw, 25vw"
                    priority
                  />
                  <span className="absolute bottom-4 left-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/90">
                    Lissabon
                  </span>
                </div>
                <div className="relative aspect-square rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-black/5 shadow-soft">
                  <Image
                    src="/images/images_kofferklar/nachher-koffer.png"
                    alt="Ordnung mit KofferKlar"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 45vw, 25vw"
                  />
                </div>
              </div>
              <div className="space-y-4 md:space-y-6 pt-10 md:pt-16">
                <div className="relative aspect-square rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border-2 border-accent/40 shadow-glow-gold">
                  <Image
                    src="/images/images_kofferklar/yn.jpg"
                    alt="Yasar und Nico, Gründer"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 45vw, 25vw"
                  />
                </div>
                <div className="relative aspect-[3/4] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-black/5 shadow-elevated">
                  <Image
                    src="/images/images_kofferklar/stressfrei-reisen.jpg"
                    alt="Stressfrei reisen"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 45vw, 25vw"
                  />
                </div>
              </div>
            </div>

            <div className="absolute -z-10 -bottom-10 -right-8 w-44 h-44 bg-accent/15 blur-[80px] rounded-full" />
          </div>
        </div>
      </header>

      {/* ─── Stats strip ─── */}
      <section className="bg-white border-y border-black/[0.05]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 md:py-10 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-12">
          {STATS.map((s) => {
            const Icon = s.icon
            return (
              <div key={s.label} className="flex items-center gap-4 w-full max-w-[260px] mx-auto md:mx-0 md:max-w-none">
                <div className="w-11 h-11 rounded-2xl bg-accent/10 text-accent flex items-center justify-center ring-1 ring-accent/20 shrink-0">
                  <Icon size={18} />
                </div>
                <div className="min-w-0">
                  <div className="font-display text-base md:text-lg font-bold text-foreground leading-tight">
                    {s.label}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">{s.sub}</div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ─── Founder Story ─── */}
      <FounderSection />

      {/* ─── Optional Sanity body ─── */}
      {page?.body && (
        <section className="py-20 md:py-28 border-t border-black/5 bg-white">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8">
            <div className="max-w-[75ch] mx-auto">
              <PostBody content={page.body} />
            </div>
          </div>
        </section>
      )}

      {/* ─── Werte & Vision ─── */}
      <SustainabilityBlock />

      {/* ─── Final CTA (compact card, matches site pattern) ─── */}
      <section className="relative py-20 md:py-28 bg-background overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-accent/8 blur-[140px] rounded-full pointer-events-none" />

        <div className="relative max-w-2xl mx-auto px-4 md:px-6">
          <div className="relative rounded-[2rem] md:rounded-[2.5rem] bg-primary text-white p-7 md:p-10 shadow-elevated overflow-hidden">
            <div className="absolute -top-12 -right-12 w-44 h-44 bg-accent/25 blur-[60px] rounded-full pointer-events-none" />

            <div className="relative flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/8 px-3 py-1 text-[10px] font-bold tracking-[0.22em] uppercase text-accent-200 ring-1 ring-white/10 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Bereit für mehr
              </div>

              <h2 className="font-display text-balance text-2xl md:text-[2rem] font-bold leading-[1.1] tracking-tightest mb-3">
                Bereit, deine Reise <span className="font-handwrite text-accent-200">neu zu organisieren?</span>
              </h2>
              <p className="text-white/65 text-sm md:text-[15px] leading-relaxed mb-7 max-w-md mx-auto">
                Hol dir das 8-teilige Pack-Set und reise leichter, klarer, stressfreier.
              </p>

              <Magnetic strength={12} radius={110}>
                <Link
                  href="/produkt?utm_source=website&utm_medium=ueber-uns-cta&utm_campaign=kofferklar-launch"
                  className="group relative overflow-hidden inline-flex items-center gap-3 bg-accent text-accent-foreground px-7 py-3.5 rounded-full text-sm md:text-base font-bold hover:bg-accent-400 active:scale-[0.98] transition-all duration-500 shadow-glow-gold focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                >
                  <span className="relative z-10">Zum Pack-Set</span>
                  <span className="relative z-10 inline-flex items-center justify-center w-7 h-7 rounded-full bg-black/10 group-hover:translate-x-1 transition-transform duration-500">
                    <ArrowRight size={14} />
                  </span>
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:translate-x-full transition-transform duration-1000" />
                </Link>
              </Magnetic>

              <p className="mt-5 text-white/50 text-[10px] tracking-[0.18em] uppercase font-bold">
                Kostenloser Versand · 30 Tage Rückgabe
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
