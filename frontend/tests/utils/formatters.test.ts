import { describe, expect, it } from 'vitest';
import { formatCurrency } from '../../src/utils/currencyFormatter';
import { formatDate, parseISODate, toISODate } from '../../src/utils/dateFormatter';
import { truncate } from '../../src/utils/helpers';

describe('formatCurrency', () => {
  it('formats using the given currency and locale', () => {
    expect(formatCurrency(1234.5, 'USD', 'en-US')).toBe('$1,234.50');
  });
});

describe('date helpers', () => {
  it('parses ISO dates as local dates', () => {
    const d = parseISODate('2026-01-05');
    expect(d.getFullYear()).toBe(2026);
    expect(d.getMonth()).toBe(0);
    expect(d.getDate()).toBe(5);
  });

  it('round-trips through toISODate', () => {
    expect(toISODate(parseISODate('2026-12-31'))).toBe('2026-12-31');
  });

  it('formats a date for display', () => {
    expect(formatDate('2026-03-09', 'en-US')).toBe('Mar 09, 2026');
  });
});

describe('truncate', () => {
  it('shortens long text', () => {
    expect(truncate('abcdefghij', 5)).toBe('abcd…');
    expect(truncate('abc', 5)).toBe('abc');
  });
});
