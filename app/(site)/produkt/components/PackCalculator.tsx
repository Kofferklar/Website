'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Briefcase,
  Building2,
  Footprints,
  Mountain,
  Package,
  Shirt,
  Sparkles,
  Sun,
  Waves,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type TripType = 'staedtetrip' | 'strand' | 'business' | 'outdoor'

interface TripOption {
  id: TripType
  label: string
  icon: LucideIcon
}

interface CubeRecommendation {
  icon: LucideIcon
  label: string
  detail: string
}

interface Recommendation {
  headline: string
  rationale: string
  cubes: CubeRecommendation[]
}

const TRIP_OPTIONS: TripOption[] = [
  { id: 'staedtetrip', label: 'Städtetrip', icon: Building2 },
  { id: 'strand', label: 'Strand', icon: Waves },
  { id: 'business', label: 'Business', icon: Briefcase },
  { id: 'outdoor', label: 'Outdoor', icon: Mountain },
]

function buildRecommendation(days: number, trip: TripType): Recommendation {
  // Business — kleidungsschonend, Hemden glatt halten
  if (trip === 'business') {
    if (days <= 3) {
      return {
        headline: 'Kompakt fürs Kurzmeeting',
        rationale:
          'Ein großer Würfel hält Hemd und Anzug glatt, der mittlere fasst Wäsche und T-Shirts.',
        cubes: [
          { icon: Shirt, label: '1× großer Würfel', detail: 'Hemden, Anzug, Pullover' },
          { icon: Package, label: '1× mittlerer Würfel', detail: 'Unterwäsche, Socken, T-Shirts' },
          { icon: Footprints, label: '1× Schuhbeutel', detail: 'Business-Schuhe sauber trennen' },
        ],
      }
    }
    return {
      headline: 'Eine Woche im Anzug',
      rationale:
        'Großer Würfel fürs Outfit, mittlere für Wechselkleidung und ein Wäschebeutel für Getragenes.',
      cubes: [
        { icon: Shirt, label: '1× großer Würfel', detail: 'Hemden, Sakko, Hose' },
        { icon: Package, label: '2× mittlerer Würfel', detail: 'Wechsel und Sportkleidung' },
        { icon: Footprints, label: '1× Schuhbeutel', detail: 'Business + Sneaker' },
        { icon: Sparkles, label: '1× Wäschebeutel', detail: 'Schmutziges separat halten' },
      ],
    }
  }

  // Outdoor — Kompression, Schuhe, Wäsche
  if (trip === 'outdoor') {
    return {
      headline: 'Outdoor mit System',
      rationale:
        'Kompression spart Volumen für Schlafsack und Funktionsklamotten, Schuh- und Wäschebeutel trennen Sauberes von Dreckigem.',
      cubes: [
        { icon: Package, label: '1× großer Würfel', detail: 'Funktionsjacke, Fleece, Hose' },
        { icon: Package, label: '1× mittlerer Würfel', detail: 'Base-Layer, T-Shirts' },
        { icon: Footprints, label: '1× Schuhbeutel', detail: 'Wander- und Wechselschuhe' },
        { icon: Sparkles, label: '1× Wäschebeutel', detail: 'Getragenes oder Nasses' },
      ],
    }
  }

  // Strand — leichtere Kleidung, Bikini, Sandalen
  if (trip === 'strand') {
    if (days <= 5) {
      return {
        headline: 'Sonne, Sand, weniger Koffer',
        rationale:
          'Leichte Sommerkleidung passt in kleine Würfel, Schuhbeutel für Sandalen und Sneaker.',
        cubes: [
          { icon: Sun, label: '2× kleiner Würfel', detail: 'T-Shirts, Shorts, Bikini' },
          { icon: Package, label: '1× mittlerer Würfel', detail: 'Unterwäsche, Schlafshirt' },
          { icon: Footprints, label: '1× Schuhbeutel', detail: 'Sandalen, Sneaker' },
        ],
      }
    }
    return {
      headline: 'Zwei Wochen am Meer',
      rationale:
        'Großer Würfel für Wechselgarderobe, mittlerer für Strandzubehör, Wäschebeutel hält Salziges fern.',
      cubes: [
        { icon: Sun, label: '1× großer Würfel', detail: 'Sommerkleidung für die ganze Woche' },
        { icon: Package, label: '2× mittlerer Würfel', detail: 'Bademode, Handtücher, Schlaf' },
        { icon: Footprints, label: '1× Schuhbeutel', detail: 'Flip-Flops, Sneaker' },
        { icon: Sparkles, label: '1× Wäschebeutel', detail: 'Sand und Salz separat halten' },
      ],
    }
  }

  // Städtetrip — Default-Fluss nach Tagen
  if (days <= 3) {
    return {
      headline: 'Kurzer Städtetrip',
      rationale:
        'Zwei kleine Würfel reichen für Wechselkleidung, Schuhbeutel hält die Sneaker vom Rest getrennt.',
      cubes: [
        { icon: Package, label: '2× kleiner Würfel', detail: 'Outfits, Unterwäsche, Socken' },
        { icon: Footprints, label: '1× Schuhbeutel', detail: 'Zweitschuhe sauber verstaut' },
      ],
    }
  }

  if (days <= 7) {
    return {
      headline: 'Eine Woche unterwegs',
      rationale:
        'Großer Würfel fürs Hauptoutfit, mittlere für Wechsel, plus Beutel für Wäsche und Schuhe.',
      cubes: [
        { icon: Package, label: '1× großer Würfel', detail: 'Hauptkleidung, Pullover' },
        { icon: Package, label: '2× mittlerer Würfel', detail: 'Tageskleidung, Sport' },
        { icon: Shirt, label: '1× Unterwäschebeutel', detail: 'Socken und Unterwäsche kompakt' },
        { icon: Footprints, label: '1× Schuhbeutel', detail: 'Zweitschuhe oder Sandalen' },
      ],
    }
  }

  // 8 – 21 Tage: das volle Set
  return {
    headline: 'Lange Reise, volles Set',
    rationale:
      'Ab acht Tagen lohnt sich das komplette 8-teilige Set, sonst musst du unterwegs ständig umräumen.',
    cubes: [
      { icon: Package, label: '1× großer Würfel', detail: 'Pullover, Hosen, Hauptoutfits' },
      { icon: Package, label: '2× mittlerer Würfel', detail: 'Tageskleidung und Sport' },
      { icon: Package, label: '2× kleiner Würfel', detail: 'Accessoires, Schlafkleidung' },
      { icon: Shirt, label: '1× Unterwäschebeutel', detail: 'Socken, Unterwäsche, BHs' },
      { icon: Footprints, label: '1× Schuhbeutel', detail: 'Zweitschuhe oder Wanderschuhe' },
      { icon: Sparkles, label: '1× Wäschebeutel', detail: 'Getragenes sauber trennen' },
    ],
  }
}

