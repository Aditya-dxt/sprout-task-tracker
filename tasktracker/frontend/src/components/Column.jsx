import { useState } from 'react';
import TaskCard from './TaskCard.jsx';
import EmptyState from './EmptyState.jsx';

export default function Column({ column, tasks, onEdit, onDelete, onMove, onAdd }) {
  const [isOver, setIsOver] = useState(false);

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

      <div className="column__body">
        {tasks.length === 0 ? (
          <EmptyState columnId={column.id} onAdd={onAdd} />
        ) : (
          tasks.map((task, i) => (
            <TaskCard key={task._id} task={task} index={i} onEdit={onEdit} onDelete={onDelete} />
          ))
        )}
      </div>
    </section>
  );
}
