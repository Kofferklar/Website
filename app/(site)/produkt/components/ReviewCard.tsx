import { Star, CheckCircle2 } from 'lucide-react'
import type { Review } from '@/lib/sanity/types'

/**
 * ReviewCard. pure presentational component, no client directive needed.
 * Matches the double-bezel aesthetic from ReviewStrip on the homepage.
 * Caller applies animation (motion.div wrapper).
 */
export function ReviewCard({ review, index }: { review: Review; index: number }) {
  return (
    <div
      className="p-2 rounded-[3rem] bg-black/5 ring-1 ring-black/5 transition-all duration-500 hover:shadow-2xl hover:shadow-black/5 group h-full"
      style={{ '--card-index': index } as React.CSSProperties}
    >
      <div className="h-full bg-white rounded-[calc(3rem-0.5rem)] p-8 flex flex-col justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] relative overflow-hidden">
        {/* Background Quote Mark */}
        <div className="absolute top-0 right-0 p-8 text-muted/20 pointer-events-none group-hover:text-accent/10 transition-colors duration-500">
          <svg
            width="60"
            height="45"
            viewBox="0 0 60 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-20"
            aria-hidden="true"
          >
            <path
              d="M14.2857 0C6.42857 0 0 6.42857 0 14.2857C0 22.1429 6.42857 28.5714 14.2857 28.5714H17.8571C17.8571 37.8571 10 45 0 45V45C22.1429 45 35.7143 31.4286 35.7143 14.2857C35.7143 6.42857 29.2857 0 21.4286 0H14.2857Z"
              fill="currentColor"
            />
            <path
              d="M38.5714 0C30.7143 0 24.2857 6.42857 24.2857 14.2857C24.2857 22.1429 30.7143 28.5714 38.5714 28.5714H42.1429C42.1429 37.8571 34.2857 45 24.2857 45V45C46.4286 45 60 31.4286 60 14.2857C60 6.42857 53.5714 0 45.7143 0H38.5714Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <div className="relative z-10">
          {/* Stars */}
          <div className="flex text-accent mb-8" aria-label={`${review.rating} von 5 Sternen`}>
            {Array.from({ length: review.rating }).map((_, i) => (
              <Star key={i} size={16} fill="currentColor" aria-hidden="true" />
            ))}
          </div>
          {/* Quote body */}
          <p className="text-foreground/80 text-base leading-relaxed font-medium italic mb-10">
            &quot;{review.body}&quot;
          </p>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-center justify-between border-t border-muted pt-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary font-bold text-xs uppercase tracking-tighter border border-primary/10">
              {review.reviewerName.charAt(0)}
            </div>
            <div>
              <div className="text-sm font-bold text-foreground flex items-center gap-1.5">
                {review.reviewerName}
                {review.verified && (
                  <CheckCircle2 size={14} className="text-green-600" aria-hidden="true" />
                )}
              </div>
              <div className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase">
                {review.verified ? 'Verifizierter Kunde' : 'Tester-Stimme'}
              </div>
            </div>
          </div>
          <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.15em] opacity-60">
            {review.publishedAt
              ? new Date(review.publishedAt).toLocaleDateString('de-DE', {
                  month: 'short',
                  year: 'numeric',
                })
              : ''}
          </div>
        </div>
      </div>
    </div>
  )
}
