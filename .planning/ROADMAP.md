# Roadmap: KofferKlar

**Generated:** 2026-04-16
**Granularity:** Coarse (4 phases)
**Total v1 Requirements:** 77
**Coverage:** 77/77 ✓

---

## Phase Overview

| # | Phase | Goal | Requirements | Status |
|---|-------|------|-------------|--------|
| 1 | Foundation & CMS | Projektgerüst, Sanity-Schemas, Layout | FOUND-01–09, LAYOUT-01–06, CMS-01–10, DESIGN-01–02, DESIGN-04 | Pending |
| 2 | Produktseite | Core Value: Besucher versteht und kann kaufen | PROD-01–12, DESIGN-03, DESIGN-05 | Pending |
| 3 | Restliche Seiten | Alle Content-Seiten funktionsfähig | HOME-01–06, BRAND-01–03, BLOG-01–06, SERVICE-01–10 | Pending |
| 4 | SEO & Production | Produktionsreif, rechtlich sicher, SEO-optimiert | LEGAL-01–05, SEO-01–12 | Pending |

**Milestone: v1.0** — nach Phase 4

---

## Phase 1: Foundation & CMS

**Goal:** Das Projektgerüst steht, Sanity ist konfiguriert, alle Schemas sind als Code definiert, Header und Footer sind gebaut, Beispielcontent ist vorhanden.

**Requirements:** FOUND-01–09, LAYOUT-01–06, CMS-01–10, DESIGN-01, DESIGN-02, DESIGN-04

**Plans:** 5 plans

Plans:
- [x] 01-01-PLAN.md — Next.js Scaffold + Tailwind Theme + Config Files
- [x] 01-02-PLAN.md — Sanity Schemas + Studio Config + Middleware
- [x] 01-03-PLAN.md — Sanity Lib Layer + Seed Data + Connection Checkpoint
- [x] 01-04-PLAN.md — Site Layout + UI Components + Route Skeletons + Payment Icons
- [x] 01-05-PLAN.md — Build Verification + Visual Checkpoint

**Success Criteria:**
1. `npm run dev` startet ohne Fehler und zeigt eine funktionierende Startseite (noch ohne Inhalt)
2. Sanity Studio unter `/studio` zeigt alle definierten Schemas mit Beispiel-Dokumenten
3. Header mit Logo und Navigation ist gerendert; Footer mit allen Rechtlichen Links ist sichtbar
4. `.env.example` enthält alle erforderlichen Keys mit Kommentaren; README.md erklärt Setup vollständig
5. `npm run build` kompiliert ohne TypeScript-Fehler

**UI hint:** yes (Header, Footer, Navigation)

**Key Tasks:**
- Next.js 15 Projekt initialisieren (npx create-next-app@latest mit TypeScript, Tailwind, App Router)
- Tailwind-Konfiguration: Farbpalette, Schriften erweitern
- next/font: Inter + Playfair Display einrichten
- Sanity Studio konfigurieren und mit Next.js verbinden
- Alle 8 Sanity-Schemas als TypeScript-Code schreiben
- Seed-Daten für alle Schema-Typen erstellen
- `lib/sanity/` Verzeichnis: client.ts, writeClient.ts, queries.ts, image.ts, types.ts
- `(site)/layout.tsx` mit Header + Footer
- Header-Komponente: Logo (SVG aus /assets), Desktop-Navigation, Mobile-Hamburger-Menü
- Footer-Komponente: Rechtliche Links, Kontakt, Social
- Alle Routing-Skelette anlegen (leere page.tsx für alle Routen)
- `.env.example` und README.md schreiben
- `vercel.json` mit Preview-Noindex-Header

---

## Phase 2: Produktseite

**Goal:** Die Produktseite ist vollständig gebaut — Galerie, Kaufblock, Set-Übersicht, FAQ, Bewertungen, Kompressions-Erklärer. Der Core Value der Website ist erfüllt.

**Requirements:** PROD-01–12, DESIGN-03, DESIGN-05

