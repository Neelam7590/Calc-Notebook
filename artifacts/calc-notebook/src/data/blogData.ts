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

export const blogCategories: BlogCategory[] = [
  'Calculator Guides',
  'Finance & Loans',
  'Tax & GST',
  'Health & Fitness',
  'Student/Education',
  'Everyday Life',
];

export const blogPosts: BlogPost[] = [];