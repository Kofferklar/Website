'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Copy, X } from 'lucide-react'

const SESSION_KEY = 'kofferklar-exit-intent-seen'
const CHECKOUT_PATHS = ['/checkout', '/warenkorb']

function isCheckoutPath(pathname: string) {
  return CHECKOUT_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`))
}

export default function ExitIntentPopup() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [pendingHref, setPendingHref] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.sessionStorage.getItem(SESSION_KEY)) return

    const openPopup = (nextHref: string | null = null) => {
      window.sessionStorage.setItem(SESSION_KEY, 'true')
      setPendingHref(nextHref)
      setOpen(true)
    }

    const handleMouseLeave = (event: MouseEvent) => {
      if (event.clientY > 8) return
      openPopup()
    }

    const handleDocumentClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return
      }

      const target = event.target
      if (!(target instanceof Element)) return

      const link = target.closest<HTMLAnchorElement>('a[href]')
      if (!link || link.dataset.exitIntentIgnore === 'true' || link.target === '_blank' || link.hasAttribute('download')) {
        return
      }

      const nextUrl = new URL(link.href, window.location.href)
      const currentUrl = new URL(window.location.href)
      const samePage =
        nextUrl.origin === currentUrl.origin &&
        nextUrl.pathname === currentUrl.pathname &&
        nextUrl.search === currentUrl.search

      if (samePage || isCheckoutPath(nextUrl.pathname)) return

      event.preventDefault()
      openPopup(nextUrl.href)
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('click', handleDocumentClick, true)
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('click', handleDocumentClick, true)
    }
  }, [])

  const handleClaim = async () => {
    setCopied(true)
    setPendingHref(null)
    try {
      await navigator.clipboard?.writeText('KOFFER10')
    } catch {
      // The visible code is enough for browsers that block clipboard access.
    }
    document.getElementById('kaufbereich')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const continueNavigation = () => {
    if (!pendingHref) return
    window.location.assign(pendingHref)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/25 px-4 pb-6 backdrop-blur-sm md:items-center md:pb-0">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-intent-title"
        className="relative w-full max-w-md rounded-[2rem] bg-white p-6 shadow-2xl shadow-black/20 ring-1 ring-black/10"
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-muted text-foreground transition-colors hover:bg-muted/70 focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Popup schließen"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="pr-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
            Erstbestellung
          </p>
          <h2 id="exit-intent-title" className="mt-3 font-serif text-3xl font-bold text-foreground">
            Noch unsicher?
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Sichere dir 10 % Rabatt auf deine erste Bestellung und teste Kofferklar bei deiner
            nächsten Reise.
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-4 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">
            Rabattcode
          </p>
          <p className="mt-1 font-serif text-3xl font-bold text-primary">KOFFER10</p>
          {copied && <p className="mt-2 text-xs font-semibold text-primary">Code kopiert und Kaufbereich geöffnet.</p>}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleClaim}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/95 active:scale-[0.98]"
          >
            <Copy className="h-4 w-4" aria-hidden="true" />
            Rabatt sichern
          </button>
          <Link
            href="#produktbeweis"
            data-exit-intent-ignore="true"
            onClick={() => setOpen(false)}
            className="inline-flex flex-1 items-center justify-center rounded-full border border-black/10 px-5 py-3 text-sm font-bold text-foreground transition-colors hover:bg-muted"
          >
            Packvergleich ansehen
          </Link>
        </div>

        {pendingHref && (
          <button
            type="button"
            onClick={continueNavigation}
            className="mt-4 w-full text-center text-xs font-semibold text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
          >
            Ohne Rabatt weiter
          </button>
        )}
      </div>
    </div>
  )
}
