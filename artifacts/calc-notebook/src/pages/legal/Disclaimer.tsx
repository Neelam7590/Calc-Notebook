import { useEffect } from 'react';
import { TopBar } from '@/components/top-bar';
import { SiteFooter } from '@/components/site-footer';
import { BackButton } from '@/components/back-button';

const toolDisclaimers = [
  {
    tag: 'STAMP DUTY · HARYANA',
    title: 'Stamp Duty Calculator',
    text: 'Shows an estimate only. Rates and registration fees change through Haryana budgets and notifications. Notes for women/joint buyers may require an actual purchase deed under the buyer of record. Verify the current slab and circle rate with the Haryana Stamp and Registration Department before registering any document.',
  },
  {
    tag: 'FINANCE',
    title: 'EMI Calculator',
    text: 'Monthly instalments are estimates for a regular reducing-balance loan. Lenders add processing fees, insurance, and interest calculations that vary. Use your lender’s official sanction letter for exact figures.',
  },
  {
    tag: 'PERSONAL',
    title: 'Age Calculator',
    text: 'Returns the exact calendar difference between two dates, not a legal interpretation of age. Official eligibility depends on the authority’s rules and the date on your identity document.',
  },
  {
    tag: 'MATH',
    title: 'Percentage Calculator',
    text: 'Each mode solves a distinct type of percent problem. Confirm the base value and what is being asked — "percentage of", "percentage change", or reverse — before using the result.',
  },
  {
    tag: 'HEALTH',
    title: 'BMI Calculator',
    text: 'A quick population-scale classification, not a personal health assessment. It cannot distinguish muscle from fat or consider age, ethnicity, or medical conditions. Discuss any result with a qualified doctor.',
  },
  {
    tag: 'TAX',
    title: 'GST Calculator',
    text: 'Common rates are provided for convenience. The legally applicable rate depends on the goods or service and government notifications, which change over time. Confirm with a tax professional.',
  },
  {
    tag: 'ACADEMIC',
    title: 'CGPA Calculator',
    text: 'Useful for estimating an equivalent percentage on the standard 9.5 conversion, but institutions define their own official scales. For applications, use the score issued by your institution.',
  },
];

export default function Disclaimer() {
  useEffect(() => {
    document.title = 'Disclaimer | Calc Notebook';
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Calc Notebook disclaimer: all calculators provide estimates for general guidance only and never replace professional financial, medical, legal, tax, or academic advice.');
  }, []);

  return (
    <main className="notebook-page min-h-[100dvh]">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-8">
        <TopBar activeSection="disclaimer" />
        <div className="back-wrap">
          <BackButton />
        </div>

        <article className="legal-page legal-theme-gold animate-rise" style={{ maxWidth: '56rem' }}>
          <div className="blog-article-header">
            <span className="legal-kicker">NOTICE · READ FIRST</span>
            <h1 className="calculator-title">Disclaimer</h1>
            <p className="calculator-subtitle">The calculators on Calc Notebook are free tools for quick, everyday estimates — not professional advice. Here is exactly what the numbers can and cannot do.</p>
            <div className="legal-led">
              <span className="legal-chip">Last updated: September 22, 2026</span>
              <span className="legal-chip">Read time: about 2 minutes</span>
            </div>
          </div>

          <div className="notice-banner">
            <p><strong>Please read carefully.</strong> Every figure produced by this Website is an estimate for general guidance and education. It is not a quote, approval, valuation, diagnosis, or legal certification. Before making any significant financial, legal, health, or academic decision, verify the numbers with the responsible professional or the official issuing authority in your specific case.</p>
          </div>

          <div className="notice-grid">
            {toolDisclaimers.map((tool) => (
              <div className="notice-card" key={tool.title}>
                <span className="notice-tag">{tool.tag}</span>
                <strong>{tool.title}</strong>
                <p>{tool.text}</p>
              </div>
            ))}
          </div>

          <section className="disclaimer-note-section">
            <h2>General statements</h2>
            <p>Calc Notebook, its owners, operators, and contributors publish content for educational purposes in good faith. We make no warranties about the accuracy, completeness, fitness for a particular purpose, or timeliness of any calculator result or article. To the fullest extent permitted by law, we accept no responsibility for any loss, expense, or damage that may arise from reliance on the information or results provided.</p>
          </section>

          <section className="disclaimer-note-section">
            <h2>Why accuracy matters for stamp duty</h2>
            <p>Registration deeds and stamp duty are legal matters with consequences. Women may be entitled to reduced rates or refunds only under the precise categories prescribed by state law, joint ownership applies based on the buyers named in the actual purchase document, and circle rates are set by district notification. Using our calculator to prepare an exact figure for a real registration would be a mistake. It is a planning tool; the final amount is decided by the registrar’s office under current rules.</p>
          </section>

          <section className="disclaimer-note-section">
            <h2>Health, finance, and academics</h2>
            <p>Nothing on this Website — including the BMI, EMI, GST, CGPA, Age, or Percentage tools — constitutes medical, financial, accounting, legal, tax, or academic advice, nor does it create a professional relationship of any kind. Always consult a qualified professional for decisions that affect your health, money, legal rights, or education.</p>
          </section>

          <section className="disclaimer-note-section">
            <h2>Changes and acceptance</h2>
            <p>We may revise this Disclaimer at any time. Revised versions will be published on this page with an updated date. By continuing to use Calc Notebook, you accept this Disclaimer and the Terms and Conditions of the Website. If you do not accept them, please stop using the Website.</p>
          </section>
        </article>

        <SiteFooter />
      </div>
    </main>
  );
}