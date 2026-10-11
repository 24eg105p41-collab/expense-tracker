import { Link } from 'react-router-dom';
import type { Expense } from '../../types/expense';
import { formatCurrency } from '../../utils/currencyFormatter';
import { formatDate } from '../../utils/dateFormatter';
import CategoryBadge from '../expense/CategoryBadge';

export default function RecentExpenses({ items }: { items: Expense[] }) {
  return (
    <section className="card">
      <div className="card-head">
        <h2 className="card-title">Recent expenses</h2>
        <Link to="/expenses" className="link">View all →</Link>
      </div>
      {items.length === 0 ? (
        <p className="muted">No expenses yet.</p>
      ) : (
        <ul className="recent-list">
          {items.map((e) => (
            <li key={e.id}>
              <div>
                <div className="expense-title">{e.title}</div>
                <div className="expense-desc">{formatDate(e.expenseDate)}</div>
              </div>
              <div className="recent-right">
                <CategoryBadge category={e.category} label={e.categoryLabel} />
                <strong>{formatCurrency(e.amount)}</strong>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
