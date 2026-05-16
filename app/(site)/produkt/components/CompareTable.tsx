'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, XCircle, MinusCircle } from 'lucide-react'

type OtherStatus = 'no' | 'rare'

interface CompareRow {
  feature: string
  kofferklar: string
  others: string
  othersStatus: OtherStatus
}

const ROWS: CompareRow[] = [
  {
    feature: 'Kompression',
    kofferklar: 'Doppel-Reißverschluss',
    others: 'Meist nur ein Zip',
    othersStatus: 'rare',
  },
  {
    feature: 'Wasserabweisend',
    kofferklar: 'Beschichtetes Polyester',
    others: 'Selten',
    othersStatus: 'rare',
  },
  {
    feature: 'Doppelnaht',
    kofferklar: 'Reißt nicht beim Stopfen',
    others: 'Einfachnaht',
    othersStatus: 'no',
  },
  {
    feature: 'Reißverschluss-Qualität',
    kofferklar: 'Robust, leichtgängig',
    others: 'Hakt nach paar Reisen',
    othersStatus: 'no',
  },
  {
    feature: '8-teiliges Komplettsystem',
    kofferklar: 'Alle Größen drin',
    others: 'Meist 3 bis 6 Teile',
    othersStatus: 'rare',
  },
  {
    feature: 'Designed in Germany',
    kofferklar: 'Ravensburg',
    others: 'No-Name aus Übersee',
    othersStatus: 'no',
  },
  {
    feature: '30 Tage Rückgabe',
    kofferklar: 'Ohne Diskussion',
    others: 'Oft kompliziert',
    othersStatus: 'no',
  },
  {
    feature: 'Kundenservice deutsch',
    kofferklar: 'Antwort in 24h',
    others: 'Englisch oder gar nicht',
    othersStatus: 'no',
  },
]

const ROW_VARIANTS = {
  hidden: { opacity: 0, x: -16 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.08,
      ease: [0.16, 1, 0.3, 1] as number[],
    },
  }),
}

export default function CompareTable() {
  return (
    <section aria-label="Vergleich KofferKlar und andere Packwürfel">
      <div className="rounded-[2.5rem] bg-white shadow-elevated ring-1 ring-black/5 p-6 md:p-12 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex flex-col items-center text-center mb-8 md:mb-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.18em] font-semibold bg-primary/8 text-primary border border-primary/12 mb-4">
            Im Direktvergleich
          </span>
          <h2 className="font-serif text-2xl md:text-4xl font-bold text-foreground leading-tight">
            Warum <span className="font-handwrite text-accent text-3xl md:text-5xl align-baseline">KofferKlar?</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mt-3 max-w-lg leading-relaxed">
            Was uns von billigen Packwürfeln aus dem Internet unterscheidet. Ohne Bullshit, einfach gegenübergestellt.
          </p>
        </motion.div>

        {/* Column headers (desktop) */}
        <div className="hidden md:grid grid-cols-[1.2fr_1fr_1fr] gap-4 px-5 pb-3 mb-2 border-b border-black/8">
          <div className="text-[11px] uppercase tracking-[0.18em] font-bold text-muted-foreground">
            Merkmal
          </div>
          <div className="text-[11px] uppercase tracking-[0.18em] font-bold text-primary pl-7">
            KofferKlar
          </div>
          <div className="text-[11px] uppercase tracking-[0.18em] font-bold text-muted-foreground pl-7">
            Andere Würfel
          </div>
        </div>

        {/* Rows */}
        <ul className="flex flex-col">
          {ROWS.map((row, i) => (
            <motion.li
              key={row.feature}
              custom={i}
              variants={ROW_VARIANTS}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className={`grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr] items-start md:items-center gap-3 md:gap-4 px-4 md:px-5 py-4 md:py-4 rounded-2xl ${
                i % 2 === 0 ? 'bg-muted/40' : 'bg-transparent'
              }`}
            >
              {/* Feature label */}
              <div className="text-sm md:text-[15px] font-semibold text-foreground">
                {row.feature}
              </div>

              {/* KofferKlar column */}
              <div className="flex items-center gap-2">
                <CheckCircle2
                  className="w-5 h-5 text-accent shrink-0"
                  strokeWidth={2.25}
                  aria-hidden="true"
                />
                <span className="text-sm font-bold text-foreground">
                  {row.kofferklar}
                </span>
              </div>

              {/* Andere column */}
              <div className="flex items-center gap-2">
                {row.othersStatus === 'no' ? (
                  <XCircle
                    className="w-5 h-5 text-muted-foreground/60 shrink-0"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                ) : (
                  <MinusCircle
                    className="w-5 h-5 text-muted-foreground/50 shrink-0"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                )}
                <span className="text-sm text-muted-foreground">
                  {row.others}
                </span>
              </div>
            </motion.li>
          ))}
        </ul>

        {/* Footer note */}
        <motion.p
          className="text-center text-xs md:text-sm text-muted-foreground mt-8 md:mt-10 max-w-md mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Fair gesagt: Es gibt günstigere Würfel. Aber kaum welche, die so lange halten und so gut packen.
        </motion.p>
      </div>
    </section>
  )
}
