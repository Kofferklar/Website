import type { Metadata } from 'next'
import { getFaqItems, getSiteSettings } from '@/lib/sanity/queries'
import ServiceFaq from './components/ServiceFaq'
import ContactForm from './components/ContactForm'
import Link from 'next/link'
import { Phone, Mail, Truck, RefreshCw } from 'lucide-react'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Hilfe & Service | Kontakt & Häufige Fragen',
    description: 'Hast du Fragen zu deiner Bestellung oder unseren Packwürfeln? Hier findest du Antworten und kannst direkt Kontakt mit uns aufnehmen.',
  }
}

/**
 * Hilfe & Service Page (Phase 3)
 * Combines categorized FAQ with a functional contact form.
 */
export default async function HilfeServicePage() {
  const [faqItems, settings] = await Promise.all([
    getFaqItems(),
    getSiteSettings()
  ])

  const quickLinks = [
    {
      icon: <Phone size={24} />,
      title: 'Telefon',
      value: settings?.phone || '+49 000 000000',
      href: settings?.phone ? `tel:${settings.phone}` : '#',
      label: 'Direkter Kontakt'
    },
    {
      icon: <Mail size={24} />,
      title: 'E-Mail',
      value: settings?.email || 'hallo@kofferklar.de',
      href: settings?.email ? `mailto:${settings.email}` : 'mailto:hallo@kofferklar.de',
      label: 'Wir antworten schnell'
    },
    {
      icon: <Truck size={24} />,
      title: 'Versand',
      value: '2 bis 4 Werktage',
      href: '#faq',
      label: 'Kostenlose Lieferung'
    },
    {
      icon: <RefreshCw size={24} />,
      title: 'Rückgabe',
      value: '30 Tage Frist',
      href: '/widerruf',
      label: 'Sorglos testen'
    }
  ]

  return (
    <main id="main-content" className="pt-[72px] bg-background min-h-screen">
      
      {/* Editorial Header */}
      <header className="py-24 md:py-32 lg:py-40 bg-white border-b border-black/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-accent/5 -skew-x-12 translate-x-1/2 pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
           <div className="max-w-4xl">
              <div className="text-accent text-[10px] font-bold tracking-[0.4em] uppercase mb-8">Support</div>
              <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl font-bold text-foreground leading-[1.05] tracking-tight mb-12">
                Wie können wir <br />
                <span className="italic text-primary">dir helfen?</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl lg:text-2xl leading-relaxed max-w-2xl">
                Egal ob Fragen zum Produkt, zum Versand oder zur Handhabung. Wir sind für dich da und sorgen dafür, dass du entspannt reisen kannst.
              </p>
           </div>
        </div>
      </header>

      {/* Quick Info Grid (Glassmorphism) */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-8 -mt-12 md:-mt-16 relative z-20">
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {quickLinks.map((link, i) => (
              <Link 
                key={i}
                href={link.href}
                className="group p-2 rounded-[2.5rem] bg-white/80 ring-1 ring-black/5 backdrop-blur-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-2"
              >
                <div className="bg-white rounded-[calc(2.5rem-0.5rem)] p-8 h-full flex flex-col items-center text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
                   <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                      {link.icon}
                   </div>
                   <div className="text-[10px] font-bold tracking-widest uppercase text-accent mb-2">{link.title}</div>
                   <div className="text-base font-bold text-foreground mb-1">{link.value}</div>
                   <div className="text-xs text-muted-foreground font-medium italic opacity-0 group-hover:opacity-100 transition-opacity duration-500">{link.label}</div>
                </div>
              </Link>
            ))}
         </div>
      </section>

      {/* FAQ Section */}
      <div id="faq" className="scroll-mt-24">
        <ServiceFaq items={faqItems} />
      </div>

      {/* Contact Form Section */}
      <section className="py-24 md:py-32 lg:py-48 bg-muted/30 border-t border-black/5">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-20 lg:gap-32 items-start">
              
              <div>
                 <div className="text-accent text-[10px] font-bold tracking-[0.4em] uppercase mb-8">Kontakt</div>
                 <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold text-foreground leading-[1.05] mb-12">
                   Schreib uns eine <br />
                   <span className="italic text-primary">persönliche Nachricht.</span>
                 </h2>
                 <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-16 max-w-[45ch]">
                   Du hast ein spezielles Anliegen oder möchtest uns Feedback geben? Nutze einfach unser Formular. Unser Team in Deutschland meldet sich werktags innerhalb von 24 Stunden bei dir.
                 </p>
                 
                 <div className="space-y-12">
                    <div className="flex items-start gap-8 group">
                       <div className="w-12 h-12 rounded-full bg-white border border-black/5 shadow-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                          <Mail size={20} />
                       </div>
                       <div>
                          <div className="text-sm font-bold text-foreground mb-1">E-Mail Support</div>
                          <div className="text-muted-foreground">Wir sind rund um die Uhr erreichbar.</div>
                       </div>
                    </div>
                    <div className="flex items-start gap-8 group">
                       <div className="w-12 h-12 rounded-full bg-white border border-black/5 shadow-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                          <Phone size={20} />
                       </div>
                       <div>
                          <div className="text-sm font-bold text-foreground mb-1">Telefon Support</div>
                          <div className="text-muted-foreground">Montag bis Freitag von 09:00 bis 17:00 Uhr.</div>
                       </div>
                    </div>
                 </div>
              </div>

              <ContactForm />

           </div>
        </div>
      </section>

    </main>
  )
}
