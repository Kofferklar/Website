'use client'

import { useState } from 'react'
import { Menu, X, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import MobileDrawer from './MobileDrawer'
import { useCart } from './CartProvider'

const navLinks = [
  { href: '/?utm_source=website&utm_medium=navigation&utm_campaign=kofferklar-launch', label: 'Startseite' },
  { href: '/produkt?utm_source=website&utm_medium=navigation&utm_campaign=kofferklar-launch', label: 'Produkt' },
  { href: '/ratgeber', label: 'Ratgeber' },
  { href: '/ueber-uns', label: 'Über uns' },
  { href: '/hilfe-service', label: 'Hilfe & Service' },
]

export default function Header() {
  const pathname = usePathname()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { totalItems, mounted } = useCart()
  const router = useRouter()

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-[72px] bg-background border-b border-border shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <div className="max-w-[1400px] mx-auto px-6 h-full flex items-center justify-between">
          {/* Desktop layout */}
          <div className="hidden md:flex items-center justify-between w-full h-full">
            <Link href="/?utm_source=website&utm_medium=navigation&utm_campaign=kofferklar-launch" aria-label="KofferKlar, zur Startseite" className="flex items-center h-full pr-4">
              <img
                src="/LogoKofferklar.svg"
                alt="KofferKlar Logo"
                width={52}
                height={56}
                className="h-8 w-auto"
                fetchPriority="high"
                draggable={false}
              />
            </Link>

            <nav className="flex items-center h-full gap-8" aria-label="Hauptnavigation">
              {navLinks.map((link) => {
                const isActive = link.href.includes('?') 
                  ? pathname === link.href.split('?')[0]
                  : pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center h-full text-sm font-normal text-foreground transition-colors duration-200 hover:text-accent hover:underline ${isActive ? 'underline' : ''}`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>

            <div className="flex items-center h-full gap-2">
              <Link
                href="/produkt?utm_source=website&utm_medium=navigation&utm_campaign=kofferklar-launch"
                className="bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-semibold hover:bg-primary/90 active:scale-[0.98] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                Jetzt kaufen
              </Link>

              {/* Cart icon. to the RIGHT of "Jetzt kaufen" */}
              <button
                onClick={() => router.push('/checkout')}
                className="relative flex items-center justify-center w-[44px] h-full cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded"
                aria-label={`Warenkorb${mounted && totalItems > 0 ? ` (${totalItems} Artikel)` : ''}`}
              >
                <ShoppingCart className="w-6 h-6 text-foreground" aria-hidden="true" />
                {mounted && totalItems > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center pointer-events-none">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile layout */}
          <div className="flex md:hidden items-center justify-between w-full">
            <Link
              href="/?utm_source=website&utm_medium=navigation&utm_campaign=kofferklar-launch"
              aria-label="KofferKlar, zur Startseite"
              className="flex items-center justify-center min-h-[44px] min-w-[44px] -m-2 p-2"
            >
              <img
                src="/LogoKofferklar.svg"
                alt="KofferKlar Logo"
                width={40}
                height={44}
                className="h-7 w-auto"
                fetchPriority="high"
              />
            </Link>

            <div className="flex items-center gap-1">
              {/* Cart icon button (left of hamburger) */}
              <button
                onClick={() => router.push('/checkout')}
                className="relative flex items-center justify-center w-[44px] h-[44px] cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded"
                aria-label={`Warenkorb${mounted && totalItems > 0 ? ` (${totalItems} Artikel)` : ''}`}
              >
                <ShoppingCart className="w-6 h-6 text-foreground" aria-hidden="true" />
                {mounted && totalItems > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center pointer-events-none">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </button>

              {/* Existing hamburger button. content UNCHANGED */}
              <button
                onClick={() => setDrawerOpen(!drawerOpen)}
                className="flex items-center justify-center w-[44px] h-[44px] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded"
                aria-label={drawerOpen ? 'Navigation schließen' : 'Navigation öffnen'}
                aria-expanded={drawerOpen}
              >
                <span
                  className="transition-all duration-150 ease-in-out"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: drawerOpen ? 0 : 1,
                    transform: drawerOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                    position: 'absolute',
                  }}
                >
                  <Menu className="w-6 h-6 text-foreground" aria-hidden="true" />
                </span>
                <span
                  className="transition-all duration-150 ease-in-out"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: drawerOpen ? 1 : 0,
                    transform: drawerOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
                    position: 'absolute',
                  }}
                >
                  <X className="w-6 h-6 text-foreground" aria-hidden="true" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
