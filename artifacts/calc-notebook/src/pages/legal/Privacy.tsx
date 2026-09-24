import { useEffect } from 'react';
import { TopBar } from '@/components/top-bar';
import { BackButton } from '@/components/back-button';
import { SiteFooter } from '@/components/site-footer';

const neverCollect = [
  'Loan amounts you enter in the EMI or Stamp Duty calculator',
  'Property values, plot areas, or buyer details you type in',
  'Your date of birth in the Age calculator',
  'Your height, weight, or BMI measurements',
  'Exam marks, grade points, or credits in the CGPA calculator',
  'Your email address or password — we never ask you to create an account to use tools',
];

export default function Privacy() {
  useEffect(() => {
    document.title = 'Privacy Policy | Calc Notebook';
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Learn exactly what Calc Notebook does and does not collect. All calculator inputs stay on your device — this page explains our privacy practices in plain language.');
  }, []);

  return (
    <main className="notebook-page min-h-[100dvh]">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-8">
        <TopBar activeSection="privacy" />
        <div className="back-wrap">
          <BackButton />
        </div>

        <article className="legal-page legal-theme-blue animate-rise" style={{ maxWidth: '54rem' }}>
          <div className="blog-article-header">
            <span className="legal-kicker">PRIVACY · YOUR DATA</span>
            <h1 className="calculator-title">Privacy <em>Policy</em></h1>
            <p className="calculator-subtitle">A plain-language look at what we collect, what we never touch, and the choices that are always yours.</p>
            <div className="legal-led">
              <span className="legal-chip">Last updated: September 22, 2026</span>
              <span className="legal-chip">Privacy-first design</span>
            </div>
          </div>

          <div className="privacy-panel">
            <p><strong>The short version:</strong> everything you type into a Calc Notebook calculator stays on your device. We do not collect, store, transmit, or have any access to your calculator inputs. Period.</p>
          </div>

          <div className="privacy-led">
            <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--legal-accent-ink)', fontSize: '1.3rem', margin: '1.4rem 0 .4rem' }}>What we never collect</h2>
            <ul className="privacy-check">
              {neverCollect.map((item) => <li key={item}>{item}</li>)}
            </ul>

            <section className="privacy-section">
              <h2>1. How the calculators work — and why privacy is built in</h2>
              <p>Every calculator runs as a small program inside your browser. When you press Calculate, the numbers never need to travel anywhere: the calculation happens locally on your own device using JavaScript. There is no account system, no form that sends your figures to a server, and no profile tied to your activity. This design is intentional — we do not want your financial or health figures, and we have no mechanism to receive them.</p>
            </section>

            <section className="privacy-section">
              <h2>2. Information that may be collected automatically</h2>
              <p>Like most websites that are served over the internet, our hosting and analytics providers may log limited, non-personal technical information when pages are loaded. This is the kind of data visible to any web server and is used only to keep the site fast and understand rough usage patterns:</p>
              <ul>
                <li>Browser type and version</li>
                <li>Operating system and device category</li>
                <li>Referring page or search engine</li>
                <li>Pages visited and approximate timestamps</li>
                <li>General geographic region at country or state level</li>
                <li>Internet protocol (IP) address as seen by our server (used for security and diagnostics)</li>
              </ul>
              <p>We do not sell, rent, or share this technical data with anyone for marketing purposes.</p>
            </section>

            <section className="privacy-section">
              <h2>3. Cookies, analytics, and advertising</h2>
              <p>We may use cookies — small text files stored by your browser — and third-party analytics to understand how visitors move through the site and to measure performance. If we display advertising, ad networks such as Google AdSense may use cookies to serve ads that are more relevant to you based on your broader web activity. This is standard practice across the web.</p>
              <p>You are always in control of these tools. You can block or delete cookies in your browser settings, use private-browsing mode, install an ad blocker, or opt out of personalised advertising through Google’s Ad Settings. The calculators themselves work perfectly well without cookies or personalised ads.</p>
            </section>

            <section className="privacy-section">
              <h2>4. Third-party services versus our own data handling</h2>
              <p>When you interact with third parties — clicking an ad, following an external link, or visiting a service we reference — those parties operate under their own privacy policies. We do not control and cannot be responsible for their practices. The guarantee in this policy applies to our own website and the calculator experience we build.</p>
            </section>

            <section className="privacy-section">
              <h2>5. Children’s privacy</h2>
              <p>Our tools are general-purpose and available to everyone. We do not knowingly collect personal information from children under 13, and because our calculators need neither accounts nor personal data, there is effectively nothing to collect even when the tools are used by younger visitors. If you believe a child’s personal information was provided to us through any channel, contact us so we can address it.</p>
            </section>

            <section className="privacy-section">
              <h2>6. Data security</h2>
              <p>Because calculator inputs never reach our servers, the most sensitive data we could hold is not in our systems at all. The remaining technical data is transmitted over encrypted HTTPS connections where possible and handled according to standard security practices by our hosting and analytics providers. No system is absolutely secure, but our small data surface keeps risk minimal by design.</p>
            </section>

            <section className="privacy-section">
              <h2>7. Your choices and rights</h2>
              <p>You can use the entire site without creating any account, and you can decline cookies or personalised ads without losing access to any calculator. Depending on where you live (such as under data-protection laws like the Digital Personal Data Protection Act in India or GDPR in Europe), you may have rights to access, correct, or delete personal data. Because we do not collect personal calculator data, in practice there is little to access or delete — but you may contact us with any request and we will do our best to help.</p>
            </section>

            <section className="privacy-section">
              <h2>8. Changes to this policy</h2>
              <p>We may update this Privacy Policy from time to time as the site evolves or laws change. When we do, the "Last updated" date above will be revised and the new text will be posted here. We recommend reviewing it occasionally; continuing to use the Website means you accept the current policy.</p>
            </section>

            <section className="privacy-section">
              <h2>9. Contact</h2>
              <p>Questions about this policy, data matters, or a request relating to your information are welcome through the contact details listed on the Website. We treat privacy questions seriously and will respond as quickly as we can.</p>
            </section>
          </div>

          <div className="privacy-grid">
            <div className="privacy-card"><strong>Calculators are local</strong><p>All inputs are processed on your device — nothing is sent to us.</p></div>
            <div className="privacy-card"><strong>No accounts</strong><p>No sign-up, no profile, no email capture to use any tool.</p></div>
            <div className="privacy-card"><strong>Your choices stay</strong><p>Cookies, ads, and analytics can always be disabled by you.</p></div>
            <div className="privacy-card"><strong>Transparent changes</strong><p>Policy updates are always posted here with a fresh date.</p></div>
          </div>
        </article>

        <SiteFooter />
      </div>
    </main>
  );
}