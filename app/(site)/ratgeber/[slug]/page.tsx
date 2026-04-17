import type { Metadata } from 'next'
import { getPostBySlug, getAllPostSlugs } from '@/lib/sanity/queries'
import PostBody from '../../components/PostBody'
import SharePostButton from '../../components/SharePostButton'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, User } from 'lucide-react'

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
    }
  }
}

/**
 * Ratgeber Detail Page (Phase 3)
 * High-end editorial layout for long-form reading.
 */
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) notFound()

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })

  return (
    <main id="main-content" className="pt-[72px] bg-white min-h-screen">
      {/* Article Hero */}
      <header className="py-20 md:py-32 lg:py-40 border-b border-black/5 relative overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 -skew-x-12 translate-x-1/2 pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
          <Link 
            href="/ratgeber" 
            className="group inline-flex items-center gap-3 text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors mb-12"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Zur Übersicht
          </Link>
          
          <div className="max-w-4xl">
            <div className="flex items-center gap-6 mb-8 text-[10px] font-bold tracking-[0.3em] uppercase text-accent">
               <span>Kategorie: Ratgeber</span>
               <div className="w-1 h-1 rounded-full bg-accent/30" />
               <div className="flex items-center gap-2">
                 <Clock size={12} />
                 <span>5 Min. Lesezeit</span>
               </div>
            </div>
            
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[1.05] tracking-tight mb-12">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-5 pt-8 border-t border-black/5">
               <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary border border-primary/10">
                  <User size={20} />
               </div>
               <div>
                 <div className="text-sm font-bold text-foreground">{post.author || 'KofferKlar Team'}</div>
                 <div className="text-xs text-muted-foreground font-medium">{formattedDate}</div>
               </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Cover Image */}
      {post.coverImage && (
        <section className="max-w-[1400px] mx-auto px-4 md:px-8 -mt-16 md:-mt-24 relative z-20">
           <div className="p-2.5 rounded-[4rem] bg-white ring-1 ring-black/5 shadow-2xl overflow-hidden">
              <div className="relative aspect-[21/9] rounded-[calc(4rem-0.75rem)] overflow-hidden">
                 <Image 
                   src={urlFor(post.coverImage).width(1800).height(800).url()}
                   alt={post.title}
                   fill
                   className="object-cover"
                   priority
                 />
              </div>
           </div>
        </section>
      )}

      {/* Article Content */}
      <section className="py-24 md:py-32 lg:py-40">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
           <PostBody content={post.body} />
        </div>
      </section>

      {/* Footer Navigation */}
      <footer className="py-24 bg-muted/30 border-t border-black/5">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-12">
           <div className="max-w-md">
              <h4 className="font-serif text-2xl font-bold mb-4">Hat dir dieser Artikel geholfen?</h4>
              <p className="text-muted-foreground leading-relaxed">
                Teile dein neu gewonnenes Wissen mit anderen Reisenden oder entdecke weitere spannende Ratgeber.
              </p>
           </div>
           
           <div className="flex items-center gap-6">
              <Link 
                href="/ratgeber" 
                className="px-8 py-4 rounded-full border border-black/10 text-sm font-bold hover:bg-white hover:shadow-xl transition-all active:scale-[0.98]"
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
