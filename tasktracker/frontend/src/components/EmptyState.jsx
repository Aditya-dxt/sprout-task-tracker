const MESSAGES = {
  todo: { title: 'No seeds yet', body: 'Plant your first task to get started.' },
  'in-progress': { title: 'Nothing sprouting', body: 'Drag a task here once you start it.' },
  done: { title: 'Nothing bloomed yet', body: 'Finished tasks will flower here.' },
};

export default function EmptyState({ columnId, onAdd }) {
  const msg = MESSAGES[columnId];
  return (
    <div className="empty-state">
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none" className="empty-state__art">
        <ellipse cx="36" cy="62" rx="22" ry="4" fill="var(--color-primary)" opacity="0.12" />
        <path
          d="M36 58V30"
          stroke="var(--color-border-strong)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="1 6"
        />
        <circle cx="36" cy="22" r="10" stroke="var(--color-border-strong)" strokeWidth="2" strokeDasharray="2 5" />
      </svg>
      <p className="empty-state__title">{msg.title}</p>
      <p className="empty-state__body">{msg.body}</p>
      {columnId === 'todo' && (
        <button className="btn btn--ghost" onClick={onAdd}>
          Plant a task
        </button>
      )}
    </div>
  );
}
