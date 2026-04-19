import React from 'react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import type { SetPart } from '@/lib/sanity/types'

interface SetOverviewProps {
  parts: SetPart[]
}

function getPartIcon(partName: string): React.ReactNode {
  const name = partName.toLowerCase()

  // XL cube — must come before L check
  if (name.includes('xl')) return (
    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="6" y="10" width="28" height="22" rx="2"/>
      <path d="M6 16h28"/>
      <path d="M14 10V6h12v4"/>
    </svg>
  )

  // L cube
  if (name.includes(' l') || name.endsWith(' l') || name === 'packwürfel l') return (
    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="8" y="11" width="24" height="20" rx="2"/>
      <path d="M8 17h24"/>
      <path d="M15 11V7h10v4"/>
    </svg>
  )

  // M cube
  if (name.includes(' m') || name.endsWith(' m') || name === 'packwürfel m') return (
    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="12" width="22" height="18" rx="2"/>
      <path d="M9 18h22"/>
      <path d="M15 12V8h10v4"/>
    </svg>
  )

  // Shoe bag / Schuhbeutel
  if (name.includes('schuh')) return (
    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 28l4-14h16l4 14H8z"/>
      <path d="M12 14c0-4 16-4 16 0"/>
      <path d="M10 22h20"/>
    </svg>
  )

  // Toiletry bag / Kulturbeutel
  if (name.includes('kultur')) return (
    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="7" y="16" width="26" height="18" rx="3"/>
      <path d="M13 16v-4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4"/>
      <path d="M20 22v6"/>
      <path d="M17 25h6"/>
    </svg>
  )

  // Laundry bag / Wäschebeutel
  if (name.includes('wäsche')) return (
    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 8h12l3 5v19a2 2 0 0 1-2 2H13a2 2 0 0 1-2-2V13l3-5z"/>
      <path d="M11 13h18"/>
      <path d="M20 18v10"/>
      <path d="M16 22l4-4 4 4"/>
    </svg>
  )

  // S cube — default fallback (also catches "s (1)" and "s (2)")
  return (
    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="11" y="13" width="18" height="16" rx="2"/>
      <path d="M11 19h18"/>
      <path d="M16 13V9h8v4"/>
    </svg>
  )
}

export default function SetOverview({ parts }: SetOverviewProps) {
  if (!parts || parts.length === 0) return null

  return (
    <section aria-label="Set-Übersicht">
      <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-8">
        Das Set im Überblick
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {parts.map((part, index) => (
          <div
            key={index}
            className="bg-muted rounded-xl p-4 flex flex-col items-center text-center gap-3"
          >
            {/* Icon/Bild */}
            {part.icon?.asset ? (
              <div className="relative w-16 h-16">
                <Image
                  src={urlFor(part.icon).width(64).height(64).url()}
                  alt={part.partName}
                  fill
                  className="object-contain"
                  sizes="64px"
                />
              </div>
            ) : (
              <div className="w-16 h-16 flex items-center justify-center bg-border/30 rounded-lg text-muted-foreground">
                {getPartIcon(part.partName)}
              </div>
            )}

            {/* Name */}
            <p className="font-medium text-sm text-foreground leading-tight">{part.partName}</p>

            {/* Maße */}
            {part.dimensions && (
              <p className="text-xs text-muted-foreground">{part.dimensions}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
