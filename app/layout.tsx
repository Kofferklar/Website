import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { Kalam } from 'next/font/google'
import './globals.css'

const satoshi = localFont({
  src: [
    { path: '../public/fonts/satoshi-regular.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/satoshi-regular.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/satoshi-bold.woff2',    weight: '700', style: 'normal' },
    { path: '../public/fonts/satoshi-bold.woff2',    weight: '800', style: 'normal' },
  ],
  variable: '--font-satoshi',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
})

const kalam = Kalam({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-kalam',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://kofferklar.de'),
  title: { default: 'KofferKlar', template: '%s | KofferKlar' },
  description: 'Das 8-teilige Kompressions-Packwürfel-Set für stressfreies Reisen.',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
}

export const viewport: Viewport = {
  themeColor: '#1E3A5F',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="de"
      className={`${satoshi.variable} ${kalam.variable} antialiased`}
    >
      <body className="overflow-x-hidden font-sans">{children}</body>
    </html>
  )
}
