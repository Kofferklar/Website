# KofferKlar

## What This Is

KofferKlar ist eine produktionsreife, desktop-first E-Commerce-Website für kofferklar.de, die ein 8-teiliges Kompressions-Packwürfel-Set an reiseaffine junge Erwachsene in Deutschland verkauft. Die Website führt Besucher vom Erstkontakt bis zur Kaufentscheidung — schnell, vertrauenswürdig und conversion-orientiert. Inhalte werden zentral über Sanity.io gepflegt; technische Basis ist Next.js 15, TypeScript, Tailwind CSS und Vercel.

## Core Value

Ein Besucher, der die Produktseite aufruft, versteht sofort den Nutzen, vertraut dem Anbieter und kann in wenigen Klicks kaufen — ohne Ablenkung, ohne Zweifel.

## Requirements

### Validated

(None yet — ship to validate)

### Active

**Infrastruktur & Setup**
- [ ] Next.js 15 + TypeScript + Tailwind CSS Projektstruktur aufgesetzt
- [ ] Sanity.io (Project: ax21j038, Dataset: production) konfiguriert mit allen Schemas
- [ ] Vercel-Deployment konfiguriert (vercel.json, .env.example)
- [ ] Git-Repository initialisiert mit sinnvoller .gitignore

**Seiten & Routing**
- [ ] Startseite (/) mit Hero, Rabattbanner, Vorher-Nachher, Bewertungen, Newsletter-CTA
- [ ] Produktseite (/produkt) mit vollständigem Kaufblock inkl. Versand/Zahlung am CTA
- [ ] Über uns (/ueber-uns) mit Gründungsgeschichte und Nachhaltigkeitsversprechen
- [ ] Ratgeber-Übersicht (/ratgeber) und Detailseite (/ratgeber/[slug])
- [ ] Hilfe & Service (/hilfe-service) mit FAQ, Kontaktformular (Sanity Submissions), E-Mail, Telefon, Versand, Rückgabe
- [ ] Rechtliche Seiten: Impressum, Datenschutz, AGB, Widerruf (je eigene Route)

**Komponenten**
- [ ] Layout: Header (flache Navigation, max. 2 Ebenen), Footer mit rechtlichen Links
- [ ] UI-Basiskomponenten: Button, Badge, Card, Divider, Spinner
- [ ] Sections: Hero, RabattBanner, VorherNachher, ReviewStrip, NewsletterSignup
- [ ] Produktkomponenten: ProductGallery, ProductVideo, SetOverview, SizeChart, BuyBlock (Preis + CTA + Versandinfo + Zahlungslogos)
- [ ] Blog-Komponenten: PostCard, PostGrid, PostBody (portable text)
- [ ] Formular: ContactForm mit Validation, Success- und Error-State (speichert in Sanity)

**Sanity CMS**
- [ ] Schema: siteSettings (Name, Logo, Meta, Social)
- [ ] Schema: page (generische Seite mit Slug und SEO-Felder)
- [ ] Schema: product (Name, Bilder, Video, Beschreibung, Preis, SetTeile, Maße, Material)
- [ ] Schema: review (Name, Sterne, Text, Datum, verifiziert)
- [ ] Schema: faqItem (Frage, Antwort, Kategorie)
- [ ] Schema: post (Titel, Slug, Cover, Autor, Body als PortableText, SEO)
- [ ] Schema: banner (Text, Rabattcode, aktiv/inaktiv, Zeitraum)
- [ ] Schema: contactSubmission (Name, E-Mail, Betreff, Nachricht, Timestamp, gelesen)
- [ ] Beispiel-Dokumente / Seed-Daten für alle Typen

**SEO & Performance**
- [ ] Metadata API (Next.js 15) pro Seite mit Open Graph und Twitter Cards
- [ ] Semantische HTML-Struktur (h1 nur einmal pro Seite, landmark regions)
- [ ] sitemap.xml (dynamisch generiert, inkl. Blog-Slugs)
- [ ] robots.txt
- [ ] Interne Verlinkung: Produktseite ↔ Ratgeber-Artikel
- [ ] JSON-LD strukturierte Daten: Product (Produktseite), BreadcrumbList, Organization

**Design & Assets**
- [ ] Farbpalette: modern, hell, vertrauenswürdig, conversion-orientiert (wird vom System definiert)
- [ ] Schriftpaarung: geeignetes Google Fonts Paar (z.B. Inter + Playfair Display o.ä.)
- [ ] Logo eingebunden aus /assets (SVG bevorzugt)
- [ ] Placeholder-Bilder (Next.js blur placeholder) — alle leicht austauschbar
- [ ] Responsive: Desktop-first, vollständig optimiert für Mobile

