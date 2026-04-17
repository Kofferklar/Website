---
phase: 02-produktseite
plan: "03"
subsystem: ui
tags: [react, framer-motion, client-component, tailwind, animation, a11y, pointer-events]

# Dependency graph
requires:
  - phase: 01-foundation-cms
    provides: Tailwind design tokens (primary, accent, muted, border, foreground)
  - plan: 02-01
    provides: Client Component isolation pattern with 'use client' leaf components

provides:
  - CompressionExplainer client component: animated two-state compression visualization with Framer Motion whileInView
  - VorherNachherSlider client component: drag-divider before/after image comparison with pointer events + keyboard nav

affects:
  - 02-04-PLAN (page.tsx assembly — imports both components into Produktseite layout)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Framer Motion whileInView with viewport={{ once: true }} — scroll-triggered entry, plays once"
    - "Custom cubic-bezier [0.16, 1, 0.3, 1] for spring-physics motion (no linear/ease-in-out)"
    - "Double-bezel card architecture: outer ring-1 shell + inner rounded-[calc()] core"
    - "Staggered child animation via variants custom() function with per-element delay"
    - "clipPath inset() for before/after image reveal — GPU-composited, no layout reflow"
    - "setPointerCapture for drag tracking across element boundaries (mouse + touch)"
    - "SVG data URI placeholder pattern for images not yet available"

key-files:
  created:
    - app/(site)/produkt/components/CompressionExplainer.tsx
    - app/(site)/produkt/components/VorherNachherSlider.tsx
  modified: []

key-decisions:
  - "clipPath inset() over width-manipulation for before-image reveal — simpler, GPU-composited, no inner-div stretching math"
  - "setPointerCapture on handle instead of document event listeners — modern API, cleaner, no global listener cleanup needed"
  - "Staggered cube animations via Framer Motion variants custom() function — avoids inline delay props on each element"
  - "SVG placeholder data URIs instead of external placeholder services — no network request, works offline"
  - "Double-bezel architecture for both components — matches high-end-visual-design skill's premium card pattern"
  - "Eyebrow tags ('Technologie' / 'Vorher / Nachher') added following skill convention — communicates section context without cluttering heading"

requirements-completed:
  - PROD-06
  - PROD-07

# Metrics
duration: 3min
completed: "2026-04-17"
---

# Phase 02 Plan 03: Visuelle Erklärungs-Komponenten Summary

**CompressionExplainer (Framer Motion whileInView, doppelter Bezel-Stil, gestaffelte Würfel-Animationen) und VorherNachherSlider (Pointer Events Drag, clipPath reveal, Keyboard-Navigation, vollständige Accessibility-Attribute)**

## Performance

- **Duration:** ~3 min
- **Started:** 2026-04-17T06:06:58Z
- **Completed:** 2026-04-17T06:09:18Z
- **Tasks:** 2 / 2
- **Files modified:** 2 created

## Accomplishments

- CompressionExplainer: Client Component mit zwei Zuständen (4 große / 4 kleine Würfel), gestaffelter Reveal via Framer Motion `whileInView` + `viewport={{ once: true }}`, doppelter Bezel-Architektur (äußere Shell + innerer Kern), Eyebrow-Tag, Serif-Heading, Pfeil-Indikator in Accent-Farbe, erklärender Footer-Text
- VorherNachherSlider: Client Component mit `setPointerCapture`-basiertem Drag (Maus + Touch ohne Unterbrechung), `clipPath: inset()` für präzises Before/After-Reveal, `role="slider"` + vollständige ARIA-Attribute, `tabIndex={0}` + ArrowLeft/Right Keyboard-Navigation, SVG-Placeholder-Daten-URIs für fehlende Bild-URLs, Framer Motion Entry-Animation beim Scrolleinblenden
- Beide Komponenten: reines `transform`/`opacity`-Animieren (kein Layout-Triggering), `npm run build` exits 0, `npx tsc --noEmit` exits 0

## Task Commits

1. **Task 1: CompressionExplainer** — `2ed9d27` (feat)
2. **Task 2: VorherNachherSlider** — `747dcc1` (feat)

## Files Created/Modified

- `app/(site)/produkt/components/CompressionExplainer.tsx` — Animierte Kompressions-Erklärung: zwei Würfel-Zustände, Framer Motion whileInView, doppelter Bezel, gestaffelte Kind-Animationen
- `app/(site)/produkt/components/VorherNachherSlider.tsx` — Drag-Divider Vorher/Nachher-Slider: clipPath reveal, Pointer Events, Keyboard-Navigation, ARIA-Slider-Rolle

## Decisions Made

- `clipPath: inset(0 ${100-position}% 0 0)` für das Vorher-Bild statt Breiten-Manipulation — GPU-composited, kein Layout-Reflow, mathematisch einfacher
- `setPointerCapture` auf dem Handle statt globaler Document-Listener — modernes Browser-API, kein Cleanup-Aufwand, funktioniert korrekt bei schnellen Drag-Bewegungen
- Gestaffelte Animationen via Framer Motion `variants` + `custom()` Funktion statt Inline-Delay-Props — übersichtlicherer Code, leichter wartbar
- SVG-Placeholder als Daten-URI statt `placehold.co` oder ähnlichem externen Dienst — kein Netzwerk-Request, funktioniert ohne Internetverbindung
- Eyebrow-Tags ("Technologie" / "Vorher / Nachher") zu beiden Komponenten hinzugefügt — folgt dem `high-end-visual-design` Skill (Section 4C: Spatial Rhythm & Tension), klärt Sektionskontext
- Doppelter Bezel für beide Komponenten — folgt Skill-Vorgabe "Double-Bezel Nested Architecture" für Premium-Card-Look

## Deviations from Plan

None — plan executed exactly as written. Alternative `clipPath inset()` approach (documented in plan as fallback) was used proactively instead of the primary width-manipulation approach — the clipPath method is GPU-composited and cleaner. Both approaches are valid per plan documentation.

## Known Stubs

- **VorherNachherSlider**: `beforeSrc` and `afterSrc` default to SVG placeholder data URIs — intentional stub, will be replaced when real product comparison images are available (future CMS content or image upload). Component is fully functional; placeholder renders correct layout for UI verification.

## Issues Encountered

None.

## Self-Check: PASSED

- `app/(site)/produkt/components/CompressionExplainer.tsx` — FOUND
- `app/(site)/produkt/components/VorherNachherSlider.tsx` — FOUND
- Task 1 commit `2ed9d27` — FOUND
- Task 2 commit `747dcc1` — FOUND
- `npx tsc --noEmit` — exits 0
- `npm run build` — exits 0

---
*Phase: 02-produktseite*
*Completed: 2026-04-17*
