import { useSyncExternalStore } from 'react';

export type BlogCategory =
  | 'Calculator Guides'
  | 'Finance & Loans'
  | 'Tax & GST'
  | 'Health & Fitness'
  | 'Student/Education'
  | 'Everyday Life';

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
};

export type BlogPostDraft = {
  title: string;
  category: BlogCategory;
  excerpt: string;
  content: string[];
  relatedCalculator?: string;
  relatedCalculatorLabel?: string;
};

export const blogCategories: BlogCategory[] = [
  'Calculator Guides',
  'Finance & Loans',
  'Tax & GST',
  'Health & Fitness',
  'Student/Education',
  'Everyday Life',
];

const STORAGE_KEY = 'calc-notebook:blog-posts:v1';

function loadPosts(): BlogPost[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (post): post is BlogPost =>
        typeof post === 'object' &&
        post !== null &&
        typeof (post as BlogPost).slug === 'string' &&
        typeof (post as BlogPost).title === 'string',
    );
  } catch {
    return [];
  }
}

let posts: BlogPost[] = loadPosts();
let version = 0;
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

export function getBlogPosts(): BlogPost[] {
  return posts;
}

export function subscribeBlogStore(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useBlogPosts(): BlogPost[] {
  useSyncExternalStore(subscribeBlogStore, () => version);
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
  const words = content.join(' ').split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

export function createBlogPost(draft: BlogPostDraft): BlogPost {
  const post: BlogPost = {
    slug: uniqueSlug(slugify(draft.title)),
    title: draft.title.trim(),
    metaDescription: draft.excerpt.trim(),
    category: draft.category,
    excerpt: draft.excerpt.trim(),
    date: dateString(),
    readTime: computeReadTime(draft.content),
    content: draft.content,
    relatedCalculator: draft.relatedCalculator?.trim() || undefined,
    relatedCalculatorLabel: draft.relatedCalculatorLabel?.trim() || undefined,
  };
  posts = [post, ...posts];
  publish();
  return post;
}

export function updateBlogPost(slug: string, draft: BlogPostDraft): BlogPost | undefined {
  const existing = posts.find((post) => post.slug === slug);
  if (!existing) return undefined;
  const next: BlogPost = {
    ...existing,
    slug: uniqueSlug(slugify(draft.title), slug),
    title: draft.title.trim(),
    metaDescription: draft.excerpt.trim(),
    category: draft.category,
    excerpt: draft.excerpt.trim(),
    readTime: computeReadTime(draft.content),
    content: draft.content,
    relatedCalculator: draft.relatedCalculator?.trim() || undefined,
    relatedCalculatorLabel: draft.relatedCalculatorLabel?.trim() || undefined,
  };
  posts = posts.map((post) => (post.slug === slug ? next : post));
  publish();
  return next;
}

export function deleteBlogPost(slug: string): void {
  posts = posts.filter((post) => post.slug !== slug);
  publish();
}