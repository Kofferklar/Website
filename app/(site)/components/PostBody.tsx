import { PortableText, PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface PostBodyProps {
  content: unknown // PortableText value is complex, using unknown to satisfy ESLint
}

// Build a slug id from heading children text so TOC links resolve.
function headingId(children: unknown): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const text = Array.isArray(children) ? (children as any[]).map(c => (typeof c === 'string' ? c : c?.props?.children ?? '')).join('') : String(children ?? '')
  return text
    .toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 id={headingId(children)} className="font-display text-3xl md:text-4xl font-bold text-foreground mt-16 mb-6 leading-[1.15] tracking-tightest max-w-[28ch] scroll-mt-32">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mt-12 mb-4 leading-[1.25] tracking-tight max-w-[32ch]">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-foreground/80 text-lg md:text-[1.18rem] leading-[1.75] mb-7">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="relative my-14 pl-8 md:pl-10 py-3 border-l-2 border-accent">
        <span className="absolute -top-3 -left-1 font-handwrite text-accent text-4xl leading-none select-none" aria-hidden>&ldquo;</span>
        <div className="font-handwrite text-xl md:text-2xl text-foreground leading-[1.55]">
          {children}
        </div>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="space-y-3 mb-10 list-none mt-2">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="space-y-3 mb-10 list-decimal pl-6 marker:text-accent marker:font-bold text-foreground/80 text-lg leading-[1.75]">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-4 text-foreground/80 text-lg leading-[1.7]">
        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-3 flex-shrink-0" aria-hidden />
        <span>{children}</span>
      </li>
    ),
  },
  types: {
    image: ({ value }) => {
      return (
        <figure className="my-14 -mx-2 md:-mx-6">
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-muted ring-1 ring-black/5 shadow-card">
            <Image
              src={urlFor(value).width(1400).height(875).url()}
              alt={value.alt || 'Ratgeber Bild'}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 720px, 100vw"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-4 px-1 text-sm text-muted-foreground font-handwrite text-center">
              {value.caption}
            </figcaption>
          )}
        </figure>
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
          className="text-primary font-semibold underline decoration-accent/40 underline-offset-[3px] hover:decoration-accent transition-colors"
        >
          {children}
        </a>
      )
    },
    strong: ({ children }) => (
      <strong className="text-foreground font-semibold">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="font-handwrite text-foreground not-italic">{children}</em>
    ),
  },
}

/**
 * PostBody Server Component
 * Renders Sanity PortableText with comfortable measure (max-w-[65ch]) and an internal CTA.
 */
export default function PostBody({ content }: PostBodyProps) {
  return (
    <article className="max-w-[65ch] mx-auto">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <PortableText value={content as any} components={components} />

      {/* Editorial Internal CTA — links to /produkt with UTM */}
      <aside className="mt-20 relative rounded-[2rem] bg-white ring-1 ring-black/5 shadow-card overflow-hidden">
        <div className="absolute -top-20 -right-20 w-56 h-56 bg-accent/10 blur-[100px] rounded-full pointer-events-none" aria-hidden />
        <div className="relative p-8 md:p-12 text-center">
          <div className="text-accent text-[10px] font-bold tracking-[0.4em] uppercase mb-5">Aus dem KofferKlar Set</div>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4 leading-[1.2] tracking-tightest">
            Schluss mit Koffer-Chaos.
            <br />
            <span className="font-handwrite text-primary font-normal tracking-normal">Starte organisiert.</span>
          </h3>
          <p className="text-muted-foreground text-base md:text-lg mb-8 max-w-md mx-auto leading-relaxed">
            Unsere Leser nutzen das KofferKlar Kompressions-Packwürfel-Set, um Kleidung klar zu sortieren und mehr Platz im Gepäck zu schaffen.
          </p>

          <Link
            href="/produkt?utm_source=website&utm_medium=ratgeber-inline-cta&utm_campaign=kofferklar-launch"
            className="group inline-flex items-center gap-4 bg-primary text-primary-foreground px-8 py-4 rounded-full text-base font-bold hover:bg-primary-600 transition-all duration-300 ease-expo active:scale-[0.98] shadow-glow-navy"
          >
            Pack-Set ansehen
            <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform duration-500 ease-expo">
              <ArrowRight size={15} />
            </span>
          </Link>
        </div>
      </aside>
    </article>
  )
}
