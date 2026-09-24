import * as React from 'react';
import { AdminGate, AdminSidebar, AdminTopbar, useAdminLocation } from '@/pages/admin/admin-layout';
import DashboardView from '@/pages/admin/admin-dashboard';
import BlogListView from '@/pages/admin/admin-blog-list';
import BlogEditorView from '@/pages/admin/editor';
import SettingsView from '@/pages/admin/admin-settings';

/*
 * Top-level admin shell:
 *  - AdminGate guards the whole area (auth check → redirect to login).
 *  - A fixed left sidebar (Dashboard / Blog / Settings) + sticky topbar.
 *  - The active page is resolved from the URL tail under /manage-portal-x7k9.
 *
 * Routes:
 *   /dashboard                → overview
 *   /blog                     → blog list (search + filter + recent posts)
 *   /blog/new                 → new post editor
 *   /blog/edit/:slug          → edit existing post
 *   /settings                 → site + account settings
 */

export default function AdminApp() {
  return (
    <AdminGate>
      <AdminShell />
    </AdminGate>
  );
}

function AdminShell() {
  const tail = useAdminLocation();
  const [open, setOpen] = React.useState(false);

  const isDashboard = tail === '/' || tail === '/dashboard';
  const isBlog = tail === '/blog';
  const isEdit = tail.startsWith('/blog/edit/');
  const isNew = tail === '/blog/new' || tail === '/blog/new/';
  const isSettings = tail === '/settings';

  const active = isSettings ? 'settings' : isBlog || isNew || isEdit ? 'blog' : 'dashboard';

  const pageTitle = isSettings
    ? 'Settings'
    : isNew
      ? 'New post'
      : isEdit
        ? 'Edit post'
        : isBlog
          ? 'Blog'
          : 'Dashboard';

  let page: React.ReactNode;
  if (isSettings) {
    page = <SettingsView />;
  } else if (isNew) {
    page = <BlogEditorView key="new" />;
  } else if (isEdit) {
    const editSlug = decodeURIComponent(tail.slice('/blog/edit/'.length));
    page = <BlogEditorView key={editSlug} slug={editSlug} />;
  } else if (isBlog) {
    page = <BlogListView />;
  } else {
    page = <DashboardView />;
  }

  return (
    <div className="asb-app">
      <AdminSidebar active={active} open={open} onNavigate={() => setOpen(false)} onClose={() => setOpen(false)} />
      <div className="asb-main">
        <AdminTopbar title={pageTitle} onMenu={() => setOpen(true)} />
        {page}
      </div>
    </div>
  );
}