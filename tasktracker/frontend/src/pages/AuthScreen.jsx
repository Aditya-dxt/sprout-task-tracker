import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

export default function AuthScreen() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      if (mode === 'login') {
        await login(form.email.trim(), form.password);
      } else {
        await register(form.name.trim(), form.email.trim(), form.password);
      }
    } catch (err) {
      setError(err?.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <div className="auth-card__brand">
          <svg width="46" height="46" viewBox="0 0 40 40" fill="none">
            <path
              d="M20 34C20 34 8 27 8 16.5C8 10.7 12.7 6 18.5 6C20.9 6 23 6.9 24.5 8.4C26 6.9 28.1 6 30.5 6C31 6 31.5 6.1 32 6.2C31.1 15.6 26.3 24 20 34Z"
              fill="var(--color-primary)"
              opacity="0.92"
            />
            <path d="M20 34C20 34 20 20 20 12" stroke="var(--color-primary-dark)" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <h1>Sprout</h1>
          <p>Grow your tasks, one bloom at a time</p>
        </div>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${mode === 'login' ? 'auth-tab--active' : ''}`}
            onClick={() => {
              setMode('login');
              setError('');
            }}
            type="button"
          >
            Log in
          </button>
          <button
            className={`auth-tab ${mode === 'register' ? 'auth-tab--active' : ''}`}
            onClick={() => {
              setMode('register');
              setError('');
            }}
            type="button"
          >
            Sign up
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <label className="field">
              <span>Name</span>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                required
                maxLength={60}
              />
            </label>
          )}

          <label className="field">
            <span>Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              required
            />
          </label>

          <label className="field">
            <span>Password</span>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder={mode === 'register' ? 'At least 6 characters' : 'Your password'}
              required
              minLength={6}
            />
          </label>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="btn btn--primary auth-submit" disabled={submitting}>
            {submitting ? 'Please wait...' : mode === 'login' ? 'Log in' : 'Create account'}
          </button>
        </form>

        <p className="auth-switch">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            type="button"
            className="auth-switch__link"
            onClick={() => {
              setMode(mode === 'login' ? 'register' : 'login');
              setError('');
            }}
          >
            {mode === 'login' ? 'Sign up' : 'Log in'}
          </button>
        </p>

        <p className="auth-note">Your tasks are private — only you can ever see or edit them.</p>
      </div>
    </div>
  );
}