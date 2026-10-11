import { useState } from 'react';
import { Link } from 'react-router-dom';
import ConfirmDialog from '../components/common/ConfirmDialog';
import EmptyState from '../components/common/EmptyState';
import ErrorMessage from '../components/common/ErrorMessage';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Pagination from '../components/common/Pagination';
import ExpenseFilters from '../components/expense/ExpenseFilters';
import ExpenseList from '../components/expense/ExpenseList';
import { useNotification } from '../context/NotificationContext';
import { useDebounce } from '../hooks/useDebounce';
import { useFetch } from '../hooks/useFetch';
import { expenseService } from '../services/expenseService';
import type { Expense, ExpenseFilters as Filters } from '../types/expense';
import { DEFAULT_FILTERS } from '../utils/constants';
import { formatCurrency } from '../utils/currencyFormatter';
import { getErrorMessage } from '../utils/helpers';

export default function ExpensesPage() {
  const { notify } = useNotification();
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const debouncedQ = useDebounce(filters.q, 400);
  const [toDelete, setToDelete] = useState<Expense | null>(null);
  const [deleting, setDeleting] = useState(false);

  const { data, loading, error, refetch } = useFetch(
    () => expenseService.list({ ...filters, q: debouncedQ }),
    [debouncedQ, filters.category, filters.from, filters.to, filters.sortBy, filters.direction, filters.page, filters.size],
  );

  // Any filter change goes back to the first page unless the patch sets the page itself.
  const update = (patch: Partial<Filters>) => setFilters((prev) => ({ ...prev, page: 0, ...patch }));

  const handleSort = (field: string) => {
    if (filters.sortBy === field) {
      update({ direction: filters.direction === 'asc' ? 'desc' : 'asc' });
    } else {
      update({ sortBy: field, direction: field === 'title' || field === 'category' ? 'asc' : 'desc' });
    }
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await expenseService.remove(toDelete.id);
      notify('success', `Deleted “${toDelete.title}”`);
      setToDelete(null);
      if (data && data.content.length === 1 && filters.page > 0) {
        setFilters((prev) => ({ ...prev, page: prev.page - 1 }));
      } else {
        refetch();
      }
    } catch (err) {
      notify('error', getErrorMessage(err));
    } finally {
      setDeleting(false);
    }
  };

  const hasFilters = Boolean(filters.q || filters.category || filters.from || filters.to);

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Expenses</h1>
          {data && (
            <p className="muted">
              {data.totalElements} expense{data.totalElements === 1 ? '' : 's'} found
              {data.content.length > 0 && ` · page total ${formatCurrency(data.content.reduce((s, e) => s + e.amount, 0))}`}
            </p>
          )}
        </div>
        <Link to="/expenses/new" className="btn btn-primary">+ Add expense</Link>
      </div>

      <ExpenseFilters filters={filters} onChange={update} onReset={() => setFilters(DEFAULT_FILTERS)} />

      {error && <ErrorMessage message={error} onRetry={refetch} />}
      {loading && !data && <LoadingSpinner />}

      {data && data.content.length === 0 && !error && (
        <EmptyState
          title={hasFilters ? 'No matching expenses' : 'No expenses yet'}
          message={hasFilters ? 'Try changing or clearing your filters.' : 'Add your first expense to get started.'}
          action={!hasFilters ? <Link to="/expenses/new" className="btn btn-primary">Add expense</Link> : undefined}
        />
      )}

      {data && data.content.length > 0 && (
        <div className={`card list-card${loading ? ' is-loading' : ''}`}>
          <ExpenseList
            expenses={data.content}
            sortBy={filters.sortBy}
            direction={filters.direction}
            onSort={handleSort}
            onDelete={setToDelete}
          />
          <Pagination
            page={data.page}
            totalPages={data.totalPages}
            totalElements={data.totalElements}
            size={data.size}
            onPageChange={(page) => update({ page })}
            onSizeChange={(size) => update({ size })}
          />
        </div>
      )}

      {toDelete && (
        <ConfirmDialog
          title="Delete expense?"
          message={`“${toDelete.title}” (${formatCurrency(toDelete.amount)}) will be permanently removed.`}
          busy={deleting}
          onConfirm={confirmDelete}
          onCancel={() => setToDelete(null)}
        />
      )}
    </>
  );
}
