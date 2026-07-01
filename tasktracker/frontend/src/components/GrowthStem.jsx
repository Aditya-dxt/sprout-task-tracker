export default function GrowthStem({ status }) {
  return (
    <div className={`growth-stem growth-stem--${status}`} aria-hidden="true">
      <svg width="20" height="100%" viewBox="0 0 20 64" preserveAspectRatio="none" fill="none">
        <path
          d="M10 60V16"
          stroke="var(--color-primary)"
          strokeWidth="2"
          strokeLinecap="round"
          className="growth-stem__line"
        />
        {status !== 'todo' && (
          <path
            d="M10 46C10 46 4 44 3 38C9 38 10 44 10 46Z"
            fill="var(--color-primary)"
            className="growth-stem__leaf growth-stem__leaf--1"
          />
        )}
        {status === 'done' && (
          <>
            <path
              d="M10 36C10 36 16 34 17 28C11 28 10 34 10 36Z"
              fill="var(--color-primary)"
              className="growth-stem__leaf growth-stem__leaf--2"
            />
            <circle cx="10" cy="12" r="8" fill="var(--color-secondary)" className="growth-stem__bloom" />
            <circle cx="10" cy="12" r="3" fill="var(--color-amber)" className="growth-stem__bloom-center" />
          </>
        )}
      </svg>
    </div>
  );
}
