'use client'

import { useState, useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import MobileDrawer from './MobileDrawer'

// Logo handling: SVG uses hardcoded navy fills (#19447a) — not currentColor.
// On transparent header (dark hero background), apply CSS filter invert to make logo white.
// On solid header (light background), no filter — show original navy fills.

// Scroll threshold: 80px — sentinel div placed at this position (matches UI-SPEC.md SCROLL_THRESHOLD)

const navLinks = [
  { href: '/', label: 'Startseite' },
  { href: '/produkt', label: 'Produkt' },
  { href: '/ratgeber', label: 'Ratgeber' },
  { href: '/ueber-uns', label: 'Über uns' },
  { href: '/hilfe-service', label: 'Hilfe & Service' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Sentinel div at 80px from top — IntersectionObserver detects scroll crossing */}
      <div
        ref={sentinelRef}
        className="fixed top-[80px] left-0 w-px h-px pointer-events-none"
        aria-hidden="true"
      />

      <header
        className={`fixed top-0 left-0 right-0 z-30 h-[72px] transition-all duration-500
          ${
            scrolled
              ? 'bg-background border-b border-border shadow-[0_2px_12px_rgba(0,0,0,0.06)]'
              : 'bg-transparent border-transparent'
          }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)' }}
      >
        <div className="max-w-[1400px] mx-auto px-6 h-full flex items-center justify-between">
          {/* Desktop layout */}
          <div className="hidden md:flex items-center justify-between w-full">
            {/* Logo */}
            <Link href="/" aria-label="KofferKlar — Zur Startseite">
              <Image
                src="/LogoKofferklar.svg"
                alt="KofferKlar Logo"
                width={52}
                height={56}
                className="h-8 w-auto transition-all duration-500"
                style={{
                  filter: scrolled
                    ? 'none'
                    : 'invert(1) brightness(10)',
                }}
                priority
              />
            </Link>

            {/* Nav links */}
            <nav className="flex items-center gap-8" aria-label="Hauptnavigation">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-normal transition-colors duration-200 hover:underline
                      ${
                        scrolled
                          ? `text-foreground hover:text-accent ${isActive ? 'underline' : ''}`
                          : `text-white hover:text-accent ${isActive ? 'underline' : ''}`
                      }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>

            {/* CTA Button */}
            <Link
              href="/produkt"
              className="bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-semibold hover:bg-primary-600 active:scale-[0.98] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
            >
              Jetzt kaufen
            </Link>
          </div>

          {/* Mobile layout */}
          <div className="flex md:hidden items-center justify-between w-full">
            {/* Logo */}
            <Link href="/" aria-label="KofferKlar — Zur Startseite">
              <Image
                src="/LogoKofferklar.svg"
                alt="KofferKlar Logo"
                width={40}
                height={44}
                className="h-7 w-auto transition-all duration-500"
                style={{
                  filter: scrolled
                    ? 'none'
                    : 'invert(1) brightness(10)',
                }}
                priority
              />
            </Link>

            {/* Hamburger button */}
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
                <Menu
                  className={`w-6 h-6 ${scrolled ? 'text-foreground' : 'text-white'}`}
                  aria-hidden="true"
                />
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
                <X
                  className={`w-6 h-6 ${scrolled ? 'text-foreground' : 'text-white'}`}
                  aria-hidden="true"
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
