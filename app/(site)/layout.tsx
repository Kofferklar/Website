import { Suspense } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { CartProvider } from './components/CartProvider'
import PWARegister from './components/PWARegister'
import CartFlyAnimation from './components/CartFlyAnimation'
import SmoothScroll from './components/SmoothScroll'
import Confetti from './components/Confetti'
import RouteLoader from './components/RouteLoader'
import OrderToast from './components/OrderToast'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PWARegister />
      <SmoothScroll />
      <Suspense fallback={null}>
        <RouteLoader />
      </Suspense>
      <Confetti />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded"
      >
        Zum Hauptinhalt springen
      </a>
      <CartProvider>
        <Header />
        <CartFlyAnimation />
        {children}
        <Footer />
        <OrderToast />
      </CartProvider>
    </>
  )
}
