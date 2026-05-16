'use client'

import { useEffect } from 'react'

/**
 * Warms browser/CDN cache while the user enters the password.
 * Runs only on the client, after first paint, with `requestIdleCallback`
 * so it never competes with the login form for main-thread time.
 *
 * Strategy:
 * - DNS-prefetch + preconnect to the Sanity image CDN (used by produkt + ratgeber).
 * - Preload above-the-fold static PNGs used by the homepage hero.
 * - Preload Sanity-hosted product hero image via a hidden Image request once we know its URL.
 *
 * The middleware gate blocks RSC/route prefetches, so we focus on assets that
 * are served from `/public` or from `cdn.sanity.io` (both exempt from auth).
 */

const STATIC_PRELOADS = [
  '/images/images_kofferklar/vorher-koffer.png',
  '/images/images_kofferklar/nachher-koffer.png',
  '/images/images_kofferklar/product-01-hero-flatlay.png',
  '/images/images_kofferklar/product-02-gallery-koffer.png',
  '/images/images_kofferklar/lissabon.jpg',
  '/images/images_kofferklar/stressfrei-reisen.jpg',
  '/images/images_kofferklar/yn.jpg',
  '/LogoKofferklar.svg',
]

function inject(rel: string, href: string, extra: Record<string, string> = {}) {
  if (typeof document === 'undefined') return
  if (document.head.querySelector(`link[data-preload="${href}"]`)) return
  const link = document.createElement('link')
  link.rel = rel
  link.href = href
  link.dataset.preload = href
  for (const [k, v] of Object.entries(extra)) link.setAttribute(k, v)
  document.head.appendChild(link)
}

export default function PreloadAssets() {
  useEffect(() => {
    const run = () => {
      // CDN for product/ratgeber images (largest payloads post-login).
      inject('dns-prefetch', 'https://cdn.sanity.io')
      inject('preconnect', 'https://cdn.sanity.io', { crossorigin: '' })

      // GROQ API host for produkt + ratgeber data fetches.
      const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
      if (projectId) {
        const apiHost = `https://${projectId}.apicdn.sanity.io`
        inject('dns-prefetch', apiHost)
        inject('preconnect', apiHost, { crossorigin: '' })
      }

      for (const src of STATIC_PRELOADS) {
        inject('preload', src, { as: 'image' })
      }
    }

    const idle =
      (window as unknown as { requestIdleCallback?: (cb: () => void) => number })
        .requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 200))

    idle(run)
  }, [])

  return null
}
