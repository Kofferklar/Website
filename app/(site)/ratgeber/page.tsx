import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/sanity/queries'
import PostGrid from '../components/PostGrid'

export const revalidate = 0

export const metadata: Metadata = {
  title: 'Ratgeber | Pack-Tipps & Reise-Hacks für stressfreies Reisen',
  description: 'Entdecke wertvolle Tipps zum Thema Koffer packen, Platz sparen und Reiseorganisation. Werde zum Pack-Profi mit dem KofferKlar Ratgeber.',
}

/**
 * Ratgeber Index Page (Phase 3)
 * Editorial overview of all blog posts with a high-end bento grid.
 */
export default async function RatgeberPage() {
  const posts = await getAllPosts()

  return (
    <main id="main-content" className="pt-[72px] min-h-screen bg-background">
      {/* Editorial Header */}
      <section className="py-24 md:py-32 lg:py-40 bg-white border-b border-black/5">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
           <div className="max-w-3xl">
              <div className="text-accent text-[10px] font-bold tracking-[0.4em] uppercase mb-8">Magazin</div>
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[1.05] tracking-tight mb-10">
                Reise-Wissen <br />
                <span className="italic text-primary">für Entdecker.</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl lg:text-2xl leading-relaxed">
                Tipps, Tricks und Inspiration für deine nächste Reise. Lerne, wie du effizienter packst und mehr Platz für Erinnerungen schaffst.
              </p>
           </div>
        </div>
      </section>

      {/* Blog Grid Section */}
      <section className="py-24 md:py-32 lg:py-40">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <PostGrid posts={posts} />
        </div>
      </section>

      {/* Simple Newsletter Hook */}
      <section className="py-24 bg-primary text-primary-foreground">
         <div className="max-w-[1400px] mx-auto px-4 md:px-8 text-center">
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">Nichts mehr verpassen.</h2>
            <p className="text-primary-100 text-lg mb-10 max-w-xl mx-auto">
              Melde dich für unseren Newsletter an und erhalte die neuesten Pack-Hacks direkt in dein Postfach.
            </p>
            <Link 
              href="/#newsletter" 
              className="inline-block bg-accent text-accent-foreground px-10 py-4 rounded-full font-bold hover:bg-accent-400 transition-all active:scale-[0.98]"
            >
              Jetzt anmelden
            </Link>
         </div>
      </section>
    </main>
  )
}

