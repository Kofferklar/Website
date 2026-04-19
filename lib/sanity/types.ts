// TypeScript interfaces for all Sanity schemas
// Derived from sanity/schemaTypes/ — keep in sync with schema definitions

export interface SanityImage {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number; height: number; width: number }
  alt?: string
}

export interface SeoFields {
  title?: string
  description?: string
  ogImage?: SanityImage
}

// --- Singletons ---

export interface SiteSettings {
  _id: string
  siteName: string
  logo?: SanityImage
  seo?: SeoFields
  socialLinks?: {
    instagram?: string
    facebook?: string
  }
  phone?: string
  email?: string
}

export interface SetPart {
  partName: string
  dimensions: string
  icon?: SanityImage
}

export interface ColorVariant {
  colorName: string
  colorHex: string
  inStock: boolean
  images?: SanityImage[]
}

export interface Product {
  _id: string
  name: string
  slug: { current: string }
  images?: SanityImage[]
  videoUrl?: string
  price?: number
  buyLink?: string
  shortDescription?: string
  description?: unknown // PortableText (blockContent) array
  setParts?: SetPart[]
  material?: string
  colorVariants?: ColorVariant[]
  seo?: SeoFields
}

export interface Banner {
  _id: string
  text: string
  discountCode?: string
  isActive: boolean
  validFrom?: string
  validUntil?: string
}

// --- Regular document types ---

export interface Review {
  _id: string
  reviewerName: string
  rating: number
  body: string
  publishedAt?: string
  verified?: boolean
}

export interface FaqItem {
  _id: string
  question: string
  answer: string
  category: string
}

export interface Post {
  _id: string
  title: string
  slug: { current: string }
  coverImage?: SanityImage
  author?: string
  body?: unknown // PortableText (blockContent) array
  publishedAt: string
  seo?: SeoFields
}

export interface ContactSubmission {
  _id: string
  name: string
  email: string
  subject: string
  message: string
  submittedAt: string
  read: boolean
}

export interface SanityPage {
  _id: string
  title: string
  slug: { current: string }
  body?: unknown // PortableText (blockContent) array
  seo?: SeoFields
}
