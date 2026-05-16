'use client'

import { motion } from 'framer-motion'
import { Leaf, ShieldCheck, Heart } from 'lucide-react'

/**
 * SustainabilityBlock Component
 * High-end glassmorphism panel for sustainability and quality promises.
 */
export default function SustainabilityBlock() {
  const points = [
    {
      icon: <Leaf className="text-emerald-500" size={24} />,
      title: "Verantwortung",
      text: "Wir setzen auf langlebige Materialien, um den Konsum von Einweg-Produkten und kurzlebigen Alternativen zu reduzieren."
    },
    {
      icon: <ShieldCheck className="text-primary" size={24} />,
      title: "Premium Qualität",
      text: "Jedes Set durchläuft eine strenge Qualitätskontrolle. Unsere Reißverschlüsse sind für Tausende von Zyklen ausgelegt."
    },
    {
      icon: <Heart className="text-rose-400" size={24} />,
      title: "Kundenzufriedenheit",
      text: "Wir sind erst zufrieden, wenn du es bist. Dein Feedback fließt direkt in die stetige Verbesserung unserer Produkte ein."
    }
  ]

  return (
    <section className="py-24 md:py-32 lg:py-40 bg-muted/30 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[150px] rounded-full translate-x-1/4 translate-y-1/4 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-accent text-[10px] font-bold tracking-[0.4em] uppercase mb-6">Werte & Vision</div>
            <h2 className="font-display text-balance text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.05] tracking-tightest mb-8">
              Qualität, die <br />
              <span className="font-handwrite text-primary">Bestand hat.</span>
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              Bei KofferKlar glauben wir nicht an Fast-Fashion oder Wegwerf-Produkte. Wir entwickeln Reise-Equipment, das dich über Jahre hinweg begleitet und dein Reiseerlebnis nachhaltig verbessert.
            </p>
          </motion.div>
        </div>

        {/* Glassmorphism Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {points.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-2 rounded-[3rem] bg-white/40 ring-1 ring-black/5 backdrop-blur-xl group hover:shadow-2xl transition-all duration-700"
            >
              <div className="bg-white/80 rounded-[calc(3rem-0.5rem)] p-10 h-full flex flex-col items-center text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
                <div className="w-16 h-16 rounded-3xl bg-white shadow-xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500 border border-black/5">
                  {point.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">{point.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {point.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
