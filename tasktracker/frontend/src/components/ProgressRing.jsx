export default function ProgressRing({ total, done }) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const radius = 17;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="progress-ring" title={`${done} of ${total} tasks bloomed`}>
      <svg width="44" height="44" viewBox="0 0 44 44">
        <circle cx="22" cy="22" r={radius} fill="none" stroke="var(--color-border)" strokeWidth="4" />
        <circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 22 22)"
          className="progress-ring__arc"
        />
      </svg>
      <span className="progress-ring__label">{pct}%</span>
    </div>
  );
}