import { useCategories } from '../../context/CategoryContext';
import type { ExpenseFilters as Filters } from '../../types/expense';
import ExpenseSearch from './ExpenseSearch';

interface Props {
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
  onReset: () => void;
}

export default function ExpenseFilters({ filters, onChange, onReset }: Props) {
  const { categories } = useCategories();
  const invalidRange = Boolean(filters.from && filters.to && filters.from > filters.to);
  const active = Boolean(filters.q || filters.category || filters.from || filters.to);

  return (
    <div className="card filters">
      <ExpenseSearch value={filters.q} onChange={(q) => onChange({ q })} />

      <div className="filter-row">
        <label className="field">
          <span>Category</span>
          <select value={filters.category} onChange={(e) => onChange({ category: e.target.value })}>
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>From</span>
          <input type="date" value={filters.from} max={filters.to || undefined} onChange={(e) => onChange({ from: e.target.value })} />
        </label>

        <label className="field">
          <span>To</span>
          <input type="date" value={filters.to} min={filters.from || undefined} onChange={(e) => onChange({ to: e.target.value })} />
        </label>

        <button type="button" className="btn" onClick={onReset} disabled={!active}>
          Clear filters
        </button>
      </div>

      {invalidRange && <p className="field-error">The “From” date must not be after the “To” date.</p>}
    </div>
  );
}
