import type { ReactNode } from 'react';

interface Props {
  title: string;
  message?: string;
  action?: ReactNode;
}

export default function EmptyState({ title, message, action }: Props) {
  return (
    <div className="empty-state">
      <div className="empty-icon" aria-hidden="true">🧾</div>
      <h3>{title}</h3>
      {message && <p>{message}</p>}
      {action}
    </div>
  );
}
