import type { CategorySummary } from '../../types/expense';
import { CATEGORY_COLORS, DEFAULT_CATEGORY_COLOR } from '../../utils/constants';
import { formatCurrency } from '../../utils/currencyFormatter';

export default function CategoryBreakdown({ items }: { items: CategorySummary[] }) {
  return (
    <section className="card">
      <h2 className="card-title">Spending by category</h2>
      {items.length === 0 ? (
        <p className="muted">No data yet.</p>
      ) : (
        <ul className="breakdown">
          {items.map((item) => {
            const color = CATEGORY_COLORS[item.category] ?? DEFAULT_CATEGORY_COLOR;
            return (
              <li key={item.category}>
                <div className="breakdown-head">
                  <span className="breakdown-name">
                    <span className="badge-dot" style={{ backgroundColor: color }} />
                    {item.label}
                    <span className="muted"> · {item.count}</span>
                  </span>
                  <span>
                    <strong>{formatCurrency(item.total)}</strong>
                    <span className="muted"> ({item.percentage.toFixed(1)}%)</span>
                  </span>
                </div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${Math.max(item.percentage, 1)}%`, backgroundColor: color }} />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
