import type { Metadata } from 'next'
import LegalLayout from '../components/LegalLayout'

export const metadata: Metadata = {
  title: 'AGB | Allgemeine Geschäftsbedingungen KofferKlar',
  description: 'Allgemeine Geschäftsbedingungen für Bestellungen bei KofferKlar.',
  robots: { index: false },
}

/**
 * AGB Page
 * Allgemeine Geschäftsbedingungen, §§ 312d, 312i, 312j, 312k BGB konform.
 */
export default function AgbPage() {
  return (
    <LegalLayout
      title="AGB"
      subtitle="Allgemeine Geschäftsbedingungen für Ihren Einkauf bei KofferKlar."
    >
      <h2>1. Geltungsbereich, Anbieter</h2>
      <p>
        Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Bestellungen, die Verbraucherinnen und Verbraucher
        (im Folgenden &bdquo;Sie&ldquo;) über den Online-Shop unter kofferklar.de bei
      </p>
      <p>
        Yasar Heidt<br />
        Doggenriedstraße 12<br />
        88250 Weingarten<br />
        Deutschland<br />
        E-Mail: info@kofferklar.de
      </p>
      <p>
        aufgeben. Verbraucher ist jede natürliche Person, die ein Rechtsgeschäft zu Zwecken abschließt, die überwiegend
        weder ihrer gewerblichen noch ihrer selbständigen beruflichen Tätigkeit zugerechnet werden können (§ 13 BGB).
        Unser Angebot richtet sich ausschließlich an Verbraucher. Abweichende Bedingungen erkennen wir nicht an, es sei
        denn, wir stimmen ihrer Geltung ausdrücklich schriftlich zu.
      </p>

      <h2>2. Vertragsschluss</h2>
      <p>
        Die Darstellung der Produkte in unserem Online-Shop ist kein rechtlich bindendes Angebot, sondern eine
        Aufforderung zur Bestellung. Irrtümer vorbehalten.
      </p>
      <p>
        Durch Anklicken des Bestellbuttons &bdquo;Jetzt kaufen&ldquo; geben Sie eine verbindliche Bestellung der im
        Warenkorb enthaltenen Waren ab. Die Bestätigung des Eingangs Ihrer Bestellung erfolgt zusammen mit der Annahme
        der Bestellung unmittelbar nach dem Absenden durch eine automatisierte E-Mail. Mit dieser E-Mail-Bestätigung
        kommt der Kaufvertrag zustande.
      </p>

      <h2>3. Vertragssprache, Vertragstextspeicherung</h2>
      <p>
        Die für den Vertragsschluss zur Verfügung stehende Sprache ist Deutsch. Wir speichern den Vertragstext und senden
        Ihnen die Bestelldaten sowie diese AGB per E-Mail zu. Aus Sicherheitsgründen ist der Vertragstext über das
        Internet nicht mehr zugänglich.
      </p>

      <h2>4. Preise und Versandkosten</h2>
      <p>
        Alle Preise sind Endpreise in Euro. Gemäß § 19 UStG (Kleinunternehmerregelung) wird keine Umsatzsteuer
        ausgewiesen und nicht erhoben. Zusätzlich zu den angegebenen Produktpreisen können Versandkosten anfallen, die
        auf der Produktseite und im Warenkorb gesondert ausgewiesen werden.
      </p>

      <h2>5. Lieferung, Lieferzeit, Liefergebiete</h2>
      <p>
        Wir liefern ausschließlich im Versandweg. Eine Selbstabholung der Ware ist nicht möglich. Wir liefern nach
        Deutschland, Österreich und in die Schweiz.
      </p>
      <p>
        Sofern auf der Produktseite nichts anderes angegeben ist, beträgt die Lieferzeit innerhalb Deutschlands 2 bis 4
        Werktage ab Vertragsschluss (bei Vorkasse: ab Zahlungseingang). Bei Lieferungen nach Österreich und in die
        Schweiz kann sich die Lieferzeit um wenige Werktage verlängern. Bei Lieferungen in die Schweiz fallen Zoll- und
        Einfuhrabgaben an, die Sie als Empfängerin oder Empfänger zu tragen haben.
      </p>

      <h2>6. Zahlungsmittel</h2>
      <p>
        In unserem Shop stehen Ihnen die jeweils im Bestellprozess angezeigten Zahlungsarten zur Verfügung. Wir behalten
        uns vor, einzelne Zahlungsarten nicht oder nur unter Auflagen anzubieten.
      </p>

      <h2>7. Eigentumsvorbehalt</h2>
      <p>
        Die Ware bleibt bis zur vollständigen Bezahlung unser Eigentum.
      </p>

      <h2>8. Widerrufsrecht</h2>
      <p>
        Verbrauchern steht ein gesetzliches Widerrufsrecht von 14 Tagen zu. Die vollständige Widerrufsbelehrung sowie das
        Muster-Widerrufsformular finden Sie auf unserer Seite{' '}
        <a href="/widerruf">Widerrufsrecht</a>.
      </p>

      <h2>9. Freiwilliges 30-Tage-Rückgaberecht</h2>
      <p>
        Über das gesetzliche Widerrufsrecht hinaus räumen wir Ihnen ein freiwilliges Rückgaberecht von 30 Tagen ab
        Erhalt der Ware ein. Mit diesem freiwilligen Rückgaberecht können Sie den Vertrag auch dann noch lösen, wenn die
        gesetzliche Widerrufsfrist von 14 Tagen bereits abgelaufen ist. Voraussetzung ist, dass die Ware vollständig und
        in unbenutztem Zustand zurückgesendet wird.
      </p>
      <p>
        Ihr gesetzliches Widerrufsrecht bleibt von diesem freiwilligen Rückgaberecht unberührt und besteht unabhängig
        davon fort. Bis zum Ablauf der Frist von 14 Tagen gelten ausschließlich die gesetzlichen Bestimmungen. Das
        freiwillige Rückgaberecht schränkt zudem unsere gesetzliche Mängelhaftung nicht ein.
      </p>

      <h2>10. Mängelhaftung</h2>
      <p>
        Für alle Waren aus unserem Shop gilt die gesetzliche Mängelhaftung. Die Verjährungsfrist beträgt zwei Jahre ab
        Erhalt der Ware (§ 438 Abs. 1 Nr. 3 BGB).
      </p>

      <h2>11. Streitbeilegung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit, die Sie unter{' '}
        <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
          https://ec.europa.eu/consumers/odr
        </a>{' '}
        finden. Zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle sind wir nicht
        verpflichtet und nicht bereit.
      </p>

      <h2>12. Schlussbestimmungen</h2>
      <p>
        Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Bei Verbrauchern gilt diese
        Rechtswahl nur, soweit hierdurch der gewährte Schutz durch zwingende Bestimmungen des Rechts des Staates, in dem
        der Verbraucher seinen gewöhnlichen Aufenthalt hat, nicht entzogen wird.
      </p>
      <p>
        Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen
        Bestimmungen unberührt. An die Stelle der unwirksamen Bestimmung tritt die gesetzliche Regelung.
      </p>

      <p>
        <strong>Stand: Mai 2026</strong>
      </p>
    </LegalLayout>
  )
}
