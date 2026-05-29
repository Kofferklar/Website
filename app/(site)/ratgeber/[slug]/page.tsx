import type { Metadata } from 'next'
import { getPostBySlug, getAllPostSlugs } from '@/lib/sanity/queries'
import PostBody from '../../components/PostBody'
import SharePostButton from '../../components/SharePostButton'
import ReadingProgress from '../../components/ReadingProgress'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, User } from 'lucide-react'
import PackGuideEnhancement from '../../components/PackGuideEnhancement'

export const revalidate = 86400 // Daily revalidation

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((s: { slug: string }) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) return { title: 'Post nicht gefunden' }

  return {
    title: post.seo?.title || `${post.title} | KofferKlar Ratgeber`,
    description: post.seo?.description || `Lies den neuesten Artikel: ${post.title}. Mehr Ordnung und Platz im Koffer mit KofferKlar.`,
    openGraph: {
      title: post.title,
      description: post.seo?.description,
      images: post.coverImage ? [{ url: urlFor(post.coverImage).url() }] : [],
    },
  }
}

/**
 * Estimate reading time from PortableText body.
 * ~220 words per minute, words counted from span text.
 */
function estimateReadingTime(body: unknown): number {
  if (!Array.isArray(body)) return 5
  const text = body
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((block: any) => {
      if (!block?.children) return ''
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return block.children.map((c: any) => c?.text || '').join(' ')
    })
    .join(' ')
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(2, Math.round(words / 220))
}

/**
 * Build a table of contents from h2 headings in PortableText body.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildToc(body: unknown): Array<{ id: string; title: string }> {
  if (!Array.isArray(body)) return []
  return body
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .filter((b: any) => b?.style === 'h2' && Array.isArray(b.children))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((b: any) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const title = b.children.map((c: any) => c?.text || '').join('').trim()
      const id = title
        .toLowerCase()
        .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
      return { id, title }
    })
}

/**
 * Ratgeber Detail Page
 * Editorial long-form layout with reading progress, TOC for long posts, and refined typography.
 */
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) notFound()

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  const readingTime = estimateReadingTime(post.body)
  const toc = buildToc(post.body)
  const showToc = toc.length >= 4

  return (
    <main id="main-content" className="pt-[72px] bg-white min-h-screen">
      <ReadingProgress />

      {/* Article Hero */}
      <header className="relative pt-16 md:pt-24 lg:pt-32 pb-12 md:pb-16 border-b border-black/5 overflow-hidden">
        {/* Soft aurora — subtle */}
        <div className="absolute inset-0 bg-mesh-cream opacity-50 pointer-events-none" aria-hidden />
        <div className="absolute top-0 -right-32 w-[420px] h-[420px] bg-accent/10 blur-[140px] rounded-full pointer-events-none" aria-hidden />

        <div className="relative max-w-[1100px] mx-auto px-4 md:px-8">
          <Link
            href="/ratgeber"
            className="group inline-flex items-center gap-3 text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors mb-10"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300 ease-expo" />
            Zur Übersicht
          </Link>

          <div className="max-w-[65ch]">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mb-8 text-[10px] font-bold tracking-[0.3em] uppercase text-accent">
              <span>Ratgeber</span>
              <span className="w-1 h-1 rounded-full bg-accent/40" aria-hidden />
              <span className="flex items-center gap-2">
                <Clock size={12} />
                {readingTime} Min. Lesezeit
              </span>
              <span className="w-1 h-1 rounded-full bg-accent/40" aria-hidden />
              <span className="text-muted-foreground tracking-[0.2em]">{formattedDate}</span>
            </div>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.05] tracking-tightest mb-10 break-words hyphens-auto text-balance">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 pt-6 border-t border-black/5">
              <div className="w-11 h-11 rounded-full bg-primary/5 flex items-center justify-center text-primary border border-primary/10">
                <User size={18} />
              </div>
              <div>
                <div className="text-sm font-bold text-foreground">{post.author || 'KofferKlar Team'}</div>
                <div className="text-xs text-muted-foreground font-medium">Redaktion</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Cover Image — flush, editorial */}
      {post.coverImage && (
        <section className="bg-white">
          <div className="max-w-[1100px] mx-auto px-4 md:px-8 pt-12 md:pt-16">
            <figure>
              <div className="relative aspect-[21/10] rounded-3xl overflow-hidden ring-1 ring-black/5 shadow-card bg-muted">
                <Image
                  src={urlFor(post.coverImage).width(1800).height(857).url()}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(min-width: 1100px) 1100px, 100vw"
                />
              </div>
            </figure>
          </div>
        </section>
      )}

      {/* Article Content + optional TOC */}
      <section className="py-16 md:py-24 lg:py-28">
        <div className="max-w-[1100px] mx-auto px-4 md:px-8">
          {showToc ? (
            <div className="grid lg:grid-cols-[1fr_220px] gap-12 lg:gap-16 items-start">
              <div>
                <PostBody content={post.body} />
                {slug === 'handgepaeck-guide-eine-woche' && <PackGuideEnhancement />}
              </div>
              <aside className="hidden lg:block sticky top-[120px]">
                <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-accent mb-5">Inhalt</div>
                <nav>
                  <ol className="space-y-3 text-sm leading-snug border-l border-black/10">
                    {toc.map((item, i) => (
                      <li key={item.id} className="pl-4 -ml-px border-l-2 border-transparent hover:border-accent transition-colors">
                        <a
                          href={`#${item.id}`}
                          className="text-muted-foreground hover:text-primary transition-colors block"
                        >
                          <span className="font-handwrite text-accent mr-2">{i + 1}.</span>
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </aside>
            </div>
          ) : (
            <>
              <PostBody content={post.body} />
              {slug === 'handgepaeck-guide-eine-woche' && <PackGuideEnhancement />}
            </>
          )}
        </div>
      </section>

      {/* Footer Navigation */}
      <footer className="py-20 md:py-24 bg-muted/30 border-t border-black/5">
        <div className="max-w-[1100px] mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-md text-center md:text-left">
            <h4 className="font-display text-2xl md:text-3xl font-bold mb-3 tracking-tightest">
              Hat dir der Artikel geholfen?
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              Teile dein Wissen mit anderen Reisenden oder stöber durch weitere Ratgeber.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/ratgeber"
              className="px-7 py-3.5 rounded-full border border-black/10 bg-white text-sm font-bold hover:shadow-card hover:-translate-y-0.5 transition-all duration-300 ease-expo active:scale-[0.98]"
            >
              Weitere Artikel
            </Link>
            <SharePostButton title={post.title} />
          </div>
        </div>
      </footer>
    </main>
  )
}
