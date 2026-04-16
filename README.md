# KofferKlar

Produktionsreife E-Commerce-Website für **kofferklar.de** — das 8-teilige Kompressions-Packwürfel-Set für stressfreies Reisen.

## Tech Stack

| Technologie | Version | Zweck |
|-------------|---------|-------|
| Next.js | 15.x | Framework (App Router, ISR, Server Components) |
| TypeScript | 5.x | Typsicherheit |
| Tailwind CSS | 3.4.x | Styling |
| Sanity.io | 3.x | CMS (Content, Formulare) |
| Vercel | — | Hosting & Deployment |

## Voraussetzungen

- **Node.js** 18 oder neuer (empfohlen: Node.js 20 LTS)
- **npm** 9 oder neuer
- **Sanity-Konto** mit Zugriff auf Projekt `ax21j038` (Dataset: `production`)

## Lokales Setup

### 1. Repository klonen

```bash
git clone <repository-url> kofferklar
cd kofferklar
```

### 2. Abhängigkeiten installieren

```bash
npm install
```

### 3. Umgebungsvariablen einrichten

```bash
cp .env.example .env.local
```

Öffne `.env.local` und trage die echten Werte ein (siehe Abschnitt [Umgebungsvariablen](#umgebungsvariablen) unten).

### 4. Entwicklungsserver starten

```bash
npm run dev
```

Die Website ist anschließend unter **http://localhost:3000** erreichbar.

## Sanity Studio aufrufen

Das Sanity Studio ist unter **http://localhost:3000/studio** erreichbar.

Beim Aufruf wird nach einem Passwort gefragt — dieses entspricht dem `STUDIO_PASSWORD`-Wert aus deiner `.env.local`.

## Umgebungsvariablen

Alle benötigten Umgebungsvariablen sind in `.env.example` dokumentiert. Kopiere die Datei zu `.env.local` und befülle sie mit den echten Werten.

| Variable | Beschreibung | Sichtbarkeit |
|----------|-------------|--------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity Projekt-ID (`ax21j038`) | Öffentlich (Browser-Bundle) |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity Dataset (`production`) | Öffentlich (Browser-Bundle) |
| `NEXT_PUBLIC_SITE_URL` | Produktions-URL (`https://kofferklar.de`) | Öffentlich (Browser-Bundle) |
| `SANITY_WRITE_TOKEN` | Sanity API-Token mit Schreibzugriff | **Nur Server-seitig** |
| `STUDIO_PASSWORD` | Passwort für den /studio Basic-Auth-Schutz | **Nur Server-seitig** |

### Sanity Write-Token generieren

1. Öffne [sanity.io/manage](https://sanity.io/manage)
2. Wähle Projekt **ax21j038**
3. Navigiere zu **API → Tokens**
4. Klicke **Add API token**
5. Name: `write-token-lokal` (oder ähnlich), Berechtigungen: **Editor**
6. Kopiere den generierten Token in `SANITY_WRITE_TOKEN` in deiner `.env.local`

> **Wichtig:** Der Write-Token darf **niemals** einen `NEXT_PUBLIC_`-Prefix erhalten und darf **niemals** in das Git-Repository committet werden.

## Deployment (Vercel)

1. Projekt in [Vercel Dashboard](https://vercel.com) importieren
2. Unter **Settings → Environment Variables** alle Variablen aus `.env.example` eintragen (mit echten Werten)
3. Deploy auslösen — Vercel erkennt Next.js automatisch

Preview-Deployments erhalten automatisch einen `X-Robots-Tag: noindex`-Header (konfiguriert in `vercel.json`), damit Preview-URLs nicht von Suchmaschinen indexiert werden.

## Projektstruktur

```
/
├── app/
│   ├── (site)/             # Öffentliche Website (Header + Footer)
│   │   ├── layout.tsx      # Site-Layout
│   │   ├── components/     # Header, Footer, SectionWrapper, MobileDrawer
│   │   └── [routes]/       # Seiten: /, /produkt, /ratgeber, /ueber-uns, etc.
│   ├── (studio)/           # Sanity Studio (kein Header/Footer)
│   │   └── studio/[[...index]]/
│   ├── layout.tsx          # Root Layout (Fonts, Metadata)
│   └── globals.css         # Tailwind-Directives + Base Styles
├── lib/
│   └── sanity/
│       ├── client.ts       # Sanity Read-Client (CDN, kein Token)
│       ├── writeClient.ts  # Sanity Write-Client (nur Server Actions)
│       ├── queries.ts      # GROQ-Queries (mit Draft-Filter)
│       ├── image.ts        # imageUrlBuilder
│       └── types.ts        # TypeScript-Typen für Sanity-Schemas
├── sanity/
│   ├── schemaTypes/        # Schema-Definitionen (8 Typen)
│   └── structure.ts        # Structure Builder (Singletons)
├── sanity.config.ts        # Sanity Studio-Konfiguration
├── middleware.ts            # Basic Auth für /studio
├── tailwind.config.ts      # Design-Tokens (Farben, Schriften)
├── .env.example            # Umgebungsvariablen-Dokumentation
├── vercel.json             # Preview-Noindex-Header
└── README.md               # Diese Datei
```

## Verfügbare Skripte

| Skript | Beschreibung |
|--------|-------------|
| `npm run dev` | Entwicklungsserver starten (http://localhost:3000) |
| `npm run build` | Produktions-Build erstellen |
| `npm run start` | Produktions-Build starten |
| `npm run lint` | ESLint ausführen |
