import { Link } from 'wouter';
import { useSiteSettings } from '@/data/siteSettings';
import { bestForCategories } from '@/data/bestFor';

const categoryLinks = [
  { label: 'Finance & Loans', href: '/categories/finance-loans' },
  { label: 'Tax & GST', href: '/categories/tax-gst' },
  { label: 'Property & Real Estate', href: '/categories/property-real-estate' },
  { label: 'Health & Fitness', href: '/categories/health-fitness' },
  { label: 'Student Tools', href: '/categories/student-tools' },
  { label: 'Everyday Math', href: '/categories/everyday-math' },
];

export function SiteFooter({ variant = 'standard' }: { variant?: 'home' | 'standard' }) {
  const settings = useSiteSettings();
  const year = new Date().getFullYear();

  const linkColumns = [
    {
      title: 'Quick Links',
      links: [
        { label: 'Home', href: '/' },
        { label: 'Blog', href: '/blog' },
        { label: 'Stamp Duty Calculator', href: '/stamp-duty-calculator' },
        { label: 'EMI Calculator', href: '/emi-calculator' },
      ],
    },
    {
      title: 'Categories We Cover',
      links: categoryLinks,
    },
    {
      title: 'Legal',
      links: [
        { label: 'Terms', href: '/terms' },
        { label: 'Privacy', href: '/privacy' },
        { label: 'Disclaimer', href: '/disclaimer' },
        { label: 'FAQ', href: '/faq' },
      ],
    },
    {
      title: 'Best For',
      links: bestForCategories.map((category) => ({ label: category.name, href: `/best-for/${category.slug}` })),
    },
  ];

  return (
    <footer className="site-footer" data-variant={variant}>
      <div className="footer-cols">
        <div className="footer-brand">
          <div className="footer-brand-row">
            <span className="footer-mark">CN</span>
            <div>
              <div className="footer-brand-name">{settings.siteName}</div>
              <div className="footer-brand-sub">everyday calculations</div>
            </div>
          </div>
          <p className="footer-brand-desc">
            {settings.siteTagline}. Every calculator is free, private, and built to run on your own device.
          </p>
          <a href={`mailto:${settings.contactEmail}`} className="footer-brand-mail">
            {settings.contactEmail}
          </a>
        </div>

        {linkColumns.map((column) => (
          <div className="footer-col" key={column.title}>
            <h3 className="footer-col-title">{column.title}</h3>
            <nav className="footer-col-links" aria-label={column.title}>
              {column.links.map((link) => (
                <Link key={`${column.title}-${link.href}`} href={link.href} className="footer-col-link">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        <span>© {year} {settings.siteName}. Free, private, and always free to use.</span>
        <span className="footer-bottom-hint">Made for the space between “wait, let me calculate that” and “there it is.”</span>
      </div>
    </footer>
  );
}