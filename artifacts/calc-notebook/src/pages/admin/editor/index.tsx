import { useMemo, useState } from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft, Link as LinkIcon, Save, Send, Sparkles } from 'lucide-react';
import {
  blogCategories,
  createBlogPost,
  updateBlogPost,
  useBlogPosts,
  type BlogCategory,
  type PostStatus,
} from '@/data/blogData';
import type { AiBlogDraft, GeneratedQuestion } from '@/lib/ai-generator';
import { consumePendingAiDraft } from '@/lib/ai-draft';
import { adminPath } from '@/pages/admin/admin-layout';
import { RichTextEditor } from './RichTextEditor';
import { CategoriesSection } from './CategoriesSection';
import { ImageUploadSection } from './ImageUploadSection';
import { TagsSection } from './TagsSection';
import { FaqsSection } from './FaqsSection';
import { SeoSection } from './SeoSection';

/*
 * Blog post editor (create + edit).
 *
 * Layout (desktop):
 *   - center column (~60%): Title → Slug (auto + editable, live preview) →
 *     rich text editor → Excerpt
 *   - right sidebar (~30%): Categories, Featured image, Tags, FAQs, SEO
 *   - top-right of the editor: "Save draft" and "Publish / Update" buttons
 *
 * Rich content is stored as HTML blocks; paste from Word/Docs/websites keeps
 * its original formatting (see RichTextEditor).
 */

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function BlogEditorView({ slug }: { slug?: string }) {
  const posts = useBlogPosts();
  const [, setLocation] = useLocation();

  const existing = useMemo(() => (slug ? posts.find((post) => post.slug === slug) : undefined), [posts, slug]);
  const isEdit = Boolean(existing);
  // A "Write with AI" draft (only for new posts) is pre-filled into every field.
  const [aiDraft] = useState<AiBlogDraft | null>(() => consumePendingAiDraft());
  const hasAiDraft = Boolean(aiDraft) && !isEdit;

  const [title, setTitle] = useState(existing?.title ?? aiDraft?.title ?? '');
  const [blogSlug, setBlogSlug] = useState(existing?.slug ?? aiDraft?.slugHint ?? '');
  const [slugTouched, setSlugTouched] = useState(Boolean(existing) || Boolean(aiDraft?.slugHint));
  const [blocks, setBlocks] = useState<string[]>(existing?.content ?? aiDraft?.content ?? []);
  const [excerpt, setExcerpt] = useState(existing?.excerpt ?? aiDraft?.excerpt ?? '');
  const [category, setCategory] = useState<BlogCategory>(
    existing?.category ?? aiDraft?.category ?? 'Calculator Guides',
  );
  const [relatedCalculator, setRelatedCalculator] = useState(existing?.relatedCalculator ?? '');
  const [relatedCalculatorLabel, setRelatedCalculatorLabel] = useState(existing?.relatedCalculatorLabel ?? '');
  const [featuredImage, setFeaturedImage] = useState(existing?.featuredImage ?? '');
  const [tags, setTags] = useState<string[]>(existing?.tags ?? aiDraft?.tags ?? []);
  const [faqs, setFaqs] = useState<GeneratedQuestion[]>(existing?.faqs ?? aiDraft?.faqs ?? []);
  const [calcCategories, setCalcCategories] = useState<string[]>(
    existing?.calculatorCategories ?? aiDraft?.calculatorCategories ?? [],
  );
  const [metaTitle, setMetaTitle] = useState(existing?.seoTitle ?? aiDraft?.metaTitle ?? '');
  const [metaDescription, setMetaDescription] = useState(existing?.seoMetaDescription ?? aiDraft?.metaDescription ?? '');
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const onTitleChange = (value: string) => {
    setTitle(value);
    if (!slugTouched) setBlogSlug(toSlug(value));
  };

  const handleSave = (status: PostStatus) => {
    if (!title.trim()) {
      setError('Add a title for the post.');
      return;
    }
    if (!excerpt.trim()) {
      setError('Add a short excerpt — it shows on blog cards and in search results.');
      return;
    }
    if (blocks.length === 0 || blocks.every((block) => !block.replace(/<[^>]*>/g, '').trim())) {
      setError('Add some content before publishing.');
      return;
    }

    setSaving(true);
    const draft = {
      title: title.trim(),
      category,
      excerpt: excerpt.trim(),
      content: blocks,
      status,
      relatedCalculator: relatedCalculator.trim(),
      relatedCalculatorLabel: relatedCalculator.trim() ? (relatedCalculatorLabel.trim() || relatedCalculator.trim()) : '',
      featuredImage: featuredImage.trim(),
      seoTitle: metaTitle.trim(),
      seoMetaDescription: metaDescription.trim(),
      calculatorCategories: calcCategories,
      tags,
      faqs,
      slug: blogSlug.trim(),
    };

    if (existing) {
      updateBlogPost(existing.slug, draft);
    } else {
      createBlogPost(draft);
    }
    setLocation(adminPath('/blog'));
  };

  const slugPreview = blogSlug ? `/blog/${blogSlug}` : '/blog/…';

  return (
    <div className="asb-editor-scroll">
      <header className="asb-editor-topbar">
        <button type="button" className="asb-back-btn" onClick={() => setLocation(adminPath('/blog'))}>
          <ArrowLeft size={15} strokeWidth={2} />
          <span>Blogs</span>
        </button>

        <div className="asb-editor-topbar-right">
          <span className={`asb-chip${isEdit ? ' asb-chip-draft' : ''}`}>{isEdit ? 'Editing' : 'New post'}</span>
          <button
            type="button"
            className="asb-btn asb-btn-ghost"
            onClick={() => handleSave('draft')}
            disabled={saving}
          >
            {saving ? <span className="asb-spinner" /> : <Save size={15} />}
            <span>Save draft</span>
          </button>
          <button type="button" className="asb-btn asb-btn-primary" onClick={() => handleSave('published')} disabled={saving}>
            <Send size={15} />
            <span>{isEdit ? 'Update' : 'Publish'}</span>
          </button>
        </div>
      </header>

      <div className="asb-content">
        {hasAiDraft && (
          <div className="asb-ai-banner" role="status">
            <Sparkles size={15} strokeWidth={1.9} />
            <span>AI draft loaded — every field is pre-filled and fully editable. Nothing is saved until you hit "Save draft" or "Publish".</span>
          </div>
        )}
        {error && (
          <div className="asb-error" role="alert">
            {error}
          </div>
        )}

        <div className="asb-editor-grid">
          {/* Center column — main editing surface */}
          <div className="asb-editor-center">
            <div className="asb-panel">
              <div className="asb-panel-body asb-editor-fields">
                <input
                  className="asb-title-input"
                  value={title}
                  onChange={(event) => onTitleChange(event.target.value)}
                  placeholder="Enter blog title"
                  aria-label="Blog title"
                />

                <div className="asb-slug-row">
                  <div className="asb-slug-input">
                    <input
                      value={blogSlug}
                      onChange={(event) => {
                        setBlogSlug(toSlug(event.target.value));
                        setSlugTouched(true);
                      }}
                      placeholder="auto-generated-slug"
                      aria-label="Slug"
                    />
                  </div>
                  <span className="asb-slug-preview">calcnotebook.in{slugPreview}</span>
                </div>

                <div className="asb-subfield-row">
                  <div className="asb-field">
                    <span className="asb-field-label">Category</span>
                    <select value={category} onChange={(event) => setCategory(event.target.value as BlogCategory)}>
                      {blogCategories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div className="asb-field">
                    <span className="asb-field-label">Excerpt</span>
                    <textarea
                      value={excerpt}
                      onChange={(event) => setExcerpt(event.target.value)}
                      rows={2}
                      placeholder="One or two sentences shown on blog cards…"
                    />
                  </div>
                </div>

                <RichTextEditor value={blocks} onChange={setBlocks} placeholder="Start writing your article…" />
              </div>
            </div>

            <div className="asb-panel">
              <div className="asb-panel-head">
                <LinkIcon size={15} strokeWidth={1.9} />
                <span className="asb-panel-title">Call to action</span>
              </div>
              <div className="asb-panel-body asb-subfield-row">
                <div className="asb-field">
                  <span className="asb-field-label">Calculator path</span>
                  <input
                    value={relatedCalculator}
                    onChange={(event) => setRelatedCalculator(event.target.value)}
                    placeholder="e.g. /emi-calculator"
                  />
                </div>
                <div className="asb-field">
                  <span className="asb-field-label">Button label</span>
                  <input
                    value={relatedCalculatorLabel}
                    onChange={(event) => setRelatedCalculatorLabel(event.target.value)}
                    placeholder="Try the EMI calculator"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right sidebar — stacked setting panels */}
          <aside className="asb-editor-side">
            <CategoriesSection selected={calcCategories} onChange={setCalcCategories} />
            <ImageUploadSection value={featuredImage} onChange={setFeaturedImage} />
            <TagsSection value={tags} onChange={setTags} subject={title} />
            <FaqsSection value={faqs} onChange={setFaqs} content={blocks.join('\n')} />
            <SeoSection
              metaTitle={metaTitle}
              metaDescription={metaDescription}
              onChangeTitle={setMetaTitle}
              onChangeDescription={setMetaDescription}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}