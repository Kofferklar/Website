'use client'

import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface LegalLayoutProps {
  title: string
  subtitle?: string
  children: React.ReactNode
}

/**
 * LegalLayout Component
 * High-end editorial layout for legal texts (Impressum, Datenschutz, etc.)
 */
export default function LegalLayout({ title, subtitle, children }: LegalLayoutProps) {
  return (
    <main id="main-content" className="pt-[72px] bg-white min-h-screen">
      {/* Editorial Header */}
      <header className="py-20 md:py-32 lg:py-40 bg-muted/20 border-b border-black/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 -skew-x-12 translate-x-1/2 pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
          <Link 
            href="/" 
            className="group inline-flex items-center gap-3 text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors mb-12"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Zurück zur Startseite
          </Link>
          
          <div className="max-w-4xl">
            <div className="text-accent text-[10px] font-bold tracking-[0.3em] uppercase mb-6">Rechtliches</div>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[1.05] tracking-tight mb-8">
              {title}
            </h1>
            {subtitle && (
              <p className="text-muted-foreground text-lg md:text-xl lg:text-2xl leading-relaxed max-w-2xl italic">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </header>

      {/* Content Area */}
      <section className="py-24 md:py-32 lg:py-40">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[75ch] mx-auto prose prose-lg prose-slate prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
          >
            {children}
          </motion.article>
        </div>
      </section>

      {/* Simple Footer Callout */}
      <footer className="py-20 bg-muted/10 border-t border-black/5 text-center">
         <div className="max-w-4xl mx-auto px-4">
            <p className="text-sm text-muted-foreground font-medium italic">
               Stand der Informationen: April 2026
            </p>
         </div>
      </footer>
    </main>
  )
}
