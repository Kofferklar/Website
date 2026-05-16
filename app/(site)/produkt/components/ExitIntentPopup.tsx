'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Copy, Sparkles, Timer, X } from 'lucide-react'
import CountdownTimer from '@/app/(site)/components/CountdownTimer'

const SESSION_KEY = 'kofferklar-exit-intent-seen'
const PERSISTENT_KEY = 'kk-exit-discount-shown'
const MOBILE_DELAY_MS = 60_000
const DISCOUNT_CODE = 'KOFFER10'
const CHECKOUT_PATHS = ['/checkout', '/warenkorb']

function isCheckoutPath(pathname: string) {
  return CHECKOUT_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`))
}

function isMobileViewport() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(max-width: 767px)').matches
}

export default function ExitIntentPopup() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [pendingHref, setPendingHref] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.sessionStorage.getItem(SESSION_KEY)) return
    if (window.localStorage.getItem(PERSISTENT_KEY)) return

    let fired = false
    let mobileTimer: ReturnType<typeof setTimeout> | null = null
    let scrollArmed = false

    const openPopup = (nextHref: string | null = null) => {
      if (fired) return
      fired = true
      try {
        window.sessionStorage.setItem(SESSION_KEY, 'true')
        window.localStorage.setItem(PERSISTENT_KEY, new Date().toISOString())
      } catch {
        // Storage may be blocked (private mode); popup still shows once per page load.
      }
      setPendingHref(nextHref)
      setOpen(true)
    }

    const handleMouseLeave = (event: MouseEvent) => {
      if (event.clientY > 8) return
      openPopup()
    }

    const handleDocumentClick = (event: MouseEvent) => {
      if (fired) return
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
      if (
        !link ||
        link.dataset.exitIntentIgnore === 'true' ||
        link.target === '_blank' ||
        link.hasAttribute('download')
      ) {
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

    const handleScroll = () => {
      if (!scrollArmed) {
        scrollArmed = true
        return
      }
      if (window.scrollY > 200) {
        openPopup()
      }
    }

    const armMobileTrigger = () => {
      mobileTimer = setTimeout(() => {
        window.addEventListener('scroll', handleScroll, { passive: true })
      }, MOBILE_DELAY_MS)
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('click', handleDocumentClick, true)

    if (isMobileViewport()) {
      armMobileTrigger()
    }

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('click', handleDocumentClick, true)
      window.removeEventListener('scroll', handleScroll)
      if (mobileTimer) clearTimeout(mobileTimer)
    }
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard?.writeText(DISCOUNT_CODE)
    } catch {
      // Visible code remains readable if clipboard is blocked.
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  const handleClaim = async () => {
    await handleCopy()
    setPendingHref(null)
    setOpen(false)
    document.getElementById('kaufbereich')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const closePopup = () => {
    setOpen(false)
    setPendingHref(null)
  }

  const continueNavigation = () => {
    const href = pendingHref
    setOpen(false)
    setPendingHref(null)
    if (href) window.location.assign(href)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="exit-intent-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-primary/40 px-4 pb-6 backdrop-blur-md md:items-center md:pb-0"
          onClick={closePopup}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="exit-intent-title"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] bg-white p-7 shadow-elevated ring-1 ring-black/5 sm:p-8"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-accent/20 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-32 -left-20 h-56 w-56 rounded-full bg-primary/10 blur-3xl"
            />

            <button
              type="button"
              onClick={closePopup}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-muted text-foreground/70 transition-colors hover:bg-muted/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Popup schließen"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>

            <div className="relative pr-8">
              <motion.span
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-accent-foreground shadow-soft"
              >
                <Sparkles className="h-3 w-3" aria-hidden="true" />
                Nur fuer dich
              </motion.span>

              <motion.h2
                id="exit-intent-title"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4 font-serif text-[2rem] font-bold leading-tight tracking-tightest text-foreground"
              >
                Warte kurz. <span className="text-primary">10 % Rabatt</span> sind deins.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="mt-3 text-sm leading-relaxed text-muted-foreground"
              >
                Code an der Kasse einloesen und das komplette Set guenstiger sichern. Kein Newsletter, kein Haken.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative mt-6 rounded-3xl border-2 border-dashed border-accent/60 bg-gradient-to-br from-accent/15 via-white to-accent/5 p-5"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-primary/70">
                Dein Rabattcode
              </p>
              <div className="mt-2 flex items-center justify-between gap-3">
                <motion.p
                  initial={{ letterSpacing: '0.5em', opacity: 0 }}
                  animate={{ letterSpacing: '0.18em', opacity: 1 }}
                  transition={{ delay: 0.55, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="font-mono text-3xl font-bold text-primary sm:text-[2rem]"
                >
                  {DISCOUNT_CODE}
                </motion.p>
                <button
                  type="button"
                  onClick={handleCopy}
                  aria-label={copied ? 'Code kopiert' : 'Code kopieren'}
                  className="group inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-soft transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {copied ? (
                      <motion.span
                        key="check"
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.6, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                      >
                        <Check className="h-4 w-4" aria-hidden="true" />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.6, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                      >
                        <Copy className="h-4 w-4" aria-hidden="true" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
              <p className="mt-2 h-4 text-xs font-semibold text-primary" aria-live="polite">
                {copied ? 'Kopiert. Ab damit in den Warenkorb.' : ''}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.4 }}
              className="mt-4 inline-flex flex-wrap items-center gap-2 rounded-full bg-primary/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary"
            >
              <Timer className="h-3.5 w-3.5" aria-hidden="true" />
              Code läuft ab in <CountdownTimer variant="inline" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 flex flex-col gap-3 sm:flex-row"
            >
              <button
                type="button"
                onClick={handleClaim}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-glow-navy transition-all hover:bg-primary-600 active:scale-[0.98]"
              >
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Rabatt einloesen
              </button>
              <Link
                href="#produktbeweis"
                data-exit-intent-ignore="true"
                onClick={closePopup}
                className="inline-flex flex-1 items-center justify-center rounded-full border border-black/10 px-5 py-3 text-sm font-bold text-foreground transition-colors hover:bg-muted"
              >
                Erst Vergleich ansehen
              </Link>
            </motion.div>

            {pendingHref && (
              <button
                type="button"
                onClick={continueNavigation}
                className="mt-4 w-full text-center text-xs font-semibold text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
              >
                Ohne Rabatt weiter
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
