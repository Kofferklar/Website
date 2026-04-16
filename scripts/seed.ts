// KofferKlar Seed Script
// Run: npm run seed
// Requires: SANITY_WRITE_TOKEN in .env.local
// Idempotent: safe to run multiple times

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const client = createClient({
  projectId: 'ax21j038',
  dataset: 'production',
  apiVersion: '2025-03-04',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})

async function seed() {
  console.log('🌱 Starting KofferKlar seed...\n')

  // 1. siteSettings (singleton)
  await client.createIfNotExists({
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteName: 'KofferKlar',
    phone: '+49 (0) 123 456789',
    email: 'hallo@kofferklar.de',
    socialLinks: {
      instagram: 'https://instagram.com/kofferklar',
      facebook: 'https://facebook.com/kofferklar',
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
        'Das Set enthält 8 Packwürfel in verschiedenen Größen (XL, L, M, 2×S) sowie einen Schuhbeutel, Kulturbeutel und Wäschebeutel.',
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
    await client.createIfNotExists(faq)
  }
  console.log('✓ faqItems (5)')

  // 6. post (1 document)
  await client.createIfNotExists({
    _id: 'post-reise-tipps',
    _type: 'post',
    title: 'Die 5 besten Tipps für stressfreies Reisen',
    slug: { _type: 'slug', current: 'stressfreies-reisen-tipps' },
    author: 'KofferKlar Team',
    publishedAt: '2025-04-01',
  })
  console.log('✓ post (1)')

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

  console.log('\n✓ Seed complete — 14 documents created/verified')
  console.log('Note: contactSubmission documents are write-only from the website — not seeded.')
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
