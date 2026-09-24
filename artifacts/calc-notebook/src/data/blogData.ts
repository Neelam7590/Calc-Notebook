import { useSyncExternalStore } from 'react';
import { getSupabase } from '@/lib/supabase';

export type BlogCategory =
  | 'Calculator Guides'
  | 'Finance & Loans'
  | 'Tax & GST'
  | 'Health & Fitness'
  | 'Student/Education'
  | 'Everyday Life';

export type PostStatus = 'draft' | 'published';

export type BlogFaq = { question: string; answer: string };

export type BlogPost = {
  slug: string;
  title: string;
  metaDescription: string;
  category: BlogCategory;
  excerpt: string;
  date: string;
  readTime: string;
  content: string[];
  relatedCalculator?: string;
  relatedCalculatorLabel?: string;
  status: PostStatus;
  featuredImage?: string;
  seoTitle?: string;
  seoMetaDescription?: string;
  calculatorCategories?: string[];
  tags?: string[];
  faqs?: BlogFaq[];
  updatedAt?: string;
};

export type BlogPostDraft = {
  title: string;
  category: BlogCategory;
  excerpt: string;
  content: string[];
  relatedCalculator?: string;
  relatedCalculatorLabel?: string;
  status?: PostStatus;
  featuredImage?: string;
  seoTitle?: string;
  seoMetaDescription?: string;
  calculatorCategories?: string[];
  tags?: string[];
  faqs?: BlogFaq[];
  slug?: string;
};

export const blogCategories: BlogCategory[] = [
  'Calculator Guides',
  'Finance & Loans',
  'Tax & GST',
  'Health & Fitness',
  'Student/Education',
  'Everyday Life',
];

const STORAGE_KEY = 'calc-notebook:blog-posts:v2';
const LEGACY_STORAGE_KEY = 'calc-notebook:blog-posts:v1';

function isBlogPost(post: unknown): post is BlogPost {
  return (
    typeof post === 'object' &&
    post !== null &&
    typeof (post as BlogPost).slug === 'string' &&
    typeof (post as BlogPost).title === 'string'
  );
}

function loadPosts(): BlogPost[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY) ?? window.localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isBlogPost);
  } catch {
    return [];
  }
}

let posts: BlogPost[] = loadPosts();
let version = 0;
let synced = false;
let syncing = false;
const listeners = new Set<() => void>();

function persist() {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch {
    // Storage may be unavailable; the in-memory store still works for this session.
  }
}

function publish() {
  version += 1;
  persist();
  listeners.forEach((listener) => listener());
}

function subscriber(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

type PostRow = {
  slug: string;
  title: string;
  metaDescription?: string | null;
  category: string;
  excerpt?: string | null;
  date?: string | null;
  readTime?: string | null;
  content?: unknown;
  calcRelated?: string | null;
  calcRelatedLabel?: string | null;
  status?: string | null;
  featuredImage?: string | null;
  seoTitle?: string | null;
  seoMetaDescription?: string | null;
  calculatorCategories?: Array<string> | string | null;
  tags?: Array<string> | string | null;
  faqs?: Array<BlogFaq> | string | null;
  updatedAt?: string | null;
};

function rowToPost(row: PostRow): BlogPost {
  return {
    slug: row.slug,
    title: row.title,
    metaDescription: row.metaDescription ?? '',
    category: (blogCategories.includes(row.category as BlogCategory) ? row.category : 'Everyday Life') as BlogCategory,
    excerpt: row.excerpt ?? '',
    date: row.date ?? dateString(),
    readTime: row.readTime ?? computeReadTime([]),
    content: Array.isArray(row.content) ? row.content.filter((part): part is string => typeof part === 'string') : [],
    relatedCalculator: row.calcRelated ?? undefined,
    relatedCalculatorLabel: row.calcRelatedLabel ?? undefined,
    status: row.status === 'published' ? 'published' : 'draft',
    featuredImage: row.featuredImage ?? undefined,
    seoTitle: row.seoTitle ?? undefined,
    seoMetaDescription: row.seoMetaDescription ?? undefined,
    calculatorCategories: parseCalculatorCategories(row.calculatorCategories),
    tags: parseCalculatorCategories(row.tags),
    faqs: parseFaqs(row.faqs),
    updatedAt: row.updatedAt ?? undefined,
  };
}

function parseFaqs(value: Array<BlogFaq> | string | null | undefined): BlogFaq[] | undefined {
  if (Array.isArray(value)) {
    return value.filter(
      (item): item is BlogFaq =>
        typeof item === 'object' &&
        item !== null &&
        typeof (item as BlogFaq).question === 'string' &&
        typeof (item as BlogFaq).answer === 'string',
    );
  }
  if (typeof value === 'string') {
    try {
      const parsed: unknown = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.filter(
          (item): item is BlogFaq =>
            typeof item === 'object' &&
            item !== null &&
            typeof (item as BlogFaq).question === 'string' &&
            typeof (item as BlogFaq).answer === 'string',
        );
      }
    } catch {
      // Not JSON — treat as no FAQs.
    }
  }
  return undefined;
}

