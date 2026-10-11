import { useNavigate, useParams } from 'react-router-dom';
import ErrorMessage from '../components/common/ErrorMessage';
import LoadingSpinner from '../components/common/LoadingSpinner';
import NotFound from '../components/common/NotFound';
import ExpenseForm from '../components/expense/ExpenseForm';
import { useNotification } from '../context/NotificationContext';
import { useFetch } from '../hooks/useFetch';
import { expenseService } from '../services/expenseService';
import type { ExpensePayload } from '../types/expense';

export default function EditExpensePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { notify } = useNotification();

  const { data, loading, error, refetch } = useFetch(() => expenseService.getById(id ?? ''), [id]);

  const handleSubmit = async (payload: ExpensePayload) => {
    await expenseService.update(id ?? '', payload);
    notify('success', 'Expense updated');
    navigate('/expenses');
  };

  if (loading && !data) return <LoadingSpinner />;
  if (error && error.toLowerCase().includes('not found')) return <NotFound message="That expense does not exist." />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;
  if (!data) return null;

  return (
    <>
      <div className="page-head">
        <h1>Edit expense</h1>
      </div>
      <ExpenseForm initial={data} submitLabel="Save changes" onSubmit={handleSubmit} />
    </>
  );
}
