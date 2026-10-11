import type { DashboardData } from '../../types/expense';
import { formatCurrency } from '../../utils/currencyFormatter';

export default function SummaryCards({ data }: { data: DashboardData }) {
  const { currentMonthTotal, previousMonthTotal } = data;
  const change = previousMonthTotal > 0 ? ((currentMonthTotal - previousMonthTotal) / previousMonthTotal) * 100 : null;

  return (
    <div className="summary-grid">
      <div className="card stat">
        <span className="stat-label">Total spent</span>
        <span className="stat-value">{formatCurrency(data.totalExpenses)}</span>
        <span className="stat-sub">{data.expenseCount} expense{data.expenseCount === 1 ? '' : 's'} recorded</span>
      </div>

      <div className="card stat">
        <span className="stat-label">This month</span>
        <span className="stat-value">{formatCurrency(currentMonthTotal)}</span>
        {change === null ? (
          <span className="stat-sub">No spending last month</span>
        ) : (
          <span className={`stat-sub ${change > 0 ? 'trend-up' : 'trend-down'}`}>
            {change > 0 ? '▲' : '▼'} {Math.abs(change).toFixed(1)}% vs last month
          </span>
        )}
      </div>

      <div className="card stat">
        <span className="stat-label">Average expense</span>
        <span className="stat-value">{formatCurrency(data.averageExpense)}</span>
        <span className="stat-sub">per recorded expense</span>
      </div>

      <div className="card stat">
        <span className="stat-label">Top category</span>
        <span className="stat-value stat-text">{data.topCategory ?? '—'}</span>
        <span className="stat-sub">highest total spend</span>
      </div>
    </div>
  );
}
