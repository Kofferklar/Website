'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star } from 'lucide-react'
import { ReviewCard } from '@/app/(site)/produkt/components/ReviewCard'
import type { Review } from '@/lib/sanity/types'

interface BewertungenClientProps {
  reviews: Review[]
  reviewCount: number
}

function getAverageRating(reviews: Review[]): number {
  if (!reviews.length) return 0
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0)
  return Math.round((sum / reviews.length) * 10) / 10
}

const STAR_OPTIONS = [5, 4, 3, 2, 1]

export default function BewertungenClient({ reviews, reviewCount }: BewertungenClientProps) {
  const [filter, setFilter] = useState<number | null>(null)

  const avg = getAverageRating(reviews)
  const filtered = filter ? reviews.filter(r => r.rating === filter) : reviews

  const countByStar = (stars: number) => reviews.filter(r => r.rating === stars).length

  return (
    <div>
      {/* Rating summary + filter */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
        <div className="flex items-center gap-5 p-4 rounded-3xl bg-white shadow-xl shadow-black/[0.03] border border-black/5">
          <div className="flex text-accent">
            {[1, 2, 3, 4, 5].map(i => (
              <Star key={i} size={20} fill="currentColor" aria-hidden="true" />
            ))}
          </div>
          <div className="text-sm font-bold text-foreground">
            {avg} / 5.0{' '}
            <span className="text-muted-foreground font-medium ml-1">({reviewCount} Bewertungen)</span>
          </div>
        </div>

        {/* Star filter pills */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setFilter(null)}
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 border-2
              ${filter === null
                ? 'bg-primary text-primary-foreground border-primary'
                : 'border-black/10 text-muted-foreground hover:border-primary hover:text-primary'}`}
          >
            Alle
          </button>
          {STAR_OPTIONS.map(stars => (
            <button
              key={stars}
              type="button"
              onClick={() => setFilter(filter === stars ? null : stars)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 border-2
                ${filter === stars
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-black/10 text-muted-foreground hover:border-primary hover:text-primary'}`}
            >
              <Star size={11} fill="currentColor" className="text-accent" aria-hidden="true" />
              {stars}
              <span className="opacity-50">({countByStar(stars)})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Count indicator when filtered */}
      {filter && (
        <p className="text-sm text-muted-foreground mb-8">
          {filtered.length} Bewertung{filtered.length !== 1 ? 'en' : ''} mit {filter} Stern{filter !== 1 ? 'en' : ''}
        </p>
      )}

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((review, idx) => (
            <motion.div
              key={review._id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
            >
              <ReviewCard review={review} index={idx} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-20">
          Keine Bewertungen für diese Sternzahl.
        </p>
      )}
    </div>
  )
}
