import { Route, Routes } from 'react-router-dom';
import Footer from './components/common/Footer';
import Header from './components/common/Header';
import AddExpensePage from './pages/AddExpensePage';
import DashboardPage from './pages/DashboardPage';
import EditExpensePage from './pages/EditExpensePage';
import ExpensesPage from './pages/ExpensesPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <main className="container app-main">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/expenses" element={<ExpensesPage />} />
          <Route path="/expenses/new" element={<AddExpensePage />} />
          <Route path="/expenses/:id/edit" element={<EditExpensePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
