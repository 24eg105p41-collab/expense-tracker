import { Link } from 'react-router-dom';
import type { Expense, SortDirection } from '../../types/expense';
import { formatCurrency } from '../../utils/currencyFormatter';
import { formatDate } from '../../utils/dateFormatter';
import { truncate } from '../../utils/helpers';
import CategoryBadge from './CategoryBadge';

interface Props {
  expenses: Expense[];
  sortBy: string;
  direction: SortDirection;
  onSort: (field: string) => void;
  onDelete: (expense: Expense) => void;
}

const COLUMNS: { field: string; label: string; numeric?: boolean }[] = [
  { field: 'expenseDate', label: 'Date' },
  { field: 'title', label: 'Title' },
  { field: 'category', label: 'Category' },
  { field: 'amount', label: 'Amount', numeric: true },
];

export default function ExpenseList({ expenses, sortBy, direction, onSort, onDelete }: Props) {
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            {COLUMNS.map((col) => {
              const active = sortBy === col.field;
              return (
                <th key={col.field} className={col.numeric ? 'num' : undefined} aria-sort={active ? (direction === 'asc' ? 'ascending' : 'descending') : 'none'}>
                  <button type="button" className="sort-btn" onClick={() => onSort(col.field)}>
                    {col.label}
                    <span className="sort-arrow">{active ? (direction === 'asc' ? '▲' : '▼') : ''}</span>
                  </button>
                </th>
              );
            })}
            <th className="actions-col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((e) => (
            <tr key={e.id}>
              <td data-label="Date">{formatDate(e.expenseDate)}</td>
              <td data-label="Title">
                <div className="expense-title">{e.title}</div>
                {e.description && <div className="expense-desc">{truncate(e.description, 70)}</div>}
              </td>
              <td data-label="Category"><CategoryBadge category={e.category} label={e.categoryLabel} /></td>
              <td data-label="Amount" className="num amount">{formatCurrency(e.amount)}</td>
              <td data-label="Actions" className="actions-col">
                <Link to={`/expenses/${e.id}/edit`} className="btn btn-small">Edit</Link>
                <button type="button" className="btn btn-small btn-danger-outline" onClick={() => onDelete(e)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
