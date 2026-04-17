---
phase: 02-produktseite
plan: "02"
subsystem: ui
tags: [next.js, react, tailwind, lucide-react, sanity, next-image, server-components]

# Dependency graph
requires:
  - phase: 01-foundation-cms
    provides: lib/sanity/types.ts with SetPart and Product interfaces, public/icons/ SVG files, Tailwind design tokens (primary, muted, border, foreground)

provides:
  - BuyBlock Server Component: sticky conversion block with price, external CTA, trust badges, payment logos
  - SetOverview Server Component: responsive 2→4-column grid of Sanity setParts with icon/fallback
  - SizeChart Server Component: hardcoded semantic table of 8 packwürfel dimensions with mobile scroll

affects:
  - 02-03-PLAN (ProductGallery, VideoBlock — same page.tsx composition)
  - 02-04-PLAN (page.tsx assembly — imports all three components)
  - 02-05-PLAN (SEO/JSON-LD — references BuyBlock price/buyLink for Product schema)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Server Component sticky sidebar pattern (sticky top-24 within CSS Grid layout)
    - Sanity image with fill layout + urlFor builder for optional icon assets
    - Hardcoded static data component pattern (SizeChart — no props, no CMS dependency)
    - Payment logo array map with next/image for consistent rendering
    - Trust badge pattern with lucide-react icon + text (Truck, RotateCcw, ShieldCheck)

key-files:
  created:
    - app/(site)/produkt/components/BuyBlock.tsx
    - app/(site)/produkt/components/SetOverview.tsx
    - app/(site)/produkt/components/SizeChart.tsx
  modified: []

key-decisions:
  - "BuyBlock has no 'use client' — sticky behavior is pure CSS, no JS needed for desktop persistence"
  - "SizeChart hardcodes dimensions rather than fetching from Sanity — product dimensions are fixed product facts, not editorial content"
  - "SetOverview returns null for empty parts array — silent fallback prevents layout breaks when Sanity data is incomplete"
  - "Payment logos use next/image with explicit width/height per logo — avoids layout shift and satisfies CLS requirements"

patterns-established:
  - "Server Component with sticky CSS: sticky top-24 wrapper — no useState, no useEffect, no JavaScript"
  - "Sanity optional image fallback: part.icon?.asset ? <Image urlFor> : <LucideIcon> — defensive rendering"
  - "Mobile horizontal scroll table: overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 with min-w on table"

requirements-completed:
  - PROD-03
  - PROD-04
  - PROD-05
  - PROD-08
  - PROD-09

# Metrics
duration: 15min
completed: 2026-04-17
---

# Phase 02 Plan 02: Produktseite — Conversion Components Summary

**BuyBlock (sticky sidebar mit Preis + CTA + Trust-Badges + 4 Zahlungslogos), SetOverview (2→4-Spalten Grid aus Sanity setParts), und SizeChart (semantische Maßtabelle mit Mobile Scroll) — alle drei Server Components ohne 'use client'**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-04-17T06:00:00Z
- **Completed:** 2026-04-17T06:02:13Z
- **Tasks:** 3 / 3
- **Files modified:** 3 created

## Accomplishments

- BuyBlock Server Component: Preis in Serifen-Schrift, externer CTA-Button (target=_blank + noopener noreferrer), drei Trust-Badges (Versand/Rückgabe/SSL), optionale Material-Anzeige, 4 Zahlungslogos via next/image — sticky top-24 für Desktop-Persistenz
- SetOverview Server Component: responsives 2→4-Spalten Grid mit Sanity SetPart-Daten, Bild via urlFor oder Package-Icon Fallback, stilles null-Return bei leerem Array
- SizeChart Server Component: hardcodierte semantische Tabelle mit allen 8 Packwürfel-Maßen, Zebra-Striping, font-mono für Dimensionswerte, mobile horizontal scroll via overflow-x-auto

## Task Commits

1. **Task 1: BuyBlock Server Component** — `f22f194` (feat)
2. **Task 2: SetOverview Server Component** — `3689dbb` (feat)
3. **Task 3: SizeChart Server Component** — `8e0d612` (feat)

## Files Created/Modified

- `app/(site)/produkt/components/BuyBlock.tsx` — Conversion sidebar: Preis, CTA, Trust-Badges, Zahlungslogos, sticky
- `app/(site)/produkt/components/SetOverview.tsx` — Set-Teile Grid aus Sanity setParts mit Fallback-Icon
- `app/(site)/produkt/components/SizeChart.tsx` — Hardcodierte Maßtabelle mit 8 Packwürfel-Dimensionen

## Decisions Made

- BuyBlock hat kein `'use client'` — sticky ist reines CSS, kein JavaScript benötigt; hält den Component-Baum vollständig server-seitig
- SizeChart hardcodiert Maße statt Sanity-Fetch — Produktdimensionen sind fixe Produktfakten, keine redaktionellen Inhalte; kein Schema-Overhead nötig
- SetOverview gibt `null` zurück bei leeren parts — verhindert Layout-Breaks wenn Sanity-Daten unvollständig sind
- Zahlungslogos als statisches Array mit next/image gemappt — explizite width/height pro Logo verhindert CLS

## Deviations from Plan

None — plan executed exactly as written. All three components match the specified structure, acceptance criteria, and TypeScript types. `npm run build` exits 0.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required. All components are static Server Components consuming props from parent page.tsx.

## Next Phase Readiness

- BuyBlock, SetOverview, SizeChart sind bereit für den Import in `app/(site)/produkt/page.tsx` (Plan 02-04)
- Alle drei akzeptieren Props aus Sanity-Queries die in page.tsx definiert werden
- BuyBlock erwartet `price?: number`, `buyLink?: string`, `material?: string`
- SetOverview erwartet `parts: SetPart[]`
- SizeChart erwartet keine Props

---
*Phase: 02-produktseite*
*Completed: 2026-04-17*
