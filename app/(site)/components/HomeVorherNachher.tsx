'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { urlFor } from '@/lib/sanity/image'
import { HERO_FALLBACK_IMAGE } from '@/lib/product-images'

interface HomeVorherNachherProps {
  product?: {
    name?: string
    images?: Array<{ asset: { _ref: string } }>
  }
}

export default function HomeVorherNachher({ product }: HomeVorherNachherProps) {
  const heroImage = product?.images?.[0]

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
                 { title: "Mehr Platz", desc: "Durch Kompression und klare Kategorien." },
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
             className="relative order-1 lg:order-2 hidden lg:block"
           >
             {/* Double-Bezel Architecture */}
             <div className="relative p-1.5 md:p-5 rounded-[3rem] md:rounded-[4rem] bg-black/5 ring-1 ring-black/5 backdrop-blur-sm shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] overflow-hidden">
               <div className="relative overflow-hidden rounded-[calc(3rem-0.375rem)] md:rounded-[calc(4rem-1.25rem)] bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] aspect-[3/2] md:aspect-square lg:aspect-[4/5] w-full max-w-[600px] mx-auto">
                 {heroImage ? (
                   <Image
                     src={urlFor(heroImage).width(1000).height(1250).url()}
                     alt={product?.name || 'KofferKlar Packwürfel-Set'}
                     fill
                     className="object-cover hover:scale-[1.03] transition-transform duration-[2000ms] ease-out"
                     sizes="(max-width: 1024px) 0, 45vw"
                   />
                 ) : (
                   <Image
                     src={HERO_FALLBACK_IMAGE.src}
                     alt={HERO_FALLBACK_IMAGE.alt}
                     fill
                     className="object-cover hover:scale-[1.03] transition-transform duration-[2000ms] ease-out"
                     sizes="(max-width: 1024px) 0, 45vw"
                   />
                 )}
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
