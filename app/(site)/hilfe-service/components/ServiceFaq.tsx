'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, Search } from 'lucide-react'

interface FaqItem {
  _id: string
  question: string
  answer: string
  category?: string
}

interface ServiceFaqProps {
  items: FaqItem[]
}

/**
 * ServiceFaq Client Component
 * Categorized accordion with Framer Motion animations and asymmetric layout.
 */
export default function ServiceFaq({ items }: ServiceFaqProps) {
  const [activeCategory, setCategory] = useState<string>('Alle')
  const [openId, setOpenId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const categories = ['Alle', ...Array.from(new Set(items.map(item => item.category || 'Allgemein')))]

  const filteredItems = items.filter(item => {
    const matchesCategory = activeCategory === 'Alle' || (item.category || 'Allgemein') === activeCategory
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-16 lg:gap-24 items-start">
          
          {/* --- Left Column: Navigation & Search --- */}
          <aside className="space-y-12 sticky top-[100px]">
            <div>
               <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-8">Navigation</h3>
               <nav className="flex flex-wrap lg:flex-col gap-3">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => {
                        setCategory(cat)
                        setOpenId(null)
                      }}
                      className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border
                        ${activeCategory === cat 
                          ? 'bg-primary text-white border-primary shadow-xl shadow-primary/20 scale-105' 
                          : 'bg-transparent text-muted-foreground border-black/5 hover:border-black/20'}`}
                    >
                      {cat}
                    </button>
                  ))}
               </nav>
            </div>

            <div className="pt-8 border-t border-black/5">
               <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-6">Suche</h3>
               <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40 group-focus-within:text-primary transition-colors" size={18} />
                  <input 
                    type="text"
                    placeholder="Frage suchen..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-muted/40 border-none rounded-2xl pl-12 pr-4 py-4 text-sm outline-none ring-1 ring-black/5 focus:ring-primary/40 focus:bg-white transition-all duration-500"
                  />
               </div>
            </div>
          </aside>

          {/* --- Right Column: Accordion --- */}
          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredItems.length > 0 ? (
                filteredItems.map((item, idx) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    className="p-2 rounded-[2rem] bg-black/5 ring-1 ring-black/5 overflow-hidden"
                  >
                    <div className="bg-white rounded-[calc(2rem-0.5rem)] overflow-hidden transition-shadow duration-500 hover:shadow-lg">
                      <button
                        onClick={() => setOpenId(openId === item._id ? null : item._id)}
                        className="w-full px-8 py-8 flex items-center justify-between text-left group"
                      >
                        <span className="text-lg md:text-xl font-bold text-foreground pr-8 group-hover:text-primary transition-colors leading-snug">
                          {item.question}
                        </span>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500
                          ${openId === item._id ? 'bg-primary text-white rotate-180' : 'bg-muted/50 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'}`}>
                          {openId === item._id ? <Minus size={20} /> : <Plus size={20} />}
                        </div>
                      </button>

                      <AnimatePresence>
                        {openId === item._id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <div className="px-8 pb-10">
                               <div className="w-full h-px bg-black/5 mb-8" />
                               <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-[65ch]">
                                 {item.answer}
                               </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="py-20 text-center bg-muted/20 rounded-[2rem] border border-dashed border-black/10">
                   <p className="text-muted-foreground italic">Keine passenden Fragen gefunden.</p>
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  )
}
