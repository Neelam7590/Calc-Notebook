import { Link } from 'wouter';

export function SiteFooter({ variant = 'standard' }: { variant?: 'home' | 'standard' }) {
  const links = (
    <>
      <span className="footer-links-sep">|</span>
      <Link href="/blog" className="footer-text-link">Blog</Link>
      <Link href="/terms" className="footer-text-link">Terms</Link>
      <Link href="/privacy" className="footer-text-link">Privacy</Link>
      <Link href="/disclaimer" className="footer-text-link">Disclaimer</Link>
      <Link href="/faq" className="footer-text-link">FAQ</Link>
    </>
  );

  if (variant === 'home') {
    return (
      <footer className="home-footer">
        <span className="footer-mark">CN</span>
        <span>Made for the space between &quot;wait, let me calculate that&quot; and &quot;there it is.&quot;</span>
        {links}
      </footer>
    );
  }

  return (
    <footer className="calculator-footer">
      <span>CALC NOTEBOOK</span>
      <span className="footer-dash" />
      <span>Numbers, without the spreadsheet feeling.</span>
      {links}
    </footer>
  );
}