import { PortableText, PortableTextComponents } from '@portabletext/react'

interface ProductDescriptionProps {
  content: unknown // PortableText blockContent array from Sanity
}

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mt-10 mb-4 leading-[1.1]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground mt-8 mb-3">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-5">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-accent pl-6 py-3 my-8 italic text-foreground text-lg bg-accent/5 rounded-r-2xl">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="space-y-3 mb-8 list-none">
        {children}
      </ul>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-3 text-muted-foreground text-base md:text-lg">
        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0" />
        <span>{children}</span>
      </li>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      return (
        <a
          href={value.href}
          rel={rel}
          className="text-primary font-semibold border-b border-primary/20 hover:border-primary transition-colors"
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
 * ProductDescription Server Component
 * Renders the product's long-form PortableText description from Sanity.
 */
export default function ProductDescription({ content }: ProductDescriptionProps) {
  if (!content) return null

  return (
    <div className="max-w-3xl">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <PortableText value={content as any} components={components} />
    </div>
  )
}
