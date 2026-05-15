import Link from 'next/link'
import {
  BriefcaseBusiness,
  CheckCircle2,
  Plane,
  Shirt,
  ShoppingBag,
  Sparkles,
  Sun,
  WashingMachine,
} from 'lucide-react'

const steps = [
  'Kleidung nach Kategorien sortieren',
  'Große Kleidung in den großen Cube legen',
  'T-Shirts und leichte Kleidung in den mittleren Cube packen',
  'Unterwäsche und Socken in den kleinen Cube geben',
  'Schuhe separat verstauen',
  'Wäschebeutel für die Rückreise einplanen',
]

const profiles = [
  {
    icon: Plane,
    title: 'Wochenendtrip',
    text: 'Nutze einen mittleren Cube für zwei Outfits, einen kleinen Cube für Unterwäsche und Socken, den Kulturbeutel und den Wäschebeutel.',
  },
  {
    icon: Sun,
    title: 'Sommerurlaub',
    text: 'Leichte Kleidung kommt in den großen und mittleren Cube. Badekleidung, Unterwäsche und Ladezubehör trennst du in den kleinen Cubes.',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Geschäftsreise',
    text: 'Hemden oder Blusen kommen flach in den großen Cube. Basics und Sportkleidung packst du getrennt, Schuhe bleiben im Schuhbeutel.',
  },
]

export default function PackGuideEnhancement() {
  return (
    <section className="mx-auto mt-4 max-w-[75ch] rounded-[2rem] bg-primary/5 p-6 ring-1 ring-primary/10 md:mt-8 md:p-10">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-primary ring-1 ring-primary/10">
          <Shirt className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <div className="text-accent text-[10px] font-bold tracking-[0.3em] uppercase mb-3">
            Packanleitung
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground leading-[1.1]">
            So nutzt du dein Kofferklar Set richtig
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Das 8-teilige Set funktioniert am besten, wenn jedes Teil eine klare Aufgabe bekommt.
            So bleibt dein Handgepäck übersichtlich und du findest unterwegs schneller, was du suchst.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-3">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-black/5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              {index + 1}
            </div>
            <p className="text-sm font-semibold text-foreground">{step}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <div className="mb-4 flex items-center gap-2 text-sm font-bold text-foreground">
          <Sparkles className="h-4 w-4 text-accent" aria-hidden="true" />
          Drei einfache Packprofile
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {profiles.map((profile) => {
            const Icon = profile.icon
            return (
              <article key={profile.title} className="rounded-3xl bg-white p-5 ring-1 ring-black/5">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <h3 className="text-sm font-bold text-foreground">{profile.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{profile.text}</p>
              </article>
            )
          })}
        </div>
      </div>

      <div className="mt-8 grid gap-3 rounded-3xl bg-white p-5 ring-1 ring-black/5 sm:grid-cols-2">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-muted-foreground">
            Kompression erst schließen, wenn der Cube sauber gefüllt ist.
          </p>
        </div>
        <div className="flex items-start gap-3">
          <WashingMachine className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-muted-foreground">
            Den Wäschebeutel leer einpacken, damit saubere und getragene Kleidung getrennt bleiben.
          </p>
        </div>
      </div>

      <Link
        href="/produkt"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/95 active:scale-[0.98]"
      >
        <ShoppingBag className="h-4 w-4" aria-hidden="true" />
        Pack-Set ansehen
      </Link>
    </section>
  )
}
