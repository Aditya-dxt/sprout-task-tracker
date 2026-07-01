import { useEffect } from 'react';

export default function Toast({ message, type, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className={`toast toast--${type}`} role="status">
      {message}
    </div>
  );
}
