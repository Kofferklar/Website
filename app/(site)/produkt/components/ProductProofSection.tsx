import Link from 'next/link'
import { ArrowRight, BriefcaseBusiness, CalendarDays, GraduationCap } from 'lucide-react'

const proofCards = [
  {
    icon: CalendarDays,
    title: 'Wochenendtrip',
    text: 'Outfits nach Tagen sortieren, Kulturbeutel oben einplanen und Wäschebeutel leer mitnehmen.',
  },
  {
    icon: GraduationCap,
    title: 'Semesterferien',
    text: 'Große Kleidung komprimieren, Basics im mittleren Cube bündeln und Schuhe separat verstauen.',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Geschäftsreise',
    text: 'Hemden und Wechselkleidung getrennt packen, damit morgens kein Suchen im Koffer nötig ist.',
  },
]

export default function ProductProofSection() {
  return (
    <section className="py-6 md:py-8">
      <div className="rounded-[2rem] bg-muted/35 p-5 ring-1 ring-black/5 md:p-6">
        <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <div className="text-accent text-[10px] font-bold tracking-[0.3em] uppercase mb-3">
              Produktbeweis
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground leading-[1.12] mb-4">
              Getestet im Reisealltag.
            </h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              Drei typische Pack-Situationen zeigen, wie das 8-teilige Set Ordnung schafft und
              Kleidung nach Kategorien trennt.
            </p>

            <Link
              href="/ratgeber/handgepaeck-guide-eine-woche"
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-primary/80"
            >
              So packst du eine Woche ins Handgepäck
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {proofCards.map((card) => {
              const Icon = card.icon
              return (
                <article key={card.title} className="rounded-3xl border border-black/5 bg-white p-4 shadow-sm">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary/5 text-primary">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.text}</p>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
