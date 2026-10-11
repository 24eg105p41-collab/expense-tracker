import api from './api';
import type { Category } from '../types/expense';

export const categoryService = {
  async list(): Promise<Category[]> {
    const { data } = await api.get<Category[]>('/categories');
    return data;
  },
};
