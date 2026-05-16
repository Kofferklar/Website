// Keine Props — Maße ändern sich produktbedingt nicht

const sizes = [
  { name: 'Packwürfel XL',   dimensions: '35 × 25 × 8 cm',  category: 'Würfel' },
  { name: 'Packwürfel L',    dimensions: '30 × 22 × 8 cm',  category: 'Würfel' },
  { name: 'Packwürfel M',    dimensions: '25 × 18 × 8 cm',  category: 'Würfel' },
  { name: 'Packwürfel S (1)', dimensions: '20 × 14 × 8 cm', category: 'Würfel' },
  { name: 'Packwürfel S (2)', dimensions: '20 × 14 × 8 cm', category: 'Würfel' },
  { name: 'Schuhbeutel',     dimensions: '30 × 20 × 10 cm', category: 'Beutel' },
  { name: 'Kulturbeutel',    dimensions: '25 × 15 × 10 cm', category: 'Beutel' },
  { name: 'Wäschebeutel',    dimensions: '40 × 30 cm',       category: 'Beutel' },
]

export default function SizeChart() {
  return (
    <details className="group rounded-2xl border-2 border-border bg-muted/30 overflow-hidden" aria-label="Maßtabelle">
      <summary className="flex items-center justify-between cursor-pointer list-none px-5 py-4 md:px-6 md:py-5 hover:bg-muted/50 transition-colors">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-base font-bold shrink-0">+</span>
          <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground">
            Maße &amp; Abmessungen: Das hast du im Überblick
          </h2>
        </div>
        <span className="text-foreground/60 transition-transform duration-300 group-open:rotate-180 shrink-0 ml-3" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
            <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </summary>
      <div className="px-5 md:px-6 pb-6 pt-2 bg-background">
        <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
          <table className="w-full min-w-[480px] text-sm">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="text-left py-3 pr-6 font-semibold text-foreground">Teil</th>
                <th className="text-left py-3 pr-6 font-semibold text-foreground">Maße (komprimiert)</th>
                <th className="text-left py-3 font-semibold text-foreground">Typ</th>
              </tr>
            </thead>
            <tbody>
              {sizes.map((size, index) => (
                <tr
                  key={size.name}
                  className={`border-b border-border ${index % 2 === 0 ? 'bg-background' : 'bg-muted/40'}`}
                >
                  <td className="py-3 pr-6 font-medium text-foreground">{size.name}</td>
                  <td className="py-3 pr-6 text-muted-foreground font-mono text-xs">{size.dimensions}</td>
                  <td className="py-3 text-muted-foreground">{size.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          * Alle Angaben im komprimierten Zustand. Entfaltet ca. 2× größer.
        </p>
      </div>
    </details>
  )
}
