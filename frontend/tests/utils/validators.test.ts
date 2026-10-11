import { describe, expect, it } from 'vitest';
import { hasErrors, validateExpenseForm } from '../../src/utils/validators';

const valid = {
  title: 'Lunch',
  amount: '12.50',
  category: 'FOOD',
  expenseDate: '2026-10-11',
  description: '',
};

describe('validateExpenseForm', () => {
  it('accepts a valid form', () => {
    expect(hasErrors(validateExpenseForm(valid))).toBe(false);
  });

  it('requires a title', () => {
    expect(validateExpenseForm({ ...valid, title: '   ' }).title).toBeDefined();
  });

  it('rejects bad amounts', () => {
    expect(validateExpenseForm({ ...valid, amount: '' }).amount).toBeDefined();
    expect(validateExpenseForm({ ...valid, amount: 'abc' }).amount).toBeDefined();
    expect(validateExpenseForm({ ...valid, amount: '0' }).amount).toBeDefined();
    expect(validateExpenseForm({ ...valid, amount: '-5' }).amount).toBeDefined();
    expect(validateExpenseForm({ ...valid, amount: '1.234' }).amount).toBeDefined();
  });

  it('requires category and date', () => {
    const errors = validateExpenseForm({ ...valid, category: '', expenseDate: '' });
    expect(errors.category).toBeDefined();
    expect(errors.expenseDate).toBeDefined();
  });

  it('limits description length', () => {
    expect(validateExpenseForm({ ...valid, description: 'x'.repeat(501) }).description).toBeDefined();
  });
});
