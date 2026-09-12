import { useEffect } from 'react';
import { Link, useRoute, useLocation } from 'wouter';
import { ArrowLeft, ArrowRight, PenLine } from 'lucide-react';
import { TopBar } from '@/components/top-bar';
import { SiteFooter } from '@/components/site-footer';
import { useBlogPosts } from '@/data/blogData';

export default function BlogPost() {
  const [, params] = useRoute('/blog/:slug');
  const [, setLocation] = useLocation();
  const slug = params?.slug ?? '';
  const post = useBlogPosts().find((p) => p.slug === slug);

  useEffect(() => {
    document.title = post
      ? `${post.title} – Finance & Calculator Guides | Calc Notebook`
      : 'Blog – Finance & Calculator Guides | Calc Notebook';
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Read helpful guides on finance, loans, tax, GST, and how to use our free calculators.');
  }, [post]);

  return (
    <main className="notebook-page min-h-[100dvh]">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-8">
        <TopBar activeSection="blog" />

        <div className="blog-page animate-rise">
          <button type="button" className="back-button" onClick={() => setLocation('/blog')}>
            <ArrowLeft size={16} /><span>Back to blog</span>
          </button>

          {post ? (
            <article className="blog-article">
              <div className="blog-article-header">
                <div className="home-kicker"><span className="kicker-line" /><span>{post.category.toUpperCase()}</span></div>
                <h1 className="calculator-title">{post.title}</h1>
                <div className="blog-article-meta">
                  <span className="blog-card-category">{post.category}</span>
                  <span className="blog-card-time">{post.readTime}</span>
                  <span className="blog-card-date">{new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
              </div>

              <div className="blog-article-body">
                {post.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {post.relatedCalculator && (
                <div className="blog-article-cta">
                  <span className="card-eyebrow">TRY THE CALCULATOR</span>
                  <Link href={post.relatedCalculator} className="calculate-button" style={{ maxWidth: '22rem' }}>
                    <span>{post.relatedCalculatorLabel}</span>
                    <ArrowRight size={18} />
                  </Link>
                </div>
              )}
            </article>
          ) : (
            <div className="blog-empty" style={{ marginTop: '3rem' }} data-testid="blog-post-empty-state">
              <div className="blog-empty-icon"><PenLine size={24} strokeWidth={1.6} /></div>
              <h1 className="blog-empty-title">No posts yet — coming soon.</h1>
              <p className="blog-empty-detail">This article isn't published yet. Please check back later.</p>
            </div>
          )}
        </div>

        <SiteFooter />
      </div>
    </main>
  );
}