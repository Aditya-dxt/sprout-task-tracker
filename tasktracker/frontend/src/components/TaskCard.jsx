import { useState } from 'react';
import GrowthStem from './GrowthStem.jsx';

const PRIORITY_LABEL = { high: 'High', medium: 'Medium', low: 'Low' };

export default function TaskCard({ task, index, onEdit, onDelete }) {
  const [confirming, setConfirming] = useState(false);

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/task-id', task._id);
    e.dataTransfer.effectAllowed = 'move';
    e.currentTarget.classList.add('task-card--dragging');
  };

  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove('task-card--dragging');
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isOverdue = task.dueDate && task.status !== 'done' && new Date(task.dueDate) < today;

  return (
    <article
      className="task-card"
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
      draggable={!confirming}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <GrowthStem status={task.status} />
      <div className="task-card__content">
        <div className="task-card__top">
          <span className={`badge badge--${task.priority}`}>{PRIORITY_LABEL[task.priority]}</span>
          {task.dueDate && (
            <span className={`due ${isOverdue ? 'due--overdue' : ''}`}>
              {new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </span>
          )}
        </div>
        <h3 className="task-card__title">{task.title}</h3>
        {task.description && <p className="task-card__desc">{task.description}</p>}

        {confirming ? (
          <div className="task-card__confirm">
            <span>Delete this task?</span>
            <div className="task-card__confirm-actions">
              <button
                className="task-card__confirm-btn task-card__confirm-btn--danger"
                onClick={() => onDelete(task._id)}
              >
                Delete
              </button>
              <button className="task-card__confirm-btn" onClick={() => setConfirming(false)}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="task-card__actions">
            <button className="icon-btn" onClick={() => onEdit(task)} aria-label="Edit task">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M9.5 1.5L12.5 4.5L4.5 12.5H1.5V9.5L9.5 1.5Z"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              className="icon-btn icon-btn--danger"
              onClick={() => setConfirming(true)}
              aria-label="Delete task"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2 3.5H12M5.5 3.5V2C5.5 1.4 6 1 6.5 1H7.5C8 1 8.5 1.4 8.5 2V3.5M3.5 3.5V11.5C3.5 12.3 4.2 13 5 13H9C9.8 13 10.5 12.3 10.5 11.5V3.5"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </article>
  );
}