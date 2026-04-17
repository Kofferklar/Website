import { Star, CheckCircle2 } from 'lucide-react'
import type { Review } from '@/lib/sanity/types'

interface ProductReviewsProps {
  reviews: Review[]
}

function getAverageRating(reviews: Review[]): number {
  if (!reviews.length) return 0
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0)
  return Math.round((sum / reviews.length) * 10) / 10
}

function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'lg' }) {
  const sizeClass = size === 'lg' ? 'w-6 h-6' : 'w-4 h-4'
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} von 5 Sternen`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClass} ${star <= rating ? 'fill-accent text-accent' : 'fill-muted text-muted'}`}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })
}

export default function ProductReviews({ reviews }: ProductReviewsProps) {
  if (!reviews || reviews.length === 0) return null

  const avg = getAverageRating(reviews)

  return (
    <section aria-label="Kundenbewertungen">
      <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-8">
        Was Kunden sagen
      </h2>

      {/* Durchschnitt-Summary */}
      <div className="flex items-center gap-6 mb-10 p-6 bg-muted rounded-2xl">
        <div className="text-center">
          <div className="font-serif text-5xl font-bold text-foreground">{avg}</div>
          <StarRating rating={Math.round(avg)} size="lg" />
          <p className="text-sm text-muted-foreground mt-1">{reviews.length} Bewertungen</p>
        </div>
        <div className="h-16 w-px bg-border" aria-hidden="true" />
        <p className="text-sm text-muted-foreground">
          Verifizierte Käufer · Alle Bewertungen stammen von echten Kunden
        </p>
      </div>

      {/* Review-Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <article
            key={review._id}
            className="bg-background border border-border rounded-2xl p-6 flex flex-col gap-3"
          >
            {/* Header: Name + Verified */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-foreground text-sm">{review.reviewerName}</p>
                {review.publishedAt && (
                  <p className="text-xs text-muted-foreground">{formatDate(review.publishedAt)}</p>
                )}
              </div>
              {review.verified && (
                <div className="flex items-center gap-1 text-xs text-primary flex-shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Verifiziert</span>
                </div>
              )}
            </div>

            {/* Sterne */}
            <StarRating rating={review.rating} />

            {/* Review-Text */}
            <p className="text-sm text-foreground leading-relaxed flex-1">
              &ldquo;{review.body}&rdquo;
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
