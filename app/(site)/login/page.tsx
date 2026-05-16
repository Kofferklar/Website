import { loginAction } from './actions'
import PreloadAssets from './PreloadAssets'

// Edge runtime: cookie-set + redirect runs in ~30ms instead of ~300ms cold start.
// next/headers cookies() + next/navigation redirect() are both edge-compatible.
export const runtime = 'edge'

export const metadata = {
  title: 'KofferKlar Zugang',
  robots: { index: false, follow: false },
}

type Props = {
  searchParams: Promise<{ from?: string; error?: string }>
}

export default async function LoginPage({ searchParams }: Props) {
  const { from = '/', error } = await searchParams

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F6F2]">
      <PreloadAssets />
      <div className="w-full max-w-sm px-8 py-10 bg-white rounded-2xl shadow-sm border border-neutral-100">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-neutral-900 tracking-tight">KofferKlar</h1>
          <p className="mt-2 text-sm text-neutral-500">Diese Seite ist passwortgeschützt.</p>
        </div>

        <form action={loginAction}>
          <input type="hidden" name="from" value={from} />

          <div className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">
                Passwort
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoFocus
                autoComplete="current-password"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600">Falsches Passwort. Bitte versuche es erneut.</p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors"
            >
              Einloggen
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
