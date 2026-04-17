import type { Metadata } from 'next'
import LegalLayout from '../components/LegalLayout'

export const metadata: Metadata = {
  title: 'AGB | Allgemeine Geschäftsbedingungen KofferKlar',
  description: 'Unsere Allgemeinen Geschäftsbedingungen für Bestellungen bei KofferKlar.',
  robots: { index: false },
}

/**
 * AGB Page (Phase 4)
 * General Terms and Conditions.
 */
export default function AgbPage() {
  return (
    <LegalLayout 
      title="AGB"
      subtitle="Allgemeine Geschäftsbedingungen für Ihren Einkauf."
    >
      <h2>1. Geltungsbereich</h2>
      <p>
        Für alle Bestellungen über unseren Online-Shop gelten die nachfolgenden AGB. Unser Shop richtet sich ausschließlich an Verbraucher.
      </p>

      <h2>2. Vertragspartner, Vertragsschluss</h2>
      <p>
        Der Kaufvertrag kommt zustande mit Yasar Heidt. Die Darstellung der Produkte im Online-Shop stellt kein rechtlich bindendes Angebot, sondern einen unverbindlichen Online-Katalog dar.
      </p>

      <h2>3. Vertragssprache, Vertragstextspeicherung</h2>
      <p>
        Die für den Vertragsschluss zur Verfügung stehende Sprache ist Deutsch. Wir speichern den Vertragstext und senden Ihnen die Bestelldaten und unsere AGB per E-Mail zu.
      </p>

      <h2>4. Lieferbedingungen</h2>
      <p>
        Zusätzlich zu den angegebenen Produktpreisen kommen noch Versandkosten hinzu, sofern nicht anders angegeben. Wir liefern nur im Versandweg. Eine Selbstabholung der Ware ist leider nicht möglich.
      </p>

      <h2>5. Bezahlung</h2>
      <p>
        In unserem Shop stehen Ihnen grundsätzlich die Zahlungsarten PayPal, Klarna, Kreditkarte und Sofortüberweisung zur Verfügung.
      </p>

      <h2>6. Eigentumsvorbehalt</h2>
      <p>
        Die Ware bleibt bis zur vollständigen Bezahlung unser Eigentum.
      </p>
    </LegalLayout>
  )
}
