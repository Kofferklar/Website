import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/sanity/queries'
import PostGrid from '../components/PostGrid'

export const revalidate = 0

export const metadata: Metadata = {
  title: 'Ratgeber | Koffer packen Tipps & Reisen nur mit Handgepäck',
  description: 'Entdecke Koffer packen Tipps, lerne wie du deinen Koffer richtig packst und erfahre alles zum Reisen nur mit Handgepäck im Kofferklar Ratgeber.',
}

/**
 * Ratgeber Index Page
 * Editorial overview of all blog posts with a refined bento grid.
 */
export default async function RatgeberPage() {
  const posts = await getAllPosts()
  const postCount = posts?.length ?? 0

  return (
    <main id="main-content" className="pt-[72px] min-h-screen bg-background">
      {/* Editorial Header */}
      <section className="relative py-24 md:py-32 lg:py-40 bg-white border-b border-black/5 overflow-hidden">
        {/* Soft aurora background, subtle, never heavy */}
        <div className="absolute inset-0 bg-mesh-cream opacity-60 pointer-events-none" aria-hidden />
        <div className="absolute -top-32 -left-20 w-[420px] h-[420px] bg-accent/10 blur-[140px] rounded-full pointer-events-none" aria-hidden />

        <div className="relative max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-accent text-[10px] font-bold tracking-[0.4em] uppercase">Magazin</span>
              <span className="h-px w-12 bg-accent/40" aria-hidden />
              <span className="font-handwrite text-accent-700 text-lg">{postCount} Artikel</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[1.02] tracking-tightest mb-10">
              Reise-Wissen <br />
              <span className="font-handwrite text-primary font-normal tracking-normal">für Entdecker.</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl lg:text-2xl leading-relaxed max-w-2xl">
              Tipps, Tricks und Inspiration für deine nächste Reise. Lerne, wie du effizienter packst und mehr Platz für Erinnerungen schaffst.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid Section */}
      <section className="py-20 md:py-28 lg:py-36">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <PostGrid posts={posts} />
        </div>
      </section>

      {/* Simple Newsletter Hook */}
      <section className="relative py-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-mesh-navy opacity-50 pointer-events-none" aria-hidden />
        <div className="relative max-w-[1400px] mx-auto px-4 md:px-8 text-center">
          <div className="text-accent-300 text-[10px] font-bold tracking-[0.4em] uppercase mb-6">Newsletter</div>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 tracking-tightest">
            Nichts mehr verpassen.
          </h2>
          <p className="text-primary-100 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Melde dich an und bekomm die besten Pack-Hacks direkt in dein Postfach. Kein Spam, nur Reise-Wissen.
          </p>
          <Link
            href="/?utm_source=website&utm_medium=newsletter-banner&utm_campaign=kofferklar-launch&utm_content=ratgeber-page#newsletter"
            className="inline-block bg-accent text-accent-foreground px-10 py-4 rounded-full font-bold hover:bg-accent-400 transition-all active:scale-[0.98] shadow-glow-gold"
          >
            Jetzt anmelden
          </Link>
        </div>
      </section>
    </main>
  )
}
