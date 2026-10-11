export interface Expense {
  id: number;
  title: string;
  amount: number;
  category: string;
  categoryLabel: string;
  expenseDate: string; // yyyy-MM-dd
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

/** Raw form values (everything is a string while the user is typing). */
export interface ExpenseFormData {
  title: string;
  amount: string;
  category: string;
  expenseDate: string;
  description: string;
}

/** Body sent to POST / PUT /api/expenses */
export interface ExpensePayload {
  title: string;
  amount: number;
  category: string;
  expenseDate: string;
  description?: string;
}

export interface Category {
  value: string;
  label: string;
}

export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

export type SortDirection = 'asc' | 'desc';

export interface ExpenseFilters {
  q: string;
  category: string;
  from: string;
  to: string;
  sortBy: string;
  direction: SortDirection;
  page: number;
  size: number;
}

export interface CategorySummary {
  category: string;
  label: string;
  total: number;
  count: number;
  percentage: number;
}

export interface MonthlySummary {
  month: string;
  label: string;
  total: number;
}

export interface DashboardData {
  totalExpenses: number;
  expenseCount: number;
  currentMonthTotal: number;
  previousMonthTotal: number;
  averageExpense: number;
  topCategory: string | null;
  categoryBreakdown: CategorySummary[];
  monthlyTrend: MonthlySummary[];
  recentExpenses: Expense[];
}
