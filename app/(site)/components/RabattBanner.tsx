import { getBanner } from '@/lib/sanity/queries'
import CountdownTimer from './CountdownTimer'

/**
 * RabattBanner Server Component
 * Renders a promotional banner at the top of the page if active in Sanity.
 */
export default async function RabattBanner() {
  const banner = await getBanner()

  if (!banner || !banner.isActive) return null

  // Date validation (optional safety check)
  const now = new Date()
  if (banner.validFrom && new Date(banner.validFrom) > now) return null
  if (banner.validUntil && new Date(banner.validUntil) < now) return null

  return (
    <div className="bg-primary text-primary-foreground py-2.5 px-4 text-center text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase">
      <div className="max-w-[1400px] mx-auto flex items-center justify-center gap-4">
        <span>{banner.text}</span>
        {banner.discountCode && (
          <>
            <div className="w-px h-3 bg-white/20 hidden sm:block" />
            <span className="bg-white/10 px-2 py-0.5 rounded sm:bg-transparent sm:p-0">
              Code: <span className="text-accent-200">{banner.discountCode}</span>
            </span>
            <div className="w-px h-3 bg-white/20 hidden sm:block" />
            <CountdownTimer variant="banner" label="Endet in" />
          </>
        )}
      </div>
    </div>
  )
}
