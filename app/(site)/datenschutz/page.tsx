import type { Metadata } from 'next'
import LegalLayout from '../components/LegalLayout'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung | KofferKlar',
  description: 'Informationen zum Schutz Ihrer persönlichen Daten bei KofferKlar.',
  robots: { index: false },
}

/**
 * Datenschutz Page (Phase 4)
 * GDPR compliant privacy policy.
 */
export default function DatenschutzPage() {
  return (
    <LegalLayout 
      title="Datenschutz"
      subtitle="Ihre Privatsphäre ist unser höchstes Gut."
    >
      <h2>1. Datenschutz auf einen Blick</h2>
      <h3>Allgemeine Hinweise</h3>
      <p>
        Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
      </p>

      <h2>2. Hosting und Content Delivery Networks (CDN)</h2>
      <p>
        Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
      </p>
      <h3>Vercel</h3>
      <p>
        Anbieter ist die Vercel Inc., 440 N Barranca Ave #4133 Covina, CA 91723, USA. Details entnehmen Sie der Datenschutzerklärung von Vercel: 
        <a href="https://vercel.com/legal/privacy" target="_blank" rel="noopener noreferrer"> https://vercel.com/legal/privacy</a>.
      </p>

      <h2>3. Allgemeine Hinweise und Pflichtinformationen</h2>
      <h3>Verantwortliche Stelle</h3>
      <p>
        Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br />
        Yasar Heidt<br />
        Doggenriedstraße 12<br />
        88250 Weingarten<br />
        E-Mail: info@kofferklar.de
      </p>

      <h2>4. Datenerfassung auf dieser Website</h2>
      <h3>Sanity.io (Content Management System)</h3>
      <p>
        Wir nutzen Sanity.io zur Verwaltung und Bereitstellung unserer Website-Inhalte. Anbieter ist Sanity AS, Hausmanns gate 19, 0182 Oslo, Norwegen. Bei der Nutzung werden technisch notwendige Daten verarbeitet, um die Inhalte korrekt darzustellen.
      </p>
      <h3>Kontaktformular</h3>
      <p>
        Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter. Die Speicherung erfolgt innerhalb unserer Sanity-Infrastruktur.
      </p>

      <h2>5. Plugins und Tools</h2>
      <h3>Google Fonts</h3>
      <p>
        Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so genannte Google Fonts. Diese werden jedoch lokal auf unserem Server gehostet. Eine Verbindung zu Servern von Google findet dabei nicht statt.
      </p>

      <h2>6. Ihre Rechte</h2>
      <p>
        Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen.
      </p>
    </LegalLayout>
  )
}
