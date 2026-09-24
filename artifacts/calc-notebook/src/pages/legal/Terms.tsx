import { useEffect } from 'react';
import { TopBar } from '@/components/top-bar';
import { SiteFooter } from '@/components/site-footer';
import { BackButton } from '@/components/back-button';

const sections = [
  {
    title: 'Acceptance of Terms',
    paragraphs: [
      'By accessing, browsing, or using Calc Notebook (the "Website" or "Service"), you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions and any updates posted from time to time. If you do not agree with any part of these terms, please discontinue use of the Website immediately.',
      'These terms form a binding agreement between you and Calc Notebook. Your continued use of the Website after we publish a revised version constitutes acceptance of the revised terms. We encourage you to review this page periodically so you stay aware of changes.',
    ],
  },
  {
    title: 'About the Service',
    paragraphs: [
      'Calc Notebook is a free, browser-based resource that offers simple calculators and related informational content for everyday needs. Our current tools include the Stamp Duty (Haryana) Calculator, EMI Calculator, Age Calculator, Percentage Calculator, BMI Calculator, GST Calculator, and CGPA Calculator. We may add, remove, rename, or change features at any time without prior notice.',
      'The calculators are designed as quick-reference tools. They are not regulated financial, medical, legal, or tax services, and they are not offered by any licensed professional or regulated institution.',
    ],
  },
  {
    title: 'No Account or Registration Required',
    paragraphs: [
      'Every calculator on Calc Notebook runs directly in your browser. You do not need to create an account, provide an e-mail address, or share any personal details to use any tool. All figures you enter are processed locally on your own device, and inputs are never transmitted to, or stored by, us through the calculator features.',
      'Where certain optional features contact a backend service (for example, the blog feed or site settings), only the data necessary for that feature is involved. The calculator inputs themselves remain on your device.',
    ],
  },
  {
    title: 'Tools Are for Information and Estimates Only',
    paragraphs: [
      'All results produced by the calculators are estimates based on the values you enter and the formulas we use. They are provided for general reference, budgeting, comparison, and education. They are not a quote, offer, approval, diagnosis, valuation, or legal document.',
      'For decisions that carry real consequence, always confirm the figures with the relevant official source: your lender or bank statement, the Haryana Stamp and Registration Department, a tax professional, a medical professional, your institution’s registrar, or similar authorities. Make no loan, purchase, tax filing, treatment, or academic decision solely on the basis of a calculator result.',
    ],
  },
  {
    title: 'Limitation of Liability',
    paragraphs: [
      'To the maximum extent permitted by applicable law, Calc Notebook, its owners, operators, contributors, and affiliates shall not be liable for any direct, indirect, incidental, consequential, special, or punitive damages, including but not limited to financial loss, loss of data, loss of opportunity, or loss of goodwill, arising out of your use of, or inability to use, the Website or any content or result it produces.',
      'This limitation applies whether the claim is based on contract, tort, negligence, strict liability, or otherwise, even if we have been advised of the possibility of such damages. Nothing in these terms limits liability that cannot be excluded or limited under applicable law.',
    ],
  },
  {
    title: 'Accuracy, Completeness, and Availability',
    paragraphs: [
      'We work hard to keep the calculators accurate and the content current, but we make no representation or warranty that the Website, tools, or content are accurate, complete, reliable, current, or free of errors. Legal and financial rates change: stamp duty slabs, circle rates, GST rates, tax rules, and lending practices are revised by governments and institutions over time.',
      'The Website may occasionally be unavailable for maintenance, upgrades, or reasons beyond our control. We do not guarantee uninterrupted or error-free access and reserve the right to modify, suspend, or discontinue any part of the Service at any time.',
    ],
  },
  {
    title: 'Intellectual Property',
    paragraphs: [
      'Unless otherwise stated, all material on the Website — text, calculators, logic, design, layout, graphics, logos, and code — is owned by Calc Notebook and protected by applicable copyright, trademark, and other intellectual property laws.',
      'You may access the Website for personal, non-commercial use. You may not copy, reproduce, republish, scrape, reverse-engineer, sell, license, or distribute any part of the Website or its content without our prior written permission. Links to the Website from third-party sites are welcome as long as they are not misleading and do not suggest endorsement.',
    ],
  },
  {
    title: 'Acceptable Use',
    paragraphs: [
      'You agree not to use the Website in any manner that could damage, disable, overburden, or impair it, or interfere with any other party’s use of it. Prohibited conduct includes automated scraping of content at scale, attempting to gain unauthorised access to any part of the Service or its backend systems, using the Service for unlawful activity, and distributing malware or harmful code.',
    ],
  },
  {
    title: 'Third-Party Links and Advertisers',
    paragraphs: [
      'The Website may display links to third-party websites and advertising from third-party providers (for example, Google AdSense). These external parties are independent of Calc Notebook. A link or advertisement does not imply endorsement, affiliation, or responsibility for the third party’s content, products, privacy practices, or terms.',
      'Clicking an ad or external link moves you away from our Website to a destination governed by that party’s own policies. We recommend reviewing their terms and privacy statements before engaging.',
    ],
  },
  {
    title: 'Advertising and Revenue',
    paragraphs: [
      'To keep the Service free, the Website may display advertisements. The presence of advertising does not affect the formulas or functioning of the calculators, and it does not mean we endorse, recommend, or are affiliated with any advertised product or service. Ad delivery and measurement are handled by the respective ad network under its own privacy terms.',
    ],
  },
  {
    title: 'Modification of the Service and These Terms',
    paragraphs: [
      'We may update these Terms and Conditions at any time. When we do, we will revise the "Last updated" date at the top of the page and publish the new version here. Changes take effect immediately upon posting. Your continued use of the Website after the change constitutes acceptance of the revised terms.',
      'We may also change, expand, restructure, or retire calculators, blog content, design, and features, or stop providing the Service, at our sole discretion and without liability to you.',
    ],
  },
  {
    title: 'Severability and Waiver',
    paragraphs: [
      'If any part of these terms is found to be unenforceable or invalid, that provision will be limited or removed to the minimum extent necessary while keeping the remaining provisions in full effect. A failure by us to exercise or enforce any right or provision of these terms is not a waiver of that right or provision.',
    ],
  },
  {
    title: 'Governing Law and Jurisdiction',
    paragraphs: [
      'These Terms and Conditions are governed by and construed in accordance with the laws of India. Any dispute arising out of or in connection with your use of the Website shall be subject to the exclusive jurisdiction of the competent courts at the location of Calc Notebook’s registered operations in India, without regard to conflict-of-law principles.',
      'You agree that any claim relating to the Website must be brought within one year of the event giving rise to the claim, to the extent permitted by applicable law.',
    ],
  },
  {
    title: 'Contact',
    paragraphs: [
      'If you have questions about these Terms and Conditions, wish to request permission to use our content, or want to report a concern, please contact us through the e-mail and contact information listed elsewhere on the Website. We aim to respond promptly but do not guarantee a specific response time.',
    ],
  },
];