function parseCalculatorCategories(value: Array<string> | string | null | undefined): string[] | undefined {
  if (Array.isArray(value)) return value.filter((item): item is string => typeof item === 'string');
  if (typeof value === 'string') {
    try {
      const parsed: unknown = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed.filter((item): item is string => typeof item === 'string');
    } catch {
      return [value].filter(Boolean);
    }
  }
  return undefined;
}

function postToRow(post: BlogPost): PostRow {
  return {
    slug: post.slug,
    title: post.title,
    metaDescription: post.metaDescription,
    category: post.category,
    excerpt: post.excerpt,
    date: post.date,
    readTime: post.readTime,
    content: post.content,
    calcRelated: post.relatedCalculator ?? null,
    calcRelatedLabel: post.relatedCalculatorLabel ?? null,
    status: post.status,
    featuredImage: post.featuredImage ?? null,
    seoTitle: post.seoTitle ?? null,
    seoMetaDescription: post.seoMetaDescription ?? null,
    calculatorCategories: post.calculatorCategories ?? null,
    tags: post.tags ?? null,
    faqs: post.faqs ?? null,
    updatedAt: post.updatedAt ?? null,
  };
}

function memoize<T>(fn: () => T): () => T {
  let result: T;
  let hasResult = false;
  return () => {
    if (!hasResult) {
      result = fn();
      hasResult = true;
    }
    return result;
  };
}

const canUseSupabase = memoize(() => {
  if (typeof window === 'undefined') return false;
  try {
    getSupabase();
    return true;
  } catch {
    return false;
  }
});

function ensureSupabaseSync() {
  if (typeof window === 'undefined') return;
  if (synced || syncing) return;
  if (!canUseSupabase()) {
    synced = true;
    return;
  }
  syncing = true;
  void (async () => {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('date', { ascending: false });
      if (!error && data && (data as PostRow[]).length > 0) {
        // Merge, never replace: remote rows are added only where we have no
        // local post, and a local post always wins on slug conflicts. Without
        // this, a fetch that started before a toggle/edit would overwrite the
        // whole list with stale statuses (making several posts flip off/on
        // at once instead of just the one being changed).
        posts = mergeRemotePosts(data as PostRow[], posts);
        publish();
      }
    } catch {
      // Supabase unavailable (table missing, network, auth) -> keep localStorage data.
    } finally {
      syncing = false;
      synced = true;
    }
  })();
}

/*
 * Union of remote rows and current local posts. For the same slug the local
 * version wins, because the admin edits/toggles are written to localStorage
 * synchronously and are the source of truth for this browser.
 */
function mergeRemotePosts(remote: PostRow[], local: BlogPost[]): BlogPost[] {
  const bySlug = new Map<string, BlogPost>();
  for (const row of remote) bySlug.set(row.slug, rowToPost(row));
  for (const post of local) bySlug.set(post.slug, post);
  return Array.from(bySlug.values());
}

/*
 * Applies the change to the local store immediately and mirrors the whole
 * list to Supabase afterwards (best-effort). Applying locally first means a
 * toggle/edit always works even if Supabase is unreachable, and it never has
 * to wait on network timing — each post stays fully independent.
 */
async function pushToSupabase(changes: () => void): Promise<void> {
  changes();
  if (!canUseSupabase()) return;
  try {
    const supabase = getSupabase();
    const rows = posts.map(postToRow);
    await supabase.from('posts').upsert(rows, { onConflict: 'slug' });
  } catch {
    // Best-effort mirror: if Supabase write fails, the local store remains source of truth.
  }
}

export function getBlogPosts(): BlogPost[] {
  ensureSupabaseSync();
  return posts;
}

export function subscribeBlogStore(listener: () => void): () => void {
  return subscriber(listener);
}

