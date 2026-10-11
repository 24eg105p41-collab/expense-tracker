import type { ExpenseFormData } from '../types/expense';

export type FormErrors = Partial<Record<keyof ExpenseFormData, string>>;

const AMOUNT_PATTERN = /^\d+(\.\d{1,2})?$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function validateExpenseForm(data: ExpenseFormData): FormErrors {
  const errors: FormErrors = {};

  const title = data.title.trim();
  if (!title) errors.title = 'Title is required';
  else if (title.length > 120) errors.title = 'Title must be at most 120 characters';

  const amount = data.amount.trim();
  if (!amount) {
    errors.amount = 'Amount is required';
  } else if (!AMOUNT_PATTERN.test(amount)) {
    errors.amount = 'Enter a valid amount with up to 2 decimals';
  } else if (Number(amount) < 0.01) {
    errors.amount = 'Amount must be at least 0.01';
  } else if (Number(amount) >= 10_000_000_000) {
    errors.amount = 'Amount is too large';
  }

  if (!data.category) errors.category = 'Please choose a category';

  if (!data.expenseDate) errors.expenseDate = 'Date is required';
  else if (!DATE_PATTERN.test(data.expenseDate) || Number.isNaN(Date.parse(data.expenseDate))) {
    errors.expenseDate = 'Enter a valid date';
  }

  if (data.description.length > 500) errors.description = 'Description must be at most 500 characters';

  return errors;
}

export function hasErrors(errors: FormErrors): boolean {
  return Object.keys(errors).length > 0;
}
