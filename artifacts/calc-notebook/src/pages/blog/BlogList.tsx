import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { PenLine } from 'lucide-react';
import { TopBar } from '@/components/top-bar';
import { SiteFooter } from '@/components/site-footer';
import { useBlogPosts, blogCategories, type BlogCategory } from '@/data/blogData';

function PageSeo({ title, description }: { title: string; description: string; path: string }) {
  useEffect(() => {
    document.title = title;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta) meta.setAttribute('content', description);
  }, [title, description]);
  return null;
}

export default function BlogList() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | 'All'>('All');
  const blogPosts = useBlogPosts();

  const filtered = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter((post) => post.category === activeCategory);

  return (
    <main className="notebook-page min-h-[100dvh]">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-8">
        <PageSeo
          title="Blog – Finance & Calculator Guides | Calc Notebook"
          description="Read helpful guides on finance, loans, tax, GST, and how to use our free calculators."
          path="/blog"
        />
        <TopBar activeSection="blog" />

        <section className="blog-page animate-rise">
          <div className="blog-page-header">
            <div className="home-kicker"><span className="kicker-line" /><span>THE NOTEBOOK BLOG</span></div>
            <h1 className="calculator-title">Blog</h1>
            <p className="calculator-subtitle">Simple guides to help you use calculators better, manage money wisely, and understand the numbers around you.</p>
          </div>

          <div className="blog-category-filters" role="group" aria-label="Filter by category">
            <button
              type="button"
              className={`blog-filter-btn ${activeCategory === 'All' ? 'blog-filter-active' : ''}`}
              onClick={() => setActiveCategory('All')}
            >
              All Posts
            </button>
            {blogCategories.map((cat) => (
              <button
                type="button"
                key={cat}
                className={`blog-filter-btn ${activeCategory === cat ? 'blog-filter-active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="blog-empty animate-rise" data-testid="blog-empty-state">
              <div className="blog-empty-icon"><PenLine size={24} strokeWidth={1.6} /></div>
              <p className="blog-empty-title">No posts yet — coming soon.</p>
              <p className="blog-empty-detail">We're writing simple guides about calculators, finance, tax, health, and everyday maths. Check back here soon.</p>
            </div>
          ) : (
            <div className="blog-grid">
              {filtered.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card animate-rise">
                  <div className="blog-card-top">
                    <span className="blog-card-category">{post.category}</span>
                    <span className="blog-card-time">{post.readTime}</span>
                  </div>
                  <h2 className="blog-card-title">{post.title}</h2>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  <div className="blog-card-bottom">
                    <span className="blog-card-date">{new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    <span className="blog-card-link">Read More</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}