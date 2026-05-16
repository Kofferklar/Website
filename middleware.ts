import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_PATHS = [
  '/login',
  '/_next/static',
  '/favicon.ico',
  '/favicon.svg',
  '/api/revalidate', // Sanity webhook — secured via SANITY_REVALIDATE_SECRET, not cookie
]

function isPublicPath(pathname: string) {
  return PUBLIC_PATHS.some((p) => pathname.startsWith(p))
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Studio: HTTP Basic Auth
  if (pathname.startsWith('/studio')) {
    const authHeader = request.headers.get('authorization')
    const password = process.env.STUDIO_PASSWORD

    if (!password) return NextResponse.next()

    if (!authHeader) {
      return new NextResponse('Authentication required', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="KofferKlar Studio"' },
      })
    }

    const encoded = Buffer.from(authHeader.split(' ')[1] || '', 'base64').toString()
    const [, receivedPassword] = encoded.split(':')

    if (receivedPassword !== password) {
      return new NextResponse('Unauthorized', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="KofferKlar Studio"' },
      })
    }

    return NextResponse.next()
  }

  // Site-wide password gate (only when SITE_PASSWORD is set)
  const sitePassword = process.env.SITE_PASSWORD
  const siteAuthToken = process.env.SITE_AUTH_TOKEN

  if (sitePassword && siteAuthToken && !isPublicPath(pathname)) {
    const cookie = request.cookies.get('kk-site-auth')

    if (cookie?.value !== siteAuthToken) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('from', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  // Skip _next/ internals and any path with a file extension (static assets)
  matcher: ['/((?!_next|.*\\.[^/]*$).*)'],
}
