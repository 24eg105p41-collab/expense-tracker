import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { categoryService } from '../services/categoryService';
import type { Category } from '../types/expense';

interface CategoryContextValue {
  categories: Category[];
  loading: boolean;
}

const CategoryContext = createContext<CategoryContextValue | undefined>(undefined);

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    categoryService
      .list()
      .then((list) => {
        if (!cancelled) setCategories(list);
      })
      .catch(() => {
        /* the pages show their own error if the API is down */
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(() => ({ categories, loading }), [categories, loading]);
  return <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>;
}

export function useCategories(): CategoryContextValue {
  const ctx = useContext(CategoryContext);
  if (!ctx) throw new Error('useCategories must be used inside CategoryProvider');
  return ctx;
}