export default function Terms() {
  useEffect(() => {
    document.title = 'Terms and Conditions | Calc Notebook';
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta) meta.setAttribute('content', "Read Calc Notebook's full Terms and Conditions governing the use of our free stamp duty, EMI, age, percentage, BMI, GST, and CGPA calculators.");
  }, []);

  return (
    <main className="notebook-page min-h-[100dvh]">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-8">
        <TopBar activeSection="terms" />
        <div className="back-wrap">
          <BackButton />
        </div>

        <article className="legal-page legal-theme-coral animate-rise" style={{ maxWidth: '56rem' }}>
          <div className="blog-article-header">
            <span className="legal-kicker">LEGAL · TERMS OF USE</span>
            <h1 className="calculator-title">Terms and <em>Conditions</em></h1>
            <p className="calculator-subtitle">The agreement that governs your use of Calc Notebook’s calculators and content.</p>
            <div className="legal-led">
              <span className="legal-chip">Last updated: September 22, 2026</span>
              <span className="legal-chip">Effective date: September 22, 2026</span>
              <span className="legal-chip">14 sections</span>
            </div>
          </div>

          <div className="legal-ledger">
            {sections.map((section, index) => (
              <section key={section.title}>
                <span className="legal-num">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h2>{section.title}</h2>
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </section>
            ))}
          </div>
        </article>

        <SiteFooter />
      </div>
    </main>
  );
}