// Central config for local product images (not synced via Sanity).
// To add a new color variant:
//   1. Add the key to ProductColorKey
//   2. Add an entry to PRODUCT_GALLERY_IMAGES with the image paths
//   3. Place images at public/images/images_kofferklar/<color>/
//
// SLIDER_IMAGES are always navy regardless of selected color.

export type ProductColorKey = 'navy' | 'black' | 'sand'

export interface LocalImage {
  src: string
  alt: string
}

// Maps Sanity colorName → ProductColorKey for gallery lookup.
// Extend when new colors are added.
const COLOR_NAME_MAP: Record<string, ProductColorKey> = {
  navy: 'navy',
  'navy blau': 'navy',
  navyblau: 'navy',
  blau: 'navy',
  dunkelblau: 'navy',
  schwarz: 'black',
  black: 'black',
  jet: 'black',
  'jet black': 'black',
  sand: 'sand',
  sandfarben: 'sand',
  beige: 'sand',
  stone: 'sand',
}

export function resolveColorKey(sanityColorName: string): ProductColorKey {
  const key = sanityColorName.toLowerCase().trim()
  return COLOR_NAME_MAP[key] ?? 'navy'
}

// Gallery images per color.
// First image = hero (4:5 aspect), remaining = gallery (4:3 aspect).
export const PRODUCT_GALLERY_IMAGES: Record<ProductColorKey, LocalImage[]> = {
  navy: [
    {
      src: '/images/images_kofferklar/product-02-gallery-koffer.png',
      alt: 'Offener Koffer von oben: 8 navy Kompressions-Packwürfel perfekt organisiert eingepackt',
    },
    {
      src: '/images/images_kofferklar/product-01-hero-flatlay.png',
      alt: 'KofferKlar 8-teiliges Kompressions-Packwürfel-Set in Navy — alle Teile auf weißem Hintergrund',
    },
    {
      src: '/images/images_kofferklar/product-03-gallery-detail.png',
      alt: 'Detailaufnahme: YKK-Reißverschluss und Premium-Polyester-Stoff des navy Packwürfels',
    },
    {
      src: '/images/images_kofferklar/product-04-gallery-lifestyle.png',
      alt: 'Frau packt lächelnd navy KofferKlar Packwürfel in ihren Koffer — helles modernes Zimmer',
    },
  ],
  black: [
    {
      src: '/images/images_kofferklar/product-02-gallery-koffer_black.png',
      alt: 'Offener Koffer von oben: 8 schwarze Kompressions-Packwürfel perfekt organisiert eingepackt',
    },
    {
      src: '/images/images_kofferklar/product-01-hero-flatlay_black.png',
      alt: 'KofferKlar 8-teiliges Kompressions-Packwürfel-Set in Schwarz — alle Teile auf weißem Hintergrund',
    },
    {
      src: '/images/images_kofferklar/product-03-gallery-detail_black.png',
      alt: 'Detailaufnahme: YKK-Reißverschluss und Premium-Polyester-Stoff des schwarzen Packwürfels',
    },
    {
      src: '/images/images_kofferklar/product-04-gallery-lifestyle_black.png',
      alt: 'Frau packt lächelnd schwarze KofferKlar Packwürfel in ihren Koffer — helles modernes Zimmer',
    },
  ],
  sand: [
    {
      src: '/images/images_kofferklar/product-02-gallery-koffer_sand.png',
      alt: 'Offener Koffer von oben: 8 sand Kompressions-Packwürfel perfekt organisiert eingepackt',
    },
    {
      src: '/images/images_kofferklar/product-01-hero-flatlay_sand.png',
      alt: 'KofferKlar 8-teiliges Kompressions-Packwürfel-Set in Sand — alle Teile auf weißem Hintergrund',
    },
    {
      src: '/images/images_kofferklar/product-03-gallery-detail_sand.png',
      alt: 'Detailaufnahme: YKK-Reißverschluss und Premium-Polyester-Stoff des sand Packwürfels',
    },
    {
      src: '/images/images_kofferklar/product-04-gallery-lifestyle_sand.png',
      alt: 'Frau packt lächelnd sand KofferKlar Packwürfel in ihren Koffer — helles modernes Zimmer',
    },
  ],
}

// Vorher/Nachher slider — always navy, color-selection independent.
export const SLIDER_IMAGES = {
  before: {
    src: '/images/images_kofferklar/vorher-koffer.png',
    alt: 'Vorher: Koffer mit chaotisch gestopfter Kleidung ohne System — alles durcheinander',
  },
  after: {
    src: '/images/images_kofferklar/nachher-koffer.png',
    alt: 'Nachher: Koffer mit 8 navy KofferKlar Packwürfeln — alles ordentlich komprimiert und organisiert',
  },
}

// Homepage hero fallback when no Sanity image is configured.
export const HERO_FALLBACK_IMAGE: LocalImage = {
  src: '/images/images_kofferklar/product-01-hero-flatlay.png',
  alt: 'KofferKlar 8-teiliges Kompressions-Packwürfel-Set in Navy auf weißem Hintergrund',
}
