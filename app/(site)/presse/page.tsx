import type { Metadata } from 'next'
import Link from 'next/link'
import { Download, FileText, Mail, Calendar, MapPin, Users, Award, Shield } from 'lucide-react'
import ContactForm from '@/app/(site)/hilfe-service/components/ContactForm'
import Magnetic from '../components/Magnetic'

export const revalidate = 86400

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Pressebereich & Media Kit | KofferKlar',
    description: 'Bilder, Logos, Infomaterialien und Storys rund um KofferKlar für Journalisten und Reiseblogger zum sofortigen Download.',
    openGraph: {
      title: 'KofferKlar Pressebereich',
      description: 'Alle Materialien, Logos und Infos für Journalisten und Blogger.',
    },
  }
}

const FACTS = [
  { icon: Users, label: 'Gründer', value: 'Yasar Heidt & Nico Pandrock' },
  { icon: MapPin, label: 'Hauptsitz', value: 'Deutschland' },
  { icon: Award, label: 'Fokus', value: 'Reiseorganisation & Gepäcksysteme' },
]

export default function PressePage() {
  return (
    <main id="main-content" className="pt-[72px] bg-background min-h-screen">
      
      {/* ─── Editorial Header / Hero ─── */}
      <header className="relative py-24 md:py-32 lg:py-40 bg-white border-b border-black/5 overflow-hidden">
        {/* Decorative backdrop elements */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 -skew-x-12 translate-x-1/4" />
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 text-accent text-[10px] font-bold tracking-[0.4em] uppercase mb-8">
              <span className="w-6 h-px bg-accent" /> Presse & Medien
            </div>
            <h1 className="font-display text-balance text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-foreground leading-[1.05] tracking-tightest mb-12">
              Hier ist dein <br />
              <span className="text-primary inline-flex items-baseline relative">
                <span className="font-handwrite font-normal text-accent">Paket.</span>
                <span>&nbsp;Pressebereich.</span>
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
            <p className="text-muted-foreground text-pretty text-lg md:text-xl lg:text-2xl leading-relaxed max-w-2xl">
              Willkommen bei KofferKlar. Hier findest du Bildmaterial, Logos, unsere Gründungsgeschichte und die wichtigsten Infos für deinen Beitrag zum Download.
            </p>
          </div>
        </div>
      </header>

      {/* ─── Fast Facts Section ─── */}
      <section className="bg-white border-b border-black/[0.05]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 md:py-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {FACTS.map((fact, index) => {
            const Icon = fact.icon
            return (
              <div key={index} className="flex items-center gap-4 w-full">
                <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center ring-1 ring-accent/20 shrink-0">
                  <Icon size={16} />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground leading-tight">
                    {fact.label}
                  </div>
                  <div className="font-display text-sm md:text-base font-bold text-foreground truncate mt-0.5">
                    {fact.value}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ─── Media Kit Download Card & Narrative Grid ─── */}
      <section className="py-20 md:py-28 max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-16 lg:gap-24 items-start">
          
          {/* Narrative / Text section */}
          <div className="space-y-16">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Die KofferKlar Story</h2>
              <div className="space-y-6 text-muted-foreground text-base md:text-lg leading-relaxed max-w-[65ch]">
                <p>
                  KofferKlar wurde von Yasar Heidt und Nico Pandrock gegründet. Aus eigener Frustration über unübersichtliches Chaos in Reisetaschen und Koffern entstand die Idee, eine funktionale, minimalistische und zugleich langlebige Lösung zu entwickeln. 
                </p>
                <p>
                  Das Ergebnis ist ein durchdachtes 8-teiliges Kompressions-Packwürfel-Set. Durch einen speziellen doppelten Reißverschluss lässt sich das Volumen der verpackten Kleidung um bis zu 40% reduzieren. So bleibt im Koffer Platz für das Wesentliche, während Reisende am Zielort mit einem Handgriff Ordnung und Überblick behalten.
                </p>
              </div>
            </div>

            <div className="border-t border-black/5 pt-12">
              <h3 className="text-xl font-bold text-foreground mb-4">Boilerplate (Kurzinfo für Beiträge)</h3>
              <div className="relative p-6 rounded-2xl bg-muted/40 border border-black/5 text-muted-foreground text-sm md:text-base leading-relaxed">
                <p className="italic">
                  &quot;KofferKlar ist ein Start-up aus Deutschland, das sich auf durchdachte Reiseorganisation spezialisiert hat. Mit ihrem 8-teiligen Kompressions-Packwürfel-Set helfen die Gründer Yasar Heidt und Nico Pandrock reiseaffinen Menschen dabei, Ordnung und System in ihr Gepäck zu bringen. KofferKlar verbindet minimalistisches, funktionales Design mit hoher Materialqualität, um das Reisen stressfreier und effizienter zu gestalten.&quot;
                </p>
              </div>
            </div>
          </div>

          {/* Download Card (Double-Bezel Design) */}
          <div className="sticky top-24">
            <div className="relative p-2 rounded-[3rem] bg-black/5 ring-1 ring-black/5 shadow-elevated">
              <div className="bg-white rounded-[calc(3rem-0.5rem)] p-8 md:p-10 flex flex-col gap-8">
                
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-[10px] font-bold tracking-[0.22em] uppercase text-accent mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    Medien-Kit (EPK)
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground leading-tight mb-4">
                    KofferKlar Press Kit
                  </h2>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    Lade das vollständige Paket herunter. Es enthält hochauflösende Produktfotos (alle Farbvarianten), Teambilder, das Logo als Vektorgrafik (SVG) sowie eine Infodatei und die Nutzungsvereinbarung.
                  </p>
                </div>

                <div className="border-y border-black/5 py-6 space-y-4">
                  <div className="flex items-center justify-between text-xs md:text-sm text-muted-foreground">
                    <span className="flex items-center gap-2"><FileText size={16} /> Dateiformat</span>
                    <span className="font-semibold text-foreground">ZIP-Archiv</span>
                  </div>
                  <div className="flex items-center justify-between text-xs md:text-sm text-muted-foreground">
                    <span className="flex items-center gap-2"><Download size={16} /> Paketinhalt</span>
                    <span className="font-semibold text-foreground text-right">Logos, 6x Fotos, README</span>
                  </div>
                  <div className="flex items-center justify-between text-xs md:text-sm text-muted-foreground">
                    <span className="flex items-center gap-2"><Shield size={16} /> Lizenzierung</span>
                    <span className="font-semibold text-foreground flex items-center gap-1.5">
                      MIT Lizenz
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col items-center">
                  <Magnetic strength={12} radius={110}>
                    <a
                      id="download-presskit-btn"
                      href="/downloads/kofferklar-presskit.zip"
                      download
                      className="group relative overflow-hidden inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground w-full md:w-auto px-8 py-4 rounded-full text-base font-bold hover:bg-primary/95 transition-all duration-500 shadow-glow-navy active:scale-[0.98]"
                    >
                      <span className="relative z-10">Press Kit herunterladen</span>
                      <span className="relative z-10 inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/10 group-hover:translate-y-0.5 transition-transform duration-300">
                        <Download size={14} />
                      </span>
                    </a>
                  </Magnetic>
                  <p className="mt-4 text-[10px] text-muted-foreground/80 text-center uppercase tracking-widest font-bold">
                    Freie redaktionelle Verwendung
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─── Contact Section ─── */}
      <section className="py-24 md:py-32 lg:py-48 bg-muted/30 border-t border-black/5">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-20 lg:gap-32 items-start">
            
            <div>
              <div className="inline-flex items-center gap-2 text-accent text-[10px] font-bold tracking-[0.4em] uppercase mb-8">
                <span className="w-6 h-px bg-accent" /> Kontakt
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-foreground leading-[1.05] mb-12">
                Fragen oder <br />
                <span className="text-primary inline-flex items-baseline relative">
                  <span className="font-handwrite font-normal text-accent">Testmuster?</span>
                </span>
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-16 max-w-[45ch]">
                Du planst einen Beitrag und benötigst ein physisches Testmuster unseres 8-teiligen Sets oder hast spezielle Fragen an uns? Schreib uns einfach direkt über das Kontaktformular. Wir antworten dir in der Regel innerhalb von 24 Stunden.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full bg-white border border-black/5 shadow-md flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground mb-1">Direkter Pressekontakt</div>
                    <div className="text-muted-foreground text-sm">presse@kofferklar.de</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reused Formspark form from hilfe-service */}
            <ContactForm />

          </div>
        </div>
      </section>

    </main>
  )
}
