import { useState, type FormEvent, type ReactNode } from 'react';
import { Redirect } from 'wouter';
import {
  Loader2,
  LogOut,
  NotebookPen,
  Pencil,
  Plus,
  Save,
  Trash2,
  X,
} from 'lucide-react';
import { useAdminAuth } from '@/pages/admin/admin-auth';
import {
  blogCategories,
  createBlogPost,
  deleteBlogPost,
  updateBlogPost,
  useBlogPosts,
  type BlogCategory,
  type BlogPost,
  type BlogPostDraft,
} from '@/data/blogData';
import { LOGIN_PATH } from '@/pages/admin/admin-login';

type EditorState =
  | { kind: 'closed' }
  | { kind: 'create' }
  | { kind: 'edit'; post: BlogPost };

function AdminDashboard() {
  const { session, loading, signOut } = useAdminAuth();

  if (loading) {
    return <AdminShell><LoadingPanel /></AdminShell>;
  }

  if (!session) {
    return <Redirect to={LOGIN_PATH} />;
  }

  return <DashboardBody onSignOut={signOut} />;
}

function DashboardBody({ onSignOut }: { onSignOut: () => Promise<void> }) {
  const posts = useBlogPosts();
  const [editor, setEditor] = useState<EditorState>({ kind: 'closed' });

  const handleSave = (draft: BlogPostDraft) => {
    if (editor.kind === 'edit') {
      updateBlogPost(editor.post.slug, draft);
    } else {
      createBlogPost(draft);
    }
    setEditor({ kind: 'closed' });
  };

  return (
    <AdminShell>
      <div className="admin-panel">
        <div className="admin-toolbar">
          <div className="admin-toolbar-title">
            <span className="home-kicker"><span className="kicker-line" /><span>THE NOTEBOOK BLOG</span></span>
            <h1 className="calculator-title admin-title">Manage posts</h1>
          </div>
          <button type="button" className="admin-btn admin-btn-ghost" onClick={() => void onSignOut()}>
            <LogOut size={15} strokeWidth={1.8} />
            <span>Log out</span>
          </button>
        </div>

        <p className="admin-subtitle">
          Create, edit, and remove blog posts. Changes are saved to the same blog
          feed the public <code>Blog</code> section reads from.
        </p>

        {posts.length > 0 && (
          <div className="admin-stat-row">
            <span className="admin-stat"><strong>{posts.length}</strong> published post{posts.length === 1 ? '' : 's'}</span>
          </div>
        )}

        {posts.length === 0 ? (
          <div className="admin-empty">
            <div className="blog-empty-icon"><NotebookPen size={22} strokeWidth={1.6} /></div>
            <p>No posts yet. Create your first notebook entry below.</p>
          </div>
        ) : (
          <ul className="admin-post-list">
            {posts.map((post) => (
              <li className="admin-post-row" key={post.slug}>
                <div className="admin-post-main">
                  <span className="admin-post-category">{post.category}</span>
                  <h3 className="admin-post-title">{post.title}</h3>
                  <p className="admin-post-excerpt">{post.excerpt}</p>
                  <span className="admin-post-meta">{post.date} · {post.readTime} · /blog/{post.slug}</span>
                </div>
                <div className="admin-post-actions">
                  <button
                    type="button"
                    className="admin-btn admin-btn-secondary"
                    onClick={() => setEditor({ kind: 'edit', post })}
                  >
                    <Pencil size={14} strokeWidth={1.8} />
                    <span>Edit</span>
                  </button>
                  <button
                    type="button"
                    className="admin-btn admin-btn-danger"
                    onClick={() => {
                      if (window.confirm(`Delete "${post.title}"? This cannot be undone.`)) {
                        deleteBlogPost(post.slug);
                      }
                    }}
                  >
                    <Trash2 size={14} strokeWidth={1.8} />
                    <span>Delete</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {editor.kind === 'closed' ? (
          <button type="button" className="admin-btn admin-btn-primary admin-new-post" onClick={() => setEditor({ kind: 'create' })}>
            <Plus size={16} strokeWidth={2} />
            <span>New post</span>
          </button>
        ) : (
          <PostEditor
            key={editor.kind === 'edit' ? editor.post.slug : 'create'}
            initial={editor.kind === 'edit' ? editor.post : undefined}
            onCancel={() => setEditor({ kind: 'closed' })}
            onSave={handleSave}
          />
        )}
      </div>
    </AdminShell>
  );
}

function PostEditor({
  initial,
  onCancel,
  onSave,
}: {
  initial?: BlogPost;
  onCancel: () => void;
  onSave: (draft: BlogPostDraft) => void;
}) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [category, setCategory] = useState<BlogCategory>(initial?.category ?? 'Calculator Guides');
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? '');
  const [content, setContent] = useState(initial?.content.join('\n') ?? '');
  const [relatedCalculator, setRelatedCalculator] = useState(initial?.relatedCalculator ?? '');
  const [relatedCalculatorLabel, setRelatedCalculatorLabel] = useState(initial?.relatedCalculatorLabel ?? '');
  const [error, setError] = useState<string | null>(null);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const paragraphs = content
      .split('\n')
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);

    if (!title.trim()) {
      setError('Add a title for the post.');
      return;
    }
    if (!excerpt.trim()) {
      setError('Add a short excerpt — it shows on the blog cards and in search results.');
      return;
    }
    if (paragraphs.length === 0) {
      setError('Add at least one paragraph of content.');
      return;
    }

    onSave({
      title,
      category,
      excerpt,
      content: paragraphs,
      relatedCalculator: relatedCalculator.trim(),
      relatedCalculatorLabel: relatedCalculator.trim() ? (relatedCalculatorLabel.trim() || relatedCalculator.trim()) : '',
    });
  };

  return (
    <form className="admin-editor input-card" onSubmit={submit} noValidate>
      <div className="admin-editor-heading">
        <span className="form-card-heading">
          <span>{initial ? 'Edit post' : 'New post'}</span>
          <span className="pencil-line" />
        </span>
        <button type="button" className="admin-btn admin-btn-ghost admin-btn-icon" onClick={onCancel} aria-label="Close editor">
          <X size={16} />
        </button>
      </div>

      <div className="field-wrap">
        <label htmlFor="post-title" className="field-label">Title</label>
        <div className="admin-input-shell">
          <input
            id="post-title"
            className="admin-input-field"
            type="text"
            placeholder="e.g. How to plan a home loan EMI"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
      </div>

      <div className="field-wrap">
        <label htmlFor="post-category" className="field-label">Category</label>
        <div className="admin-input-shell">
          <select
            id="post-category"
            className="admin-input-field"
            value={category}
            onChange={(event) => setCategory(event.target.value as BlogCategory)}
          >
            {blogCategories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="field-wrap">
        <label htmlFor="post-excerpt" className="field-label">Excerpt</label>
        <div className="admin-input-shell">
          <textarea
            id="post-excerpt"
            className="admin-input-field"
            rows={2}
            placeholder="One or two sentences shown on the blog card."
            value={excerpt}
            onChange={(event) => setExcerpt(event.target.value)}
          />
        </div>
      </div>

      <div className="field-wrap">
        <label htmlFor="post-content" className="field-label">Content</label>
        <p className="field-hint">One paragraph per line. Blank lines between paragraphs are ignored.</p>
        <div className="admin-input-shell">
          <textarea
            id="post-content"
            className="admin-input-field admin-input-content"
            rows={12}
            placeholder={'First paragraph of the article...\n\nSecond paragraph...'}
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </div>
      </div>

      <div className="admin-editor-grid">
        <div className="field-wrap">
          <label htmlFor="post-calc" className="field-label">Related calculator path</label>
          <div className="admin-input-shell">
            <input
              id="post-calc"
              className="admin-input-field"
              type="text"
              placeholder="e.g. /emi-calculator"
              value={relatedCalculator}
              onChange={(event) => setRelatedCalculator(event.target.value)}
            />
          </div>
        </div>
        <div className="field-wrap">
          <label htmlFor="post-calc-label" className="field-label">Call-to-action label</label>
          <div className="admin-input-shell">
            <input
              id="post-calc-label"
              className="admin-input-field"
              type="text"
              placeholder="e.g. Try the EMI calculator"
              value={relatedCalculatorLabel}
              onChange={(event) => setRelatedCalculatorLabel(event.target.value)}
            />
          </div>
        </div>
      </div>

      {error && <p className="field-error admin-editor-error" role="alert">{error}</p>}

      <div className="admin-editor-actions">
        <button type="button" className="admin-btn admin-btn-ghost" onClick={onCancel}>Cancel</button>
        <button type="submit" className="admin-btn admin-btn-primary">
          <Save size={15} />
          <span>{initial ? 'Save changes' : 'Publish post'}</span>
        </button>
      </div>
    </form>
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

function LoadingPanel() {
  return (
    <div className="admin-loading">
      <Loader2 size={20} strokeWidth={1.8} className="admin-spin" />
      <span>Checking your session…</span>
    </div>
  );
}

export default AdminDashboard;