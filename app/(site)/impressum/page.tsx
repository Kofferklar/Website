import type { Metadata } from 'next'
import LegalLayout from '../components/LegalLayout'

export const metadata: Metadata = {
  title: 'Impressum | KofferKlar',
  description: 'Rechtliche Informationen und Kontaktangaben von KofferKlar.',
  robots: { index: false },
}

/**
 * Impressum Page (Phase 4)
 * Legal information about the service provider.
 */
export default function ImpressumPage() {
  return (
    <LegalLayout 
      title="Impressum"
      subtitle="Gesetzliche Anbieterkennung für KofferKlar."
    >
      <h2>Angaben gemäß § 5 TMG</h2>
      <p>
        Yasar Heidt<br />
        Doggenriedstraße 12<br />
        88250 Weingarten<br />
        Deutschland
      </p>

      <h2>Kontakt</h2>
      <p>
        E-Mail: info@kofferklar.de<br />
        Internet: www.kofferklar.de
      </p>

      <h2>Umsatzsteuer-ID</h2>
      <p>
        Als Kleinunternehmer im Sinne von § 19 Abs. 1 UStG wird keine Umsatzsteuer berechnet.
      </p>

      <h2>Redaktionell verantwortlich</h2>
      <p>
        Yasar Heidt<br />
        Doggenriedstraße 12<br />
        88250 Weingarten
      </p>

      <h2>EU-Streitschlichtung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
        <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer"> https://ec.europa.eu/consumers/odr/</a>.
        Unsere E-Mail-Adresse finden Sie oben im Impressum.
      </p>

      <h2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
      <p>
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>
    </LegalLayout>
  )
}
