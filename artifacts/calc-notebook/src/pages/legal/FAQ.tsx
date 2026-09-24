import { useEffect } from 'react';
import { TopBar } from '@/components/top-bar';
import { SiteFooter } from '@/components/site-footer';
import { BackButton } from '@/components/back-button';

const categories = [
  {
    index: '01',
    title: 'General questions',
    faqs: [
      {
        question: 'Is Calc Notebook free to use?',
        answer: 'Yes — Calc Notebook is completely free. There are no hidden charges, subscriptions, premium tiers, or paid features. All seven calculators are available to everyone at no cost, funded only by optional advertising so we can stay online.',
      },
      {
        question: 'Do I need to create an account to use the calculators?',
        answer: 'No. Every calculator works directly in your browser. There is no account, login, or registration of any kind — open the page, enter your numbers, and read your result.',
      },
      {
        question: 'Which calculators are available?',
        answer: 'We currently offer seven tools: the Stamp Duty (Haryana) Calculator with registration-fee estimation, the EMI Calculator for loan planning, the Age Calculator for exact age in years, months, and days, the Percentage Calculator, the BMI Calculator, the GST Calculator, and the CGPA Calculator. We plan to add more for other Indian regions and everyday needs.',
      },
      {
        question: 'Can I use Calc Notebook on my phone?',
        answer: 'Yes. The whole site is mobile-first and responsive, so it works smoothly on phones, tablets, and desktops. You do not need to install any app — just open the website in your mobile browser.',
      },
    ],
  },
  {
    index: '02',
    title: 'About the calculators',
    faqs: [
      {
        question: 'How does the Stamp Duty calculator work for Haryana?',
        answer: 'Select the area type (inside or outside municipal limits), the buyer category (male, female, joint man and woman, two males, or two females), your district, and either the property value or the plot area. The tool applies the Haryana rate for that combination, takes the higher of sale price and circle rate when needed, and adds the slab-based registration fee. Rates are updated from public notifications, but always confirm current slabs with the registrar’s office before a real registration.',
      },
      {
        question: 'Why do stamp duty rates differ for male, female, and joint buyers?',
        answer: 'Haryana, like several states, offers reduced stamp duty on property registered in the name of a woman to encourage female ownership. Joint ownership is charged at the rate for its specific composition (for example, a man and a woman together). Only buyers recorded on the actual purchase document can claim these rates, so check the deed before expecting a concession.',
      },
      {
        question: 'What is the circle rate, and why does it appear in the stamp duty result?',
        answer: 'The circle rate is the minimum value fixed by the government for land and property in a locality. Stamp duty is payable on the higher of the sale consideration and the circle rate. Our calculator applies this logic automatically when you enter a plot area, and reminds you about it when you enter a value directly.',
      },
      {
        question: 'Are the calculator results accurate?',
        answer: 'The calculators use standard, tested formulas. Results are still estimates: a bank, hospital, tax office, or registrar may apply its own rules, round differently, or use fresh rates. For official or high-value decisions, always confirm the figure with the responsible institution or professional.',
      },
      {
        question: 'Can I use calculator results for official purposes?',
        answer: 'No. The tools give general estimates and are not official documents. For a loan application, property registration, tax filing, transcript, medical assessment, or legal form, use the number produced by the relevant authority itself.',
      },
    ],
  },
  {
    index: '03',
    title: 'Data and privacy',
    faqs: [
      {
        question: 'Is my data safe? Do you store what I enter?',
        answer: 'Your calculator inputs never leave your device. All calculations run locally in your browser with JavaScript. We have no server that receives, stores, or can access the figures you type — so there is nothing to sell, leak, or misuse. Full details are in our Privacy Policy.',
      },
      {
        question: 'Does the website use cookies or show ads?',
        answer: 'The site may use cookies and third-party analytics to measure basic usage, and advertising (such as Google AdSense) may appear to keep the service free. Ads never touch the calculators. You can block cookies, disable personalised ads, or use an ad blocker — every calculator still works perfectly.',
      },
    ],
  },
  {
    index: '04',
    title: 'Updates and feedback',
    faqs: [
      {
        question: 'How often is content updated?',
        answer: 'Blog articles and informational pages are updated regularly, especially for changing topics such as stamp duty rates, circle rates, GST slabs, and tax rules. Calculator formulas are verified periodically, and rate constants (like Haryana stamp duty rates) are refreshed as new state notifications appear.',
      },
      {
        question: 'Can I suggest a new calculator or blog topic?',
        answer: 'Absolutely — suggestions are welcome. We are building calculators for more states and everyday problems, and we love topic ideas for the blog. Reach us through the contact details on the site, and tell us the calculator or article you would like to see next.',
      },
      {
        question: 'Do you work with other regions and cities like Sonipat or Panipat?',
        answer: 'Yes. We focus on growing region-specific tools for Haryana and beyond. The Stamp Duty calculator already covers districts such as Sonipat, Panipat, Rohtak, Karnal, Hisar, Ambala, Gurugram, and Faridabad, with rates maintained from public notifications. New districts and states are planned as we grow.',
      },
    ],
  },
];

const flatFaqs = categories.flatMap((category) => category.faqs);

export default function FAQ() {
  useEffect(() => {
    document.title = 'Frequently Asked Questions | Calc Notebook';
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Frequently asked questions about Calc Notebook: free stamp duty, EMI, age, percentage, BMI, GST, and CGPA calculators, privacy, accuracy, and how the tools work.');

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
      mainEntity: flatFaqs.map((faq) => ({
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
        <div className="back-wrap">
          <BackButton />
        </div>

        <article className="legal-page legal-theme-sage animate-rise" style={{ maxWidth: '52rem' }}>
          <div className="blog-article-header">
            <span className="legal-kicker">HELP · QUICK ANSWERS</span>
            <h1 className="calculator-title">Frequently Asked <em>Questions</em></h1>
            <p className="calculator-subtitle">Straight answers about the calculators, how the stamp duty tool works, what happens to your data, and how to suggest the next calculator.</p>
            <div className="legal-led">
              <span className="legal-chip">4 categories</span>
              <span className="legal-chip">15 questions</span>
              <span className="legal-chip">Updated: September 22, 2026</span>
            </div>
          </div>

          <div style={{ marginTop: '2.6rem' }}>
            {categories.map((category) => (
              <div className="faq-category" key={category.title}>
                <h2 className="faq-category-title"><span>{category.index}</span>{category.title}</h2>
                <div className="faq-grid faq-theme">
                  {category.faqs.map((faq) => (
                    <details className="faq-item" key={faq.question}>
                      <summary>{faq.question}</summary>
                      <p>{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            ))}

            <div className="faq-contact-box">
              <p><strong>Still curious?</strong> Send us your question and we will add it here or reply directly. Since this is a small independent project, answers may take a few days — but every genuine query gets read.</p>
            </div>
          </div>
        </article>

        <SiteFooter />
      </div>
    </main>
  );
}