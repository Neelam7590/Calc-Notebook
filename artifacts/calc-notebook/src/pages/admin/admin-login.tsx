import { useState, type FormEvent, type ReactNode } from 'react';
import { Redirect, useLocation } from 'wouter';
import { ArrowRight, Mail, Loader2, Lock } from 'lucide-react';
import { useAdminAuth } from '@/pages/admin/admin-auth';

const LOGIN_PATH = '/manage-portal-x7k9';
const DASHBOARD_PATH = '/manage-portal-x7k9/dashboard';

export default function AdminLogin() {
  const { session, loading, signIn } = useAdminAuth();
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (loading) {
    return <AdminShell><Spinner /></AdminShell>;
  }

  if (session) {
    return <Redirect to={DASHBOARD_PATH} />;
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    if (!email.trim() || !password) {
      setError('Enter both your email and password.');
      return;
    }
    setSubmitting(true);
    const message = await signIn(email.trim(), password);
    setSubmitting(false);
    if (message) {
      setError(message);
      return;
    }
    setLocation(DASHBOARD_PATH);
  };

  const inputShell = 'admin-input-shell';
  const inputField = 'admin-input-field';

  return (
    <AdminShell>
      <div className="admin-login-wrap">
        <div className="admin-login-card input-card">
          <div className="form-card-heading">
            <span>Sign in to manage</span>
            <span className="pencil-line" />
          </div>
          <p className="admin-login-note">
            Restricted area. Enter the admin credentials to reach the dashboard.
          </p>
          <form onSubmit={submit} noValidate>
            <div className="field-wrap">
              <label htmlFor="admin-email" className="field-label">Email</label>
              <div className={inputShell}>
                <Mail size={15} strokeWidth={1.8} className="admin-input-icon" />
                <input
                  id="admin-email"
                  className={inputField}
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </div>
            <div className="field-wrap">
              <label htmlFor="admin-password" className="field-label">Password</label>
              <div className={inputShell}>
                <Lock size={15} strokeWidth={1.8} className="admin-input-icon" />
                <input
                  id="admin-password"
                  className={inputField}
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
            </div>
            {error && <p className="field-error admin-login-error" role="alert">{error}</p>}
            <button type="submit" className="calculate-button" disabled={submitting}>
              <span>{submitting ? 'Signing in…' : 'Sign in'}</span>
              {submitting ? <Loader2 size={18} className="admin-spin" /> : <ArrowRight size={18} />}
            </button>
          </form>
        </div>
      </div>
    </AdminShell>
  );
}

function AdminShell({ children }: { children: ReactNode }) {
  return (
    <main className="notebook-page min-h-[100dvh]">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-8">
        <div className="admin-brand">
          <div className="brand-lockup">
            <div className="brand-mark" aria-hidden="true">CN</div>
            <div>
              <div className="brand-name">Calc Notebook</div>
              <div className="brand-subtitle">admin portal</div>
            </div>
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}

function Spinner() {
  return (
    <div className="admin-loading">
      <Loader2 size={20} strokeWidth={1.8} className="admin-spin" />
      <span>Checking your session…</span>
    </div>
  );
}

export { LOGIN_PATH, DASHBOARD_PATH };