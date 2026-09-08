import { useEffect } from 'react';
import { TopBar } from '@/components/top-bar';
import { SiteFooter } from '@/components/site-footer';

const faqs = [
  {
    question: 'Is Calc Notebook free to use?',
    answer: 'Yes, Calc Notebook is completely free. There are no hidden charges, subscription fees, or premium tiers. All calculators are available to everyone at no cost.',
  },
  {
    question: 'Do I need to create an account to use the calculators?',
    answer: 'No. All calculators work directly in your browser without any account, login, or registration. Simply visit the page, enter your numbers, and get your result.',
  },
  {
    question: 'Is my data safe? Do you store what I enter?',
    answer: 'Your data never leaves your device. All calculations are performed locally in your browser using JavaScript. We do not send, store, or have access to any data you enter into our calculators.',
  },
  {
    question: 'Are the calculator results accurate?',
    answer: 'Our calculators use standard formulas and are tested for accuracy. However, results are estimates. Banks, hospitals, and government agencies may calculate figures slightly differently. Always confirm important numbers with the relevant institution.',
  },
  {
    question: 'Can I use Calc Notebook on my phone?',
    answer: 'Yes. Calc Notebook is fully responsive and works on mobile phones, tablets, and desktops. You do not need to install any app — just open the website in your mobile browser.',
  },
  {
    question: 'Which calculators are available?',
    answer: 'We currently offer six calculators: EMI Calculator (for loan planning), Age Calculator (exact age in years, months, and days), Percentage Calculator (two modes), BMI Calculator (height and weight based), GST Calculator (add or remove GST), and CGPA Calculator (credit-weighted academic average).',
  },
  {
    question: 'Can I use the results for official purposes?',
    answer: 'The calculators provide general estimates and should not be used as official documents. For bank loan applications, government forms, academic transcripts, or medical assessments, always use the figures provided by the respective institution or professional.',
  },
  {
    question: 'Does the website show ads?',
    answer: 'Calc Notebook may display advertisements through Google AdSense to support the free operation of the site. Ads do not affect the functionality of the calculators.',
  },
  {
    question: 'How often is the content updated?',
    answer: 'We update our blog articles and SEO content regularly to reflect current information, especially for topics like GST rates, tax slabs, and financial regulations. Calculator formulas are verified periodically for accuracy.',
  },
  {
    question: 'Can I suggest a new calculator or blog topic?',
    answer: 'Absolutely. We welcome suggestions for new calculators, blog articles, or improvements. You can reach us through the contact information on our website. Your feedback helps us build a better tool for everyone.',
  },
];

export default function FAQ() {
  useEffect(() => {
    document.title = 'Frequently Asked Questions | Calc Notebook';
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta) meta.setAttribute('content', "Frequently asked questions about Calc Notebook's free EMI, age, percentage, BMI, GST, and CGPA calculators.");

    let schema = document.getElementById('faq-page-schema') as HTMLScriptElement | null;
    if (!schema) {
      schema = document.createElement('script');
      schema.type = 'application/ld+json';
      schema.id = 'faq-page-schema';
      document.head.appendChild(schema);
    }
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    });
  }, []);

  return (
    <main className="notebook-page min-h-[100dvh]">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-8">
        <TopBar activeSection="faq" />

        <article className="legal-page animate-rise">
          <div className="blog-article-header">
            <div className="home-kicker"><span className="kicker-line" /><span>HELP</span></div>
            <h1 className="calculator-title">Frequently Asked<br /><em>Questions</em></h1>
            <p className="calculator-subtitle">Quick answers to common questions about Calc Notebook and our calculators.</p>
          </div>

          <div className="faq-section" style={{ marginTop: '2.5rem' }}>
            <div className="faq-grid">
              {faqs.map((faq) => (
                <details className="faq-item" key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </article>

        <SiteFooter />
      </div>
    </main>
  );
}
