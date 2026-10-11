import { CURRENCY, LOCALE } from '../config/apiConfig';

export function formatCurrency(amount: number, currency: string = CURRENCY, locale: string = LOCALE): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
}
