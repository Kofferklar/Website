import Header from './components/Header'
import Footer from './components/Footer'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded"
      >
        Zum Hauptinhalt springen
      </a>
      <Header />
      {children}
      <Footer />
    </>
  )
}
