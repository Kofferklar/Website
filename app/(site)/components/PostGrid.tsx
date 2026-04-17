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
 * Renders an Asymmetrical Bento Grid of blog posts.
 */
export default function PostGrid({ posts }: PostGridProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="text-muted-foreground italic">Momentan sind keine Ratgeber-Artikel verfügbar.</p>
      </div>
    )
  }

  // First post is featured (2 columns wide)
  const featuredPost = posts[0]
  const remainingPosts = posts.slice(1)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
    >
      {/* Featured Post: Span 2 cols on md+ */}
      <div className="md:col-span-2">
        <PostCard post={featuredPost} isFeatured={true} />
      </div>

      {/* Remaining Posts */}
      {remainingPosts.map((post, idx) => (
        <div key={post._id} className={idx % 4 === 1 ? 'lg:mt-12' : idx % 4 === 3 ? 'lg:-mt-12' : ''}>
          <PostCard post={post} />
        </div>
      ))}
    </motion.div>
  )
}
