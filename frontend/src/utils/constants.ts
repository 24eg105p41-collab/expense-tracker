import type { ExpenseFilters } from '../types/expense';

export const PAGE_SIZE_OPTIONS = [10, 20, 50];

export const DEFAULT_FILTERS: ExpenseFilters = {
  q: '',
  category: '',
  from: '',
  to: '',
  sortBy: 'expenseDate',
  direction: 'desc',
  page: 0,
  size: 10,
};

export const CATEGORY_COLORS: Record<string, string> = {
  FOOD: '#f97316',
  TRANSPORT: '#0ea5e9',
  HOUSING: '#8b5cf6',
  UTILITIES: '#eab308',
  HEALTH: '#10b981',
  ENTERTAINMENT: '#ec4899',
  SHOPPING: '#6366f1',
  EDUCATION: '#14b8a6',
  TRAVEL: '#f43f5e',
  OTHER: '#64748b',
};

export const DEFAULT_CATEGORY_COLOR = '#64748b';
