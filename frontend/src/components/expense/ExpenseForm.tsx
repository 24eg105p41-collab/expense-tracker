import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useCategories } from '../../context/CategoryContext';
import type { Expense, ExpenseFormData, ExpensePayload } from '../../types/expense';
import { getErrorMessage } from '../../utils/helpers';
import { todayISO } from '../../utils/dateFormatter';
import { hasErrors, validateExpenseForm } from '../../utils/validators';
import type { FormErrors } from '../../utils/validators';

interface Props {
  initial?: Expense;
  submitLabel: string;
  onSubmit: (payload: ExpensePayload) => Promise<void>;
}

function toFormData(expense?: Expense): ExpenseFormData {
  if (!expense) {
    return { title: '', amount: '', category: '', expenseDate: todayISO(), description: '' };
  }
  return {
    title: expense.title,
    amount: expense.amount.toFixed(2),
    category: expense.category,
    expenseDate: expense.expenseDate,
    description: expense.description ?? '',
  };
}

export default function ExpenseForm({ initial, submitLabel, onSubmit }: Props) {
  const { categories } = useCategories();
  const [form, setForm] = useState<ExpenseFormData>(() => toFormData(initial));
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const setField = (field: keyof ExpenseFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setServerError(null);

    const found = validateExpenseForm(form);
    setErrors(found);
    if (hasErrors(found)) return;

    const payload: ExpensePayload = {
      title: form.title.trim(),
      amount: Number(form.amount),
      category: form.category,
      expenseDate: form.expenseDate,
      description: form.description.trim() || undefined,
    };

    setSubmitting(true);
    try {
      await onSubmit(payload);
    } catch (err) {
      setServerError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="card form" onSubmit={handleSubmit} noValidate>
      {serverError && <div className="alert alert-error" role="alert">{serverError}</div>}

      <label className="field">
        <span>Title *</span>
        <input
          type="text"
          value={form.title}
          maxLength={120}
          placeholder="e.g. Grocery shopping"
          onChange={(e) => setField('title', e.target.value)}
        />
        {errors.title && <small className="field-error">{errors.title}</small>}
      </label>

      <div className="form-row">
        <label className="field">
          <span>Amount *</span>
          <input
            type="text"
            inputMode="decimal"
            value={form.amount}
            placeholder="0.00"
            onChange={(e) => setField('amount', e.target.value)}
          />
          {errors.amount && <small className="field-error">{errors.amount}</small>}
        </label>

        <label className="field">
          <span>Date *</span>
          <input type="date" value={form.expenseDate} onChange={(e) => setField('expenseDate', e.target.value)} />
          {errors.expenseDate && <small className="field-error">{errors.expenseDate}</small>}
        </label>
      </div>

      <label className="field">
        <span>Category *</span>
        <select value={form.category} onChange={(e) => setField('category', e.target.value)}>
          <option value="">Select a category</option>
          {categories.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
        {errors.category && <small className="field-error">{errors.category}</small>}
      </label>

      <label className="field">
        <span>Description</span>
        <textarea
          rows={3}
          value={form.description}
          maxLength={500}
          placeholder="Optional notes"
          onChange={(e) => setField('description', e.target.value)}
        />
        <small className="hint">{form.description.length}/500</small>
        {errors.description && <small className="field-error">{errors.description}</small>}
      </label>

      <div className="form-actions">
        <Link to="/expenses" className="btn">Cancel</Link>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Saving…' : submitLabel}
        </button>
      </div>
    </form>
  );
}
