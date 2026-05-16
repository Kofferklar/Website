'use client'

import { motion } from 'framer-motion'
import { Star, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import AnimatedCounter from './AnimatedCounter'

interface Review {
  _id: string
  reviewerName: string
  rating: number
  body: string
  publishedAt?: string
  verified?: boolean
}

interface ReviewStripProps {
  reviews: Review[]
  reviewCount?: number
}

export default function ReviewStrip({ reviews, reviewCount }: ReviewStripProps) {
  if (!reviews || reviews.length === 0) return null

  const displayedReviews = reviews.slice(0, 3)
  const totalCount = reviewCount ?? reviews.length

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    <section id="bewertungen" className="relative py-24 md:py-32 lg:py-40 bg-muted/30 overflow-hidden">
      {/* Soft background accent */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] bg-accent/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-4 md:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 text-accent text-[10px] font-bold tracking-[0.3em] uppercase mb-4">
              <span className="w-6 h-px bg-accent" /> Bewertungen
            </div>
            <h2 className="font-serif text-balance text-4xl md:text-5xl lg:text-[3.75rem] font-bold text-foreground leading-[1.05] tracking-tightest">
              Was Reisende über <br /> KofferKlar <em className="font-handwrite text-primary">sagen.</em>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-5 p-4 rounded-3xl bg-white shadow-card border border-black/5 lift"
          >
            <div className="flex text-accent">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} size={18} fill="currentColor" />)}
            </div>
            <div className="text-sm font-bold text-foreground">
              4.8 / 5.0{' '}
              <span className="text-muted-foreground font-medium ml-1">
                (<AnimatedCounter to={totalCount} duration={1400} suffix=" Bewertungen" />)
              </span>
            </div>
          </motion.div>
        </div>

        {/* Review Grid — mobile: horizontal snap scroll, desktop: staggered grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10 -mx-4 px-4 md:mx-0 md:px-0 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {displayedReviews.map((review, idx) => (
            <motion.div
              key={review._id}
              variants={itemVariants}
              className={`shrink-0 w-[80%] sm:w-[60%] md:w-auto snap-center ${idx === 1 ? 'md:mt-12' : ''} ${idx === 2 ? 'lg:mt-24' : ''}`}
            >
              <div className="h-full p-1.5 md:p-2 rounded-[2rem] md:rounded-[3rem] bg-black/5 ring-1 ring-black/5 transition-all duration-500 hover:shadow-2xl hover:shadow-black/5 group">
                <div className="h-full bg-white rounded-[calc(2rem-0.375rem)] md:rounded-[calc(3rem-0.5rem)] p-5 md:p-10 flex flex-col justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 text-muted/20 pointer-events-none group-hover:text-accent/10 transition-colors duration-500">
                    <svg width="60" height="45" viewBox="0 0 60 45" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-20">
                      <path d="M14.2857 0C6.42857 0 0 6.42857 0 14.2857C0 22.1429 6.42857 28.5714 14.2857 28.5714H17.8571C17.8571 37.8571 10 45 0 45V45C22.1429 45 35.7143 31.4286 35.7143 14.2857C35.7143 6.42857 29.2857 0 21.4286 0H14.2857Z" fill="currentColor" />
                      <path d="M38.5714 0C30.7143 0 24.2857 6.42857 24.2857 14.2857C24.2857 22.1429 30.7143 28.5714 38.5714 28.5714H42.1429C42.1429 37.8571 34.2857 45 24.2857 45V45C46.4286 45 60 31.4286 60 14.2857C60 6.42857 53.5714 0 45.7143 0H38.5714Z" fill="currentColor" />
                    </svg>
                  </div>

                  <div className="relative z-10">
                    <div className="flex text-accent mb-4 md:mb-8">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-foreground/80 text-sm md:text-lg leading-relaxed font-medium italic mb-5 md:mb-10 line-clamp-6 md:line-clamp-none">
                      &quot;{review.body}&quot;
                    </p>
                  </div>

                  <div className="relative z-10 flex items-center justify-between border-t border-muted pt-4 md:pt-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary font-bold text-xs uppercase tracking-tighter border border-primary/10">
                        {review.reviewerName.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-foreground flex items-center gap-1.5">
                          {review.reviewerName}
                          {review.verified && <CheckCircle2 size={14} className="text-green-600" />}
                        </div>
                        <div className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase">
                          {review.verified ? 'Verifizierter Kunde' : 'Tester-Stimme'}
                        </div>
                      </div>
                    </div>
                    <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.15em] opacity-60">
                      {review.publishedAt ? new Date(review.publishedAt).toLocaleDateString('de-DE', { month: 'short', year: 'numeric' }) : ''}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

        </motion.div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-10 md:mt-20 text-center"
        >
          <Link
            href="/bewertungen"
            className="text-xs font-bold tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-1"
          >
            Alle {totalCount} Bewertungen lesen
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
