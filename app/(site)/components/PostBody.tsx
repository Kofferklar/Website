import { PortableText, PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface PostBodyProps {
  content: unknown // PortableText value is complex, using unknown to satisfy ESLint
}

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-16 mb-8 leading-[1.1]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mt-12 mb-6">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8 max-w-[65ch]">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-accent pl-8 py-4 my-12 italic text-foreground text-xl md:text-2xl bg-accent/5 rounded-r-3xl">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="space-y-4 mb-10 list-none">
        {children}
      </ul>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-4 text-muted-foreground text-lg md:text-xl">
        <div className="w-2 h-2 rounded-full bg-accent mt-2.5 flex-shrink-0" />
        <span>{children}</span>
      </li>
    ),
  },
  types: {
    image: ({ value }) => {
      return (
        <div className="my-16 relative p-2.5 rounded-[3rem] bg-black/5 ring-1 ring-black/5 overflow-hidden">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[calc(3rem-0.75rem)] bg-white">
            <Image
              src={urlFor(value).width(1200).height(750).url()}
              alt={value.alt || 'Ratgeber Bild'}
              fill
              className="object-cover"
            />
          </div>
          {value.caption && (
            <div className="mt-4 px-8 text-xs font-bold tracking-widest uppercase text-muted-foreground/60 text-center">
              {value.caption}
            </div>
          )}
        </div>
      )
    },
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      return (
        <a
          href={value.href}
          rel={rel}
          className="text-primary font-bold border-b border-primary/20 hover:border-primary transition-colors"
        >
          {children}
        </a>
      )
    },
    strong: ({ children }) => (
      <strong className="text-foreground font-bold">{children}</strong>
    ),
  },
}

/**
 * PostBody Server Component
 * Renders Sanity PortableText with high-end editorial styling and an internal CTA.
 */
export default function PostBody({ content }: PostBodyProps) {
  return (
    <article className="max-w-[75ch] mx-auto">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <PortableText value={content as any} components={components} />

      {/* Editorial Internal CTA (BLOG-05) */}
      <div className="mt-24 p-2.5 rounded-[3.5rem] bg-primary/5 ring-1 ring-primary/10 overflow-hidden group">
        <div className="bg-white rounded-[calc(3.5rem-0.75rem)] p-10 md:p-16 text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/10 blur-[100px] rounded-full" />

          <div className="relative z-10">
            <div className="text-accent text-[10px] font-bold tracking-[0.4em] uppercase mb-8">System-Tipp</div>
            <h3 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-8 leading-tight">
              Schluss mit Koffer-Chaos. <br />
              <span className="italic text-primary">Starte organisiert.</span>
            </h3>
            <p className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto leading-relaxed">
              Unsere Leser nutzen das KofferKlar Set, um Kleidung klar zu sortieren und Platz im Gepäck besser auszunutzen.
            </p>

            <Link
              href="/produkt?utm_source=website&utm_medium=navigation&utm_campaign=kofferklar-launch"
              className="group inline-flex items-center gap-5 bg-primary text-primary-foreground px-10 py-5 rounded-full text-lg font-bold hover:bg-primary/95 transition-all duration-300 active:scale-[0.98] shadow-2xl shadow-primary/20"
              style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
            >
              Pack-Set ansehen
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1.5 transition-transform duration-500">
                <ArrowRight size={18} />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
