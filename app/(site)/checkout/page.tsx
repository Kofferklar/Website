import type { Metadata } from 'next'
import { getProduct } from '@/lib/sanity/queries'
import CheckoutWizard from './components/CheckoutWizard'

export const metadata: Metadata = {
  title: 'Kasse | KofferKlar',
  description: 'Bestellung abschließen.',
  robots: { index: false },
}

export default async function CheckoutPage() {
  const product = await getProduct()

  return (
    <main id="main-content" className="pt-[72px] bg-background min-h-screen">
      <CheckoutWizard
        productName={product?.name ?? 'KofferKlar 8-teiliges Packwürfel-Set'}
      />
    </main>
  )
}
