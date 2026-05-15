import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-12 md:py-16">
        {/* 4-column grid desktop, 1-column mobile */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Logo + tagline */}
          <div className="flex flex-col gap-4">
            <Link href="/?utm_source=website&utm_medium=navigation&utm_campaign=kofferklar-launch" aria-label="KofferKlar, zur Startseite">
              <Image
                src="/LogoKofferklar.svg"
                alt="KofferKlar Logo"
                width={52}
                height={56}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-sm text-muted-foreground max-w-[200px]">
              Ordnung im Koffer, Freude auf Reisen.
            </p>
          </div>

          {/* Column 2: Produkt */}
          <div>
            <p className="text-sm font-semibold text-foreground uppercase tracking-[0.1em] mb-4">
              Produkt
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href="/produkt?utm_source=website&utm_medium=navigation&utm_campaign=kofferklar-launch"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Produktseite
              </Link>
              <Link
                href="/ueber-uns"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Über uns
              </Link>
            </div>
          </div>

          {/* Column 3: Service */}
          <div>
            <p className="text-sm font-semibold text-foreground uppercase tracking-[0.1em] mb-4">
              Service
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href="/hilfe-service"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Hilfe & Service
              </Link>
              <Link
                href="/ratgeber"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Ratgeber
              </Link>
            </div>
          </div>

          {/* Column 4: Rechtliches */}
          <div>
            <p className="text-sm font-semibold text-foreground uppercase tracking-[0.1em] mb-4">
              Rechtliches
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href="/impressum"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Impressum
              </Link>
              <Link
                href="/datenschutz"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Datenschutz
              </Link>
              <Link
                href="/agb"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                AGB
              </Link>
              <Link
                href="/widerruf"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Widerruf
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 KofferKlar. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-1">
            {/* Instagram icon. inline SVG (lucide-react v0.4x does not export Instagram) */}
            <a
              href="https://instagram.com/kofferklar"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram-Profil"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-full focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            {/* Facebook icon. inline SVG (lucide-react v0.4x does not export Facebook) */}
            <a
              href="https://facebook.com/kofferklar"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook-Seite"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-full focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
