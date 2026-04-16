import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (pathname.startsWith('/studio')) {
    const authHeader = request.headers.get('authorization')
    const password = process.env.STUDIO_PASSWORD

    if (!password) {
      return NextResponse.next()
    }

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
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/studio/:path*'],
}
