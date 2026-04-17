'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { FaqItem } from '@/lib/sanity/types'

interface ProductFaqProps {
  items: FaqItem[]
  title?: string
}

function FaqAccordionItem({ item, isOpen, onToggle }: {
  item: FaqItem
  isOpen: boolean
  onToggle: () => void
}) {
  const answerId = `faq-answer-${item._id}`
  const buttonId = `faq-button-${item._id}`

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        id={buttonId}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={answerId}
      >
        <span className="font-medium text-foreground text-sm md:text-base pr-4">
          {item.question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          aria-hidden="true"
        />
      </button>

      {/* Antwort — max-height Transition */}
      <div
        id={answerId}
        role="region"
        aria-labelledby={buttonId}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? '500px' : '0px' }}
      >
        <div className="pb-5 text-sm text-muted-foreground leading-relaxed">
          {item.answer}
        </div>
      </div>
    </div>
  )
}

export default function ProductFaq({ items, title = 'Häufige Fragen' }: ProductFaqProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?._id ?? null)

  const handleToggle = (id: string) => {
    setOpenId(prev => prev === id ? null : id)
  }

  if (!items || items.length === 0) return null

  return (
    <section aria-label="FAQ">
      <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-8">
        {title}
      </h2>
      <div className="divide-y-0 border border-border rounded-2xl overflow-hidden">
        <div className="px-6 divide-y divide-border">
          {items.map((item) => (
            <FaqAccordionItem
              key={item._id}
              item={item}
              isOpen={openId === item._id}
              onToggle={() => handleToggle(item._id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
