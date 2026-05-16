'use client'

import { useEffect, useState } from 'react'
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
  const [scrolled, setScrolled] = useState(false)
  const [isDocked, setIsDocked] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [pulse, setPulse] = useState(false)
  const { totalItems, mounted } = useCart()
  const router = useRouter()

  useEffect(() => {
    let frame = 0
    let lastY = -1
    const apply = () => {
      frame = 0
      const y = window.scrollY
      if (y === lastY) return
      lastY = y
      setScrolled(y > 12)
      setIsDocked(y >= 40)
    }
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(apply)
    }
    apply()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(mql.matches)
    update()
    mql.addEventListener?.('change', update)
    return () => mql.removeEventListener?.('change', update)
  }, [])

  useEffect(() => {
    const onBump = () => {
      setPulse(false)
      // Re-trigger by waiting a frame so the animation re-runs even on rapid clicks
      requestAnimationFrame(() => requestAnimationFrame(() => setPulse(true)))
    }
    window.addEventListener('kk:cart-bumped', onBump)
    return () => window.removeEventListener('kk:cart-bumped', onBump)
  }, [])

  useEffect(() => {
    if (!pulse) return
    const id = setTimeout(() => setPulse(false), 600)
    return () => clearTimeout(id)
  }, [pulse])

  const cartIconClass = `w-[22px] h-[22px] text-foreground transition-transform ${pulse ? 'kk-cart-pulse' : ''}`

  const headerClass = isDocked
    ? [
        'fixed left-0 right-0 mx-auto z-50',
        'top-3 max-w-[1100px] rounded-full',
        'backdrop-blur-xl bg-white/92 ring-1 ring-black/[0.08] shadow-elevated',
        reducedMotion ? 'h-[60px]' : 'h-[60px] transition-all duration-500',
      ].join(' ')
    : [
        'fixed top-0 left-0 right-0 mx-auto z-50 h-[72px]',
        reducedMotion ? '' : 'transition-all duration-500',
        scrolled
          ? 'glass-light shadow-soft border-b border-black/[0.06]'
          : 'bg-background border-b border-transparent',
      ].join(' ')

  const innerClass = isDocked
    ? 'max-w-[1100px] mx-auto px-5 md:px-7 h-full flex items-center justify-between'
    : 'max-w-[1400px] mx-auto px-5 md:px-8 h-full flex items-center justify-between'

  return (
    <>
      <header
        className={headerClass}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        <div className={innerClass}>
          {/* Desktop layout */}
          <div className="hidden md:flex items-center justify-between w-full h-full">
            <Link href="/?utm_source=website&utm_medium=navigation&utm_campaign=kofferklar-launch" aria-label="KofferKlar, zur Startseite" className="flex items-center h-full pr-4 group">
              <img
                src="/LogoKofferklar.svg"
                alt="KofferKlar Logo"
                width={52}
                height={56}
                className="h-8 w-auto transition-transform duration-500 group-hover:scale-[1.04]"
                fetchPriority="high"
                draggable={false}
              />
            </Link>

            <nav className="flex items-center h-full gap-9" aria-label="Hauptnavigation">
              {navLinks.map((link) => {
                const isActive = link.href.includes('?')
                  ? pathname === link.href.split('?')[0]
                  : pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative flex items-center h-full text-[13px] font-medium tracking-wide text-foreground/85 transition-colors duration-300 hover:text-foreground group`}
                  >
                    {link.label}
                    <span
                      className={[
                        'absolute left-0 right-0 -bottom-px h-px origin-left bg-gradient-to-r from-primary via-accent to-primary transition-transform duration-500',
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                      ].join(' ')}
                      style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                    />
                  </Link>
                )
              })}
            </nav>

            <div className="flex items-center h-full gap-3">
              <Link
                href="/produkt?utm_source=website&utm_medium=navigation&utm_campaign=kofferklar-launch"
                className="relative overflow-hidden bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-[13px] font-semibold tracking-wide hover:bg-primary-600 active:scale-[0.98] transition-all duration-500 shadow-glow-navy focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 group"
              >
                <span className="relative z-10">Jetzt kaufen</span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent group-hover:translate-x-full transition-transform duration-1000" />
              </Link>

              <button
                data-cart-icon
                onClick={() => router.push('/checkout')}
                className="relative flex items-center justify-center w-[44px] h-[44px] cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-full hover:bg-foreground/[0.04] transition-colors"
                aria-label={`Warenkorb${mounted && totalItems > 0 ? ` (${totalItems} Artikel)` : ''}`}
              >
                <ShoppingCart className={cartIconClass} aria-hidden="true" strokeWidth={1.7} />
                {mounted && totalItems > 0 && (
                  <span className={`absolute top-1.5 right-1.5 bg-accent text-accent-foreground text-[10px] font-bold rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center pointer-events-none shadow-sm ring-2 ring-background animate-fade-up ${pulse ? 'kk-cart-pulse' : ''}`}>
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
              <button
                data-cart-icon
                onClick={() => router.push('/checkout')}
                className="relative flex items-center justify-center w-[44px] h-[44px] cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-full"
                aria-label={`Warenkorb${mounted && totalItems > 0 ? ` (${totalItems} Artikel)` : ''}`}
              >
                <ShoppingCart className={cartIconClass} aria-hidden="true" strokeWidth={1.7} />
                {mounted && totalItems > 0 && (
                  <span className={`absolute top-1.5 right-1.5 bg-accent text-accent-foreground text-[10px] font-bold rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center pointer-events-none ring-2 ring-background ${pulse ? 'kk-cart-pulse' : ''}`}>
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </button>

              <button
                onClick={() => setDrawerOpen(!drawerOpen)}
                className="relative flex items-center justify-center w-[44px] h-[44px] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-full"
                aria-label={drawerOpen ? 'Navigation schließen' : 'Navigation öffnen'}
                aria-expanded={drawerOpen}
              >
                <span
                  className="transition-all duration-300 ease-in-out absolute inset-0 flex items-center justify-center"
                  style={{
                    opacity: drawerOpen ? 0 : 1,
                    transform: drawerOpen ? 'rotate(90deg) scale(0.7)' : 'rotate(0) scale(1)',
                  }}
                >
                  <Menu className="w-6 h-6 text-foreground" aria-hidden="true" strokeWidth={1.8} />
                </span>
                <span
                  className="transition-all duration-300 ease-in-out absolute inset-0 flex items-center justify-center"
                  style={{
                    opacity: drawerOpen ? 1 : 0,
                    transform: drawerOpen ? 'rotate(0) scale(1)' : 'rotate(-90deg) scale(0.7)',
                  }}
                >
                  <X className="w-6 h-6 text-foreground" aria-hidden="true" strokeWidth={1.8} />
                </span>
              </button>
            </div>
          </div>
        </div>
        {/* Hairline gradient progress accent */}
        {!isDocked && (
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent pointer-events-none" />
        )}
      </header>

      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
