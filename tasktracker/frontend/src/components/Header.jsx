export default function Header({
  onAdd,
  filterPriority,
  setFilterPriority,
  search,
  setSearch,
  taskCount,
}) {
  return (
    <header className="header">
      <div className="header__brand">
        <svg className="header__logo" width="42" height="42" viewBox="0 0 40 40" fill="none">
          <path
            d="M20 34C20 34 8 27 8 16.5C8 10.7 12.7 6 18.5 6C20.9 6 23 6.9 24.5 8.4C26 6.9 28.1 6 30.5 6C31 6 31.5 6.1 32 6.2C31.1 15.6 26.3 24 20 34Z"
            fill="var(--color-primary)"
            opacity="0.92"
          />
          <path
            d="M20 34C20 34 20 20 20 12"
            stroke="var(--color-primary-dark)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
        <div>
          <h1>Sprout</h1>
          <p className="header__tagline">Grow your tasks, one bloom at a time</p>
        </div>
      </div>

      <div className="header__controls">
        <div className="search">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M11.5 11.5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search tasks"
          />
        </div>

        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="select"
          aria-label="Filter by priority"
        >
          <option value="all">All priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <span className="header__count">
          {taskCount} task{taskCount !== 1 ? 's' : ''}
        </span>

        <button className="btn btn--primary" onClick={onAdd}>
          <span className="btn__plus">+</span> New task
        </button>
      </div>
    </header>
  );
}
