'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, ChevronDown } from 'lucide-react'
import { ReviewCard } from './ReviewCard'
import type { Review } from '@/lib/sanity/types'

interface ProductReviewsProps {
  reviews: Review[]
}

function getAverageRating(reviews: Review[]): number {
  if (!reviews.length) return 0
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0)
  return Math.round((sum / reviews.length) * 10) / 10
}

export default function ProductReviews({ reviews }: ProductReviewsProps) {
  const [showAll, setShowAll] = useState(false)

  if (!reviews || reviews.length === 0) return null

  const avg = getAverageRating(reviews)
  const count = reviews.length
  const displayedReviews = showAll ? reviews : reviews.slice(0, 3)

  return (
    <>
      {/* Section heading + rating badge */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-14">
        <div>
          <div className="text-accent text-[10px] font-bold tracking-[0.3em] uppercase mb-4">
            Social Proof
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground leading-[1.1]">
            Was Kunden sagen
          </h2>
        </div>

        {/* Rating summary pill */}
        <div className="flex items-center gap-5 p-4 rounded-3xl bg-white shadow-xl shadow-black/[0.03] border border-black/5 flex-shrink-0">
          <div className="flex text-accent">
            {[1, 2, 3, 4, 5].map(i => (
              <Star key={i} size={18} fill="currentColor" aria-hidden="true" />
            ))}
          </div>
          <div className="text-sm font-bold text-foreground">
            {avg} / 5.0{' '}
            <span className="text-muted-foreground font-medium ml-1">({count} Bewertungen)</span>
          </div>
        </div>
      </div>

      {/* Review grid */}
      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {displayedReviews.map((review, idx) => (
          <motion.div
            key={review._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <ReviewCard review={review} index={idx} />
          </motion.div>
        ))}
      </motion.div>

      {/* Expand button */}
      {!showAll && count > 3 && (
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-primary text-primary font-semibold text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300 active:scale-[0.98]"
            style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            Alle {count} Bewertungen anzeigen
            <ChevronDown className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  )
}
