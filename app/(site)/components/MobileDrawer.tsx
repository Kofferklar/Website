'use client'

import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const navLinks = [
  { href: '/?utm_source=website&utm_medium=navigation&utm_campaign=kofferklar-launch', label: 'Startseite' },
  { href: '/produkt?utm_source=website&utm_medium=navigation&utm_campaign=kofferklar-launch', label: 'Produkt' },
  { href: '/ratgeber', label: 'Ratgeber' },
  { href: '/ueber-uns', label: 'Über uns' },
  { href: '/hilfe-service', label: 'Hilfe & Service' },
]

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // Focus management: close button receives focus on open
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus()
    }
  }, [isOpen])

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-[340px] bg-primary overflow-hidden
          transition-transform
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{
          transitionDuration: isOpen ? '400ms' : '300ms',
          transitionTimingFunction: isOpen
            ? 'cubic-bezier(0.32,0.72,0,1)'
            : 'cubic-bezier(0.16,1,0.3,1)',
          willChange: isOpen ? 'transform' : 'auto',
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
      >
        {/* Soft accent glow only */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-accent/15 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative flex flex-col h-full px-6 py-6">
          {/* Top row: Logo + Close button */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/?utm_source=website&utm_medium=navigation&utm_campaign=kofferklar-launch" onClick={onClose} aria-label="KofferKlar, zur Startseite">
              <Image
                src="/LogoKofferklar.svg"
                alt="KofferKlar Logo"
                width={40}
                height={44}
                className="h-7 w-auto"
                style={{ filter: 'invert(1) brightness(10)' }}
              />
            </Link>

            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="flex items-center justify-center w-[44px] h-[44px] text-white focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded"
              aria-label="Navigation schließen"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>

          {/* Nav links with stagger animation (drawerLinkIn keyframe defined in globals.css) */}
          <nav aria-label="Mobile Navigation" className="flex-1">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`group flex items-center justify-between text-white text-lg font-medium py-4 border-b border-white/10 min-h-[52px] hover:text-accent transition-colors duration-300
                  ${isOpen ? 'animate-drawerLink' : ''}`}
                style={
                  isOpen
                    ? ({
                        '--index': index,
                        animationDelay: `calc(var(--index) * 60ms)`,
                      } as React.CSSProperties)
                    : undefined
                }
              >
                <span className="font-serif">{link.label}</span>
                <span className="text-white/30 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300">→</span>
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="mt-8">
            <Link
              href="/produkt?utm_source=website&utm_medium=navigation&utm_campaign=kofferklar-launch"
              onClick={onClose}
              className="relative overflow-hidden flex items-center justify-center bg-accent text-accent-foreground w-full rounded-full px-6 py-4 text-base font-bold hover:bg-accent-400 active:scale-[0.98] transition-all duration-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 shadow-glow-gold group"
              style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
            >
              <span className="relative z-10">Jetzt kaufen</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition-transform duration-1000" />
            </Link>
          </div>

          {/* Footer legal links */}
          <div className="flex gap-4 mt-6 pb-2">
            <Link
              href="/impressum"
              onClick={onClose}
              className="text-white/50 text-xs hover:text-white/80 transition-colors duration-200"
            >
              Impressum
            </Link>
            <Link
              href="/datenschutz"
              onClick={onClose}
              className="text-white/50 text-xs hover:text-white/80 transition-colors duration-200"
            >
              Datenschutz
            </Link>
            <Link
              href="/agb"
              onClick={onClose}
              className="text-white/50 text-xs hover:text-white/80 transition-colors duration-200"
            >
              AGB
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
