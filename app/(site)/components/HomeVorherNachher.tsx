'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

/**
 * HomeVorherNachher Client Component
 * Simplified visual comparison for the homepage with high-end editorial styling.
 */
export default function HomeVorherNachher() {
  return (
    <section className="py-24 md:py-32 lg:py-40 overflow-hidden bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
           
           {/* --- Left Content: Narrative --- */}
           <motion.div
             initial={{ opacity: 0, x: -40 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
             className="order-2 lg:order-1"
           >
             <div className="text-accent text-[10px] font-bold tracking-[0.4em] uppercase mb-8">Systematisch Reisen</div>
             <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold text-foreground leading-[1.05] mb-10">
               Vom Chaos zur <br /> 
               <span className="italic text-primary">absoluten Ordnung.</span>
             </h2>
             <p className="text-muted-foreground text-lg md:text-xl lg:text-2xl leading-relaxed mb-14 max-w-[40ch]">
               Verabschiede dich von zerknitterter Kleidung und der ewigen Suche nach Socken. Unsere Kompressions-Technologie maximiert deinen Platz und minimiert deinen Stress.
             </p>
             
             {/* Benefit List */}
             <ul className="space-y-8">
               {[
                 { title: "60% mehr Platz", desc: "Durch innovative Hochleistungs-Reißverschlüsse." },
                 { title: "Knitterfrei reisen", desc: "Deine Kleidung bleibt fixiert und perfekt geschützt." },
                 { title: "Sofortiger Zugriff", desc: "Alles hat seinen festen Platz. Kein Wühlen mehr im Hotel." }
               ].map((item, i) => (
                 <motion.li 
                   key={i}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.4 + (i * 0.15), duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                   className="flex items-start gap-6 group"
                 >
                   <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent flex-shrink-0 mt-1 group-hover:bg-accent group-hover:text-white transition-all duration-500">
                     <div className="w-2 h-2 rounded-full bg-current" />
                   </div>
                   <div>
                     <div className="text-lg font-bold text-foreground mb-1">{item.title}</div>
                     <div className="text-muted-foreground leading-relaxed">{item.desc}</div>
                   </div>
                 </motion.li>
               ))}
             </ul>
           </motion.div>

           {/* --- Right Visual: Editorial Comparison --- */}
           <motion.div
             initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
             whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
             className="relative order-1 lg:order-2"
           >
             <div className="grid grid-cols-2 gap-6 md:gap-12">
                {/* Chaos Block */}
                <div className="space-y-6">
                   <div
                     className="relative aspect-[3/4.5] rounded-[2.5rem] overflow-hidden border border-black/5 shadow-inner"
                   >
                      <Image
                        src="/images/images_kofferklar/vorher-koffer.png"
                        alt="Chaos im Koffer — unorganisierte Kleidung"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold text-white uppercase tracking-[0.2em] border border-white/10">
                         Chaos
                      </div>
                   </div>
                   <div className="text-center">
                     <div className="font-serif italic text-muted-foreground text-lg">Davor.</div>
                   </div>
                </div>

                {/* Solution Block (Offset) */}
                <div className="space-y-6 pt-16 md:pt-24">
                   <div
                     className="relative aspect-[3/4.5] rounded-[3.5rem] overflow-hidden border-[3px] border-accent/30 shadow-[0_50px_100px_-20px_rgba(201,168,76,0.15)]"
                   >
                      <Image
                        src="/images/images_kofferklar/nachher-koffer.png"
                        alt="Ordnung mit KofferKlar — organisierte Packwürfel"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      <div className="absolute top-8 left-8 bg-accent text-accent-foreground px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] shadow-xl">
                         KofferKlar
                      </div>
                   </div>
                   <div className="text-center">
                     <div className="font-serif italic text-foreground font-bold text-xl">Danach.</div>
                   </div>
                </div>
             </div>
             
             {/* Decorative Background Glow */}
             <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
           </motion.div>
        </div>
      </div>
    </section>
  )
}
