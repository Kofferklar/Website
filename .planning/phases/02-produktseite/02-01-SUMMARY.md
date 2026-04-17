---
phase: 02-produktseite
plan: "01"
subsystem: ui
tags: [react, next-image, sanity, tailwind, client-component, gallery, video, youtube]

# Dependency graph
requires:
  - phase: 01-foundation-cms
    provides: SanityImage interface in lib/sanity/types.ts and urlFor() builder in lib/sanity/image.ts

provides:
  - ProductGallery client component with thumbnail navigation and blur-placeholder images
  - ProductVideo client component with YouTube iframe (youtube-nocookie.com) and direct video fallback

affects:
  - 02-produktseite (subsequent plans building the full Produktseite layout)
  - Any plan assembling the product page BuyBlock or full page grid

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Client Component isolation for interactive product UI ('use client' leaf components)
    - next/image blur placeholder pattern with static base64 blurDataURL for Sanity images
    - youtube-nocookie.com embed for DSGVO-compliant YouTube embeds
    - urlFor() Sanity image builder with explicit width/height for responsive image URLs

key-files:
  created:
    - app/(site)/produkt/components/ProductGallery.tsx
    - app/(site)/produkt/components/ProductVideo.tsx
  modified: []

key-decisions:
  - "Static base64 blurDataURL instead of Sanity LQIP — simpler, no async fetch needed at build time"
  - "youtube-nocookie.com for all YouTube embeds — DSGVO compliance without additional consent banner logic"
  - "CSS transition-opacity for image switching instead of Framer Motion — plan specifies simple CSS transition for Phase 2; Framer Motion deferred to later phase"
  - "Max 4 thumbnails visible (slice 0..4) — prevents layout overflow for products with many images"

patterns-established:
  - "Client Component isolation: interactive product UI split into leaf components with 'use client'"
  - "Sanity image URL pattern: urlFor(image).width(W).height(H).url() with null-check on asset"
  - "Blur placeholder: reusable BLUR_DATA_URL constant at module level"

requirements-completed:
  - PROD-01
  - PROD-02
  - DESIGN-03

# Metrics
duration: 2min
completed: "2026-04-17"
---

# Phase 02 Plan 01: ProductGallery + ProductVideo Summary

**Two interactive product page client components: Sanity-connected image gallery with thumbnail navigation and blur-placeholder, plus auto-detecting video embed with DSGVO-compliant youtube-nocookie.com**

## Performance

- **Duration:** 2 min
- **Started:** 2026-04-17T05:40:11Z
- **Completed:** 2026-04-17T05:42:00Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- ProductGallery: full-width image gallery with 4-thumbnail grid, active ring state (ring-primary), hover ring (ring-accent), aria-label and aria-pressed on all buttons, blur placeholder, and graceful empty-state fallback
- ProductVideo: URL-detecting embed component — YouTube URLs use youtube-nocookie.com iframe with allowFullScreen and lazy loading; direct video URLs use native `<video controls>` element
- Both components pass TypeScript strict check and full Next.js build exits 0

## Task Commits

Each task was committed atomically:

1. **Task 1: ProductGallery Client Component** - `f2bbd04` (feat)
2. **Task 2: ProductVideo Client Component** - `3567648` (feat)

**Plan metadata:** committed separately (docs: complete plan)

## Files Created/Modified

- `app/(site)/produkt/components/ProductGallery.tsx` — Interactive image gallery with Sanity images, thumbnail nav, blur placeholder, and accessibility attributes
- `app/(site)/produkt/components/ProductVideo.tsx` — Video embed with automatic YouTube vs. direct-URL detection

## Decisions Made

- Used a static base64 blurDataURL constant instead of fetching Sanity LQIP — simpler implementation with no async overhead, satisfies PROD-01 and DESIGN-03
- youtube-nocookie.com for all YouTube embeds (T-02-01 threat mitigation) — prevents cross-site tracking without requiring a cookie consent gate
- CSS `transition-opacity duration-300` for image switching instead of Framer Motion — plan explicitly states "einfache CSS-Transition reicht für Phase 2"
- Capped thumbnails at 4 visible items using `slice(0, 4)` — prevents layout breakage if Sanity returns more than 4 images

## Deviations from Plan

None — plan executed exactly as written. All acceptance criteria met. Threat mitigations from threat register applied as specified (T-02-01: youtube-nocookie.com).

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- ProductGallery and ProductVideo are ready to be composed into the full Produktseite layout in subsequent plans
- Components accept typed props from the existing `Product` interface in `lib/sanity/types.ts`
- No blockers

---
*Phase: 02-produktseite*
*Completed: 2026-04-17*
