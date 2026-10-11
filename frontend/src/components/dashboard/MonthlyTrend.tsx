import type { MonthlySummary } from '../../types/expense';
import { formatCurrency } from '../../utils/currencyFormatter';

export default function MonthlyTrend({ items }: { items: MonthlySummary[] }) {
  const max = Math.max(...items.map((i) => i.total), 0);

  return (
    <section className="card">
      <h2 className="card-title">Last {items.length} months</h2>
      <div className="trend" role="img" aria-label="Monthly spending bar chart">
        {items.map((item) => {
          const height = max > 0 ? Math.max((item.total / max) * 100, item.total > 0 ? 3 : 0) : 0;
          return (
            <div className="trend-col" key={item.month} title={`${item.label}: ${formatCurrency(item.total)}`}>
              <span className="trend-amount">{item.total > 0 ? formatCurrency(item.total) : ''}</span>
              <div className="trend-bar-wrap">
                <div className="trend-bar" style={{ height: `${height}%` }} />
              </div>
              <span className="trend-label">{item.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
