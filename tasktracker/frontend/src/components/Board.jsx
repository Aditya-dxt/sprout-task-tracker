import Column from './Column.jsx';

const COLUMNS = [
  { id: 'todo', title: 'To Do', tagline: 'Seeds waiting to be planted', emoji: '🌱' },
  { id: 'in-progress', title: 'In Progress', tagline: 'Growing steadily', emoji: '🌿' },
  { id: 'done', title: 'Done', tagline: 'In full bloom', emoji: '🌸' },
];

export default function Board({ tasks, loading, onEdit, onDelete, onMove, onAdd }) {
  if (loading) {
    return (
      <div className="board">
        {COLUMNS.map((c) => (
          <div className="column column--skeleton" key={c.id}>
            <div className="skeleton skeleton--title" />
            <div className="skeleton skeleton--card" />
            <div className="skeleton skeleton--card" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="board">
      {COLUMNS.map((col) => (
        <Column
          key={col.id}
          column={col}
          tasks={tasks.filter((t) => t.status === col.id)}
          onEdit={onEdit}
          onDelete={onDelete}
          onMove={onMove}
          onAdd={onAdd}
        />
      ))}
    </div>
  );
}
