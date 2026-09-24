import { useEffect } from 'react';
import { useSiteSettings, DEFAULT_SETTINGS } from '@/data/siteSettings';

export type SeoConfig = {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  noindex?: boolean;
  canonicalPath?: string;
};

export const DEFAULT_KEYWORDS = [
  'calculator',
  'free online calculator',
  'calculators',
  'financial calculator',
  'notebook',
  'math tools',
];

const DEFAULT_OG_IMAGE = '/og-image.png';

function isProd(): boolean {
  return typeof window !== 'undefined' && window.location.hostname === 'calc-notebook.netlify.app';
}

export function useDocumentMeta(config: SeoConfig): void {
  const site = useSiteSettings();
  const siteName = site.siteName || DEFAULT_SETTINGS.siteName;

  useEffect(() => {
    const title = config.title?.trim()
      ? `${config.title} | ${siteName}`
      : siteName;
    const description = config.description?.trim() || site.siteTagline || DEFAULT_SETTINGS.siteTagline;
    let keywords = DEFAULT_KEYWORDS.join(', ');
    if (config.keywords && config.keywords.length > 0) {
      keywords = [...config.keywords, ...DEFAULT_KEYWORDS].join(', ');
    }
    const image = config.image?.trim() || DEFAULT_OG_IMAGE;

    document.title = title;

    setMeta('name', 'description', description);
    setMeta('name', 'keywords', keywords);
    setMeta('name', 'robots', config.noindex ? 'noindex, nofollow' : 'index, follow');
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', siteName);
    setMeta('property', 'og:image', image);
    if (config.canonicalPath) {
      const url = `https://calc-notebook.netlify.app${config.canonicalPath}`;
      setMeta('property', 'og:url', url);
      setCanonical(url);
    }
    return () => {
      setMeta('name', 'robots', 'index, follow');
      removeCanonical();
    };
  }, [config.title, config.description, JSON.stringify(config.keywords), config.image, config.noindex, config.canonicalPath, siteName, site.siteTagline]);
}

function setMeta(attr: 'name' | 'property', key: string, value: string): void {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', value);
}

function setCanonical(url: string): void {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

function removeCanonical(): void {
  document.head.querySelectorAll('link[rel="canonical"]').forEach((link) => link.remove());
}

export { isProd };
