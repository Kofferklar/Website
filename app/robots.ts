import { MetadataRoute } from 'next'

/**
 * Robots.txt Generator
 * Controls crawler access and points to the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kofferklar.de'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio/', '/studio'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
