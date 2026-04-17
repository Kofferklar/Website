'use client'

import { motion } from 'framer-motion'

interface CompressionExplainerProps {
  title?: string
}

const CUBE_VARIANTS = {
  hidden: { scale: 0.8, opacity: 0, y: 12 },
  visible: (delay: number) => ({
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: [0.16, 1, 0.3, 1] as number[],
    },
  }),
}

const ARROW_VARIANTS = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: 0.35,
      ease: [0.16, 1, 0.3, 1] as number[],
    },
  },
}

const LABEL_VARIANTS = {
  hidden: { opacity: 0, y: 6 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      delay,
      ease: [0.16, 1, 0.3, 1] as number[],
    },
  }),
}

export default function CompressionExplainer({
  title = 'Wie die Kompression funktioniert',
}: CompressionExplainerProps) {
  return (
    <section aria-label="Kompressions-Erklärung" className="py-16 md:py-20">
      {/* Eyebrow tag */}
      <motion.div
        className="flex justify-center mb-5"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.18em] font-semibold bg-primary/8 text-primary border border-primary/12">
          Technologie
        </span>
      </motion.div>

      <motion.h2
        className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-12 text-center"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
      >
        {title}
      </motion.h2>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-14">
        {/* Ohne Kompression */}
        <div className="flex flex-col items-center gap-5">
          {/* Outer shell — double-bezel technique */}
          <motion.div
            className="p-2 rounded-[2rem] bg-muted/60 ring-1 ring-black/5"
            custom={0}
            variants={CUBE_VARIANTS}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Inner core */}
            <div className="w-36 h-36 md:w-44 md:h-44 bg-muted rounded-[calc(2rem-0.375rem)] border border-border/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] flex items-center justify-center">
              {/* 4 large cubes — uncompressed state */}
              <div className="grid grid-cols-2 gap-3 p-4">
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="w-11 h-11 md:w-13 md:h-13 bg-primary/15 rounded-lg border border-primary/20 shadow-sm"
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: 0.15 + i * 0.07,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="text-center"
            custom={0.1}
            variants={LABEL_VARIANTS}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="font-semibold text-foreground text-sm">Ohne Kompression</p>
            <p className="text-muted-foreground text-xs mt-1">Viel Luftvolumen</p>
          </motion.div>
        </div>

        {/* Arrow */}
        <motion.div
          variants={ARROW_VARIANTS}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="rotate-90 md:rotate-0"
          aria-hidden="true"
        >
          <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 text-accent"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </div>
        </motion.div>

        {/* Mit Kompression */}
        <div className="flex flex-col items-center gap-5">
          {/* Outer shell */}
          <motion.div
            className="p-2 rounded-[2rem] bg-primary/5 ring-1 ring-primary/10"
            custom={0.2}
            variants={CUBE_VARIANTS}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Inner core */}
            <div className="w-36 h-36 md:w-44 md:h-44 bg-primary/5 rounded-[calc(2rem-0.375rem)] border border-primary/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] flex items-center justify-center">
              {/* 4 small cubes — compressed state */}
              <div className="grid grid-cols-2 gap-1.5 p-7">
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="w-6 h-6 md:w-7 md:h-7 bg-primary/40 rounded border border-primary/30 shadow-sm"
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: 0.35 + i * 0.07,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="text-center"
            custom={0.3}
            variants={LABEL_VARIANTS}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="font-semibold text-primary text-sm">Mit Kompression</p>
            <p className="text-muted-foreground text-xs mt-1">
              <span className="text-accent font-bold">60% weniger</span> Volumen
            </p>
          </motion.div>
        </div>
      </div>

      {/* Beschreibungs-Text */}
      <motion.p
        className="text-center text-sm text-muted-foreground mt-10 max-w-md mx-auto leading-relaxed"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        Der Doppel-Reißverschluss komprimiert den Inhalt auf einen Bruchteil —
        mehr Platz im Koffer, weniger Chaos beim Einpacken.
      </motion.p>
    </section>
  )
}
