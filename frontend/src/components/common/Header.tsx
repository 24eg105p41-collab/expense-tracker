import { NavLink } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const linkClass = ({ isActive }: { isActive: boolean }) => (isActive ? 'nav-link active' : 'nav-link');

  return (
    <header className="app-header">
      <div className="container header-inner">
        <NavLink to="/" className="brand">
          <span className="brand-icon" aria-hidden="true">ET</span>
          Expense Tracker
        </NavLink>
        <nav className="main-nav" aria-label="Main">
          <NavLink to="/" end className={linkClass}>Dashboard</NavLink>
          <NavLink to="/expenses" end className={linkClass}>Expenses</NavLink>
          <NavLink to="/expenses/new" className={linkClass}>Add Expense</NavLink>
        </nav>
        <button
          type="button"
          className="btn btn-ghost theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          title="Toggle theme"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
}
