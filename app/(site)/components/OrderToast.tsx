'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

const NAMES = [
  'Lisa K.',
  'Max B.',
  'Sophia W.',
  'Jonas R.',
  'Marie L.',
  'Tim S.',
  'Hannah F.',
  'David O.',
  'Lena P.',
  'Tobias H.',
  'Mira E.',
  'Emil Z.',
] as const;

const CITIES = [
  'München',
  'Hamburg',
  'Berlin',
  'Köln',
  'Frankfurt',
  'Düsseldorf',
  'Stuttgart',
  'Leipzig',
  'Bremen',
  'Hannover',
  'Nürnberg',
  'Dresden',
] as const;

const ACTIONS = [
  'hat soeben das Set bestellt',
  'hat das KofferKlar Set in den Warenkorb gelegt',
  'spart gerade mit Code KOFFER10',
] as const;

type ToastData = {
  id: number;
  name: string;
  city: string;
  action: string;
};

function pick<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const VISIBLE_MS = 5_000;
const FIRST_MIN_MS = 12_000;
const FIRST_MAX_MS = 20_000;
const NEXT_MIN_MS = 35_000;
const NEXT_MAX_MS = 60_000;

export default function OrderToast() {
  const [toast, setToast] = useState<ToastData | null>(null);
  const [enabled, setEnabled] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setEnabled(!media.matches);

    const handler = (event: MediaQueryListEvent) => {
      setEnabled(!event.matches);
    };
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let showTimeout: ReturnType<typeof setTimeout> | null = null;
    let hideTimeout: ReturnType<typeof setTimeout> | null = null;
    let cancelled = false;
    let isFirst = true;

    const showOne = () => {
      if (cancelled) return;
      if (typeof document !== 'undefined' && document.hidden) {
        // Defer until the page becomes visible again.
        showTimeout = setTimeout(showOne, 2_000);
        return;
      }
      const next: ToastData = {
        id: Date.now() + Math.random(),
        name: pick(NAMES),
        city: pick(CITIES),
        action: pick(ACTIONS),
      };
      setToast(next);
      hideTimeout = setTimeout(() => {
        if (cancelled) return;
        setToast(null);
        const delay = randomInt(NEXT_MIN_MS, NEXT_MAX_MS);
        showTimeout = setTimeout(showOne, delay);
      }, VISIBLE_MS);
    };

    const initialDelay = isFirst
      ? randomInt(FIRST_MIN_MS, FIRST_MAX_MS)
      : randomInt(NEXT_MIN_MS, NEXT_MAX_MS);
    isFirst = false;
    showTimeout = setTimeout(showOne, initialDelay);

    const onVisibilityChange = () => {
      if (typeof document === 'undefined') return;
      if (document.hidden) {
        if (showTimeout) {
          clearTimeout(showTimeout);
          showTimeout = null;
        }
        if (hideTimeout) {
          clearTimeout(hideTimeout);
          hideTimeout = null;
        }
        setToast(null);
      } else {
        if (!showTimeout && !hideTimeout) {
          const delay = randomInt(NEXT_MIN_MS, NEXT_MAX_MS);
          showTimeout = setTimeout(showOne, delay);
        }
      }
    };

    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', onVisibilityChange);
    }

    return () => {
      cancelled = true;
      if (showTimeout) clearTimeout(showTimeout);
      if (hideTimeout) clearTimeout(hideTimeout);
      if (typeof document !== 'undefined') {
        document.removeEventListener('visibilitychange', onVisibilityChange);
      }
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      className="fixed bottom-6 left-6 z-30 print:hidden pointer-events-none"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -32 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl bg-white shadow-elevated ring-1 ring-black/5 px-4 py-3 flex items-center gap-3 max-w-xs pointer-events-auto"
          >
            <span className="relative inline-flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <ShoppingBag className="h-4 w-4 text-foreground/70 shrink-0" aria-hidden="true" />
            <p className="text-xs text-foreground/80 leading-snug">
              <span className="font-bold text-foreground">{toast.name}</span>
              <span className="text-foreground/60"> aus </span>
              <span className="font-semibold text-foreground/90">{toast.city}</span>{' '}
              {toast.action}.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
