'use client';

import { useCallback, useSyncExternalStore } from 'react';

const KEY = 'purpuratta-favoritos';
const EVENT = 'purpuratta:favoritos';
const EMPTY: string[] = [];

let cache: { raw: string | null; list: string[] } = { raw: null, list: EMPTY };

function read(): string[] {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {
    return EMPTY;
  }
  if (raw === cache.raw) return cache.list;
  let list = EMPTY;
  try {
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (Array.isArray(parsed)) list = parsed.filter((s): s is string => typeof s === 'string');
  } catch {
    // dato corrupto: se ignora
  }
  cache = { raw, list };
  return list;
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener('storage', cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener('storage', cb);
  };
}

/** Favoritos guardados en este navegador (sin cuenta de usuario). */
export function useFavorite(slug: string) {
  const list = useSyncExternalStore(subscribe, read, () => EMPTY);
  const isFavorite = list.includes(slug);

  const toggle = useCallback(() => {
    const current = read();
    const next = current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug];
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      return;
    }
    window.dispatchEvent(new Event(EVENT));
  }, [slug]);

  return { isFavorite, toggle };
}
