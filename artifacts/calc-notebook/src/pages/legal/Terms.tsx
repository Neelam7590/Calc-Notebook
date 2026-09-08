import { useEffect } from 'react';
import { TopBar } from '@/components/top-bar';
import { SiteFooter } from '@/components/site-footer';

export default function Terms() {
  useEffect(() => {
    document.title = 'Terms and Conditions | Calc Notebook';
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta) meta.setAttribute('content', "Read the Terms and Conditions for using Calc Notebook's free online calculators.");
  }, []);

  return (
    <main className="notebook-page min-h-[100dvh]">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-8">
        <TopBar activeSection="terms" />

        <article className="legal-page animate-rise">
          <div className="blog-article-header">
            <div className="home-kicker"><span className="kicker-line" /><span>LEGAL</span></div>
            <h1 className="calculator-title">Terms and Conditions</h1>
            <p className="calculator-subtitle">Last updated: September 1, 2026</p>
          </div>

          <div className="legal-content">
            <section>
              <h2>1. Acceptance of Terms</h2>
              <p>By accessing and using Calc Notebook (calcnotebook.com), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use this website.</p>
            </section>

            <section>
              <h2>2. About Calc Notebook</h2>
              <p>Calc Notebook is a free online resource that provides basic calculators and informational tools for everyday use. Our tools include but are not limited to an EMI Calculator, Age Calculator, Percentage Calculator, BMI Calculator, GST Calculator, and CGPA Calculator.</p>
            </section>

            <section>
              <h2>3. No Accounts Required</h2>
              <p>All calculators on Calc Notebook work entirely in your browser. We do not require you to create an account, provide an email address, or log in to use any of our tools. Your inputs are processed locally and are never sent to our servers.</p>
            </section>

            <section>
              <h2>4. Informational Tools Only</h2>
              <p>The calculators and content on Calc Notebook are designed for informational and educational purposes only. They provide estimates and general guidance based on the inputs you provide. These tools are not a substitute for professional financial, medical, legal, or accounting advice.</p>
            </section>

            <section>
              <h2>5. No Liability for Decisions</h2>
              <p>Calc Notebook and its creators are not responsible or liable for any decisions made or actions taken based on the results produced by our calculators. Always consult a qualified professional — such as a chartered accountant, doctor, or financial advisor — before making important financial, health, or legal decisions.</p>
            </section>

            <section>
              <h2>6. Accuracy of Results</h2>
              <p>While we make every effort to ensure our calculators produce accurate results, rounding differences, regional tax variations, and changes in regulations may affect the final numbers. The results should be treated as close estimates, not guaranteed outcomes. Banks, hospitals, and government agencies may calculate figures differently.</p>
            </section>

            <section>
              <h2>7. Intellectual Property</h2>
              <p>All content on Calc Notebook — including text, design, logos, and code — is the property of Calc Notebook and is protected by applicable intellectual property laws. You may not reproduce, distribute, or modify any part of this website without prior written permission.</p>
            </section>

            <section>
              <h2>8. Third-Party Links</h2>
              <p>Calc Notebook may contain links to third-party websites for reference or convenience. We do not endorse, control, or take responsibility for the content or practices of any third-party websites.</p>
            </section>

            <section>
              <h2>9. Changes to These Terms</h2>
              <p>We reserve the right to update these Terms and Conditions at any time. Changes will be posted on this page with an updated date. Continued use of the website after changes constitutes acceptance of the revised terms.</p>
            </section>

            <section>
              <h2>10. Governing Law</h2>
              <p>These terms are governed by the laws of India. Any disputes arising from the use of this website shall be subject to the jurisdiction of courts in India.</p>
            </section>

            <section>
              <h2>11. Contact</h2>
              <p>If you have any questions about these Terms and Conditions, please reach out to us through our website or at the contact information provided on the site.</p>
            </section>
          </div>
        </article>

        <SiteFooter />
      </div>
    </main>
  );
}