export function useBlogPosts(): BlogPost[] {
  useSyncExternalStore(subscriber, () => {
    ensureSupabaseSync();
    return version;
  });
  return posts;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function uniqueSlug(base: string, exclude?: string): string {
  const root = base || 'post';
  let candidate = root;
  let index = 2;
  while (posts.some((post) => post.slug === candidate && post.slug !== exclude)) {
    candidate = `${root}-${index}`;
    index += 1;
  }
  return candidate;
}

function dateString(): string {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
}

function computeReadTime(content: string[]): string {
  const words = content.join(' ').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

function isoNow(): string {
  return new Date().toISOString();
}

function applyDraft(post: BlogPost, draft: BlogPostDraft): BlogPost {
  return {
    ...post,
    title: draft.title.trim(),
    metaDescription: draft.excerpt.trim(),
    category: draft.category,
    excerpt: draft.excerpt.trim(),
    readTime: computeReadTime(draft.content),
    content: draft.content,
    relatedCalculator: draft.relatedCalculator?.trim() || undefined,
    relatedCalculatorLabel: draft.relatedCalculatorLabel?.trim() || undefined,
    status: draft.status ?? 'published',
    featuredImage: draft.featuredImage?.trim() || undefined,
    seoTitle: draft.seoTitle?.trim() || undefined,
    seoMetaDescription: draft.seoMetaDescription?.trim() || undefined,
    calculatorCategories: draft.calculatorCategories
      ? Array.from(new Set(draft.calculatorCategories.map((item) => item.trim()).filter(Boolean)))
      : undefined,
    tags: draft.tags
      ? Array.from(new Set(draft.tags.map((item) => item.trim()).filter(Boolean)))
      : undefined,
    faqs: draft.faqs
      ? draft.faqs
          .map((faq) => ({ question: faq.question.trim(), answer: faq.answer.trim() }))
          .filter((faq) => faq.question || faq.answer)
      : undefined,
    updatedAt: isoNow(),
  };
}

export function createBlogPost(draft: BlogPostDraft): BlogPost {
  const post: BlogPost = applyDraft(
    {
      slug: draft.slug ? uniqueSlug(slugify(draft.slug)) : uniqueSlug(slugify(draft.title)),
      title: draft.title.trim(),
      metaDescription: draft.excerpt.trim(),
      category: draft.category,
      excerpt: draft.excerpt.trim(),
      date: dateString(),
      readTime: computeReadTime(draft.content),
      content: draft.content,
      status: draft.status ?? 'published',
    },
    draft,
  );
  void pushToSupabase(() => {
    posts = [post, ...posts];
    publish();
  });
  return post;
}

export function updateBlogPost(slug: string, draft: BlogPostDraft): BlogPost | undefined {
  const existing = posts.find((post) => post.slug === slug);
  if (!existing) return undefined;
  const next: BlogPost = {
    ...applyDraft(existing, draft),
    slug: draft.slug ? uniqueSlug(slugify(draft.slug), slug) : uniqueSlug(slugify(draft.title), slug),
    date: existing.date,
  };
  void pushToSupabase(() => {
    posts = posts.map((post) => (post.slug === slug ? next : post));
    publish();
  });
  return next;
}

export function deleteBlogPost(slug: string): void {
  void pushToSupabase(() => {
    posts = posts.filter((post) => post.slug !== slug);
    publish();
  });
}

/*
 * Public visibility toggle. ON = published (visible on the public blog),
 * OFF = draft (hidden from the site but still saved in the admin).
 */
export function setPostStatus(slug: string, status: PostStatus): BlogPost | undefined {
  const existing = posts.find((post) => post.slug === slug);
  if (!existing) return undefined;
  const next: BlogPost = { ...existing, status, updatedAt: isoNow() };
  void pushToSupabase(() => {
    posts = posts.map((post) => (post.slug === slug ? next : post));
    publish();
  });
  return next;
}

/*
 * Calculator-type categories shown in the blog editor's "Categories" panel.
 * The built-in list is seeded below; admins can add more names and they are
 * remembered in localStorage (and would eventually be pushed to Supabase).
 */
export const DEFAULT_CALCULATOR_CATEGORIES: string[] = [
  'Age Calculator',
  'BMI Calculator',
  'Loan/EMI Calculator',
  'Percentage Calculator',
  'GST Calculator',
  'Unit Converter',
  'Scientific Calculator',
  'Age Difference Calculator',
  'Discount Calculator',
  'Interest Calculator',
];

const CALC_CATEGORIES_KEY = 'calc-notebook:blog-calc-categories:v1';

function loadCalculatorCategories(): string[] {
  if (typeof window === 'undefined') return [...DEFAULT_CALCULATOR_CATEGORIES];
  try {
    const raw = window.localStorage.getItem(CALC_CATEGORIES_KEY);
    if (!raw) return [...DEFAULT_CALCULATOR_CATEGORIES];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [...DEFAULT_CALCULATOR_CATEGORIES];
    return [...DEFAULT_CALCULATOR_CATEGORIES, ...parsed.filter((item): item is string => typeof item === 'string')];
  } catch {
    return [...DEFAULT_CALCULATOR_CATEGORIES];
  }
}

let calculatorCategories: string[] = loadCalculatorCategories();

function persistCalculatorCategories() {
  if (typeof window === 'undefined') return;
  try {
    const custom = calculatorCategories.filter((name) => !DEFAULT_CALCULATOR_CATEGORIES.includes(name));
    window.localStorage.setItem(CALC_CATEGORIES_KEY, JSON.stringify(custom));
  } catch {
    // Best-effort: in-memory list still works this session.
  }
}

export function getCalculatorCategories(): string[] {
  return calculatorCategories;
}

export function addCalculatorCategory(name: string): string[] {
  const trimmed = name.trim();
  if (trimmed && !calculatorCategories.includes(trimmed)) {
    calculatorCategories = [...calculatorCategories, trimmed];
    persistCalculatorCategories();
  }
  return calculatorCategories;
}

export function removeCalculatorCategory(name: string): string[] {
  calculatorCategories = calculatorCategories.filter((item) => item !== name);
  persistCalculatorCategories();
  return calculatorCategories;
}
