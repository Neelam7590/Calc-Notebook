import { useLocation } from 'wouter';
import { ArrowRight, FilePlus2, FolderOpen, FolderTree, NotebookPen } from 'lucide-react';
import { useBlogPosts, type BlogPost } from '@/data/blogData';
import { adminPath } from '@/pages/admin/admin-layout';

/*
 * Dashboard home: quick-action cards (All blogs, Add new blog, Categories),
 * a small stats row, and the most recently updated posts (latest on top).
 * The whole page is rendered inside the shared admin layout (sidebar + topbar).
 */

function sortByRecent(a: BlogPost, b: BlogPost): number {
  const aTime = new Date(a.updatedAt ?? `${a.date}T00:00:00`).getTime();
  const bTime = new Date(b.updatedAt ?? `${b.date}T00:00:00`).getTime();
  if (aTime !== bTime) return bTime - aTime;
  return b.date.localeCompare(a.date);
}

export default function DashboardView() {
  const posts = useBlogPosts();
  const [, setLocation] = useLocation();

  const published = posts.filter((post) => post.status === 'published').length;
  const drafts = posts.filter((post) => post.status === 'draft').length;
  const recent = [...posts].sort(sortByRecent).slice(0, 5);

  const actions = [
    { label: 'All blogs', hint: 'Edit, search or delete existing posts', icon: <FolderOpen size={20} strokeWidth={1.8} />, to: '/blog' },
    { label: 'Add new blog', hint: 'Write and publish a fresh article', icon: <FilePlus2 size={20} strokeWidth={1.8} />, to: '/blog/new' },
    { label: 'Categories', hint: 'Manage blog & calculator categories', icon: <FolderTree size={20} strokeWidth={1.8} />, to: '/blog?tab=categories' },
  ];

  return (
    <div className="asb-content">
      <div className="asb-stat-grid">
        <div className="asb-stat-card">
          <span className="asb-stat-value">{posts.length}</span>
          <span className="asb-stat-label">Total posts</span>
        </div>
        <div className="asb-stat-card">
          <span className="asb-stat-value">{published}</span>
          <span className="asb-stat-label">Published</span>
        </div>
        <div className="asb-stat-card">
          <span className="asb-stat-value">{drafts}</span>
          <span className="asb-stat-label">Drafts</span>
        </div>
      </div>

      <h2 className="asb-block-title">Quick actions</h2>
      <div className="asb-action-grid">
        {actions.map((action) => (
          <button key={action.label} type="button" className="asb-action-card" onClick={() => setLocation(adminPath(action.to))}>
            <div className="asb-action-icon">{action.icon}</div>
            <div className="asb-action-main">
              <span className="asb-action-label">{action.label}</span>
              <span className="asb-action-hint">{action.hint}</span>
            </div>
            <ArrowRight size={17} strokeWidth={1.9} className="asb-action-arrow" />
          </button>
        ))}
      </div>

      <h2 className="asb-block-title">Recent posts</h2>
      {recent.length === 0 ? (
        <div className="asb-empty">
          <NotebookPen size={20} strokeWidth={1.6} />
          <p>No posts yet. Create your first blog post to get started.</p>
        </div>
      ) : (
        <ul className="asb-recent-list">
          {recent.map((post) => (
            <li key={post.slug} className="asb-recent-row">
              <div className="asb-recent-main">
                <div className="asb-recent-meta">
                  <span className={`asb-chip${post.status === 'draft' ? ' asb-chip-draft' : ''}`}>{post.status}</span>
                  <span className="asb-recent-category">{post.category}</span>
                </div>
                <h3 className="asb-recent-title">{post.title}</h3>
                <p className="asb-recent-excerpt">{post.excerpt}</p>
              </div>
              <button
                type="button"
                className="asb-row-action"
                onClick={() => setLocation(adminPath(`/blog/edit/${encodeURIComponent(post.slug)}`))}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}