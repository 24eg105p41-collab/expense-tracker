import { Link } from 'react-router-dom';
import CategoryBreakdown from '../components/dashboard/CategoryBreakdown';
import MonthlyTrend from '../components/dashboard/MonthlyTrend';
import RecentExpenses from '../components/dashboard/RecentExpenses';
import SummaryCards from '../components/dashboard/SummaryCards';
import EmptyState from '../components/common/EmptyState';
import ErrorMessage from '../components/common/ErrorMessage';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useFetch } from '../hooks/useFetch';
import { dashboardService } from '../services/dashboardService';

export default function DashboardPage() {
  const { data, loading, error, refetch } = useFetch(() => dashboardService.get(), []);

  return (
    <>
      <div className="page-head">
        <h1>Dashboard</h1>
        <Link to="/expenses/new" className="btn btn-primary">+ Add expense</Link>
      </div>

      {error && <ErrorMessage message={error} onRetry={refetch} />}
      {loading && !data && <LoadingSpinner />}

      {data && data.expenseCount === 0 && (
        <EmptyState
          title="No expenses yet"
          message="Add your first expense to see totals and charts here."
          action={<Link to="/expenses/new" className="btn btn-primary">Add expense</Link>}
        />
      )}

      {data && data.expenseCount > 0 && (
        <>
          <SummaryCards data={data} />
          <div className="two-col">
            <CategoryBreakdown items={data.categoryBreakdown} />
            <MonthlyTrend items={data.monthlyTrend} />
          </div>
          <RecentExpenses items={data.recentExpenses} />
        </>
      )}
    </>
  );
}
