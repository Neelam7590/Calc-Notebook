import { useState, type FormEvent } from 'react';
import { useLocation } from 'wouter';
import { Check, KeyRound, Loader2, Mail, Save, Settings as SettingsIcon } from 'lucide-react';
import { updateSiteSettings, useSiteSettings } from '@/data/siteSettings';
import { useAdminAuth } from '@/pages/admin/admin-auth';
import { adminPath } from '@/pages/admin/admin-layout';

/*
 * Settings page: site-wide details (saved to the site settings store +
 * mirrored to Supabase) and the admin account password changer.
 */

export default function SettingsView() {
  const settings = useSiteSettings();
  const { session, signIn, changePassword } = useAdminAuth();
  const [, setLocation] = useLocation();

  const [siteName, setSiteName] = useState(settings.siteName);
  const [tagline, setTagline] = useState(settings.siteTagline);
  const [email, setEmail] = useState(settings.contactEmail);
  const [saved, setSaved] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const accountEmail = session?.user?.email;

  const saveSettings = (event: FormEvent) => {
    event.preventDefault();
    updateSiteSettings({
      siteName,
      siteTagline: tagline,
      contactEmail: email,
    });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  };

  const savePassword = async (event: FormEvent) => {
    event.preventDefault();
    const nextPassword = password.trim();
    if (!currentPassword) {
      setMessage({ type: 'error', text: 'Enter your current password.' });
      return;
    }
    if (!nextPassword) {
      setMessage({ type: 'error', text: 'Enter a new password.' });
      return;
    }
    if (nextPassword.length < 8) {
      setMessage({ type: 'error', text: 'New password must be at least 8 characters.' });
      return;
    }
    if (nextPassword === currentPassword) {
      setMessage({ type: 'error', text: 'New password must be different from the current one.' });
      return;
    }
    if (!accountEmail) {
      setMessage({ type: 'error', text: 'Could not verify your current password.' });
      return;
    }
    setUpdating(true);
    setMessage(null);
    // Re-authenticate first: never change the password without proving we know it.
    const signInError = await signIn(accountEmail, currentPassword);
    if (signInError) {
      setUpdating(false);
      setMessage({ type: 'error', text: 'Current password is incorrect' });
      return;
    }
    const error = await changePassword(nextPassword);
    setUpdating(false);
    if (error) {
      setMessage({ type: 'error', text: `Failed to update password: ${error}` });
    } else {
      setMessage({ type: 'success', text: 'Password updated successfully.' });
      setCurrentPassword('');
      setPassword('');
    }
  };

  const startRecovery = () => {
    const query = accountEmail ? `?email=${encodeURIComponent(accountEmail)}` : '';
    setLocation(`${adminPath('/recovery')}${query}`);
  };

  return (
    <div className="asb-content">
      <div className="asb-head-row">
        <div>
          <h2 className="asb-page-title">Settings</h2>
          <p className="asb-page-sub">Site-wide details are used across the public pages; account settings are tied to your admin login.</p>
        </div>
      </div>

      <div className="asb-settings-grid">
        <form className="asb-panel" onSubmit={saveSettings}>
          <div className="asb-panel-head">
            <SettingsIcon size={16} strokeWidth={1.9} />
            <span className="asb-panel-title">Site details</span>
          </div>
          <div className="asb-panel-body">
            <label className="asb-field">
              <span className="asb-field-label">Site name</span>
              <input value={siteName} onChange={(event) => setSiteName(event.target.value)} />
            </label>
            <label className="asb-field">
              <span className="asb-field-label">Tagline</span>
              <input value={tagline} onChange={(event) => setTagline(event.target.value)} />
            </label>
            <label className="asb-field">
              <span className="asb-field-label">Contact email</span>
              <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            </label>
            <button type="submit" className="asb-btn asb-btn-primary">
              {saved ? <Check size={15} /> : <Save size={15} />}
              <span>{saved ? 'Saved' : 'Save settings'}</span>
            </button>
          </div>
        </form>

        <form className="asb-panel" onSubmit={savePassword}>
          <div className="asb-panel-head">
            <KeyRound size={16} strokeWidth={1.9} />
            <span className="asb-panel-title">Change password</span>
          </div>
          <div className="asb-panel-body">
            <label className="asb-field">
              <span className="asb-field-label">Current password</span>
              <input
                type="password"
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
                autoComplete="current-password"
                placeholder="Enter your current password"
              />
            </label>
            <label className="asb-field">
              <span className="asb-field-label">New password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="new-password"
                placeholder="Enter a new password"
              />
            </label>
            {message && (
              <p className={`asb-settings-msg asb-settings-${message.type}`} role="alert">
                {message.text}
              </p>
            )}
            <button type="submit" className="asb-btn asb-btn-soft" disabled={updating}>
              {updating ? <Loader2 size={15} className="admin-spin" /> : <Save size={15} />}
              <span>{updating ? 'Updating…' : 'Update password'}</span>
            </button>
          </div>
        </form>

        <div className="asb-panel">
          <div className="asb-panel-head">
            <Mail size={16} strokeWidth={1.9} />
            <span className="asb-panel-title">Forgot password</span>
          </div>
          <div className="asb-panel-body">
            <p className="asb-hint">
              Forgot your password? We'll send a <strong>one-time code (OTP)</strong> to{' '}
              {accountEmail ? <strong>{accountEmail}</strong> : 'your account email'} to confirm it's really you, before
              letting you choose a new password.
            </p>
            <button type="button" className="asb-btn asb-btn-ghost" onClick={startRecovery}>
              <Mail size={15} />
              <span>Verify with OTP and reset</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}