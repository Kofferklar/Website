'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!consent) return
    setStatus('loading')

    try {
      const response = await fetch('https://submit-form.com/BlcbkpVFG', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email,
          source: 'Newsletter Signup Footer',
        }),
      })

      if (response.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch (error) {
      console.error('Newsletter submission error:', error)
      setStatus('error')
    }
  }

  return (
    <section id="newsletter" className="relative py-20 md:py-28 bg-background overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-accent/8 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative max-w-2xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[2rem] md:rounded-[2.5rem] bg-primary text-white p-7 md:p-10 shadow-elevated overflow-hidden"
        >
          {/* Subtle gold corner accent */}
          <div className="absolute -top-12 -right-12 w-44 h-44 bg-accent/25 blur-[60px] rounded-full pointer-events-none" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/8 px-3 py-1 text-[10px] font-bold tracking-[0.22em] uppercase text-accent-200 ring-1 ring-white/10 mb-5">
              <Sparkles size={12} className="text-accent" />
              Insider Newsletter
            </div>

            <h2 className="font-display text-balance text-2xl md:text-[2rem] font-bold leading-[1.1] tracking-tightest mb-3">
              Werde Teil der <span className="font-handwrite text-accent-200">KofferKlar Reise.</span>
            </h2>
            <p className="text-white/65 text-sm md:text-[15px] leading-relaxed mb-7 max-w-md">
              Reise-Hacks, Pack-Tipps und <span className="text-accent-200 font-semibold">10% Rabatt</span> auf deine erste Bestellung. Kein Spam.
            </p>

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-start gap-4 rounded-2xl bg-white/8 p-4 ring-1 ring-white/15"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Fast geschafft.</p>
                    <p className="mt-1 text-xs text-white/65">
                      Bestätige deine Anmeldung über den Link in unserer E-Mail.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="group"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -16 }}
                >
                  <div className="relative p-1.5 rounded-full bg-white/8 ring-1 ring-white/15 group-focus-within:ring-accent/60 group-focus-within:bg-white/10 transition-all duration-500">
                    <div className="flex items-center gap-3 pl-5 pr-1">
                      <Mail size={18} className="text-white/40 group-focus-within:text-accent transition-colors shrink-0" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Deine E-Mail-Adresse"
                        className="flex-1 min-w-0 bg-transparent border-none outline-none text-white placeholder:text-white/30 text-sm py-3"
                      />
                      <button
                        type="submit"
                        disabled={status === 'loading' || !consent}
                        className="group/btn relative overflow-hidden bg-accent text-accent-foreground w-11 h-11 rounded-full flex items-center justify-center hover:bg-accent-400 transition-all duration-500 active:scale-[0.92] disabled:opacity-40 disabled:cursor-not-allowed shrink-0 shadow-glow-gold"
                        aria-label="Newsletter abonnieren"
                      >
                        {status === 'loading' ? (
                          <div className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                        ) : (
                          <ArrowRight size={18} className="group-hover/btn:translate-x-0.5 transition-transform" />
                        )}
                      </button>
                    </div>
                  </div>

                  <label className="mt-4 flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-white/30 bg-white/10 text-accent focus:ring-accent shrink-0"
                    />
                    <span className="text-[11px] leading-relaxed text-white/55">
                      Ich willige ein, den Newsletter zu erhalten und die{' '}
                      <a href="/datenschutz" className="underline underline-offset-2 hover:text-white">Datenschutzhinweise</a>
                      {' '}gelesen zu haben. Abmeldung jederzeit per Link.
                    </span>
                  </label>

                  {status === 'error' && (
                    <p className="mt-3 text-xs text-red-300">Etwas ging schief. Bitte später erneut versuchen.</p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
