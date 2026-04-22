'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function loginAction(formData: FormData) {
  const password = formData.get('password') as string
  const from = (formData.get('from') as string) || '/'

  const sitePassword = process.env.SITE_PASSWORD
  const siteAuthToken = process.env.SITE_AUTH_TOKEN

  if (!sitePassword || !siteAuthToken) {
    redirect(from)
  }

  if (password !== sitePassword) {
    redirect(`/login?from=${encodeURIComponent(from)}&error=1`)
  }

  const cookieStore = await cookies()
  cookieStore.set('kk-site-auth', siteAuthToken, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })

  redirect(from)
}
