import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-semibold text-foreground">Diese Seite existiert nicht.</h1>
      <Link href="/" className="text-primary hover:underline transition-colors duration-200">
        Zurück zur Startseite
      </Link>
    </main>
  )
}
