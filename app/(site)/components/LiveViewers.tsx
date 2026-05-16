'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type LiveViewersProps = {
  className?: string;
};

const MIN_VIEWERS = 4;
const MAX_VIEWERS = 12;

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export default function LiveViewers({ className = '' }: LiveViewersProps) {
  const [count, setCount] = useState<number>(() => randomInt(5, 10));

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      setCount((prev) => {
        const delta = Math.random() < 0.5 ? -1 : 1;
        return clamp(prev + delta, MIN_VIEWERS, MAX_VIEWERS);
      });
      const nextDelay = randomInt(25_000, 45_000);
      timeoutId = setTimeout(tick, nextDelay);
    };

    timeoutId = setTimeout(tick, randomInt(25_000, 45_000));

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <span
      className={`hidden md:inline-flex items-center gap-2 rounded-full bg-white/85 backdrop-blur ring-1 ring-black/5 px-3 py-1.5 text-xs font-bold text-foreground/80 shadow-soft ${className}`.trim()}
      aria-live="polite"
    >
      <span className="relative inline-flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60 animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
      </span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={count}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="tabular-nums"
        >
          {count}
        </motion.span>
      </AnimatePresence>
      <span>Leute schauen sich das gerade an</span>
    </span>
  );
}
