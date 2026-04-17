import { MetadataRoute } from 'next'
import { getAllPostSlugs } from '@/lib/sanity/queries'

/**
 * Sitemap Generator
 * Dynamically creates the sitemap.xml including blog posts from Sanity.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kofferklar.de'

  // Fetch all blog slugs
  const postSlugs = await getAllPostSlugs()
  
  const blogPosts = postSlugs.map((s: { slug: string }) => ({
    url: `${baseUrl}/ratgeber/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Legal pages are intentionally excluded: they carry robots: { index: false }.
  const routes = [
    '',
    '/produkt',
    '/ratgeber',
    '/ueber-uns',
    '/hilfe-service',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  return [...routes, ...blogPosts]
}
