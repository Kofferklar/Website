interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
}

export default function SectionWrapper({ children, className }: SectionWrapperProps) {
  return (
    <section className={`max-w-[1400px] mx-auto px-6 md:px-8 ${className ?? ''}`}>
      {children}
    </section>
  )
}
