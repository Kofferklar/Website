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
  await client.createOrReplace({
    _id: 'product',
    _type: 'product',
    name: 'KofferKlar Kompressions-Packwürfel-Set (8-teilig)',
    slug: { _type: 'slug', current: 'kofferklar-packwuerfel-set' },
    price: 39.99,
    buyLink: 'https://amazon.de',
    shortDescription:
      'Das 8-teilige Kompressions-Packwürfel-Set — packst du klüger, reist du leichter. Wasserabweisendes Polyester, YKK-Reißverschlüsse, bis zu 30% mehr Platz im Koffer.',
    material:
      'Außenmaterial: 100% Polyester (wasserabweisend). Reißverschluss: YKK-Qualitätsreißverschluss.',
    description: [
      block('Warum KofferKlar?', 'h2'),
      block('Wer kennt das nicht: Der Koffer ist voll gepackt, doch beim Öffnen sucht man ewig nach dem richtigen T-Shirt. Mit dem KofferKlar Kompressions-Packwürfel-Set gehört das der Vergangenheit an.'),
      block('8 Teile, System statt Chaos', 'h2'),
      block('Das Set umfasst Packwürfel in 4 Größen (XL, L, M, S), einen Schuhbeutel, Kulturbeutel und Wäschebeutel. Jedes Teil hat seinen festen Platz — im Koffer wie in deinem Reiseritual.'),
      block('Kompressionstechnologie', 'h2'),
      block('Der doppelte Reißverschluss komprimiert Kleidung auf bis zu 60% des Originalvolumens. Mehr Kleidung, weniger Gepäck — ideal für Flugreisen mit strengen Gewichtslimits.'),
      block('Material & Qualität', 'h2'),
      block('Außenmaterial: 420D wasserabweisendes Polyester. Reißverschlüsse: YKK-Qualität — kein Haken, kein Klemmen. Alle Nähte doppelt verstärkt für langanhaltende Reisebegleiter.'),
    ],
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
    colorVariants: [
      { _key: 'color-navy',  colorName: 'Navy',  colorHex: '#1E3A5F', inStock: true },
      { _key: 'color-olive', colorName: 'Olive', colorHex: '#4A5240', inStock: true },
      { _key: 'color-stone', colorName: 'Stone', colorHex: '#C4B5A0', inStock: true },
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

  // 4. reviews (47 documents)
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
    {
      _id: 'review-001',
      _type: 'review',
      reviewerName: 'Anna L.',
      rating: 5,
      body: 'Ich bin absolut begeistert! Nach Jahren mit chaotischen Koffern endlich eine Lösung. Die Kompressionsfunktion ist der Wahnsinn — alles passt auf einmal rein.',
      publishedAt: '2025-04-02',
      verified: true,
    },
    {
      _id: 'review-002',
      _type: 'review',
      reviewerName: 'Markus B.',
      rating: 5,
      body: 'Perfekt für Geschäftsreisen. Der Anzug bleibt knitterfrei, die Hemden ordentlich sortiert. Kaufe nicht mehr ohne diese Würfel.',
      publishedAt: '2025-03-28',
      verified: true,
    },
    {
      _id: 'review-003',
      _type: 'review',
      reviewerName: 'Lena H.',
      rating: 5,
      body: 'Habe das Set als Geschenk bekommen und sofort nachbestellt für meine Schwester. Qualität ist erste Sahne.',
      publishedAt: '2025-03-10',
      verified: true,
    },
    {
      _id: 'review-004',
      _type: 'review',
      reviewerName: 'Stefan W.',
      rating: 4,
      body: 'Sehr gute Packwürfel. Nur den kleinsten hätte ich gern etwas stabiler. Ansonsten top — würde sie jederzeit wieder kaufen.',
      publishedAt: '2025-02-14',
      verified: true,
    },
    {
      _id: 'review-005',
      _type: 'review',
      reviewerName: 'Maria G.',
      rating: 5,
      body: 'Ich reise 3-4 Mal im Jahr und diese Packwürfel sind meine beste Reiseinvestition. Der Koffer sieht immer ordentlich aus.',
      publishedAt: '2025-01-25',
      verified: true,
    },
    {
      _id: 'review-006',
      _type: 'review',
      reviewerName: 'Klaus F.',
      rating: 5,
      body: 'Endlich kein Wühlen mehr im Koffer. Alles hat seinen festen Platz. Die ganze Familie ist inzwischen begeistert.',
      publishedAt: '2024-12-20',
      verified: true,
    },
    {
      _id: 'review-007',
      _type: 'review',
      reviewerName: 'Laura S.',
      rating: 5,
      body: 'Super Verarbeitung und die Reißverschlüsse gleiten perfekt. Habe schon fünf Reisen damit gemacht — kein einziger Defekt.',
      publishedAt: '2024-12-05',
      verified: true,
    },
    {
      _id: 'review-008',
      _type: 'review',
      reviewerName: 'Jonas M.',
      rating: 5,
      body: 'Als Backpacker schätze ich Packeffizienz sehr. Diese Würfel sind eine Klasse für sich. Sehr zu empfehlen.',
      publishedAt: '2024-11-18',
      verified: true,
    },
    {
      _id: 'review-009',
      _type: 'review',
      reviewerName: 'Petra N.',
      rating: 4,
      body: 'Tolles Produkt. Ich würde mir wünschen, dass die Farben etwas kräftiger wären, aber die Funktion ist tadellos.',
      publishedAt: '2024-11-03',
      verified: true,
    },
    {
      _id: 'review-010',
      _type: 'review',
      reviewerName: 'Felix K.',
      rating: 5,
      body: 'Die Kompressionsfunktion hält, was sie verspricht. Ich passe jetzt deutlich mehr in meinen Handgepäck-Trolley — das ist unbezahlbar.',
      publishedAt: '2024-10-22',
      verified: true,
    },
    {
      _id: 'review-011',
      _type: 'review',
      reviewerName: 'Sandra B.',
      rating: 5,
      body: 'Wir reisen als Familie mit vier Personen. Pro Person ein Set — Koffer-Chaos gehört der Vergangenheit an!',
      publishedAt: '2024-10-08',
      verified: true,
    },
    {
      _id: 'review-012',
      _type: 'review',
      reviewerName: 'Michael R.',
      rating: 5,
      body: 'Hochwertig, langlebig, praktisch. Was will man mehr? Schon auf der dritten Reise im Einsatz und noch wie neu.',
      publishedAt: '2024-09-27',
      verified: true,
    },
    {
      _id: 'review-013',
      _type: 'review',
      reviewerName: 'Christine L.',
      rating: 5,
      body: 'Der Kulturbeutel allein ist schon sein Geld wert. Hält alles sicher und ist leicht zu verstauen.',
      publishedAt: '2024-09-14',
      verified: true,
    },
    {
      _id: 'review-014',
      _type: 'review',
      reviewerName: 'Robert Z.',
      rating: 5,
      body: 'Ich bin Vielreisender und habe viele Packwürfel ausprobiert. Diese hier sind mit Abstand die besten.',
      publishedAt: '2024-08-30',
      verified: true,
    },
    {
      _id: 'review-015',
      _type: 'review',
      reviewerName: 'Nicola E.',
      rating: 4,
      body: 'Sehr zufrieden. Ein Würfel war anfangs etwas schwer zu schließen, hat sich aber nach kurzer Eingewöhnung gegeben.',
      publishedAt: '2024-08-15',
      verified: false,
    },
    {
      _id: 'review-016',
      _type: 'review',
      reviewerName: 'Andreas T.',
      rating: 5,
      body: 'Schnelle Lieferung, perfekte Verpackung und ein noch besseres Produkt. Klare Kaufempfehlung!',
      publishedAt: '2024-08-01',
      verified: true,
    },
    {
      _id: 'review-017',
      _type: 'review',
      reviewerName: 'Hannah P.',
      rating: 5,
      body: 'Habe den ganzen Sommerurlaub damit organisiert. Nie wieder ohne. Die Kinder finden ihre Sachen jetzt selbst.',
      publishedAt: '2024-07-20',
      verified: true,
    },
    {
      _id: 'review-018',
      _type: 'review',
      reviewerName: 'Tobias G.',
      rating: 5,
      body: 'Kompressionswürfel funktionieren wirklich! Ich konnte den Urlaub mit nur einem Koffer statt zwei bestreiten.',
      publishedAt: '2024-07-10',
      verified: true,
    },
    {
      _id: 'review-019',
      _type: 'review',
      reviewerName: 'Monika S.',
      rating: 5,
      body: 'Endlich mal ein Produkt, das hält was es verspricht. Der Stoff fühlt sich hochwertig an und die Nähte sind sauber verarbeitet.',
      publishedAt: '2024-06-25',
      verified: true,
    },
    {
      _id: 'review-020',
      _type: 'review',
      reviewerName: 'Erik J.',
      rating: 5,
      body: 'Perfekt für meine Motorradreisen. Alles kompakt verstaut und trotzdem schnell zugänglich.',
      publishedAt: '2024-06-12',
      verified: true,
    },
    {
      _id: 'review-021',
      _type: 'review',
      reviewerName: 'Katharina N.',
      rating: 5,
      body: 'Benutze die Packwürfel jetzt täglich als Organisationssystem — sogar zu Hause in der Schublade! Vielseitiger als gedacht.',
      publishedAt: '2025-04-10',
      verified: true,
    },
    {
      _id: 'review-022',
      _type: 'review',
      reviewerName: 'Dieter B.',
      rating: 3,
      body: 'Ganz okay, aber ich hatte mehr Kompressionswirkung erwartet. Für den Preis ein solides Produkt.',
      publishedAt: '2025-01-05',
      verified: false,
    },
    {
      _id: 'review-023',
      _type: 'review',
      reviewerName: 'Claudia M.',
      rating: 5,
      body: 'Meine Freundin hat sie mir empfohlen und ich bin so dankbar. Der Schuhbeutel ist besonders praktisch.',
      publishedAt: '2024-12-28',
      verified: true,
    },
    {
      _id: 'review-024',
      _type: 'review',
      reviewerName: 'Patrick H.',
      rating: 5,
      body: 'Als Fotograf reise ich viel und brauche Ordnung. Diese Würfel halten alles sortiert und schützen empfindliche Kleidung perfekt.',
      publishedAt: '2024-11-30',
      verified: true,
    },
    {
      _id: 'review-025',
      _type: 'review',
      reviewerName: 'Birgit K.',
      rating: 5,
      body: 'Tolles Preis-Leistungs-Verhältnis. Die Verarbeitung ist auf dem Niveau von deutlich teureren Marken.',
      publishedAt: '2024-11-12',
      verified: true,
    },
    {
      _id: 'review-026',
      _type: 'review',
      reviewerName: 'Florian D.',
      rating: 5,
      body: 'Ich packe nie wieder ohne diese Würfel. Der Unterschied zum normalen Einwerfen ist einfach unglaublich.',
      publishedAt: '2024-10-15',
      verified: true,
    },
    {
      _id: 'review-027',
      _type: 'review',
      reviewerName: 'Susi R.',
      rating: 4,
      body: 'Sehr gute Qualität, liebe die verschiedenen Größen. Wäre perfekt wenn die großen Würfel noch etwas mehr komprimieren würden.',
      publishedAt: '2024-09-20',
      verified: false,
    },
    {
      _id: 'review-028',
      _type: 'review',
      reviewerName: 'Werner A.',
      rating: 5,
      body: 'Meine Frau hat sie mir geschenkt. Jetzt sind wir beide total begeistert und haben uns zwei Sets geholt.',
      publishedAt: '2024-09-05',
      verified: true,
    },
    {
      _id: 'review-029',
      _type: 'review',
      reviewerName: 'Jana V.',
      rating: 5,
      body: 'Habe schon viele Packwürfel probiert — diese sind die langlebigsten. Nach einem Jahr intensiver Nutzung immer noch wie neu.',
      publishedAt: '2024-08-22',
      verified: true,
    },
    {
      _id: 'review-030',
      _type: 'review',
      reviewerName: 'Tim O.',
      rating: 5,
      body: 'Die Qualität der Reißverschlüsse ist wirklich bemerkenswert. Kein Haken, kein Klemmen — gleiten jedes Mal perfekt.',
      publishedAt: '2024-08-08',
      verified: true,
    },
    {
      _id: 'review-031',
      _type: 'review',
      reviewerName: 'Ingrid C.',
      rating: 5,
      body: 'Als Seniorin schätze ich die einfache Handhabung sehr. Alles ist intuitiv und die Größen sind gut durchdacht.',
      publishedAt: '2024-07-28',
      verified: true,
    },
    {
      _id: 'review-032',
      _type: 'review',
      reviewerName: 'Max S.',
      rating: 5,
      body: 'Der Wäschebeutel ist mein Favorit. Schmutzwäsche ordentlich getrennt vom Rest — genial simpel.',
      publishedAt: '2024-07-15',
      verified: true,
    },
    {
      _id: 'review-033',
      _type: 'review',
      reviewerName: 'Franziska L.',
      rating: 4,
      body: 'Sehr schönes Design und gute Qualität. Ich hätte mir mehr Farboptionen gewünscht, aber insgesamt sehr zufrieden.',
      publishedAt: '2024-06-30',
      verified: true,
    },
    {
      _id: 'review-034',
      _type: 'review',
      reviewerName: 'Christian B.',
      rating: 5,
      body: 'Ich nutze die Packwürfel auch für Tagesausflüge und Sport. Super vielseitig einsetzbar und leicht.',
      publishedAt: '2025-02-08',
      verified: true,
    },
    {
      _id: 'review-035',
      _type: 'review',
      reviewerName: 'Sylvia K.',
      rating: 5,
      body: 'Habe sie mehrfach gewaschen und die Würfel halten bombenfest. Kein Aufreißen oder Dehnen nach vielen Wäschen.',
      publishedAt: '2025-01-18',
      verified: true,
    },
    {
      _id: 'review-036',
      _type: 'review',
      reviewerName: 'Oliver M.',
      rating: 5,
      body: 'Mit diesen Würfeln bin ich von 20 kg auf 15 kg Gepäck gekommen — das spare ich mir jetzt bei jedem Flug!',
      publishedAt: '2024-12-12',
      verified: true,
    },
    {
      _id: 'review-037',
      _type: 'review',
      reviewerName: 'Renate F.',
      rating: 5,
      body: 'Endlich kein Knitter-Chaos mehr beim Ankommen im Hotel. Die Hemden bleiben erstaunlich ordentlich.',
      publishedAt: '2024-11-25',
      verified: true,
    },
    {
      _id: 'review-038',
      _type: 'review',
      reviewerName: 'Lukas W.',
      rating: 5,
      body: 'Der Kulturbeutel hat genau die richtigen Proportionen. Alles passt rein und es quillt nicht über.',
      publishedAt: '2024-10-30',
      verified: true,
    },
    {
      _id: 'review-039',
      _type: 'review',
      reviewerName: 'Miriam G.',
      rating: 5,
      body: 'Absolut empfehlenswert! Ich habe das Set bereits zweimal als Geschenk für reisefreudige Freunde gekauft.',
      publishedAt: '2024-10-05',
      verified: true,
    },
    {
      _id: 'review-040',
      _type: 'review',
      reviewerName: 'Bernd H.',
      rating: 5,
      body: 'Solide Qualität und top Kompressionseffekt. Versand war sehr schnell, Produkt gut verpackt. Gerne wieder!',
      publishedAt: '2024-09-18',
      verified: true,
    },
    {
      _id: 'review-041',
      _type: 'review',
      reviewerName: 'Tanja P.',
      rating: 5,
      body: 'Nach der ersten Reise damit weiß ich: Das ist das beste Reiseaccessoire, das ich je gekauft habe.',
      publishedAt: '2024-08-25',
      verified: true,
    },
    {
      _id: 'review-042',
      _type: 'review',
      reviewerName: 'Christoph N.',
      rating: 5,
      body: 'Perfekt für Langstreckenflüge. Alles sortiert und zugänglich ohne den Koffer durchwühlen zu müssen.',
      publishedAt: '2024-08-10',
      verified: true,
    },
    {
      _id: 'review-043',
      _type: 'review',
      reviewerName: 'Ute B.',
      rating: 5,
      body: 'Mein Mann war skeptisch, jetzt will er ein eigenes Set. Die Qualität hat uns beide überzeugt.',
      publishedAt: '2024-07-22',
      verified: true,
    },
    {
      _id: 'review-044',
      _type: 'review',
      reviewerName: 'Dominik S.',
      rating: 5,
      body: 'Sehr empfehlenswert! Ich hatte einen langen Pilgerweg vor mir — diese Würfel haben mir dabei wirklich geholfen alles im Griff zu behalten.',
      publishedAt: '2024-07-05',
      verified: false,
    },
    {
      _id: 'review-045',
      _type: 'review',
      reviewerName: 'Karin W.',
      rating: 5,
      body: 'Einfach genial. Packen macht jetzt sogar Spaß. Die verschiedenen Größen sind perfekt aufeinander abgestimmt.',
      publishedAt: '2026-01-14',
      verified: true,
    },
    {
      _id: 'review-046',
      _type: 'review',
      reviewerName: 'Sebastian F.',
      rating: 5,
      body: 'Habe drei verschiedene Marken getestet — KofferKlar ist klar der Sieger. Reißverschlüsse, Stoff, Kompressionswirkung: alles top.',
      publishedAt: '2026-02-28',
      verified: true,
    },
    {
      _id: 'review-047',
      _type: 'review',
      reviewerName: 'Lisa M.',
      rating: 5,
      body: 'Als Flugbegleiterin lebe ich aus dem Koffer. Diese Packwürfel sind seit einem halben Jahr mein treuer Begleiter.',
      publishedAt: '2026-03-10',
      verified: true,
    },
  ]
  for (const review of reviews) {
    await client.createIfNotExists(review)
  }
  console.log('✓ reviews (47)')

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
