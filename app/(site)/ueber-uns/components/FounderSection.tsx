'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

/**
 * FounderSection Component
 * Presents Yasar Heidt and Nico Pandrock with a high-end editorial layout.
 */
export default function FounderSection() {
  return (
    <section className="py-24 md:py-32 lg:py-40 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          
          {/* --- Left Column: Founder Story --- */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="text-accent text-[10px] font-bold tracking-[0.4em] uppercase mb-8">Die Gründer</div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold text-foreground leading-[1.05] mb-12">
              Zwei Visionäre, <br />
              <span className="italic text-primary">ein Ziel.</span>
            </h2>
            
            <div className="space-y-8 text-muted-foreground text-lg md:text-xl leading-relaxed max-w-[50ch]">
              <p>
                KofferKlar wurde von <span className="text-foreground font-bold">Yasar Heidt</span> und <span className="text-foreground font-bold">Nico Pandrock</span> mit der Überzeugung gegründet, dass Reisen mehr sein sollte als nur das Ankommen an einem Ziel. Es geht um die Freiheit, den Moment zu genießen, ohne sich um das Chaos im Gepäck sorgen zu müssen.
              </p>
              <p>
                Aus eigener Erfahrung als leidenschaftliche Reisende wussten beide, wie viel Zeit und Energie durch schlechte Organisation verloren geht. Die Lösung war ein System, das Funktionalität mit Ästhetik verbindet.
              </p>
            </div>

            {/* Quote Block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-16 relative p-8 md:p-12 rounded-[2.5rem] bg-primary/5 border-l-4 border-accent"
            >
              <blockquote className="font-serif italic text-2xl md:text-3xl text-foreground leading-snug">
                &quot;Wir wollten ein Produkt schaffen, das wir selbst jeden Tag benutzen würden. Qualität und Nutzen stehen bei uns an erster Stelle.&quot;
              </blockquote>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-12 h-px bg-accent/30" />
                <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground">Yasar & Nico</span>
              </div>
            </motion.div>
          </motion.div>

          {/* --- Right Column: Visual Excellence --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 40 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:justify-self-end w-full"
          >
            {/* Double-Bezel Architecture */}
            <div className="relative p-2.5 md:p-5 rounded-[4rem] bg-black/5 ring-1 ring-black/5 backdrop-blur-sm shadow-2xl">
              <div
                className="relative overflow-hidden rounded-[calc(4rem-1.25rem)] aspect-[4/5] w-full max-w-[600px] mx-auto"
              >
                <Image
                  src="/images/images_kofferklar/yn.jpg"
                  alt="Yasar Heidt und Nico Pandrock, Gründer von KofferKlar"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />

                {/* Floating Detail Overlay */}
                <div className="absolute top-8 right-8 p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl flex flex-col items-center gap-2">
                   <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                   </div>
                   <div className="text-[10px] font-bold text-foreground">SINCE 2024</div>
                </div>
              </div>
            </div>
            
            {/* Background Accent Element */}
            <div className="absolute -z-10 -bottom-12 -left-12 w-48 h-48 bg-accent/10 blur-[80px] rounded-full" />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
