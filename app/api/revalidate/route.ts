import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Webhook endpoint for Sanity Studio (or any trusted source) to selectively
 * purge ISR caches by tag instead of waiting for the 1h revalidate window.
 *
 * Setup in Sanity Studio:
 *   Manage → API → Webhooks → Add new
 *     URL: https://<your-domain>/api/revalidate?secret=<SANITY_REVALIDATE_SECRET>
 *     Trigger on: Create / Update / Delete
 *     Filter:  _type in ['product','review','banner','post','page','siteSettings','faqItem']
 *     Projection:
 *       { "tag": select(
 *           _type == "product"      => "product",
 *           _type == "review"       => "reviews",
 *           _type == "banner"       => "banner",
 *           _type == "post"         => "posts",
 *           _type == "page"         => "pages",
 *           _type == "siteSettings" => "settings",
 *           _type == "faqItem"      => "faq",
 *           "all"
 *         ),
 *         "slug": slug.current
 *       }
 *
 * Locally you can also just hit:
 *   curl -X POST "http://localhost:3000/api/revalidate?secret=$SANITY_REVALIDATE_SECRET" \
 *        -H 'content-type: application/json' \
 *        -d '{"tag":"reviews"}'
 */

type Payload = {
  tag?: string
  slug?: string
}

const KNOWN_TAGS = new Set([
  'product',
  'reviews',
  'banner',
  'posts',
  'pages',
  'settings',
  'faq',
  'all',
])

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  const expected = process.env.SANITY_REVALIDATE_SECRET

  if (!expected) {
    return NextResponse.json({ ok: false, error: 'server_misconfigured' }, { status: 500 })
  }

  if (secret !== expected) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
  }

  let body: Payload = {}
  try {
    body = (await req.json()) as Payload
  } catch {
    // ignore — fallback to query params
  }

  const tag = body.tag ?? req.nextUrl.searchParams.get('tag') ?? undefined
  const slug = body.slug ?? req.nextUrl.searchParams.get('slug') ?? undefined

  if (!tag || !KNOWN_TAGS.has(tag)) {
    return NextResponse.json(
      { ok: false, error: 'invalid_tag', allowed: [...KNOWN_TAGS] },
      { status: 400 }
    )
  }

  const revalidated: string[] = []

  if (tag === 'all') {
    for (const t of KNOWN_TAGS) {
      if (t === 'all') continue
      revalidateTag(t)
      revalidated.push(t)
    }
  } else {
    revalidateTag(tag)
    revalidated.push(tag)

    // Slug-scoped tags for blog posts and pages.
    if (slug && (tag === 'posts' || tag === 'pages')) {
      const scoped = tag === 'posts' ? `post:${slug}` : `page:${slug}`
      revalidateTag(scoped)
      revalidated.push(scoped)
    }
  }

  return NextResponse.json({ ok: true, revalidated, at: new Date().toISOString() })
}
