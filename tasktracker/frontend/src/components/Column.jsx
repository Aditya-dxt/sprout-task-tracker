import { useState, useMemo } from 'react';
import TaskCard from './TaskCard.jsx';
import EmptyState from './EmptyState.jsx';

const PRIORITY_WEIGHT = { high: 0, medium: 1, low: 2 };

function sortTasks(tasks, sortBy) {
  const copy = [...tasks];
  switch (sortBy) {
    case 'due':
      return copy.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
    case 'priority':
      return copy.sort((a, b) => PRIORITY_WEIGHT[a.priority] - PRIORITY_WEIGHT[b.priority]);
    default:
      return copy;
  }
}

export default function Column({ column, tasks, onEdit, onDelete, onMove, onAdd }) {
  const [isOver, setIsOver] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  const sorted = useMemo(() => sortTasks(tasks, sortBy), [tasks, sortBy]);

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!isOver) setIsOver(true);
  };

  const handleDragLeave = (e) => {
    if (e.currentTarget === e.target) setIsOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsOver(false);
    const id = e.dataTransfer.getData('text/task-id');
    if (id) onMove(id, column.id);
  };

  return (
    <section
      className={`column column--${column.id} ${isOver ? 'column--over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="column__head">
        <span className="column__emoji">{column.emoji}</span>
        <div className="column__head-text">
          <h2>{column.title}</h2>
          <p className="column__tagline">{column.tagline}</p>
        </div>
        <span className="column__count">{tasks.length}</span>
      </div>

      {tasks.length > 1 && (
        <select
          className="column__sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          aria-label={`Sort ${column.title} tasks`}
        >
          <option value="newest">Newest first</option>
          <option value="due">By due date</option>
          <option value="priority">By priority</option>
        </select>
      )}

      <div className="column__body">
        {sorted.length === 0 ? (
          <EmptyState columnId={column.id} onAdd={onAdd} />
        ) : (
          sorted.map((task, i) => (
            <TaskCard key={task._id} task={task} index={i} onEdit={onEdit} onDelete={onDelete} />
          ))
        )}
      </div>
    </section>
  );
}