**Dokumentation**
- [ ] README.md mit lokalem Setup, Umgebungsvariablen, Sanity Studio-Aufruf
- [ ] .env.example mit allen benötigten Keys und Kommentaren
- [ ] /docs/ Ordner mit Komponentenübersicht und Content-Pflegeanleitung

### Out of Scope

- Warenkorb / Multi-Produkt-Shop — KofferKlar verkauft ein einziges Set; direkter CTA zu externem Shop (z.B. Amazon/eigener Checkout) reicht für v1
- Nutzerkonto / Login — nicht benötigt für Single-Product v1
- Mehrsprachigkeit (i18n) — Fokus auf deutschen Markt, kein EN/FR für v1
- Dark Mode — erhöht Komplexität ohne klaren Conversion-Vorteil für diese Zielgruppe
- Formspark — ersetzt durch Sanity Submissions Schema (kein externer Service)
- Bezahlprozess auf der Website — Kaufabschluss über externen Link (Amazon o.ä.) oder separates Checkout-System

## Context

**Produkt:** 8-teiliges Kompressions-Packwürfel-Set. Kernversprechen: Ordnung im Koffer, Platz sparen, Gepäckgebühren sparen, stressfreier reisen — alles zu einem attraktiven Preis.

**Zielgruppe:** Reiseaffine junge Erwachsene in Deutschland (18–35 J.), Studierende und Berufseinsteiger. Preissensibel, digital-affin, viel mobil, reagiert gut auf klare Nutzenkommunikation und einfache Sprache. Kaufentscheidung häufig mobil getroffen, auch wenn Desktop-Darstellung Priorität hat.

**Positionierung:** Funktional und preisattraktiv — nicht Luxus. "Ordnung und Platz statt Chaos" als emotionaler Anker.

**Technisches Setup:**
- Sanity: Project ID `ax21j038`, Dataset `production`
- Formulare: Kontaktanfragen werden als `contactSubmission`-Dokumente in Sanity gespeichert
- Logo vorhanden als SVG und PNG unter `/assets`
- Hosting: Vercel

**Design-Richtung:** Hell, klar, aufgeräumt. Conversion-orientiert (keine Ablenkungen, klare CTAs). Visuell stark durch Produktbilder und Vorher-Nachher. Kein verspieltes Design — Fokus auf Nutzen und Vertrauen.

## Constraints

- **Tech Stack**: Next.js 15, TypeScript, Tailwind CSS, Sanity.io, Vercel — festgelegt, kein Abweichen
- **Layout-Strategie**: Desktop-first CSS, aber vollständig responsive; Mobile-User kommen häufig über Social/Ads
- **Navigation**: Maximal 2 Ebenen, flach — kein Mega-Menü, kein komplexes Routing
- **Sprache**: Einfach, klar, ohne Fachjargon — deutsche Inhalte
- **Bilder**: Alle mit Placeholder — austauschbar ohne Code-Änderungen
- **Externe Services**: Nur Sanity (CMS + Formulare) und Vercel (Hosting) — minimale Drittanbieter-Abhängigkeiten

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Desktop-first CSS | Explizite Anforderung trotz mobiler Zielgruppe — vollständig responsive dennoch | — Pending |
| Sanity für Kontaktformulare | Kein Formspark/externer Service — Submissions bleiben im eigenen CMS | — Pending |
| Kein eigener Checkout | Single-Product-Site; Kaufabschluss über externen Link für v1 | — Pending |
| Sanity `ax21j038` / `production` | Bestehendes Projekt wird genutzt, kein neues Anlegen | — Pending |
| JSON-LD statt nur Meta-Tags | Bessere Sichtbarkeit in Google Shopping / Produktsuche für Packwürfel-Kategorie | — Pending |

## Evolution

Dieses Dokument entwickelt sich an Phasenübergängen und Meilensteingrenzen weiter.

**Nach jedem Phasenübergang** (via `/gsd-transition`):
1. Anforderungen invalidiert? → In "Out of Scope" verschieben mit Begründung
2. Anforderungen validiert? → In "Validated" verschieben mit Phasenreferenz
3. Neue Anforderungen entstanden? → In "Active" eintragen
4. Entscheidungen zu dokumentieren? → In "Key Decisions" eintragen
5. "What This Is" noch akkurat? → Bei Drift aktualisieren

**Nach jedem Meilenstein** (via `/gsd-complete-milestone`):
1. Vollständige Überprüfung aller Abschnitte
2. Core Value-Check — noch die richtige Priorität?
3. Out of Scope prüfen — Begründungen noch valide?
4. Context mit aktuellem Stand aktualisieren

---
*Last updated: 2026-04-16 after initialization*