export default function PackCalculator() {
  const [days, setDays] = useState<number>(5)
  const [trip, setTrip] = useState<TripType>('staedtetrip')

  const recommendation = useMemo(() => buildRecommendation(days, trip), [days, trip])
  const recoKey = `${trip}-${days <= 3 ? 'a' : days <= 7 ? 'b' : 'c'}`

  return (
    <div className="grid gap-6 md:gap-10 md:grid-cols-[1.05fr_1fr] items-start">
      {/* Heading + Controls */}
      <div className="space-y-6">
        <div className="space-y-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-[10px] font-bold tracking-[0.22em] uppercase text-accent-700 ring-1 ring-accent/30">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Pack-Helfer
          </span>
          <h2 className="font-handwrite text-4xl md:text-5xl leading-[1.05] text-foreground">
            Welche Würfel brauchst du?
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-md leading-relaxed">
            Sag uns kurz, wie lange und wofür du reist. Wir empfehlen dir die passende
            Kombination aus dem 8-teiligen Set.
          </p>
        </div>

        {/* Days slider */}
        <div className="rounded-3xl bg-white p-5 md:p-6 ring-1 ring-black/5 shadow-elevated">
          <div className="flex items-baseline justify-between mb-3">
            <label
              htmlFor="pack-days"
              className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground"
            >
              Reisetage
            </label>
            <span className="font-serif text-2xl font-bold text-foreground tabular-nums">
              {days}
              <span className="ml-1 text-xs font-medium text-muted-foreground">
                {days === 1 ? 'Tag' : 'Tage'}
              </span>
            </span>
          </div>
          <input
            id="pack-days"
            type="range"
            min={1}
            max={21}
            step={1}
            value={days}
            onChange={(e) => setDays(parseInt(e.target.value, 10))}
            className="w-full h-2 cursor-pointer appearance-none rounded-full bg-muted accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            aria-valuemin={1}
            aria-valuemax={21}
            aria-valuenow={days}
          />
          <div className="mt-2 flex justify-between text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            <span>1</span>
            <span>7</span>
            <span>14</span>
            <span>21</span>
          </div>
        </div>

        {/* Trip type chips */}
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Art der Reise
          </p>
          <div className="flex flex-wrap gap-2">
            {TRIP_OPTIONS.map((option) => {
              const Icon = option.icon
              const active = option.id === trip
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setTrip(option.id)}
                  aria-pressed={active}
                  className={[
                    'inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold',
                    'transition-all duration-300',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
                    active
                      ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                      : 'bg-white text-foreground ring-1 ring-black/10 hover:ring-foreground/30',
                  ].join(' ')}
                  style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {option.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Recommendation card */}
      <div className="rounded-[2rem] bg-primary text-white p-6 md:p-8 shadow-elevated ring-1 ring-primary/20 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-accent/25 blur-[80px] rounded-full pointer-events-none" />

        <div className="relative">
          <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-accent-200 mb-2">
            Deine Empfehlung
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={recoKey}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="font-serif text-2xl md:text-3xl font-bold leading-tight mb-3">
                {recommendation.headline}
              </h3>
              <p className="text-sm md:text-[15px] leading-relaxed text-white/75 mb-6">
                {recommendation.rationale}
              </p>

              <ul className="space-y-2.5">
                {recommendation.cubes.map((cube) => {
                  const Icon = cube.icon
                  return (
                    <li
                      key={cube.label}
                      className="flex items-start gap-3 rounded-2xl bg-white/8 px-3.5 py-3 ring-1 ring-white/10 backdrop-blur-sm"
                    >
                      <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent-200 ring-1 ring-white/10">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-white">{cube.label}</p>
                        <p className="text-xs text-white/65 leading-snug">{cube.detail}</p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          </AnimatePresence>

          <p className="mt-6 text-[10px] tracking-[0.18em] uppercase font-bold text-white/50">
            Aus dem 8-teiligen Kofferklar Set
          </p>
        </div>
      </div>
    </div>
  )
}
