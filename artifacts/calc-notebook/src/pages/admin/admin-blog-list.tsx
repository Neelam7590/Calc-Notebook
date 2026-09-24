import { useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import { useLocation } from 'wouter';
import { FilePlus2, FolderTree, Loader2, NotebookPen, Pencil, Plus, Search, Sparkles, Trash2, X, ArrowLeft } from 'lucide-react';
import {
  blogCategories,
  deleteBlogPost,
  getCalculatorCategories,
  addCalculatorCategory,
  removeCalculatorCategory,
  setPostStatus,
  useBlogPosts,
  type BlogCategory,
  type BlogPost,
} from '@/data/blogData';
import { generateBlogDraft, type AiBlogStyle } from '@/lib/ai-generator';
import { setPendingAiDraft } from '@/lib/ai-draft';
import { adminPath } from '@/pages/admin/admin-layout';

/*
 * Blog management page.
 * - "New" + "Write with AI" buttons top-right.
 * - A search box filters posts by title/excerpt.
 * - A category dropdown filters by blog category.
 * - Each post has a live/off toggle: ON shows it on the public blog, OFF hides it.
 * - The most recent posts are listed on top.
 * - ?tab=categories opens the category manager (blog + calculator categories).
 */

function sortByRecent(a: BlogPost, b: BlogPost): number {
  const aTime = new Date(a.updatedAt ?? `${a.date}T00:00:00`).getTime();
  const bTime = new Date(b.updatedAt ?? `${b.date}T00:00:00`).getTime();
  if (aTime !== bTime) return bTime - aTime;
  return b.date.localeCompare(a.date);
}

export default function BlogListView() {
  const posts = useBlogPosts();
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [aiOpen, setAiOpen] = useState(false);

  const params = new URLSearchParams(window.location.search);
  const showCategories = params.get('tab') === 'categories';

  const sorted = useMemo(() => [...posts].sort(sortByRecent), [posts]);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sorted.filter((post) => {
      const matchesQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q);
      const matchesCategory = category === 'all' || post.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [sorted, query, category]);

  return (
    <div className="asb-content">
      {showCategories ? (
        <CategoriesManager onBack={() => setLocation(adminPath('/blog'))} />
      ) : (
        <>
          <div className="asb-head-row">
            <div>
              <h2 className="asb-page-title">Blog posts</h2>
              <p className="asb-page-sub">Recent posts are listed first. Search, filter, and manage everything here.</p>
            </div>
            <div className="asb-head-actions">
              <button
                type="button"
                className="asb-btn asb-btn-ghost"
                onClick={() => setLocation(adminPath('/blog?tab=categories'))}
              >
                <FolderTree size={15} strokeWidth={1.9} />
                <span>Categories</span>
              </button>
              <button type="button" className="asb-btn asb-btn-ai" onClick={() => setAiOpen(true)}>
                <Sparkles size={15} strokeWidth={1.9} />
                <span>Write with AI</span>
              </button>
              <button type="button" className="asb-btn asb-btn-primary" onClick={() => setLocation(adminPath('/blog/new'))}>
                <Plus size={16} strokeWidth={2.2} />
                <span>New</span>
              </button>
            </div>
          </div>

          <div className="asb-filter-row">
            <div className="asb-search">
              <Search size={16} strokeWidth={2} className="asb-search-icon" />
              <input
                type="search"
                placeholder="Search blogs…"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                aria-label="Search blogs"
              />
            </div>
            <div className="asb-select-wrap">
              <select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filter by category">
                <option value="all">All categories</option>
                {blogCategories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="asb-empty">
              <NotebookPen size={20} strokeWidth={1.6} />
              <p>{posts.length === 0 ? 'No blog posts yet. Click "New" to write your first one.' : 'No posts match your search or filter.'}</p>
            </div>
          ) : (
            <ul className="asb-post-list">
              {filtered.map((post) => (
                <li key={post.slug} className="asb-post-row">
                  <div className="asb-post-main">
                    <div className="asb-post-meta">
                      <span className={`asb-chip asb-chip-status${post.status === 'draft' ? ' asb-chip-draft' : ''}`}>{post.status}</span>
                      <span className="asb-post-category">{post.category}</span>
                      <span className="asb-post-date">{new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <h3 className="asb-post-title">{post.title}</h3>
                    <p className="asb-post-excerpt">{post.excerpt}</p>
                    <span className="asb-post-url">/blog/{post.slug}</span>
                  </div>
                  <div className="asb-post-actions">
                    <div className="asb-visibility">
                      <button
                        type="button"
                        role="switch"
                        aria-checked={post.status === 'published'}
                        aria-label={post.status === 'published' ? 'Hide this post from the website' : 'Show this post on the website'}
                        className={`asb-toggle${post.status === 'published' ? ' asb-toggle-on' : ''}`}
                        onClick={() => setPostStatus(post.slug, post.status === 'published' ? 'draft' : 'published')}
                      >
                        <span className="asb-toggle-knob" />
                      </button>
                      <span className={`asb-visibility-label${post.status === 'published' ? ' asb-visibility-on' : ''}`}>
                        {post.status === 'published' ? 'Live on website' : 'Hidden from website'}
                      </span>
                    </div>
                    <div className="asb-post-action-btns">
                      <button type="button" className="asb-btn asb-btn-soft" onClick={() => setLocation(adminPath(`/blog/edit/${encodeURIComponent(post.slug)}`))}>
                        <Pencil size={14} />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        className="asb-btn asb-btn-danger-soft"
                        onClick={() => {
                          if (window.confirm(`Delete "${post.title}"? This cannot be undone.`)) {
                            deleteBlogPost(post.slug);
                          }
                        }}
                      >
                        <Trash2 size={14} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        {aiOpen && <AiDialog onClose={() => setAiOpen(false)} onGenerated={() => setLocation(adminPath('/blog/new'))} />}
        </>
      )}
    </div>
  );
}

/*
 * "Write with AI" dialog. Collects a short prompt + category preferences,
 * generates a full draft, stores it, and jumps into the editor where every
 * field is pre-filled (and fully editable) before anything is saved.
 */
function AiDialog({ onClose, onGenerated }: { onClose: () => void; onGenerated: () => void }) {
  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState<BlogCategory>('Calculator Guides');
  const [style, setStyle] = useState<AiBlogStyle>('How-to guide');
  const [pickedCats, setPickedCats] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  const toggleCat = (name: string) => {
    setPickedCats((prev) => (prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]));
  };

  const generate = async (event: FormEvent) => {
    event.preventDefault();
    if (!topic.trim()) {
      setError('Tell the AI what the post should be about.');
      return;
    }
    setGenerating(true);
    setError(null);
    try {
      const draft = await generateBlogDraft({
        topic: topic.trim(),
        category,
        style,
        calculatorCategories: pickedCats,
      });
      setPendingAiDraft(draft);
      onGenerated();
    } catch {
      setError('AI generation failed. Please try again.');
      setGenerating(false);
    }
  };

  return (
    <div className="asb-modal-overlay" onClick={onClose} role="presentation">
      <div
        className="asb-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Write a blog post with AI"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="asb-modal-head">
          <div className="asb-modal-title">
            <Sparkles size={16} strokeWidth={1.9} />
            <span>Write with AI</span>
          </div>
          <button type="button" className="asb-modal-close" onClick={onClose} aria-label="Close">
            <X size={16} strokeWidth={2} />
          </button>
        </div>

        <form onSubmit={generate} noValidate>
          <p className="asb-hint">
            Describe the post and pick its settings. AI fills in the title, content, tags, FAQs and SEO preview —
            you can change anything in the editor before publishing.
          </p>

          <label className="asb-field">
            <span className="asb-field-label">What should the post be about?</span>
            <textarea
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              rows={3}
              placeholder="e.g. How to calculate GST on an invoice"
              aria-label="Blog topic"
            />
          </label>

          <div className="asb-field">
            <span className="asb-field-label">Blog category</span>
            <select value={category} onChange={(event) => setCategory(event.target.value as BlogCategory)}>
              {blogCategories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="asb-field">
            <span className="asb-field-label">Post style</span>
            <select value={style} onChange={(event) => setStyle(event.target.value as AiBlogStyle)}>
              {(['How-to guide', 'Quick explainer', 'Comparison', 'Tips & listicle'] as AiBlogStyle[]).map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          <div className="asb-field">
            <span className="asb-field-label">Calculator categories (optional)</span>
            <div className="asb-ai-pick-list">
              {getCalculatorCategories().map((name) => (
                <button
                  key={name}
                  type="button"
                  aria-pressed={pickedCats.includes(name)}
                  className={`asb-chip asb-chip-pick${pickedCats.includes(name) ? ' asb-chip-picked' : ''}`}
                  onClick={() => toggleCat(name)}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="asb-error" role="alert">{error}</p>}

          <div className="asb-modal-actions">
            <button type="button" className="asb-btn asb-btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="asb-btn asb-btn-ai" disabled={generating}>
              {generating ? <Loader2 size={15} className="admin-spin" /> : <Sparkles size={15} />}
              <span>{generating ? 'Writing draft…' : 'Generate full post'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/*
 * Category manager: the fixed blog categories (public filter) plus the
 * editable list of calculator-type categories used in the post editor.
 */
function CategoriesManager({ onBack }: { onBack: () => void }) {
  const posts = useBlogPosts();
  const [calcCategories, setCalcCategories] = useState<string[]>(() => getCalculatorCategories());
  const [newName, setNewName] = useState('');

  const countFor = (cat: string) => posts.filter((post) => post.category === cat).length;

  const add = (event: FormEvent) => {
    event.preventDefault();
    if (!newName.trim()) return;
    setCalcCategories(addCalculatorCategory(newName));
    setNewName('');
  };

  const remove = (name: string) => {
    setCalcCategories(removeCalculatorCategory(name));
  };

  return (
    <>
      <div className="asb-head-row">
        <div>
          <button type="button" className="asb-back-btn" onClick={onBack}>
            <ArrowLeft size={15} strokeWidth={2} />
            <span>Back to blogs</span>
          </button>
          <h2 className="asb-page-title">Categories</h2>
          <p className="asb-page-sub">Blog categories drive the public filter; calculator categories tag which calculator a post is about.</p>
        </div>
      </div>

      <div className="asb-cats-grid">
        <section className="asb-panel">
          <div className="asb-panel-head">
            <span className="asb-panel-title">Blog categories</span>
          </div>
          <ul className="asb-cats-list">
            {blogCategories.map((cat) => (
              <li key={cat} className="asb-cats-item">
                <span>{cat}</span>
                <span className="asb-cats-count">{countFor(cat)} posts</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="asb-panel">
          <div className="asb-panel-head">
            <span className="asb-panel-title">Calculator categories</span>
          </div>
          <form className="asb-add-cat" onSubmit={add}>
            <input
              value={newName}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setNewName(event.target.value)}
              placeholder="Add a new category, e.g. Salary Calculator"
              aria-label="New calculator category"
            />
            <button type="submit" className="asb-btn asb-btn-primary" disabled={!newName.trim()}>
              <FilePlus2 size={15} />
              <span>Add</span>
            </button>
          </form>
          <ul className="asb-chip-list">
            {calcCategories.map((name) => (
              <li key={name} className="asb-chip asb-chip-tag">
                <span>{name}</span>
                <button type="button" onClick={() => remove(name)} aria-label={`Remove ${name}`}>
                  <X size={12} strokeWidth={2.4} />
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}