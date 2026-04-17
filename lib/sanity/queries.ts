import { groq } from 'next-sanity'
import { client } from './client'

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
  return client.fetch(SITE_SETTINGS_QUERY, {}, { next: { revalidate: 3600 } })
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
    seo
  }
`

export async function getProduct() {
  return client.fetch(PRODUCT_QUERY, {}, { next: { revalidate: 3600 } })
}

// --- banner ---

const BANNER_QUERY = groq`
  *[_type == "banner" && !(_id in path("drafts.**"))][0] {
    _id,
    text,
    discountCode,
    isActive,
    validFrom,
    validUntil
  }
`

export async function getBanner() {
  return client.fetch(BANNER_QUERY, {}, { next: { revalidate: 3600 } })
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
  return client.fetch(ALL_POSTS_QUERY, {}, { next: { revalidate: 3600 } })
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
  return client.fetch(POST_BY_SLUG_QUERY, { slug }, { next: { revalidate: 86400 } })
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
  return client.fetch(ALL_REVIEWS_QUERY, {}, { next: { revalidate: 3600 } })
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
  return client.fetch(FAQ_ITEMS_QUERY, {}, { next: { revalidate: 3600 } })
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
  return client.fetch(PAGE_BY_SLUG_QUERY, { slug }, { next: { revalidate: 86400 } })
}

// --- all page slugs (for generateStaticParams) ---

const ALL_POST_SLUGS_QUERY = groq`
  *[_type == "post" && !(_id in path("drafts.**"))] {
    "slug": slug.current
  }
`

export async function getAllPostSlugs() {
  return client.fetch(ALL_POST_SLUGS_QUERY, {}, { next: { revalidate: 86400 } })
}

// --- homePageData ---

const HOME_PAGE_DATA_QUERY = groq`
  {
    "banner": *[_type == "banner" && !(_id in path("drafts.**"))][0] {
      _id,
      text,
      discountCode,
      isActive,
      validFrom,
      validUntil
    },
    "product": *[_type == "product" && !(_id in path("drafts.**"))][0] {
      _id,
      name,
      slug,
      images,
      price,
      buyLink,
      shortDescription
    },
    "reviews": *[_type == "review" && !(_id in path("drafts.**"))] | order(publishedAt desc)[0...6] {
      _id,
      reviewerName,
      rating,
      body,
      publishedAt,
      verified
    }
  }
`

export async function getHomePageData() {
  return client.fetch(HOME_PAGE_DATA_QUERY, {}, { next: { revalidate: 3600 } })
}
