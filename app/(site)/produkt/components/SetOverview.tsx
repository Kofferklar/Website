import Image from 'next/image'
import { Package } from 'lucide-react'
import { urlFor } from '@/lib/sanity/image'
import type { SetPart } from '@/lib/sanity/types'

interface SetOverviewProps {
  parts: SetPart[]
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
              <div className="w-16 h-16 flex items-center justify-center bg-border/30 rounded-lg">
                <Package className="w-8 h-8 text-muted-foreground" aria-hidden="true" />
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
