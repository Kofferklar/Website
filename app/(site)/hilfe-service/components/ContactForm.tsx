'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { submitContact, type ContactFormData } from '../actions'
import { contactFormSchema } from '../schema'

/**
 * ContactForm Client Component
 * High-end form with Double-Bezel architecture and tactile feedback.
 */
export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setStatus('idle')
    setErrorMessage('')

    try {
      const result = await submitContact(data)
      if (result.success) {
        setStatus('success')
        reset()
      } else {
        setStatus('error')
        setErrorMessage(result.message || 'Ein Fehler ist aufgetreten.')
      }
    } catch {
      setStatus('error')
      setErrorMessage('Ein unerwarteter Fehler ist aufgetreten.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {submitStatus === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="p-10 md:p-16 rounded-[3rem] bg-white border border-black/5 shadow-2xl text-center flex flex-col items-center gap-8"
          >
            <div className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
              <CheckCircle2 size={48} />
            </div>
            <div>
              <h3 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">Vielen Dank!</h3>
              <p className="text-muted-foreground text-lg md:text-xl max-w-md mx-auto">
                Deine Nachricht wurde erfolgreich an das KofferKlar Team übermittelt. Wir melden uns in Kürze bei dir.
              </p>
            </div>
            <button
              onClick={() => setStatus('idle')}
              className="mt-4 px-10 py-4 rounded-full border border-black/10 text-sm font-bold hover:bg-muted transition-all active:scale-[0.98]"
            >
              Neue Nachricht senden
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-2.5 rounded-[3.5rem] bg-black/5 ring-1 ring-black/5 overflow-hidden"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white rounded-[calc(3.5rem-0.75rem)] p-8 md:p-12 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] space-y-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                {/* Name */}
                <div className="space-y-3">
                  <label htmlFor="name" className="text-xs font-bold tracking-[0.2em] uppercase text-foreground/60 ml-1">
                    Name
                  </label>
                  <div className="relative group">
                    <input
                      {...register('name')}
                      id="name"
                      placeholder="Dein Name"
                      className={`w-full bg-muted/40 border-none rounded-2xl px-6 py-4 text-foreground placeholder:text-muted-foreground/50 outline-none ring-1 transition-all duration-500 focus:bg-white focus:shadow-xl
                        ${errors.name ? 'ring-rose-500/50' : 'ring-black/5 group-focus-within:ring-primary/40'}`}
                    />
                    {errors.name && (
                      <div className="mt-2 flex items-center gap-1.5 text-rose-500 text-[10px] font-bold uppercase tracking-wider ml-1">
                        <AlertCircle size={12} />
                        <span>{errors.name.message}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-3">
                  <label htmlFor="email" className="text-xs font-bold tracking-[0.2em] uppercase text-foreground/60 ml-1">
                    E-Mail
                  </label>
                  <div className="relative group">
                    <input
                      {...register('email')}
                      id="email"
                      type="email"
                      placeholder="deine@email.de"
                      className={`w-full bg-muted/40 border-none rounded-2xl px-6 py-4 text-foreground placeholder:text-muted-foreground/50 outline-none ring-1 transition-all duration-500 focus:bg-white focus:shadow-xl
                        ${errors.email ? 'ring-rose-500/50' : 'ring-black/5 group-focus-within:ring-primary/40'}`}
                    />
                    {errors.email && (
                      <div className="mt-2 flex items-center gap-1.5 text-rose-500 text-[10px] font-bold uppercase tracking-wider ml-1">
                        <AlertCircle size={12} />
                        <span>{errors.email.message}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-3">
                <label htmlFor="subject" className="text-xs font-bold tracking-[0.2em] uppercase text-foreground/60 ml-1">
                  Betreff
                </label>
                <div className="relative group">
                  <input
                    {...register('subject')}
                    id="subject"
                    placeholder="Worum geht es?"
                    className={`w-full bg-muted/40 border-none rounded-2xl px-6 py-4 text-foreground placeholder:text-muted-foreground/50 outline-none ring-1 transition-all duration-500 focus:bg-white focus:shadow-xl
                      ${errors.subject ? 'ring-rose-500/50' : 'ring-black/5 group-focus-within:ring-primary/40'}`}
                  />
                  {errors.subject && (
                    <div className="mt-2 flex items-center gap-1.5 text-rose-500 text-[10px] font-bold uppercase tracking-wider ml-1">
                      <AlertCircle size={12} />
                      <span>{errors.subject.message}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-3">
                <label htmlFor="message" className="text-xs font-bold tracking-[0.2em] uppercase text-foreground/60 ml-1">
                  Nachricht
                </label>
                <div className="relative group">
                  <textarea
                    {...register('message')}
                    id="message"
                    rows={6}
                    placeholder="Deine Nachricht an uns..."
                    className={`w-full bg-muted/40 border-none rounded-[2rem] px-6 py-5 text-foreground placeholder:text-muted-foreground/50 outline-none ring-1 transition-all duration-500 focus:bg-white focus:shadow-xl resize-none
                      ${errors.message ? 'ring-rose-500/50' : 'ring-black/5 group-focus-within:ring-primary/40'}`}
                  />
                  {errors.message && (
                    <div className="mt-2 flex items-center gap-1.5 text-rose-500 text-[10px] font-bold uppercase tracking-wider ml-1">
                      <AlertCircle size={12} />
                      <span>{errors.message.message}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-[10px] text-muted-foreground font-medium max-w-sm leading-relaxed text-center md:text-left italic">
                  Deine Daten werden gemäß unserer Datenschutzerklärung sicher verarbeitet.
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative bg-primary text-primary-foreground px-12 py-5 rounded-full text-lg font-bold hover:bg-primary/95 transition-all duration-300 active:scale-[0.95] disabled:opacity-50 disabled:scale-100 shadow-2xl shadow-primary/20 overflow-hidden min-w-[240px] flex items-center justify-center gap-4"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Nachricht senden
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1.5 transition-transform duration-500">
                        <Send size={16} />
                      </div>
                    </>
                  )}
                  
                  {/* Hover Liquid Effect */}
                  {!isSubmitting && (
                    <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  )}
                </button>
              </div>

              {/* Error Message */}
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-sm font-medium flex items-center gap-3"
                >
                  <AlertCircle size={18} />
                  {errorMessage}
                </motion.div>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
