'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import MobileDrawer from './MobileDrawer'

const navLinks = [
  { href: '/', label: 'Startseite' },
  { href: '/produkt', label: 'Produkt' },
  { href: '/ratgeber', label: 'Ratgeber' },
  { href: '/ueber-uns', label: 'Über uns' },
  { href: '/hilfe-service', label: 'Hilfe & Service' },
]

export default function Header() {
  const pathname = usePathname()
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-30 h-[72px] bg-background border-b border-border shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <div className="max-w-[1400px] mx-auto px-6 h-full flex items-center justify-between">
          {/* Desktop layout */}
          <div className="hidden md:flex items-center justify-between w-full">
            <Link href="/" aria-label="KofferKlar — Zur Startseite">
              <Image
                src="/LogoKofferklar.svg"
                alt="KofferKlar Logo"
                width={52}
                height={56}
                className="h-8 w-auto"
                priority
              />
            </Link>

            <nav className="flex items-center gap-8" aria-label="Hauptnavigation">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-normal text-foreground transition-colors duration-200 hover:text-accent hover:underline ${isActive ? 'underline' : ''}`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>

            <Link
              href="/produkt"
              className="bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-semibold hover:bg-primary/90 active:scale-[0.98] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Jetzt kaufen
            </Link>
          </div>

          {/* Mobile layout */}
          <div className="flex md:hidden items-center justify-between w-full">
            <Link href="/" aria-label="KofferKlar — Zur Startseite">
              <Image
                src="/LogoKofferklar.svg"
                alt="KofferKlar Logo"
                width={40}
                height={44}
                className="h-7 w-auto"
                priority
              />
            </Link>

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
      </header>

      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
