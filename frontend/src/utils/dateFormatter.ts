import { LOCALE } from '../config/apiConfig';

/** Parse "yyyy-MM-dd" as a local date (avoids the UTC shift of new Date("2026-01-05")). */
export function parseISODate(iso: string): Date {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function formatDate(iso: string, locale: string = LOCALE): string {
  return parseISODate(iso).toLocaleDateString(locale, { day: '2-digit', month: 'short', year: 'numeric' });
}

export function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function todayISO(): string {
  return toISODate(new Date());
}
