import { useEffect } from 'react';
import { TopBar } from '@/components/top-bar';
import { SiteFooter } from '@/components/site-footer';

export default function Disclaimer() {
  useEffect(() => {
    document.title = 'Disclaimer | Calc Notebook';
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta) meta.setAttribute('content', "Important disclaimer about the accuracy and use of Calc Notebook's free calculators.");
  }, []);

  return (
    <main className="notebook-page min-h-[100dvh]">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-8">
        <TopBar activeSection="disclaimer" />

        <article className="legal-page animate-rise">
          <div className="blog-article-header">
            <div className="home-kicker"><span className="kicker-line" /><span>LEGAL</span></div>
            <h1 className="calculator-title">Disclaimer</h1>
            <p className="calculator-subtitle">Last updated: September 1, 2026</p>
          </div>

          <div className="legal-content">
            <section>
              <h2>General Disclaimer</h2>
              <p>The information and tools provided on Calc Notebook are for general informational and educational purposes only. While we strive for accuracy, we make no representations or warranties about the completeness, reliability, or suitability of the calculators, content, or results for any specific purpose.</p>
            </section>

            <section>
              <h2>EMI Calculator Disclaimer</h2>
              <p>The EMI Calculator provides estimates based on standard equated monthly instalment formulas. Actual loan EMIs may vary based on your bank's specific calculation method, daily reducing or monthly reducing balance approach, processing fees, insurance charges, and other factors. The results should not be considered as a binding offer from any financial institution. Always confirm the exact EMI with your lender before signing a loan agreement.</p>
            </section>

            <section>
              <h2>Age Calculator Disclaimer</h2>
              <p>The Age Calculator calculates age based on the Gregorian calendar. Results are accurate for standard age calculation purposes but may differ from age calculations used by specific government agencies or institutions that follow different conventions (such as calculating age as on a specific cutoff date). Always verify the age requirement for official documents and forms.</p>
            </section>

            <section>
              <h2>BMI Calculator Disclaimer</h2>
              <p>The BMI Calculator provides a Body Mass Index value based on height and weight. BMI is a general screening tool and is not a diagnostic measure. It does not account for muscle mass, bone density, age, gender, or ethnic differences. A high BMI does not necessarily indicate poor health, and a normal BMI does not guarantee good health. Always consult a healthcare professional for personalised health advice.</p>
            </section>

            <section>
              <h2>GST Calculator Disclaimer</h2>
              <p>The GST Calculator provides estimates based on standard GST rates (5%, 12%, 18%, 28%). Actual GST calculations may vary depending on specific product classifications, state-level regulations, exemptions, and input tax credit rules. The results are for reference only and should not be used as the basis for tax filings or official invoices. Consult a chartered accountant for GST-related decisions.</p>
            </section>

            <section>
              <h2>Percentage Calculator Disclaimer</h2>
              <p>The Percentage Calculator performs basic mathematical calculations. While the arithmetic is accurate, the relevance and applicability of the results depend on the context in which they are used. The calculator is a tool for convenience and should not be relied upon for critical financial or academic decisions without independent verification.</p>
            </section>

            <section>
              <h2>CGPA Calculator Disclaimer</h2>
              <p>The CGPA Calculator computes a credit-weighted grade point average based on the standard formula. Different institutions may use different grading scales, conversion factors, or calculation methods. Always refer to your institution's official grading policy for academic records, transcripts, and applications.</p>
            </section>

            <section>
              <h2>Professional Advice</h2>
              <p>None of the calculators or content on Calc Notebook constitutes professional financial, medical, legal, or academic advice. The website and its creators shall not be held responsible for any decisions made or actions taken based on the information or results provided by these tools. Always consult a qualified professional for advice specific to your situation.</p>
            </section>

            <section>
              <h2>External Links</h2>
              <p>Calc Notebook may contain links to external websites. We do not endorse or take responsibility for the content, privacy practices, or accuracy of information on any third-party websites.</p>
            </section>
          </div>
        </article>

        <SiteFooter />
      </div>
    </main>
  );
}
