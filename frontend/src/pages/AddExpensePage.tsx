import { useNavigate } from 'react-router-dom';
import ExpenseForm from '../components/expense/ExpenseForm';
import { useNotification } from '../context/NotificationContext';
import { expenseService } from '../services/expenseService';
import type { ExpensePayload } from '../types/expense';

export default function AddExpensePage() {
  const navigate = useNavigate();
  const { notify } = useNotification();

  const handleSubmit = async (payload: ExpensePayload) => {
    await expenseService.create(payload);
    notify('success', 'Expense added');
    navigate('/expenses');
  };

  return (
    <>
      <div className="page-head">
        <h1>Add expense</h1>
      </div>
      <ExpenseForm submitLabel="Add expense" onSubmit={handleSubmit} />
    </>
  );
}
