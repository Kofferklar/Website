'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity/image'
import { ArrowUpRight } from 'lucide-react'

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
 * Implements Double-Bezel Architecture and Liquid Glass hover effects.
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
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`relative p-2 rounded-[2.5rem] bg-black/5 ring-1 ring-black/5 transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-black/5
          ${isFeatured ? 'h-full min-h-[500px]' : ''}`}
      >
        <div className="relative h-full overflow-hidden rounded-[calc(2.5rem-0.5rem)] bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] flex flex-col">
          {/* Image Container with Liquid Glass Reveal */}
          <div className={`relative overflow-hidden ${isFeatured ? 'flex-1' : 'aspect-[16/10]'}`}>
            {post.coverImage ? (
              <Image
                src={urlFor(post.coverImage).width(isFeatured ? 1200 : 800).height(isFeatured ? 800 : 500).url()}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground/40 italic">
                Kein Vorschaubild verfügbar
              </div>
            )}
            
            {/* Category/Date Overlay */}
            <div className="absolute top-6 left-6 z-10 flex items-center gap-3">
              <div className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white/20 text-[10px] font-bold tracking-[0.15em] uppercase text-primary">
                Reisetipp
              </div>
              <div className="px-3 py-1 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-[10px] font-bold tracking-[0.15em] uppercase text-white">
                {formattedDate}
              </div>
            </div>

            {/* Hover Icon Reveal */}
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
               <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-primary scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 delay-100">
                  <ArrowUpRight size={32} />
               </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-8 md:p-10 flex flex-col justify-between">
            <h3 className={`font-serif font-bold text-foreground leading-[1.2] mb-6 transition-colors group-hover:text-primary
              ${isFeatured ? 'text-3xl md:text-4xl lg:text-5xl' : 'text-2xl md:text-3xl'}`}>
              {post.title}
            </h3>
            
            <div className="flex items-center justify-between">
               <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-accent border-b border-accent/20 pb-1 group-hover:border-accent transition-all duration-300">
                  Artikel lesen
               </div>
               <div className="w-8 h-8 rounded-full border border-muted flex items-center justify-center text-muted-foreground group-hover:border-primary group-hover:text-primary transition-all duration-500">
                  <ArrowUpRight size={16} />
               </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
