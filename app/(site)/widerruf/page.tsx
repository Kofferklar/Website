import type { Metadata } from 'next'
import LegalLayout from '../components/LegalLayout'

export const metadata: Metadata = {
  title: 'Widerrufsbelehrung | KofferKlar',
  description: 'Informationen zu Ihrem Widerrufsrecht und Rücksendungen bei KofferKlar.',
  robots: { index: false },
}

/**
 * Widerruf Page (Phase 4)
 * Standard instructions on withdrawal.
 */
export default function WiderrufPage() {
  return (
    <LegalLayout 
      title="Widerrufsbelehrung"
      subtitle="Informationen zu Ihrem Rückgaberecht."
    >
      <h2>Widerrufsrecht</h2>
      <p>
        Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die Waren in Besitz genommen haben bzw. hat.
      </p>

      <h2>Folgen des Widerrufs</h2>
      <p>
        Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt haben), unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist.
      </p>

      <h2>Muster-Widerrufsformular</h2>
      <p>
        (Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es zurück.)
      </p>
      <ul className="list-none border border-black/5 p-8 bg-muted/10 rounded-2xl">
        <li>An: Yasar Heidt, Doggenriedstraße 12, 88250 Weingarten</li>
        <li>Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den Kauf der folgenden Waren (*)/die Erbringung der folgenden Dienstleistung (*)</li>
        <li>Bestellt am (*)/erhalten am (*)</li>
        <li>Name des/der Verbraucher(s)</li>
        <li>Anschrift des/der Verbraucher(s)</li>
        <li>Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier)</li>
        <li>Datum</li>
      </ul>
      <p className="mt-4 text-xs">(*) Unzutreffendes streichen.</p>
    </LegalLayout>
  )
}
