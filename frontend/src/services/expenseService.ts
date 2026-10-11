import api from './api';
import type { Expense, ExpenseFilters, ExpensePayload, PageResponse } from '../types/expense';

/** Drops empty filter values so they are not sent as "?q=&category=". */
function buildParams(filters: ExpenseFilters): Record<string, string | number> {
  const params: Record<string, string | number> = {
    page: filters.page,
    size: filters.size,
    sortBy: filters.sortBy,
    direction: filters.direction,
  };
  if (filters.q.trim()) params.q = filters.q.trim();
  if (filters.category) params.category = filters.category;
  if (filters.from) params.from = filters.from;
  if (filters.to) params.to = filters.to;
  return params;
}

export const expenseService = {
  async list(filters: ExpenseFilters): Promise<PageResponse<Expense>> {
    const { data } = await api.get<PageResponse<Expense>>('/expenses', { params: buildParams(filters) });
    return data;
  },

  async getById(id: number | string): Promise<Expense> {
    const { data } = await api.get<Expense>(`/expenses/${id}`);
    return data;
  },

  async create(payload: ExpensePayload): Promise<Expense> {
    const { data } = await api.post<Expense>('/expenses', payload);
    return data;
  },

  async update(id: number | string, payload: ExpensePayload): Promise<Expense> {
    const { data } = await api.put<Expense>(`/expenses/${id}`, payload);
    return data;
  },

  async remove(id: number | string): Promise<void> {
    await api.delete(`/expenses/${id}`);
  },
};
