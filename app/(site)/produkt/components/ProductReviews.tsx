'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import Link from 'next/link'
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
  if (!reviews || reviews.length === 0) return null

  const avg = getAverageRating(reviews)
  const count = reviews.length
  const displayedReviews = reviews.slice(0, 3)

  return (
    <>
      {/* Section heading + rating badge */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-14">
        <div>
          <div className="text-accent text-[10px] font-bold tracking-[0.3em] uppercase mb-4">
            Bewertungen
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground leading-[1.1]">
            Das sagen erste Kofferklar-Tester
          </h2>
        </div>

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

      {/* Review Grid */}
      <div className="grid grid-cols-1 gap-6 md:gap-10 md:grid-cols-2 lg:grid-cols-3">
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

      </div>

      {/* Bottom callout */}
      {count > 3 && (
        <div className="mt-10 md:mt-12 text-center">
          <Link
            href="/bewertungen"
            className="text-xs font-bold tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-1"
          >
            Alle {count} Bewertungen lesen
          </Link>
        </div>
      )}
    </>
  )
}