**Success Criteria:**
1. Produktseite rendert mit Beispieldaten aus Sanity: Bilder, Titel, Preis, Set-Teile sichtbar
2. "Jetzt kaufen"-Button ist above the fold auf Desktop (1440px) und klar sichtbar; öffnet externen Link in neuem Tab
3. Kaufblock enthält Preis, CTA, Versandinfo und Zahlungslogos — alles in direkter räumlicher Nähe
4. Produktbilder-Galerie: Bildwechsel per Klick funktioniert auf Desktop und Touch auf Mobile
5. FAQ-Accordion: Öffnen und Schließen von Antworten funktioniert ohne Seitenreload
6. JSON-LD Product-Schema ist im Page-HTML korrekt vorhanden (validierbar mit Rich Results Test)
7. CTA-Button ist auf Mobile (375px) ohne Scrollen sichtbar

**UI hint:** yes

**Key Tasks:**
- `ProductGallery` (Client Component): Hauptbild + Thumbnails, wechselbar
- `ProductVideo` (Client Component): `<video>`-Tag mit Sanity-URL oder YouTube-Embed
- `SetOverview` (Server Component): 8-Teile-Grid mit Maßen aus Sanity
- `SizeChart` (Server Component): Tabelle mit allen Dimensionen
- `BuyBlock` (Server Component): Preis, CTA-Button, Versandinfo, Zahlungslogos — sticky auf Desktop
- `CompressionExplainer`: Visuelle Erklärung der Kompressionsfunktion (Animation oder Grafik)
- `VorherNachherSlider` (Client Component): Interaktiver Slider auf Produktseite
- Kundenbewertungen-Sektion (Server Component): Sterne-Durchschnitt + Bewertungs-Cards aus Sanity
- `ProductFaq` (Client Component): Accordion mit Fragen aus Sanity faqItem-Schema
- JSON-LD Product-Schema in page.tsx einbauen
- GROQ-Query für Produktseite schreiben (`PRODUCT_QUERY` in queries.ts)
- Responsive: Mobile-Check CTA above fold (375px)
- Placeholder-Bilder konfigurieren mit `placeholder="blur"` + blurDataURL

---

## Phase 3: Restliche Seiten

**Goal:** Startseite, Über uns, Ratgeber und Hilfe & Service sind fertig gebaut und mit Sanity-Content verbunden.

**Requirements:** HOME-01–06, BRAND-01–03, BLOG-01–06, SERVICE-01–10

**Success Criteria:**
1. Startseite: Hero mit CTA, Rabatt-Banner, Vorher-Nachher, Reviews und Newsletter-Signup sind gerendert
2. Rabatt-Banner kann im Sanity Studio aktiviert/deaktiviert werden und verschwindet sofort (nach Revalidierung) auf der Live-Site
3. Ratgeber-Übersicht zeigt alle Posts; Detailseite rendert vollständigen PortableText-Body
4. Blog-Detailseite enthält einen sichtbaren CTA-Link zur Produktseite
5. Kontaktformular: Erfolgsmeldung erscheint nach Absenden; Fehlertext bei Server-Fehler; Loading-State sichtbar; kein Doppel-Submit möglich
6. Nach Formular-Absenden erscheint der Eintrag als neues `contactSubmission`-Dokument im Sanity Studio
7. Über uns Seite rendert Gründungsgeschichte und Nachhaltigkeitsversprechen aus Sanity

**UI hint:** yes

**Key Tasks:**
- **Startseite:**
  - `HeroSection` (Server wrapper + Client animation): Headline, Subheadline, CTA, Produktbild
  - `RabattBanner` (Server Component): aus Sanity `banner`-Schema, conditional rendering
  - `VorherNachherSection` auf Home (vereinfacht vs. Produktseite-Version)
  - `ReviewStrip`: 3–5 Bewertungen aus Sanity `review`-Schema
  - `NewsletterSignup` (Client Component): E-Mail-Eingabe, Double Opt-In vorbereitet
  - GROQ-Query für Startseite
- **Über uns:**
  - `page`-Schema Daten fetchen und PortableText rendern
  - Nachhaltigkeits-Sektion als eigene visuelle Komponente
- **Ratgeber:**
  - `PostGrid` + `PostCard` (Server Components): Übersicht
  - `PostBody` (Server Component): PortableText-Renderer mit Heading-Styles, Images, Links
  - `generateStaticParams` für Blog-Detailseiten
  - Internen CTA-Link in PostBody-Rendering einbauen
