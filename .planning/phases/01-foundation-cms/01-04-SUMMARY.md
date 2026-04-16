---
phase: "01-foundation-cms"
plan: "04"
subsystem: "layout"
tags: ["layout", "header", "footer", "navigation", "routing", "accessibility"]
dependency_graph:
  requires: ["01-01"]
  provides: ["site-layout", "header", "mobile-drawer", "footer", "section-wrapper", "route-skeletons", "payment-icons"]
  affects: ["all site pages"]
tech_stack:
  added: []
  patterns:
    - "IntersectionObserver scroll detection (no scroll listener reflows)"
    - "Route group (site) nested layout with Header + Footer"
    - "CSS filter invert for logo on transparent header (hardcoded SVG fills)"
    - "Tailwind custom keyframe animation for drawer nav stagger"
    - "force-static caching for legal pages"
key_files:
  created:
    - "app/(site)/layout.tsx"
    - "app/(site)/components/Header.tsx"
    - "app/(site)/components/MobileDrawer.tsx"
    - "app/(site)/components/Footer.tsx"
    - "app/(site)/components/SectionWrapper.tsx"
    - "app/(site)/page.tsx"
    - "app/(site)/produkt/page.tsx"
    - "app/(site)/ratgeber/page.tsx"
    - "app/(site)/ratgeber/[slug]/page.tsx"
    - "app/(site)/ueber-uns/page.tsx"
    - "app/(site)/hilfe-service/page.tsx"
    - "app/(site)/impressum/page.tsx"
    - "app/(site)/datenschutz/page.tsx"
    - "app/(site)/agb/page.tsx"
    - "app/(site)/widerruf/page.tsx"
    - "app/not-found.tsx"
    - "public/LogoKofferklar.svg"
    - "public/icons/paypal.svg"
    - "public/icons/klarna.svg"
    - "public/icons/visa.svg"
    - "public/icons/mastercard.svg"
  modified:
    - "app/globals.css"
    - "tailwind.config.ts"
  deleted:
    - "app/page.tsx"
decisions:
  - "CSS filter invert(1) brightness(10) on logo SVG for transparent header state — SVG has hardcoded navy fills, not currentColor"
  - "Inline SVG icons for Instagram/Facebook in Footer — lucide-react v0.4x does not export these icons"
  - "Tailwind keyframe in tailwind.config.ts + globals.css for drawerLinkIn stagger animation"
  - "Removed unused SCROLL_THRESHOLD constant from Header — threshold expressed in sentinel div positioning"
metrics:
  duration: "~25 minutes"
  completed_date: "2026-04-16"
  tasks_completed: 2
  files_created: 21
  files_modified: 2
  files_deleted: 1
---

# Phase 01 Plan 04: Layout Skeleton Summary

**One-liner:** Next.js `(site)` route group with sticky transparent-to-solid Header (IntersectionObserver), slide-in MobileDrawer (Navy bg, stagger animation), 4-column Footer (all legal links), SectionWrapper, 10 route skeletons, 404 page, and 4 payment method SVGs.

## Tasks Completed

| Task | Name | Commit | Key Files |
|------|------|--------|-----------|
| 1 | Site Layout + Header + MobileDrawer + Footer + SectionWrapper | `7b2b4dc` | layout.tsx, Header.tsx, MobileDrawer.tsx, Footer.tsx, SectionWrapper.tsx |
| 2 | Route Skeletons + not-found.tsx + Payment SVGs | `92d3e52` | 10 page.tsx files, not-found.tsx, 4 payment SVGs |

## What Was Built

### Task 1: Layout Components

**`app/(site)/layout.tsx`** — Nested site layout wrapping all `(site)/` routes. Includes skip link (`sr-only focus:not-sr-only`) targeting `#main-content`, Header, `<main id="main-content">`, and Footer. No metadata export — that belongs in root `app/layout.tsx`.

**`app/(site)/components/Header.tsx`** — Client Component. Two state variables: `scrolled` (IntersectionObserver on a sentinel div at 80px) and `drawerOpen`. Transparent state: `bg-transparent`, white logo (CSS filter), `text-white` nav links. Solid state: `bg-background`, navy logo (no filter), `text-foreground` nav links, `border-b border-border`, `shadow-[0_2px_12px_rgba(0,0,0,0.06)]`. Transition: `duration-500 cubic-bezier(0.32,0.72,0,1)`. Desktop: Logo + nav + CTA pill. Mobile: Logo + 44×44px hamburger. MobileDrawer rendered at end.

