'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react'

/**
 * NewsletterSignup Client Component
 * High-end signup section with glassmorphism, background orbs, and tactile feedback.
 */
export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    // TODO: Mockup-only. Before production: Double-Opt-In flow (SPF/DKIM-verified domain + transactional mail provider like Resend/Postmark).
    setTimeout(() => {
      setStatus('success')
    }, 1500)
  }

  return (
    <section id="newsletter" className="py-24 md:py-32 lg:py-40 bg-primary overflow-hidden relative">
      {/* Dynamic Background Orbs (Taste: Grain/Noise would be fixed, but here we use glows) */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/5 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="text-accent text-[10px] font-bold tracking-[0.4em] uppercase mb-8">Community</div>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-10 leading-[1.1]">
              Werde Teil der <br /> KofferKlar Reise.
            </h2>
            <p className="text-white/60 text-lg md:text-xl lg:text-2xl mb-16 max-w-2xl mx-auto leading-relaxed">
              Erhalte exklusive Reise-Hacks, Pack-Tipps und <span className="text-accent-200">10% Rabatt</span> auf deine erste Bestellung.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md mx-auto"
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white/10 backdrop-blur-xl p-10 rounded-[3rem] border border-white/20 flex flex-col items-center gap-6 shadow-2xl"
                >
                  <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center text-accent mb-2">
                    <CheckCircle2 size={40} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Fast geschafft!</h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      Wir haben dir eine Bestätigungs-E-Mail gesendet. <br />
                      Bitte prüfe deinen Posteingang.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  onSubmit={handleSubmit}
                  className="relative group"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="relative p-2.5 rounded-full bg-white/5 ring-1 ring-white/15 backdrop-blur-md group-focus-within:ring-accent/40 group-focus-within:bg-white/10 transition-all duration-700 shadow-2xl">
                    <div className="flex items-center gap-4 pl-6 pr-2">
                      <Mail size={22} className="text-white/40 group-focus-within:text-accent transition-colors" />
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Deine E-Mail-Adresse"
                        className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/25 text-base md:text-lg py-4"
                      />
                      <button 
                        type="submit"
                        disabled={status === 'loading'}
                        className="bg-accent text-accent-foreground w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center hover:bg-accent-400 transition-all duration-500 active:scale-[0.92] disabled:opacity-50 disabled:scale-100 shadow-xl shadow-accent/20 group/btn overflow-hidden relative"
                      >
                        {status === 'loading' ? (
                          <div className="w-6 h-6 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                        ) : (
                          <>
                            <ArrowRight size={28} className="group-hover/btn:translate-x-1 transition-transform" />
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <p className="mt-8 text-[11px] text-white/30 uppercase tracking-[0.2em] font-bold">
                    100% Datenschutz · Abmeldung jederzeit
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