- **Hilfe & Service:**
  - `ServiceFaq` (Client Component): Accordion aus Sanity `faqItem`
  - `ContactForm` (Client Component): React Hook Form + Zod Validation
  - Server Action `submitContact`: Zod-Validation → Sanity Write
  - Success, Error, Loading States
  - Versandinformationen + Rückgabehinweise aus Sanity `page`-Schema
  - E-Mail/Telefon aus Sanity `siteSettings` darstellen

---

## Phase 4: SEO & Production

**Goal:** Die Website ist produktionsreif: alle SEO-Metadaten sind gesetzt, Sitemap und robots.txt sind konfiguriert, rechtliche Seiten sind vorhanden, Core Web Vitals sind im grünen Bereich.

**Requirements:** LEGAL-01–05, SEO-01–12

**Success Criteria:**
1. Google Rich Results Test bestätigt: Product-Schema auf Produktseite, BreadcrumbList auf Blog-Detailseiten
2. `https://kofferklar.de/sitemap.xml` ist erreichbar und enthält alle Hauptseiten + alle Blog-Slugs (keine Draft-URLs)
3. `https://kofferklar.de/robots.txt` disallowt `/studio`
4. Lighthouse Score (Desktop): Performance ≥ 90, SEO ≥ 95, Accessibility ≥ 90
5. Alle 4 rechtlichen Seiten (Impressum, Datenschutz, AGB, Widerruf) sind erreichbar und haben Inhalte
6. OG-Tags: Facebook Sharing Debugger zeigt korrektes Bild und Titel für Startseite und Produktseite
7. `metadataBase` ist gesetzt; alle OG-Image-URLs sind absolut (kein `/` relativer Pfad)

**UI hint:** no

**Key Tasks:**
- `metadataBase` in `app/layout.tsx` setzen
- `generateMetadata` für alle Seiten implementieren (inkl. OG, Twitter, canonical)
- `app/sitemap.ts`: statische + dynamische Blog-Slugs, Draft-Filter
- `app/robots.ts`: Allow all, Disallow /studio
- JSON-LD `Organization`-Schema auf Startseite
- JSON-LD `BreadcrumbList` auf Produktseite und Blog-Detailseiten
- `LEGAL-01`: Impressum-Inhalt aus Sanity `page`-Schema
- `LEGAL-02`: Datenschutz-Inhalt aus Sanity (DSGVO-konform, Sanity als Datenprozessor)
- `LEGAL-03`: AGB-Inhalt aus Sanity
- `LEGAL-04`: Widerruf-Inhalt aus Sanity (amtlicher Mustertext)
- Alle Legal Pages: `robots: { index: false }` in metadata
- Lighthouse Audit: LCP, CLS, FID prüfen und beheben
- `priority` auf Hero-Bilder verifizieren
- alle `next/image` auf explizite width/height prüfen
- Vercel Preview noindex Header in `vercel.json` verifizieren
- `NEXT_PUBLIC_SITE_URL` in allen absolutem URL-Konstruktionen prüfen

---

## Milestone: v1.0 — Produktionsreife Website

**Bedingungen:**
- Alle 4 Phasen abgeschlossen
- Lighthouse Desktop: Performance ≥ 90, SEO ≥ 95
- Rechtliche Seiten von Anwalt geprüft
- CORS-Einstellungen für Produktions-Domain gesetzt
- Double Opt-In Newsletter technisch getestet
- Kontaktformular End-to-End getestet (Submission erscheint in Sanity Studio)
- Impressum in ≤ 2 Klicks erreichbar (auf Desktop + Mobile geprüft)

---

## Architektur-Notizen für Ausführung

- **Runtime:** `RUNTIME=claude`, `INSTRUCTION_FILE=CLAUDE.md`
- **Taste Skills:** `high-end-visual-design` und `design-taste-frontend` für alle UI-Phasen aktivieren
- **GROQ-Queries:** Immer mit `!(_id in path("drafts.**"))` Filter
- **Write Token:** Niemals in `NEXT_PUBLIC_*` Variables — nur in Server Actions
- **Bilder:** Alle mit `placeholder="blur"` und expliziter width/height
- **Schriften:** Nur via `next/font/google` — kein Google Fonts CDN Link
- **Animationen:** Framer Motion nur in Client Components an Leaf-Ebene
- **CTAs:** Externe Links immer mit `target="_blank" rel="noopener noreferrer"`
