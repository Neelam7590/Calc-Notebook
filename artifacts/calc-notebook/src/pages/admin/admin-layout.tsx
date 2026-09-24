import { useState, type ReactNode } from 'react';
import { Link, Redirect, useLocation } from 'wouter';
import { ExternalLink, FileText, LayoutDashboard, LogOut, Menu, Settings, X } from 'lucide-react';
import { useAdminAuth } from '@/pages/admin/admin-auth';
import { LOGIN_PATH } from '@/pages/admin/admin-login';

const BASE_PATH = '/manage-portal-x7k9';

export function adminPath(to: string): string {
  return `${BASE_PATH}${to}`;
}

/** Gets the part of the location after the admin base path (e.g. "/blog"). */
export function useAdminLocation(): string {
  const [location] = useLocation();
  const clean = location.split(/[?#]/)[0];
  if (!clean.startsWith(BASE_PATH)) return '/';
  const tail = clean.slice(BASE_PATH.length) || '/';
  return tail.startsWith('/') ? tail : `/${tail}`;
}

/** Checks auth first; shows a spinner while checking and bounces to /login otherwise. */
export function AdminGate({ children }: { children: ReactNode }) {
  const { session, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="asb-gate-loading">
        <span className="asb-spinner" aria-hidden="true" />
        <span>Checking your session…</span>
      </div>
    );
  }

  if (!session) {
    return <Redirect to={LOGIN_PATH} />;
  }

  return <>{children}</>;
}

type NavItem = { key: string; label: string; path: string; icon: ReactNode };

const NAV_ITEMS: NavItem[] = [
  { key: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={17} strokeWidth={1.9} /> },
  { key: 'blog', label: 'Blog', path: '/blog', icon: <FileText size={17} strokeWidth={1.9} /> },
  { key: 'settings', label: 'Settings', path: '/settings', icon: <Settings size={17} strokeWidth={1.9} /> },
];

/*
 * Fixed left sidebar (~220px) with the three nav options: Dashboard, Blog, Settings.
 * On mobile it slides in from the left as a drawer.
 */
export function AdminSidebar({
  active,
  open,
  onNavigate,
  onClose,
}: {
  active: string;
  open: boolean;
  onNavigate: () => void;
  onClose: () => void;
}) {
  const [, setLocation] = useLocation();
  const { signOut } = useAdminAuth();

  const go = (path: string) => {
    onNavigate();
    onClose();
    setLocation(adminPath(path));
  };

  return (
    <>
      <aside className={`asb-sidebar${open ? ' is-open' : ''}`}>
        <div className="asb-sidebar-brand">
          <div className="brand-lockup">
            <div className="brand-mark" aria-hidden="true">CN</div>
            <div>
              <div className="brand-name">Calc Notebook</div>
              <div className="brand-subtitle">admin portal</div>
            </div>
          </div>
          <button type="button" className="asb-sidebar-close" onClick={onClose} aria-label="Close menu">
            <X size={18} />
          </button>
        </div>

        <nav className="asb-nav" aria-label="Admin navigation">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`asb-nav-link${active === item.key ? ' is-active' : ''}`}
              onClick={() => go(item.path)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="asb-sidebar-foot">
          <Link href="/" className="asb-foot-link">
            <ExternalLink size={15} strokeWidth={1.9} />
            <span>View site</span>
          </Link>
          <button type="button" className="asb-foot-link" onClick={() => void signOut()}>
            <LogOut size={15} strokeWidth={1.9} />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {open && <div className="asb-backdrop" onClick={onClose} aria-hidden="true" />}
    </>
  );
}

/** Sticky top bar with the hamburger (mobile) and the current page title. */
export function AdminTopbar({ title, onMenu }: { title: string; onMenu: () => void }) {
  return (
    <header className="asb-topbar">
      <button type="button" className="asb-hamburger" onClick={onMenu} aria-label="Open menu">
        <Menu size={19} />
      </button>
      <h1 className="asb-topbar-title">{title}</h1>
    </header>
  );
}

/** Shared tiny loading spinner. */
export function Loader({ size = 15 }: { size?: number }) {
  return <span className="asb-spinner" style={{ width: size, height: size }} aria-hidden="true" />;
}

export function useSidebarOpen() {
  return useState(false);
}