import type { Metadata } from 'next'
import LegalLayout from '../components/LegalLayout'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung | KofferKlar',
  description: 'Informationen zum Schutz Ihrer personenbezogenen Daten bei KofferKlar.',
  robots: { index: false },
}

/**
 * Datenschutz Page
 * DSGVO/GDPR-konforme Datenschutzerklärung mit Art. 13 Pflichtangaben.
 */
export default function DatenschutzPage() {
  return (
    <LegalLayout
      title="Datenschutzerklärung"
      subtitle="Wie wir mit Ihren personenbezogenen Daten umgehen. Transparent und verständlich."
    >
      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlich für die Verarbeitung personenbezogener Daten auf dieser Website im Sinne der
        Datenschutz-Grundverordnung (DSGVO) ist:
      </p>
      <p>
        Yasar Heidt<br />
        Doggenriedstraße 12<br />
        88250 Weingarten<br />
        Deutschland<br />
        E-Mail: info@kofferklar.de
      </p>

      <h2>2. Datenschutzbeauftragter</h2>
      <p>
        Wir sind gesetzlich nicht verpflichtet, einen Datenschutzbeauftragten zu benennen. Bei Fragen zum Datenschutz
        wenden Sie sich bitte direkt an den oben genannten Verantwortlichen.
      </p>

      <h2>3. Allgemeines zur Datenverarbeitung</h2>
      <p>
        Wir verarbeiten personenbezogene Daten unserer Nutzerinnen und Nutzer grundsätzlich nur, soweit dies zur
        Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte und Leistungen erforderlich ist. Die
        Verarbeitung erfolgt regelmäßig nur nach Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), zur Vertragserfüllung (Art.
        6 Abs. 1 lit. b DSGVO) oder auf Grundlage berechtigter Interessen (Art. 6 Abs. 1 lit. f DSGVO).
      </p>

      <h2>4. Server-Logfiles</h2>
      <p>
        Beim Aufruf unserer Website werden durch unseren Hosting-Anbieter automatisch Informationen erfasst, die Ihr
        Browser übermittelt. Dies sind:
      </p>
      <ul>
        <li>IP-Adresse (gekürzt bzw. nur kurzzeitig vollständig)</li>
        <li>Datum und Uhrzeit der Anfrage</li>
        <li>Zeitzonendifferenz zur Greenwich Mean Time (GMT)</li>
        <li>Inhalt der Anforderung (konkrete Seite)</li>
        <li>HTTP-Statuscode</li>
        <li>jeweils übertragene Datenmenge</li>
        <li>Website, von der die Anforderung kommt (Referrer)</li>
        <li>Browsertyp, Betriebssystem und dessen Oberfläche, Sprache und Version der Browsersoftware</li>
      </ul>
      <p>
        <strong>Zweck:</strong> Gewährleistung eines reibungslosen Verbindungsaufbaus, einer komfortablen Nutzung sowie
        der Auswertung der Systemsicherheit und -stabilität.<br />
        <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der technischen
        Bereitstellung und Sicherheit der Website).<br />
        <strong>Speicherdauer:</strong> in der Regel maximal 14 Tage, danach werden die Daten gelöscht oder durch
        Kürzung der IP-Adresse anonymisiert.
      </p>

      <h2>5. Hosting bei Vercel</h2>
      <p>
        Diese Website wird gehostet bei der Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA. Vercel
        verarbeitet hierbei technische Verbindungsdaten (insbesondere IP-Adresse, Zeitstempel, aufgerufene Inhalte) zur
        Auslieferung der Website und zur Abwehr von Angriffen.
      </p>
      <p>
        <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der zuverlässigen
        Bereitstellung der Website).<br />
        <strong>Drittlandtransfer:</strong> Eine Übermittlung in die USA findet statt. Vercel Inc. ist nach dem EU-US
        Data Privacy Framework (DPF) zertifiziert; die Übermittlung erfolgt damit auf Grundlage eines
        Angemessenheitsbeschlusses der EU-Kommission (Art. 45 DSGVO). Ergänzend hat sich Vercel auf
        Standardvertragsklauseln nach Art. 46 Abs. 2 lit. c DSGVO verpflichtet.<br />
        Weitere Informationen:{' '}
        <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
          https://vercel.com/legal/privacy-policy
        </a>
      </p>

      <h2>6. Content Management mit Sanity</h2>
      <p>
        Zur Verwaltung und Bereitstellung von Website-Inhalten nutzen wir das Headless-CMS der Sanity AS, Hausmanns gate
        19, 0182 Oslo, Norwegen. Sanity verarbeitet im Wesentlichen Inhaltsdaten unserer Website sowie technische
        Verbindungsdaten beim Abruf der Inhalte über die API.
      </p>
      <p>
        <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer effizienten
        Inhaltspflege).<br />
        <strong>Drittlandtransfer:</strong> Norwegen ist als EWR-Mitglied einem EU-Mitgliedstaat datenschutzrechtlich
        gleichgestellt. Ein Drittlandtransfer im Sinne der DSGVO findet nicht statt.<br />
        Weitere Informationen:{' '}
        <a href="https://www.sanity.io/legal/privacy" target="_blank" rel="noopener noreferrer">
          https://www.sanity.io/legal/privacy
        </a>
      </p>

      <h2>7. Kontaktformular und E-Mail-Kontakt</h2>
      <p>
        Wenn Sie uns über das Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular
        einschließlich der von Ihnen angegebenen Kontaktdaten (Name, E-Mail-Adresse, ggf. Telefonnummer, Inhalt Ihrer
        Nachricht) zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Gleiches
        gilt, wenn Sie uns direkt per E-Mail kontaktieren.
      </p>
      <p>
        Die technische Übermittlung des Formulars erfolgt über unseren Dienstleister Formspark (ein Service der Trampoline Software SRL,
        Rue de Marsannay-la-Côte 16, 5032 Gembloux, Belgien). Formspark verarbeitet und speichert die Daten auf Servern in
        Irland (Europäische Union). Eine Sicherungskopie wird zusätzlich in unserer Sanity-Instanz gespeichert.
      </p>
      <p>
        <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO bei vertragsbezogenen Anfragen, im Übrigen Art. 6
        Abs. 1 lit. f DSGVO (berechtigtes Interesse an der effektiven Bearbeitung von Anfragen).<br />
        <strong>Drittlandtransfer:</strong> Ein Drittlandtransfer im Sinne der DSGVO findet nicht statt, da der
        Dienstleister in Belgien ansässig ist und die Daten ausschließlich innerhalb der Europäischen Union (Irland)
        gespeichert und verarbeitet werden.<br />
        <strong>Speicherdauer:</strong> Wir speichern die Daten so lange, wie es zur Bearbeitung Ihrer Anfrage
        erforderlich ist. Anschließend werden die Daten gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten
        entgegenstehen (insbesondere handels- und steuerrechtliche Aufbewahrungsfristen von 6 bzw. 10 Jahren bei
        bestellbezogener Korrespondenz).
      </p>

      <h2>8. Newsletter</h2>
      <p>
        Sie können sich auf unserer Website für unseren Newsletter anmelden. Wir versenden den Newsletter ausschließlich
        nach dem Double-Opt-In-Verfahren: Nach Ihrer Anmeldung erhalten Sie eine E-Mail mit einem Bestätigungslink. Erst
        nach Anklicken dieses Links nehmen wir Sie in den Verteiler auf. Damit stellen wir sicher, dass die Anmeldung
        tatsächlich von Ihnen stammt.
      </p>
      <p>
        Die Anmeldung und der Versand des Newsletters werden technisch über unseren Dienstleister Formspark (ein Service der Trampoline
        Software SRL, Rue de Marsannay-la-Côte 16, 5032 Gembloux, Belgien) abgewickelt. Formspark verarbeitet und speichert die
        Daten auf Servern in Irland (Europäische Union).
      </p>
      <p>
        Verarbeitet werden Ihre E-Mail-Adresse sowie Bestätigungszeitpunkt und IP-Adresse zum Nachweis der Einwilligung.
        Sie können den Newsletter jederzeit über den Abmeldelink in jeder E-Mail oder durch eine formlose Nachricht an
        info@kofferklar.de wieder abbestellen.
      </p>
      <p>
        <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). Die Rechtmäßigkeit der bis zum
        Widerruf erfolgten Verarbeitung bleibt unberührt.<br />
        <strong>Speicherdauer:</strong> Bis zum Widerruf Ihrer Einwilligung. Die Nachweisdaten zur Einwilligung
        speichern wir bis zu drei Jahre nach Abmeldung, um uns gegen mögliche Ansprüche verteidigen zu können.
      </p>

      <h2>9. Bestellabwicklung</h2>
      <p>
        Bei einer Bestellung verarbeiten wir Ihre Bestandsdaten (Name, Anschrift, E-Mail-Adresse, ggf. Telefonnummer)
        sowie Vertrags- und Zahlungsdaten zur Vertragsabwicklung. Diese Daten geben wir nur weiter, soweit dies zur
        Vertragsdurchführung erforderlich ist (z.&nbsp;B. an Versanddienstleister und Zahlungsanbieter).
      </p>
      <p>
        <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).<br />
        <strong>Speicherdauer:</strong> Wir speichern Vertragsdaten bis zum Ablauf der gesetzlichen Aufbewahrungsfristen
        (in der Regel 10 Jahre nach Ende des Kalenderjahres des Vertragsschlusses, § 147 AO, § 257 HGB).
      </p>

      <h2>10. Keine Cookies & Warenkorb (localStorage)</h2>
      <p>
        Wir verzichten auf unserer Website vollständig auf den Einsatz von Cookies (weder eigene Cookies noch Cookies von
        Drittanbietern) sowie auf Tracking-, Analyse- oder Werbetechnologien.
      </p>
      <p>
        Wir speichern den Inhalt Ihres Warenkorbs ausschließlich lokal in Ihrem Browser (localStorage). Dabei werden
        keine Daten an unsere Server oder an Dritte übertragen. Die Speicherung ist technisch erforderlich, damit der
        Warenkorb auch nach einem Seitenwechsel oder erneutem Aufruf erhalten bleibt.
      </p>
      <p>
        <strong>Rechtsgrundlage:</strong> § 25 Abs. 2 Nr. 2 TDDDG (unbedingt erforderlich zur Bereitstellung des
        ausdrücklich gewünschten Telemediendienstes &bdquo;Warenkorb&ldquo;), im Übrigen Art. 6 Abs. 1 lit. f DSGVO
        (berechtigtes Interesse an einem funktionierenden Bestellprozess).
      </p>
      <p>
        Sie können den localStorage Ihres Browsers jederzeit selbst löschen.
      </p>

      <h2>11. Schriftarten (Fonts)</h2>
      <p>
        Auf unserer Website verwenden wir Schriftarten, die ausschließlich lokal von unseren Servern (über die
        Next.js-Funktion <code>next/font</code>) ausgeliefert werden. Es wird beim Aufruf der Website keine Verbindung
        zu externen Schriftservern (z.&nbsp;B. Google Fonts) hergestellt; Ihre IP-Adresse wird nicht an Dritte
        übermittelt.
      </p>

      <h2>12. Empfängerkategorien</h2>
      <p>Empfänger Ihrer Daten können sein:</p>
      <ul>
        <li>unser Hosting-Anbieter (Vercel, USA)</li>
        <li>unser CMS-Anbieter (Sanity, Norwegen)</li>
        <li>unser Formular- und Newsletter-Dienstleister (Formspark, Belgien/Irland)</li>
        <li>Versanddienstleister und Zahlungsdienstleister im Rahmen der Bestellabwicklung</li>
        <li>Steuerberatung sowie Finanz- und Justizbehörden im Rahmen gesetzlicher Pflichten</li>
      </ul>
      <p>
        Mit allen externen Auftragsverarbeitern bestehen Verträge zur Auftragsverarbeitung nach Art. 28 DSGVO.
      </p>

      <h2>13. Drittlandübermittlung</h2>
      <p>
        Soweit personenbezogene Daten in die USA übermittelt werden (Vercel), erfolgt dies auf Grundlage des
        Angemessenheitsbeschlusses der EU-Kommission zum EU-US Data Privacy Framework (Art. 45 DSGVO). Ergänzend stützen
        wir Übermittlungen auf Standardvertragsklauseln gemäß Art. 46 Abs. 2 lit. c DSGVO. Eine Kopie der
        Standardvertragsklauseln können Sie bei uns anfordern.
      </p>

      <h2>14. Ihre Rechte als betroffene Person</h2>
      <p>Ihnen stehen folgende Rechte zu:</p>
      <ul>
        <li>
          <strong>Auskunft</strong> (Art. 15 DSGVO): Sie können Auskunft über die zu Ihrer Person gespeicherten Daten
          verlangen.
        </li>
        <li>
          <strong>Berichtigung</strong> (Art. 16 DSGVO): Sie können unrichtige Daten berichtigen lassen.
        </li>
        <li>
          <strong>Löschung</strong> (Art. 17 DSGVO): Sie können die Löschung Ihrer Daten verlangen, soweit keine
          gesetzlichen Aufbewahrungspflichten entgegenstehen.
        </li>
        <li>
          <strong>Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO).
        </li>
        <li>
          <strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO): Sie können Ihre Daten in einem gängigen, maschinenlesbaren
          Format erhalten.
        </li>
        <li>
          <strong>Widerspruch</strong> (Art. 21 DSGVO) gegen Verarbeitungen, die auf Art. 6 Abs. 1 lit. f DSGVO beruhen.
        </li>
        <li>
          <strong>Widerruf von Einwilligungen</strong> (Art. 7 Abs. 3 DSGVO) mit Wirkung für die Zukunft.
        </li>
        <li>
          <strong>Beschwerde</strong> bei einer Aufsichtsbehörde (Art. 77 DSGVO).
        </li>
      </ul>
      <p>
        Zur Ausübung Ihrer Rechte genügt eine formlose Nachricht an info@kofferklar.de.
      </p>

      <h2>15. Beschwerderecht bei der Aufsichtsbehörde</h2>
      <p>
        Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen
        Daten zu beschweren. Für uns zuständig ist:
      </p>
      <p>
        Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg<br />
        Lautenschlagerstraße 20<br />
        70173 Stuttgart<br />
        Telefon: +49 711 615541-0<br />
        E-Mail: poststelle@lfdi.bwl.de<br />
        <a href="https://www.baden-wuerttemberg.datenschutz.de" target="_blank" rel="noopener noreferrer">
          https://www.baden-wuerttemberg.datenschutz.de
        </a>
      </p>

      <h2>16. Keine automatisierte Entscheidungsfindung</h2>
      <p>
        Eine automatisierte Entscheidungsfindung einschließlich Profiling im Sinne von Art. 22 DSGVO findet nicht statt.
      </p>

      <h2>17. Datensicherheit</h2>
      <p>
        Wir treffen geeignete technische und organisatorische Maßnahmen, um Ihre Daten vor Verlust, Manipulation und
        unbefugtem Zugriff zu schützen. Die Übertragung erfolgt verschlüsselt über HTTPS (TLS). Unsere
        Sicherheitsmaßnahmen werden entsprechend dem Stand der Technik fortlaufend angepasst.
      </p>

      <h2>18. Aktualität und Änderung dieser Datenschutzerklärung</h2>
      <p>
        Diese Datenschutzerklärung ist aktuell gültig. Aufgrund der Weiterentwicklung unserer Website oder geänderter
        gesetzlicher bzw. behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung anzupassen. Die
        jeweils aktuelle Fassung ist stets auf dieser Seite abrufbar.
      </p>

      <p>
        <strong>Stand: Mai 2026</strong>
      </p>
    </LegalLayout>
  )
}
