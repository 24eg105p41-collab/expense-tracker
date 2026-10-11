import { PAGE_SIZE_OPTIONS } from '../../utils/constants';

interface Props {
  page: number; // zero based
  totalPages: number;
  totalElements: number;
  size: number;
  onPageChange: (page: number) => void;
  onSizeChange: (size: number) => void;
}

export default function Pagination({ page, totalPages, totalElements, size, onPageChange, onSizeChange }: Props) {
  if (totalElements === 0) return null;
  const start = page * size + 1;
  const end = Math.min((page + 1) * size, totalElements);

  return (
    <div className="pagination">
      <span className="pagination-info">
        Showing {start}–{end} of {totalElements}
      </span>
      <div className="pagination-controls">
        <label className="pagination-size">
          Rows
          <select value={size} onChange={(e) => onSizeChange(Number(e.target.value))}>
            {PAGE_SIZE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </label>
        <button type="button" className="btn btn-small" disabled={page === 0} onClick={() => onPageChange(page - 1)}>
          ← Prev
        </button>
        <span className="pagination-page">
          Page {page + 1} / {Math.max(totalPages, 1)}
        </span>
        <button
          type="button"
          className="btn btn-small"
          disabled={page + 1 >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
