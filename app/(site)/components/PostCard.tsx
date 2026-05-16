'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity/image'
import { ArrowUpRight } from 'lucide-react'

const LOCAL_COVER_IMAGES: Record<string, string> = {
  'reiseziele-2025-europa-staedtereisen': '/images/images_kofferklar/lissabon.jpg',
  'handgepaeck-guide-eine-woche': '/images/images_kofferklar/product-04-gallery-lifestyle.png',
  'packwuerfel-vergleich-kaufratgeber': '/images/images_kofferklar/nachher-koffer.png',
  'stressfreies-reisen-tipps': '/images/images_kofferklar/stressfrei-reisen.jpg',
}

interface PostCardProps {
  post: {
    _id: string
    title: string
    slug: { current: string }
    coverImage: { asset: { _ref: string } }
    publishedAt: string
  }
  isFeatured?: boolean
}

/**
 * PostCard Client Component
 * Refined editorial card with calm hover, restrained chrome.
 */
export default function PostCard({ post, isFeatured = false }: PostCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  return (
    <Link href={`/ratgeber/${post.slug.current}`} className="group block">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`relative rounded-[2rem] bg-white ring-1 ring-black/5 shadow-card transition-all duration-500 ease-expo group-hover:-translate-y-1 group-hover:shadow-elevated
          ${isFeatured ? 'grid md:grid-cols-2 overflow-hidden' : 'flex flex-col overflow-hidden h-full'}`}
      >
        {/* Image Container */}
        <div
          className={`relative overflow-hidden bg-muted/40
            ${isFeatured ? 'aspect-[4/3] md:aspect-auto md:min-h-[440px]' : 'aspect-[16/10]'}`}
        >
          {(() => {
            const localSrc = LOCAL_COVER_IMAGES[post.slug.current]
            if (post.coverImage) {
              return (
                <Image
                  src={urlFor(post.coverImage).width(isFeatured ? 1400 : 900).height(isFeatured ? 1000 : 560).url()}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-[1400ms] ease-expo group-hover:scale-[1.04]"
                />
              )
            }
            if (localSrc) {
              return (
                <Image
                  src={localSrc}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-[1400ms] ease-expo group-hover:scale-[1.04]"
                />
              )
            }
            return (
              <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground/50 font-handwrite text-xl">
                Kein Vorschaubild
              </div>
            )
          })()}

          {/* Category/Date Overlay */}
          <div className="absolute top-5 left-5 z-10 flex items-center gap-2">
            <div className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-bold tracking-[0.15em] uppercase text-primary shadow-soft">
              Reisetipp
            </div>
            <div className="px-3 py-1 rounded-full bg-black/30 backdrop-blur-md text-[10px] font-bold tracking-[0.15em] uppercase text-white">
              {formattedDate}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div
          className={`flex flex-col justify-between
            ${isFeatured ? 'p-8 md:p-12 lg:p-16' : 'p-7 md:p-8'}`}
        >
          <div>
            {isFeatured && (
              <div className="font-handwrite text-accent text-lg mb-4">Empfohlen</div>
            )}
            <h3
              className={`font-display font-bold text-foreground leading-[1.15] tracking-tightest transition-colors group-hover:text-primary
                ${isFeatured ? 'text-3xl md:text-4xl lg:text-5xl mb-6' : 'text-xl md:text-2xl mb-5'}`}
            >
              {post.title}
            </h3>
            {isFeatured && (
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-prose mb-8">
                Der ausführliche Leitfaden für alle, die mehr aus ihrem Gepäck holen wollen.
              </p>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-black/5">
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-accent">
              Artikel lesen
            </div>
            <div className="w-9 h-9 rounded-full border border-black/10 flex items-center justify-center text-muted-foreground group-hover:border-primary group-hover:text-primary group-hover:bg-primary/5 transition-all duration-500 ease-expo">
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500 ease-expo" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
