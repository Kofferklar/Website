import { groq } from 'next-sanity'
import { client } from './client'

/**
 * Cache tags so a single Sanity webhook can purge exactly the affected pages
 * via `revalidateTag()` at `/api/revalidate`. See `app/api/revalidate/route.ts`.
 */
const HOUR = 3600
const DAY = 86400

// --- siteSettings ---

const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings" && !(_id in path("drafts.**"))][0] {
    _id,
    siteName,
    logo,
    seo,
    socialLinks,
    phone,
    email
  }
`

export async function getSiteSettings() {
  return client.fetch(SITE_SETTINGS_QUERY, {}, { next: { revalidate: HOUR, tags: ['settings'] } })
}

// --- product ---

const PRODUCT_QUERY = groq`
  *[_type == "product" && !(_id in path("drafts.**"))][0] {
    _id,
    name,
    slug,
    images,
    videoUrl,
    price,
    buyLink,
    shortDescription,
    description,
    setParts,
    material,
    colorVariants[]{ colorName, colorHex, inStock, stockLevel, "images": images[] },
    seo
  }
`

export async function getProduct() {
  return client.fetch(PRODUCT_QUERY, {}, { next: { revalidate: HOUR, tags: ['product'] } })
}

// --- posts (list) ---

const ALL_POSTS_QUERY = groq`
  *[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    slug,
    coverImage,
    publishedAt,
    author
  }
`

export async function getAllPosts() {
  return client.fetch(ALL_POSTS_QUERY, {}, { next: { revalidate: HOUR, tags: ['posts'] } })
}

// --- post by slug ---

const POST_BY_SLUG_QUERY = groq`
  *[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id,
    title,
    slug,
    coverImage,
    author,
    body,
    publishedAt,
    seo
  }
`

export async function getPostBySlug(slug: string) {
  return client.fetch(POST_BY_SLUG_QUERY, { slug }, { next: { revalidate: DAY, tags: ['posts', `post:${slug}`] } })
}

// --- reviews ---

const ALL_REVIEWS_QUERY = groq`
  *[_type == "review" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    reviewerName,
    rating,
    body,
    publishedAt,
    verified
  }
`

export async function getAllReviews() {
  return client.fetch(ALL_REVIEWS_QUERY, {}, { next: { revalidate: HOUR, tags: ['reviews'] } })
}

// --- faq items ---

const FAQ_ITEMS_QUERY = groq`
  *[_type == "faqItem" && !(_id in path("drafts.**"))] | order(category asc) {
    _id,
    question,
    answer,
    category
  }
`

export async function getFaqItems() {
  return client.fetch(FAQ_ITEMS_QUERY, {}, { next: { revalidate: HOUR, tags: ['faq'] } })
}

// --- page by slug ---

const PAGE_BY_SLUG_QUERY = groq`
  *[_type == "page" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id,
    title,
    slug,
    body,
    seo
  }
`

export async function getPageBySlug(slug: string) {
  return client.fetch(PAGE_BY_SLUG_QUERY, { slug }, { next: { revalidate: DAY, tags: ['pages', `page:${slug}`] } })
}

// --- all page slugs (for generateStaticParams) ---

const ALL_POST_SLUGS_QUERY = groq`
  *[_type == "post" && !(_id in path("drafts.**"))] {
    "slug": slug.current
  }
`

export async function getAllPostSlugs() {
  return client.fetch(ALL_POST_SLUGS_QUERY, {}, { next: { revalidate: DAY, tags: ['posts'] } })
}

// --- homePageData ---

const HOME_PAGE_DATA_QUERY = groq`
  {
    "product": *[_type == "product" && !(_id in path("drafts.**"))][0] {
      _id,
      name,
      slug,
      images,
      price,
      buyLink,
      shortDescription
    },
    "reviews": *[_type == "review" && !(_id in path("drafts.**"))] | order(publishedAt desc)[0...3] {
      _id,
      reviewerName,
      rating,
      body,
      publishedAt,
      verified
    },
    "reviewCount": count(*[_type == "review" && !(_id in path("drafts.**"))])
  }
`

export async function getHomePageData() {
  return client.fetch(HOME_PAGE_DATA_QUERY, {}, {
    next: { revalidate: HOUR, tags: ['product', 'reviews'] },
  })
}
