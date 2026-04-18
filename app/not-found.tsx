import Link from 'next/link'
import Header from '@/app/(site)/components/Header'
import Footer from '@/app/(site)/components/Footer'

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-[60vh] flex flex-col items-center justify-center gap-4 pt-[72px]">
        <h1 className="text-2xl font-semibold text-foreground">Diese Seite existiert nicht.</h1>
        <Link href="/" className="text-primary hover:underline transition-colors duration-200">
          Zurück zur Startseite
        </Link>
      </main>
      <Footer />
    </>
  )
}
