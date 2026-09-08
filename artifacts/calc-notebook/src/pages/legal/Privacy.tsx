import { useEffect } from 'react';
import { TopBar } from '@/components/top-bar';
import { SiteFooter } from '@/components/site-footer';

export default function Privacy() {
  useEffect(() => {
    document.title = 'Privacy Policy | Calc Notebook';
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Learn how Calc Notebook handles your data and privacy while using our free calculators.');
  }, []);

  return (
    <main className="notebook-page min-h-[100dvh]">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-8">
        <TopBar activeSection="privacy" />

        <article className="legal-page animate-rise">
          <div className="blog-article-header">
            <div className="home-kicker"><span className="kicker-line" /><span>LEGAL</span></div>
            <h1 className="calculator-title">Privacy Policy</h1>
            <p className="calculator-subtitle">Last updated: September 1, 2026</p>
          </div>

          <div className="legal-content">
            <section>
              <h2>1. Introduction</h2>
              <p>This Privacy Policy explains how Calc Notebook ("we," "us," or "our") handles information when you visit our website. We are committed to protecting your privacy and being transparent about our practices.</p>
            </section>

            <section>
              <h2>2. Information We Do Not Collect</h2>
              <p>Calc Notebook is designed with privacy in mind. Our calculators process all inputs entirely in your browser using JavaScript. We do not collect, store, transmit, or have access to any data you enter into our calculators. Your loan amounts, dates of birth, weight, height, marks, and financial figures never leave your device.</p>
            </section>

            <section>
              <h2>3. Information That May Be Collected Automatically</h2>
              <p>Like most websites, Calc Notebook may automatically collect certain non-personal information when you visit, including:</p>
              <ul>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Referring website or search engine</li>
                <li>Pages visited and time spent on each page</li>
                <li>General geographic location (country/region level only)</li>
              </ul>
              <p>This information is used solely to improve our website and user experience.</p>
            </section>

            <section>
              <h2>4. Cookies and Analytics</h2>
              <p>Calc Notebook may use cookies and third-party analytics services (such as Google Analytics) to understand how visitors interact with our website. Cookies are small text files stored on your device that help us measure traffic and improve our content.</p>
              <p>We may also use Google AdSense to display advertisements. Google AdSense uses cookies to serve ads based on your prior visits to our website or other websites. You can opt out of personalised advertising by visiting Google's Ad Settings.</p>
            </section>

            <section>
              <h2>5. Third-Party Advertising</h2>
              <p>We may display ads from third-party ad networks, including Google AdSense. These advertisers may use cookies and similar technologies to collect information about your visits to our site and other websites in order to provide relevant advertisements. This process does not involve us sharing any personal information with advertisers.</p>
            </section>

            <section>
              <h2>6. Children's Privacy</h2>
              <p>Calc Notebook does not knowingly collect any personal information from children under the age of 13. Our calculators are general-purpose tools available to everyone, and no registration or personal data is required to use them.</p>
            </section>

            <section>
              <h2>7. Data Security</h2>
              <p>Since we do not collect personal data through our calculators, there is no personal data at risk on our servers. We take reasonable measures to protect the non-personal information collected automatically through analytics and cookies.</p>
            </section>

            <section>
              <h2>8. Your Choices</h2>
              <p>You can control cookies through your browser settings. You may also use browser extensions or ad blockers to prevent analytics tracking and personalised advertisements. Disabling cookies may affect your browsing experience on some websites.</p>
            </section>

            <section>
              <h2>9. Changes to This Policy</h2>
              <p>We may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated date. We encourage you to review this policy periodically.</p>
            </section>

            <section>
              <h2>10. Contact</h2>
              <p>If you have questions about this Privacy Policy, please contact us through the information provided on our website.</p>
            </section>
          </div>
        </article>

        <SiteFooter />
      </div>
    </main>
  );
}