**`app/(site)/components/MobileDrawer.tsx`** — Client Component. Props: `isOpen`, `onClose`. Body scroll lock via `document.body.style.overflow`. Escape key handler. Focus management (close button receives focus on open). Overlay: `z-40 bg-black/50 backdrop-blur-sm` with opacity transition. Drawer panel: `z-50 bg-primary max-w-[320px]`, slides in from right with `cubic-bezier(0.32,0.72,0,1)` open / `cubic-bezier(0.16,1,0.3,1)` close. Nav links with CSS stagger animation (`drawerLinkIn` keyframe, `calc(index * 60ms)` delay). Gold CTA button. Legal footer links.

**`app/(site)/components/Footer.tsx`** — Server Component (no `'use client'`). `grid-cols-1 md:grid-cols-4 gap-8`. 4 columns: Logo+tagline, Produkt, Service, Rechtliches (Impressum, Datenschutz, AGB, Widerruf). Bottom bar: copyright + Instagram/Facebook inline SVGs.

**`app/(site)/components/SectionWrapper.tsx`** — Server Component. `max-w-[1400px] mx-auto px-6 md:px-8` with optional `className` prop.

### Task 2: Route Skeletons + not-found + Payment SVGs

**10 route skeletons** under `app/(site)/` — each with German h1, `metadata.title`, and "Diese Seite wird gerade aufgebaut." fallback copy. Legal pages (impressum, datenschutz, agb, widerruf) have `export const dynamic = 'force-static'`.

**`app/not-found.tsx`** — "Diese Seite existiert nicht." with Link back to home.

**`public/icons/`** — 4 placeholder payment SVGs: paypal.svg, klarna.svg, visa.svg, mastercard.svg. All contain `<svg` tag and communicate payment method visually.

**Deleted `app/page.tsx`** — The default Next.js scaffold page was conflicting with `app/(site)/page.tsx` (both resolve to `/`). Deleted to resolve conflict.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] lucide-react v0.4x does not export Instagram or Facebook icons**
- **Found during:** Task 1, build compilation
- **Issue:** Plan specified `import { Instagram, Facebook } from 'lucide-react'` but these icons are not exported in the installed version (v0.4x)
- **Fix:** Used inline SVG elements with equivalent icon paths for Instagram (square with rounded corners, circle, dot) and Facebook (f-letterform path). Both have correct `aria-label` attributes.
- **Files modified:** `app/(site)/components/Footer.tsx`
- **Commit:** `7b2b4dc`

**2. [Rule 1 - Bug] Unused SCROLL_THRESHOLD constant caused ESLint error**
- **Found during:** Task 1, build linting
- **Issue:** `const SCROLL_THRESHOLD = 80` was assigned but never used — threshold is expressed via sentinel div `top-[80px]` positioning
- **Fix:** Replaced with a comment documenting the threshold value
- **Files modified:** `app/(site)/components/Header.tsx`
- **Commit:** `7b2b4dc`

**3. [Rule 1 - Bug] Unused params prop in slug page caused ESLint warning**
- **Found during:** Task 2, build linting
- **Issue:** `{ params }: { params: Promise<{ slug: string }> }` — params unused in skeleton
- **Fix:** Removed the props signature entirely (skeleton has no dynamic content yet)
- **Files modified:** `app/(site)/ratgeber/[slug]/page.tsx`
- **Commit:** `92d3e52`

## Known Stubs

| Stub | File | Reason |
|------|------|--------|
| CTA href="#" | `Header.tsx`, `MobileDrawer.tsx` | Buy link comes from Sanity `product.buyLink` — not available until Phase 2 |
| "Diese Seite wird gerade aufgebaut." | All 10 route skeleton pages | Content built in Phase 2+ |
| Social links are placeholder URLs | `Footer.tsx` | Real social URLs come from Sanity `siteSettings.socialLinks` — Phase 2 |
| Payment SVGs are placeholder art | `public/icons/*.svg` | Official brand SVGs will replace these in Phase 2 |

These stubs are intentional — the plan's goal is the layout scaffold, not real content. All stubs are tracked for replacement in Phase 2.

## Self-Check

### Files Exist
- `app/(site)/layout.tsx`: FOUND
- `app/(site)/components/Header.tsx`: FOUND
- `app/(site)/components/MobileDrawer.tsx`: FOUND
- `app/(site)/components/Footer.tsx`: FOUND
- `app/(site)/components/SectionWrapper.tsx`: FOUND
- `app/(site)/page.tsx`: FOUND
- `app/not-found.tsx`: FOUND
- `public/icons/paypal.svg`: FOUND
- Route skeleton count (10): FOUND

### Commits Exist
- `7b2b4dc`: FOUND (feat(01-04): site layout skeleton)
- `92d3e52`: FOUND (feat(01-04): route skeletons, not-found, payment SVGs)

### Build
- `npm run build`: exits 0, 13 routes compiled (11 static, 2 dynamic)

## Self-Check: PASSED
