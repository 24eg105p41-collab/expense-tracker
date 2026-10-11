import { Link } from 'react-router-dom';

export default function NotFound({ message = 'The page you are looking for does not exist.' }: { message?: string }) {
  return (
    <div className="empty-state">
      <div className="empty-icon" aria-hidden="true">🔍</div>
      <h2>404 – Not found</h2>
      <p>{message}</p>
      <Link to="/" className="btn btn-primary">Back to dashboard</Link>
    </div>
  );
}
