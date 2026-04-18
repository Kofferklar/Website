// KofferKlar Seed Script
// Run: npm run seed
// Requires: SANITY_WRITE_TOKEN in .env.local
// Idempotent: safe to run multiple times

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ax21j038',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-03-04',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})

function block(text: string, style = 'normal') {
  return {
    _type: 'block',
    _key: Math.random().toString(36).slice(2),
    style,
    children: [{ _type: 'span', _key: Math.random().toString(36).slice(2), text, marks: [] }],
    markDefs: [],
  }
}

async function seed() {
  console.log('🌱 Starting KofferKlar seed...\n')

  // 1. siteSettings (singleton)
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteName: 'KofferKlar',
    phone: '+49 (0) 123 456789',
    email: 'hallo@kofferklar.de',
    socialLinks: {
      instagram: 'https://instagram.com/kofferklar',
      facebook: 'https://facebook.com/kofferklar',
    },
    seo: {
      title: 'KofferKlar | Ordnung im Koffer — 8-teiliges Kompressions-Packwürfel-Set',
      description: 'Entdecke das 8-teilige Kompressions-Packwürfel-Set von KofferKlar. Spare bis zu 60% Platz im Koffer und reise stressfrei und organisiert.',
    },
  })
  console.log('✓ siteSettings')

  // 2. product (singleton)
  await client.createIfNotExists({
    _id: 'product',
    _type: 'product',
    name: 'KofferKlar Kompressions-Packwürfel-Set (8-teilig)',
    slug: { _type: 'slug', current: 'kofferklar-packwuerfel-set' },
    price: 39.99,
    buyLink: 'https://amazon.de',
    shortDescription:
      'Das 8-teilige Kompressions-Packwürfel-Set für ordentliches und platzsparendes Reisen.',
    material:
      'Außenmaterial: 100% Polyester (wasserabweisend). Reißverschluss: YKK-Qualitätsreißverschluss.',
    setParts: [
      { _key: 'part-xl', partName: 'Packwürfel XL', dimensions: '35 × 25 × 8 cm' },
      { _key: 'part-l', partName: 'Packwürfel L', dimensions: '30 × 22 × 8 cm' },
      { _key: 'part-m', partName: 'Packwürfel M', dimensions: '25 × 18 × 8 cm' },
      { _key: 'part-s1', partName: 'Packwürfel S (1)', dimensions: '20 × 14 × 8 cm' },
      { _key: 'part-s2', partName: 'Packwürfel S (2)', dimensions: '20 × 14 × 8 cm' },
      { _key: 'part-shoe', partName: 'Schuhbeutel', dimensions: '30 × 20 × 10 cm' },
      { _key: 'part-toilet', partName: 'Kulturbeutel', dimensions: '25 × 15 × 10 cm' },
      { _key: 'part-laundry', partName: 'Wäschebeutel', dimensions: '40 × 30 cm' },
    ],
  })
  console.log('✓ product')

  // 3. banner (singleton)
  await client.createIfNotExists({
    _id: 'banner',
    _type: 'banner',
    text: '10% Rabatt auf Ihre erste Bestellung mit Code KLAR10',
    discountCode: 'KLAR10',
    isActive: false,
  })
  console.log('✓ banner')

  // 4. reviews (3 documents)
  const reviews = [
    {
      _id: 'review-sabine',
      _type: 'review',
      reviewerName: 'Sabine M.',
      rating: 5,
      body: 'Endlich Ordnung im Koffer! Die Packwürfel sind super verarbeitet und haben meinen Koffer komplett transformiert.',
      publishedAt: '2025-03-15',
      verified: true,
    },
    {
      _id: 'review-thomas',
      _type: 'review',
      reviewerName: 'Thomas K.',
      rating: 5,
      body: 'Qualitativ hochwertig und sehr praktisch. Ich nehme sie auf jede Reise mit.',
      publishedAt: '2025-02-20',
      verified: true,
    },
    {
      _id: 'review-julia',
      _type: 'review',
      reviewerName: 'Julia R.',
      rating: 4,
      body: 'Tolle Idee und gute Ausführung. Der Reißverschluss ist sehr stabil.',
      publishedAt: '2025-01-10',
      verified: false,
    },
  ]
  for (const review of reviews) {
    await client.createIfNotExists(review)
  }
  console.log('✓ reviews (3)')

  // 5. faqItems (5 documents)
  const faqs = [
    {
      _id: 'faq-material',
      _type: 'faqItem',
      question: 'Aus welchem Material sind die Packwürfel?',
      answer:
        'Die Packwürfel bestehen aus wasserabweisendem 100% Polyester mit hochwertigen YKK-Reißverschlüssen.',
      category: 'Produkt',
    },
    {
      _id: 'faq-groessen',
      _type: 'faqItem',
      question: 'Wie groß sind die einzelnen Packwürfel?',
      answer:
        'Das Set enthält 8 Teile: Packwürfel XL (35×25×8 cm), L (30×22×8 cm), M (25×18×8 cm), zwei S (20×14×8 cm), Schuhbeutel (30×20×10 cm), Kulturbeutel (25×15×10 cm) und Wäschebeutel (40×30 cm).',
      category: 'Produkt',
    },
    {
      _id: 'faq-lieferung',
      _type: 'faqItem',
      question: 'Wie lange dauert die Lieferung?',
      answer:
        'Wir liefern innerhalb von 2–4 Werktagen. Bei Bestellungen über 39€ ist der Versand kostenlos.',
      category: 'Lieferung',
    },
    {
      _id: 'faq-rueckgabe',
      _type: 'faqItem',
      question: 'Kann ich den Kauf zurückgeben?',
      answer:
        'Ja, Sie haben 14 Tage Widerrufsrecht ab Erhalt der Ware. Bitte kontaktieren Sie uns per E-Mail.',
      category: 'Rückgabe',
    },
    {
      _id: 'faq-passform',
      _type: 'faqItem',
      question: 'Passen die Packwürfel in jeden Koffer?',
      answer:
        'Ja! Die Packwürfel sind so konzipiert, dass sie in alle gängigen Koffer und Trolleys passen. Das Kompressionsdesign spart bis zu 30% Platz.',
      category: 'Produkt',
    },
  ]
  for (const faq of faqs) {
    await client.createOrReplace(faq)
  }
  console.log('✓ faqItems (5)')

  // 6. posts (4 documents with body content)
  const posts = [
    {
      _id: 'post-reise-tipps',
      _type: 'post',
      title: 'Die 5 besten Tipps für stressfreies Reisen',
      slug: { _type: 'slug', current: 'stressfreies-reisen-tipps' },
      author: 'KofferKlar Team',
      publishedAt: '2025-04-01',
      seo: {
        title: 'Die 5 besten Tipps für stressfreies Reisen | KofferKlar',
        description: 'Mit diesen 5 Tipps packst du effizienter, reist entspannter und kommst nie wieder mit einem überladenen Koffer an.',
      },
      body: [
        block('Reisen ist wunderbar — aber die Vorbereitung kann stressig sein. Mit den richtigen Strategien packst du effizienter und reist entspannter.'),
        block('1. Nutze Packwürfel', 'h2'),
        block('Packwürfel trennen Kleidung nach Kategorie und komprimieren sie gleichzeitig. Du findest alles auf den ersten Blick — kein Wühlen mehr.'),
        block('2. Rolle statt falten', 'h2'),
        block('Aufgerollte Kleidung spart bis zu 20% mehr Platz als gefaltete. Kombiniert mit Kompressions-Packwürfeln erreichst du maximale Raumnutzung.'),
        block('3. Schweres nach unten', 'h2'),
        block('Schuhe und schwere Gegenstände gehören an die Kofferrückseite (zum Rollen). So liegt der Schwerpunkt ideal und der Koffer kippt nicht.'),
        block('4. Flüssigkeiten zuletzt', 'h2'),
        block('Kulturbeutel immer oben und zugänglich platzieren — so musst du beim Sicherheitscheck nicht alles rausnehmen.'),
        block('5. Kleidung für mehrere Looks wählen', 'h2'),
        block('Neutrale Basics, die sich kombinieren lassen, sparen Gewicht und Platz. Eine Hose, drei Outfits — das Prinzip der Capsule Wardrobe fürs Reisen.'),
      ],
    },
    {
      _id: 'post-handgepaeck-guide',
      _type: 'post',
      title: 'Handgepäck-Guide: So packst du für eine Woche ins Handgepäck',
      slug: { _type: 'slug', current: 'handgepaeck-guide-eine-woche' },
      author: 'KofferKlar Team',
      publishedAt: '2025-03-15',
      seo: {
        title: 'Handgepäck-Guide: Eine Woche im Handgepäck | KofferKlar',
        description: 'So packst du für eine ganze Woche ins Handgepäck — mit der richtigen Technik und Kompressions-Packwürfeln kein Problem.',
      },
      body: [
        block('Nur Handgepäck für eine ganze Woche — das klingt unmöglich, ist aber mit der richtigen Technik absolut machbar. Wir zeigen wie.'),
        block('Die richtige Tasche wählen', 'h2'),
        block('Ein Rucksack oder Trolley mit maximal 55×40×20 cm passt bei den meisten Fluggesellschaften als Handgepäck. Wichtig: Vorab die Maße der Airline prüfen.'),
        block('Was kommt rein?', 'h2'),
        block('7 Unterwäsche, 5 T-Shirts, 2 Hosen, 1 leichte Jacke, 1 Paar Freizeitschuhe (an den Füßen), Kulturbeutel (100ml-Regel), Ladekabel, Reisedokumente.'),
        block('Der Trick mit den Packwürfeln', 'h2'),
        block('Mit Kompressions-Packwürfeln komprimierst du Kleidung auf etwa die Hälfte des Volumens. Was ohne Würfel 60 Liter braucht, passt plötzlich in 35 Liter.'),
        block('Kleidung strategisch wählen', 'h2'),
        block('Merino-Wolle ist geruchsresistent und mehrfach tragbar ohne Waschen. Synthetische Sportbekleidung trocknet schnell nach dem Handwäsche. Beides spart Kleidungsmenge.'),
      ],
    },
    {
      _id: 'post-packwuerfel-vergleich',
      _type: 'post',
      title: 'Packwürfel im Vergleich: Worauf du beim Kauf achten solltest',
      slug: { _type: 'slug', current: 'packwuerfel-vergleich-kaufratgeber' },
      author: 'KofferKlar Team',
      publishedAt: '2025-02-20',
      seo: {
        title: 'Packwürfel Kaufratgeber: Worauf du achten solltest | KofferKlar',
        description: 'Material, Reißverschlüsse, Kompressionsfunktion — wir erklären, was gute Packwürfel ausmacht und worauf du beim Kauf achten solltest.',
      },
      body: [
        block('Nicht alle Packwürfel sind gleich. Wir erklären, welche Merkmale wirklich wichtig sind — und welche nur auf dem Papier gut klingen.'),
        block('Material: Qualität zählt', 'h2'),
        block('Hochwertiges Polyester (mindestens 210D, besser 420D) ist reißfest, wasserabweisend und leicht. Billiges Material reißt nach wenigen Reisen.'),
        block('Reißverschlüsse: Der unterschätzte Faktor', 'h2'),
        block('YKK-Reißverschlüsse gelten als Goldstandard. Sie öffnen und schließen auch unter Druck reibungslos — wichtig, wenn der Würfel vollgepackt ist.'),
        block('Kompressionsfunktion: Ja oder Nein?', 'h2'),
        block('Kompressions-Packwürfel haben eine Doppelkammer-Konstruktion mit zweitem Reißverschluss. Sie verdichten Kleidung auf etwa 60% des Normalvolumens — ideal für Flugreisen.'),
        block('Sets vs. Einzeln kaufen', 'h2'),
        block('Ein Set bietet aufeinander abgestimmte Größen zu besserem Preis-Leistungs-Verhältnis. Einzelkäufe lohnen sich nur, wenn du gezielt eine Größe ergänzen möchtest.'),
        block('Unser Fazit', 'h2'),
        block('Das KofferKlar 8-teilige Set vereint alle genannten Qualitätsmerkmale: 420D Polyester, YKK-Reißverschlüsse, Kompressionsfunktion und optimierte Größenabstufung.'),
      ],
    },
    {
      _id: 'post-reiseziele-2025',
      _type: 'post',
      title: 'Die 7 schönsten Reiseziele 2025 für Städtereisen in Europa',
      slug: { _type: 'slug', current: 'reiseziele-2025-europa-staedtereisen' },
      author: 'KofferKlar Team',
      publishedAt: '2025-01-28',
      seo: {
        title: 'Die 7 schönsten Reiseziele 2025 in Europa | KofferKlar',
        description: 'Von Lissabon bis Tallinn — entdecke die sieben schönsten europäischen Reiseziele 2025 für deine nächste Städtereise.',
      },
      body: [
        block('Europa bietet 2025 so viele spannende Städtereiseziele wie nie zuvor. Wir haben die sieben schönsten für euch zusammengestellt.'),
        block('1. Lissabon, Portugal', 'h2'),
        block('Die Hauptstadt Portugals punktet mit mildem Klima, aufregender Küche und einer entspannten Atmosphäre. Ideal für 3–4 Tage.'),
        block('2. Ljubljana, Slowenien', 'h2'),
        block('Europas grüne Hauptstadt ist kompakt, charmant und noch fernab des Massentourismus. Die Altstadt lässt sich bequem zu Fuß erkunden.'),
        block('3. Tallinn, Estland', 'h2'),
        block('Die besterhaltene mittelalterliche Altstadt Nordeuropas, kombiniert mit einem lebendigen Start-up-Ökosystem und erschwinglichen Preisen.'),
        block('4. Valletta, Malta', 'h2'),
        block('Die kleinste EU-Hauptstadt überzeugt mit barocker Architektur, türkisem Meer und ganzjährig angenehmem Wetter.'),
        block('5. Brüssel, Belgien', 'h2'),
        block('Mehr als Europapolitik: Brüssel hat eine der lebendigsten Kunstszenen Europas, hervorragendes Bier und die weltbeste Schokolade.'),
        block('6. Porto, Portugal', 'h2'),
        block('Portos historische Altstadt (UNESCO-Welterbe), der berühmte Portwein und die Atlantikstrände machen die Stadt zu einem Geheimtipp.'),
        block('7. Skopje, Nordmazedonien', 'h2'),
        block('Noch kaum touristisch erschlossen, bietet Skopje außergewöhnliche Architektur, lebhafte Basare und sehr günstige Preise.'),
        block('Gut verpackt reist es sich besser', 'h2'),
        block('Egal wohin die Reise geht: Mit dem KofferKlar Packwürfel-Set hast du immer Ordnung im Gepäck und mehr Zeit für die schönen Dinge.'),
      ],
    },
  ]
  for (const post of posts) {
    await client.createOrReplace(post)
  }
  console.log('✓ posts (4)')

  // 7. pages (2 documents)
  const pages = [
    {
      _id: 'page-ueber-uns',
      _type: 'page',
      title: 'Über uns',
      slug: { _type: 'slug', current: 'ueber-uns' },
    },
    {
      _id: 'page-impressum',
      _type: 'page',
      title: 'Impressum',
      slug: { _type: 'slug', current: 'impressum' },
    },
  ]
  for (const page of pages) {
    await client.createIfNotExists(page)
  }
  console.log('✓ pages (2)')

  console.log('\n✓ Seed complete — 17 documents created/verified')
  console.log('Note: contactSubmission documents are write-only from the website — not seeded.')
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
