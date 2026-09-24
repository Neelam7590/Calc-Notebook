import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { Link, Redirect } from 'wouter';
import { ArrowRight, KeyRound, Loader2, Lock, Mail, RefreshCw, ShieldCheck } from 'lucide-react';
import { useAdminAuth } from '@/pages/admin/admin-auth';
import { DASHBOARD_PATH } from '@/pages/admin/admin-login';

/*
 * Password recovery page — OTP-first flow.
 *
 *  1. Enter your email  ->  a 6-digit code is emailed to you
 *  2. Enter the code     ->  confirms only the real owner can reset
 *  3. Choose a new password
 *
 * This replaces the old "email a magic reset link" flow: every password
 * reset now requires proof that the person requesting it has access to the
 * account's inbox before any change is allowed.
 */

type Step = 'email' | 'otp' | 'password';

function prefilledEmail(): string {
  try {
    return new URLSearchParams(window.location.search).get('email') ?? '';
  } catch {
    return '';
  }
}

export default function AdminRecovery() {
  const { session, loading, sendOtp, verifyOtp, finishPasswordReset } = useAdminAuth();

  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState(prefilledEmail);
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [done, setDone] = useState(false);

  // Forget any magic token that was in the URL when this page loads.
  useEffect(() => {
    if (window.location.hash || window.location.search.includes('type=recovery') || window.location.search.includes('token_hash')) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  if (loading) {
    return <AdminShell><Spinner /></AdminShell>;
  }

  // Already signed in as the admin? Send them to the dashboard.
  if (session && step !== 'password') {
    return <Redirect to={DASHBOARD_PATH} />;
  }

  const sendCode = async (subject?: string) => {
    if (!subject && step === 'email' && !email.trim()) {
      setMessage({ type: 'error', text: 'Enter your account email first.' });
      return;
    }
    const address = (subject ?? email).trim();
    setBusy(true);
    setMessage(null);
    const error = await sendOtp(address);
    setBusy(false);
    if (error) {
      setMessage({ type: 'error', text: `Could not send the code: ${error}` });
      return;
    }
    if (step === 'email') {
      setStep('otp');
      setMessage({ type: 'success', text: `A 6-digit verification code was sent to ${address}. Check your inbox.` });
    } else {
      setMessage({ type: 'success', text: 'A fresh code was sent. Check your inbox.' });
    }
  };

  const submitOtp = async (event: FormEvent) => {
    event.preventDefault();
    if (!/^\d{6}$/.test(otp)) {
      setMessage({ type: 'error', text: 'Enter the 6-digit code from the email.' });
      return;
    }
    setBusy(true);
    setMessage(null);
    const error = await verifyOtp(email.trim(), otp);
    setBusy(false);
    if (error) {
      setMessage({ type: 'error', text: `Code was not accepted: ${error}` });
      return;
    }
    setStep('password');
    setMessage(null);
  };

  const submitPassword = async (event: FormEvent) => {
    event.preventDefault();
    if (password.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters.' });
      return;
    }
    if (password !== confirm) {
      setMessage({ type: 'error', text: 'Passwords do not match.' });
      return;
    }
    setBusy(true);
    setMessage(null);
    const error = await finishPasswordReset(password);
    setBusy(false);
    if (error) {
      setMessage({ type: 'error', text: `Failed to reset password: ${error}` });
      return;
    }
    setDone(true);
  };

  return (
    <AdminShell>
      <div className="admin-login-wrap">
        <div className="admin-login-card input-card">
          {done ? (
            <>
              <div className="form-card-heading">
                <span>Password updated</span>
                <span className="pencil-line" />
              </div>
              <div className="admin-recovery-success">
                <ShieldCheck size={26} strokeWidth={1.6} />
                <p>
                  Your password has been changed successfully. Sign in again with your new password.
                </p>
              </div>
              <Link href="/manage-portal-x7k9" className="calculate-button" style={{ width: '100%', marginTop: '1rem' }}>
                <span>Go to sign in</span>
                <ArrowRight size={18} />
              </Link>
            </>
          ) : (
            <>
              <div className="form-card-heading">
                <span>{step === 'email' ? 'Reset your password' : step === 'otp' ? 'Enter the code' : 'Choose a new password'}</span>
                <span className="pencil-line" />
              </div>

              <ol className="admin-recovery-steps">
                {(['email', 'otp', 'password'] as Step[]).map((item, index) => (
                  <li key={item} className={step === item ? 'admin-recovery-step-on' : ''}>
                    <span>{index + 1}</span>
                    {item === 'email' ? 'Email' : item === 'otp' ? 'Code' : 'New password'}
                  </li>
                ))}
              </ol>

              {step === 'email' && (
                <form onSubmit={(event) => { event.preventDefault(); void sendCode(); }} noValidate>
                  <div className="field-wrap">
                    <label htmlFor="recovery-email" className="field-label">Account email</label>
                    <div className="admin-input-shell">
                      <Mail size={15} strokeWidth={1.8} className="admin-input-icon" />
                      <input
                        id="recovery-email"
                        className="admin-input-field"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </div>
                  </div>
                  {message && <Message message={message} />}
                  <button type="submit" className="calculate-button" disabled={busy}>
                    <span>{busy ? 'Sending…' : 'Send verification code'}</span>
                    {busy ? <Loader2 size={18} className="admin-spin" /> : <Mail size={18} />}
                  </button>
                </form>
              )}

              {step === 'otp' && (
                <form onSubmit={submitOtp} noValidate>
                  <div className="field-wrap">
                    <label htmlFor="recovery-otp" className="field-label">6-digit code</label>
                    <div className="admin-input-shell">
                      <KeyRound size={15} strokeWidth={1.8} className="admin-input-icon" />
                      <input
                        id="recovery-otp"
                        className="admin-input-field"
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        maxLength={6}
                        placeholder="••••••"
                        value={otp}
                        onChange={(event) => setOtp(event.target.value.replace(/\D/g, ''))}
                      />
                    </div>
                  </div>
                  {message && <Message message={message} />}
                  <button type="submit" className="calculate-button" disabled={busy}>
                    <span>{busy ? 'Checking…' : 'Verify code'}</span>
                    {busy ? <Loader2 size={18} className="admin-spin" /> : <ShieldCheck size={18} />}
                  </button>
                  <p className="admin-login-forgot">
                    <button type="button" onClick={async () => { setOtp(''); await sendCode(email); }}>
                      <RefreshCw size={11} strokeWidth={2} style={{ verticalAlign: '-1px' }} /> Resend code
                    </button>
                  </p>
                </form>
              )}

              {step === 'password' && (
                <form onSubmit={submitPassword} noValidate>
                  <div className="field-wrap">
                    <label htmlFor="recovery-password" className="field-label">New password</label>
                    <div className="admin-input-shell">
                      <Lock size={15} strokeWidth={1.8} className="admin-input-icon" />
                      <input
                        id="recovery-password"
                        className="admin-input-field"
                        type="password"
                        autoComplete="new-password"
                        placeholder="At least 6 characters"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                      />
                    </div>
                  </div>
                  <div className="field-wrap">
                    <label htmlFor="recovery-confirm" className="field-label">Confirm password</label>
                    <div className="admin-input-shell">
                      <KeyRound size={15} strokeWidth={1.8} className="admin-input-icon" />
                      <input
                        id="recovery-confirm"
                        className="admin-input-field"
                        type="password"
                        autoComplete="new-password"
                        placeholder="Repeat the new password"
                        value={confirm}
                        onChange={(event) => setConfirm(event.target.value)}
                      />
                    </div>
                  </div>
                  {message && <Message message={message} />}
                  <button type="submit" className="calculate-button" disabled={busy}>
                    <span>{busy ? 'Updating…' : 'Update password'}</span>
                    {busy ? <Loader2 size={18} className="admin-spin" /> : <KeyRound size={18} />}
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </AdminShell>
  );
}

function Message({ message }: { message: { type: 'success' | 'error'; text: string } }) {
  return (
    <p
      className={`field-error admin-login-error ${message.type === 'success' ? 'admin-reset-success' : ''}`}
      role="alert"
    >
      {message.text}
    </p>
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