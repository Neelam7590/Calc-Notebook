/*
 * Placeholder "Generate with AI" helpers.
 *
 * Each function simulates an async AI call (small delay + deterministic mock
 * output). When you're ready to wire a real API, replace the body of these
 * functions with a fetch/API call and keep the same Promise-returning shapes —
 * the admin UI already handles loading spinners and errors.
 */

import type { BlogCategory } from '@/data/blogData';

export type GeneratedQuestion = { question: string; answer: string };

export type AiBlogStyle = 'How-to guide' | 'Quick explainer' | 'Comparison' | 'Tips & listicle';

export type AiBlogDraft = {
  title: string;
  slugHint: string;
  category: BlogCategory;
  excerpt: string;
  content: string[];
  metaTitle: string;
  metaDescription: string;
  tags: string[];
  calculatorCategories: string[];
  faqs: GeneratedQuestion[];
};

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function unique(items: string[]): string[] {
  return Array.from(new Set(items.map((item) => item.trim()).filter(Boolean)));
}

function toTitleCase(text: string): string {
  return text.replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
}

/** Auto-suggest SEO tags from the post title/content. */
export async function generateTags(subject: string): Promise<string[]> {
  // TODO: replace with your real AI endpoint, e.g.
  //   const res = await fetch('/api/ai/tags', { method: 'POST', body: JSON.stringify({ subject }) });
  //   return (await res.json()).tags;
  await delay(1300);
  const words = subject
    .toLowerCase()
    .split(/[^a-z0-9]+/i)
    .filter((word) => word.length > 3);
  const hints = [
    'step by step',
    'how to calculate',
    'new calculator',
    'beginners guide',
    'free calculator',
  ];
  return unique([...words.slice(0, 3), ...hints, ...words]).slice(0, 5);
}

/** Auto-generate FAQ question/answer pairs from the post content. */
export async function generateFaqs(content: string): Promise<GeneratedQuestion[]> {
  // TODO: replace with your real AI endpoint, e.g.
  //   const res = await fetch('/api/ai/faqs', { method: 'POST', body: JSON.stringify({ content }) });
  //   return (await res.json()).faqs;
  await delay(1500);
  const sentences = content
    .replace(/<[^>]+>/g, ' ')
    .split(/(?<=[.!?])\s+/)
    .filter((sentence) => sentence.trim().length > 20);
  const first = sentences[0]?.trim() ?? 'Your article';
  const second = sentences[1]?.trim() ?? first;
  return [
    {
      question: 'What does this tool do?',
      answer: `${first.slice(0, 180)}${first.length > 180 ? '…' : ''}`,
    },
    {
      question: 'Who is this calculator for?',
      answer: `${second.slice(0, 180)}${second.length > 180 ? '…' : ''}`,
    },
    {
      question: 'Is it free to use?',
      answer:
        'Yes — every calculator on Calc Notebook is completely free, with no sign-up required. You can use it as often as you like.',
    },
  ];
}

/*
 * Drafts an entire blog post from a short prompt: title, slug, category,
 * excerpt, content blocks (with a calculator CTA), tags, FAQs and SEO meta.
 * The admin opens the editor fully filled in and can change anything before
 * saving — nothing is published automatically.
 */
export async function generateBlogDraft(input: {
  topic: string;
  category: BlogCategory;
  style: AiBlogStyle;
  calculatorCategories: string[];
}): Promise<AiBlogDraft> {
  // TODO: replace with your real AI endpoint, e.g.
  //   const res = await fetch('/api/ai/blog', { method: 'POST', body: JSON.stringify(input) });
  //   return await res.json();
  await delay(1800);

  const topic = input.topic.trim();
  const lower = topic.charAt(0).toLowerCase() + topic.slice(1);
  const title = toTitleCase(topic);
  const slugHint = lower
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'ai-draft';
  const calc = input.calculatorCategories[0] ?? 'Calculator';
  const styleLines: Record<AiBlogStyle, string> = {
    'How-to guide': 'Here is the step-by-step approach.',
    'Quick explainer': 'Here is the short answer.',
    'Comparison': 'Here is how the two compare.',
    'Tips & listicle': 'Here are the key tips.',
  };

  const blocks: string[] = [
    `<p>If you have been trying to understand <strong>${lower}</strong>, you are in the right place. This guide breaks it down so the numbers make sense — no jargon, no guesswork.</p>`,
    `<p>Start with the details you already know, put the numbers in a ${calc}, and let it do the math. ${styleLines[input.style]}</p>`,
    `<p>Most people overestimate how complicated ${lower} really is. With the right formula and a free calculator, the whole thing takes under a minute.</p>`,
    `<p>Try it for yourself with the ${calc} above. It is free, private, and works entirely in your browser — so you can recalculate as many times as you like.</p>`,
  ];

  const excerpt = `Everything you need to know about ${lower} — explained simply, with a free ${calc} to do the work for you.`;
  const faqs = await generateFaqs(blocks.join(' '));

  return {
    title,
    slugHint,
    category: input.category,
    excerpt,
    content: blocks,
    metaTitle: `${title} – Calc Notebook`,
    metaDescription: excerpt,
    tags: unique([lower, 'calculator', 'step by step', 'free calculator']).slice(0, 4),
    calculatorCategories: unique([...input.calculatorCategories, calc]),
    faqs,
  };
}