import { CATEGORY_COLORS, DEFAULT_CATEGORY_COLOR } from '../../utils/constants';

export default function CategoryBadge({ category, label }: { category: string; label: string }) {
  const color = CATEGORY_COLORS[category] ?? DEFAULT_CATEGORY_COLOR;
  return (
    <span className="badge" style={{ backgroundColor: `${color}22`, color }}>
      <span className="badge-dot" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}
