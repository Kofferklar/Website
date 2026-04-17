// Keine Props — Maße ändern sich produktbedingt nicht

const sizes = [
  { name: 'XL Packwürfel',        dimensions: '40 × 30 × 12 cm', category: 'Würfel' },
  { name: 'L Packwürfel',         dimensions: '35 × 25 × 10 cm', category: 'Würfel' },
  { name: 'M Packwürfel',         dimensions: '30 × 20 × 8 cm',  category: 'Würfel' },
  { name: 'S Packwürfel',         dimensions: '25 × 15 × 7 cm',  category: 'Würfel' },
  { name: 'Schuhbeutel',          dimensions: '30 × 20 cm',       category: 'Flach'  },
  { name: 'Wäschebeutel',         dimensions: '35 × 25 cm',       category: 'Flach'  },
  { name: 'Kosmetik-Beutel',      dimensions: '20 × 15 cm',       category: 'Flach'  },
  { name: 'Kreditkarten-Beutel',  dimensions: '12 × 9 cm',        category: 'Flach'  },
]

export default function SizeChart() {
  return (
    <section aria-label="Maßtabelle">
      <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6">
        Maße &amp; Abmessungen
      </h2>
      {/* Horizontal scroll auf Mobile */}
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
    </section>
  )
}
