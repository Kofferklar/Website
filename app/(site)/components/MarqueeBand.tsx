'use client'

import { Plane, Compass, Mountain, Sun, Camera, MapPin, Hourglass, Sparkles, Luggage } from 'lucide-react'

const ITEMS = [
  { icon: Plane,     label: 'Reise leichter' },
  { icon: Compass,   label: 'Pack klüger' },
  { icon: Mountain,  label: '8-teiliges Set' },
  { icon: Sun,       label: 'Stressfrei unterwegs' },
  { icon: Camera,    label: 'Mehr Erinnerungen' },
  { icon: MapPin,    label: 'Designed in Germany' },
  { icon: Hourglass, label: '30 Sekunden Pack-Zeit' },
  { icon: Sparkles,  label: 'Premium Material' },
  { icon: Luggage,   label: 'Handgepäck tauglich' },
]

export default function MarqueeBand() {
  const row = [...ITEMS, ...ITEMS]

  return (
    <section
      aria-label="Vorteile auf einen Blick"
      className="relative py-6 md:py-8 border-y border-black/[0.05] bg-white/60 backdrop-blur-sm overflow-hidden"
    >
      {/* Soft edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10" />

      <div className="marquee-track">
        {row.map((it, i) => {
          const Icon = it.icon
          return (
            <div
              key={i}
              className="flex items-center gap-3 mx-6 md:mx-10 whitespace-nowrap"
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/5 text-primary">
                <Icon size={16} strokeWidth={1.8} />
              </span>
              <span className="text-[13px] md:text-sm font-semibold text-foreground/80 tracking-tight">
                {it.label}
              </span>
              <span className="w-1 h-1 rounded-full bg-accent/60" />
            </div>
          )
        })}
      </div>
    </section>
  )
}
