/* KofferKlar Service Worker
 * Strategy summary:
 *   - Precache app shell on install (home, manifest, logo)
 *   - Stale-while-revalidate for /ratgeber/* HTML (offline reading)
 *   - Cache-first for Sanity CDN and /images/* (long-lived static media)
 *   - Network-only for everything else (and explicit bypass routes)
 */

const CACHE_VERSION = 'kk-cache-v1';
const SHELL_CACHE = `${CACHE_VERSION}-shell`;
const HTML_CACHE = `${CACHE_VERSION}-html`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;
const ALLOWED_CACHES = [SHELL_CACHE, HTML_CACHE, IMAGE_CACHE];

const SHELL_ASSETS = ['/', '/manifest.webmanifest', '/LogoKofferklar.svg'];

// Bypass internal Next.js data, API, studio, and auth routes entirely
const BYPASS_PREFIXES = ['/_next/data', '/api', '/studio', '/login'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) => cache.addAll(SHELL_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => !ALLOWED_CACHES.includes(key))
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle same-origin GETs (plus Sanity image CDN, handled below)
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  const isSameOrigin = url.origin === self.location.origin;
  const isSanityCdn = url.hostname === 'cdn.sanity.io';

  if (!isSameOrigin && !isSanityCdn) return;

  // Bypass dynamic/internal routes
  if (
    isSameOrigin &&
    BYPASS_PREFIXES.some((prefix) => url.pathname.startsWith(prefix))
  ) {
    return;
  }

  // Strategy 1: Blog HTML pages → stale-while-revalidate
  if (
    isSameOrigin &&
    url.pathname.startsWith('/ratgeber/') &&
    request.headers.get('accept')?.includes('text/html')
  ) {
    event.respondWith(staleWhileRevalidate(request, HTML_CACHE));
    return;
  }

  // Strategy 2: Sanity CDN images or local /images/* → cache-first
  if (isSanityCdn || (isSameOrigin && url.pathname.startsWith('/images/'))) {
    event.respondWith(cacheFirst(request, IMAGE_CACHE));
    return;
  }

  // Default: network-only (let the browser handle it)
});

// Stale-while-revalidate: respond from cache instantly, refresh in background
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const networkFetch = fetch(request)
    .then((response) => {
      if (response && response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => cached);
  return cached || networkFetch;
}

// Cache-first: serve from cache if present, otherwise fetch and store
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response && response.ok) cache.put(request, response.clone());
    return response;
  } catch (err) {
    return cached || Response.error();
  }
}
