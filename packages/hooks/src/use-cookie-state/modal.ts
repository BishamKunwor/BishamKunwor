import type { Noop } from './types';

export const CookieDataStore = new Map<string, CookieInit>();
export const subscribers = new Set<Noop>();
