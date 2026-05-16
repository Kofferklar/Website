import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { client } from './client'

const builder = imageUrlBuilder(client)

/**
 * Image URL helper.
 * `auto('format')` lets Sanity pick the best modern format (AVIF/WebP) per UA.
 * Quality 80 is the sweet spot for product photography (-40% bytes vs default 75 baseline mismatch).
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto('format').quality(80)
}
