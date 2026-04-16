---
plan: 01-03
phase: 01-foundation-cms
status: complete
completed: 2026-04-16
---

## Summary

Sanity Lib Layer eingerichtet und Developer-Checkpoint abgeschlossen.

## What Was Built

**lib/sanity/ (5 Dateien):**
- `client.ts` — Read-only Client mit CDN, perspective: 'published'
- `writeClient.ts` — Server-only Write Client mit SANITY_WRITE_TOKEN (kein NEXT_PUBLIC_)
- `queries.ts` — 8 GROQ Query-Funktionen, alle mit `!(_id in path("drafts.**"))` Filter
- `image.ts` — urlFor() Builder mit imageUrlBuilder
- `types.ts` — 11 TypeScript Interfaces für alle 9 Schemas

**scripts/seed.ts:**
- Seeded: siteSettings, product, banner (Singletons via createIfNotExists), 3 reviews, 5 faqItems, 1 post, 2 pages
- `npm run seed` registriert, dotenv für .env.local loading

**Fixes während Checkpoint:**
- `sanity/structure.ts`: `.filter('_type == "contactSubmission"')` zu documentList() hinzugefügt (breaking change in sanity v3.99)
- `sanity.config.ts`: `basePath: '/studio'` gesetzt (fix für "Tool not found: studio" nach Login)

## Checkpoint Result

Developer Setup verifiziert:
- `.env.local` mit SANITY_WRITE_TOKEN und STUDIO_PASSWORD konfiguriert
- CORS Origin `http://localhost:3000` in Sanity Projekt ax21j038 freigegeben
- Studio lädt unter `http://localhost:3000/studio/structure` mit allen 8 Schemas ✓

## Deviations

- `dotenv` als devDependency installiert (nicht im ursprünglichen Plan vorgesehen) — notwendig damit seed.ts `.env.local` lesen kann
- Structure-Filter-Fix und basePath nicht im Plan, aber notwendig für funktionierende Studio-Umgebung

## Self-Check: PASSED

key-files.created:
  - lib/sanity/client.ts
  - lib/sanity/writeClient.ts
  - lib/sanity/queries.ts
  - lib/sanity/image.ts
  - lib/sanity/types.ts
  - scripts/seed.ts
