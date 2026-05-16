'use client'

import { motion } from 'framer-motion'
import PostCard from './PostCard'

interface PostGridProps {
  posts: Array<{
    _id: string
    title: string
    slug: { current: string }
    coverImage: { asset: { _ref: string } }
    publishedAt: string
  }>
}

/**
 * PostGrid Client Component
 * Renders a calm editorial bento grid — featured post on top, supporting posts below.
 */
export default function PostGrid({ posts }: PostGridProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="text-muted-foreground font-handwrite text-xl">Momentan sind keine Ratgeber-Artikel verfügbar.</p>
      </div>
    )
  }

  const featuredPost = posts[0]
  const remainingPosts = posts.slice(1)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="space-y-10 md:space-y-14"
    >
      {/* Featured Post — full width, hero-style */}
      <div>
        <PostCard post={featuredPost} isFeatured={true} />
      </div>

      {/* Section divider */}
      {remainingPosts.length > 0 && (
        <div className="flex items-center gap-6 pt-4">
          <div className="text-[10px] font-bold tracking-[0.4em] uppercase text-accent">Mehr lesen</div>
          <div className="flex-1 h-px bg-black/5" />
        </div>
      )}

      {/* Remaining Posts — clean 3-up grid, no jagged offsets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {remainingPosts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </motion.div>
  )
}
