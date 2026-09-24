import { useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { TopBar } from '@/components/top-bar';
import { BackButton } from '@/components/back-button';
import { SiteFooter } from '@/components/site-footer';
import { haryanaAreas } from '@/data/haryanaAreas';

export default function AreasIndex() {
  useEffect(() => {
    document.title = 'Available Across Haryana – City Pages | Calc Notebook';
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Local calculator pages for Haryana: Sonipat, Panipat, Karnal, Kurukshetra, Gurugram, Faridabad, Ambala, Rohtak, Hisar and more. Free stamp duty, EMI, age and GST tools.');
  }, []);

  return (
    <main className="notebook-page min-h-[100dvh]">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-8">
        <TopBar />
        <div className="back-wrap">
          <BackButton />
        </div>
        <article className="legal-page animate-rise" style={{ maxWidth: '56rem' }}>
          <div className="blog-article-header">
            <span className="legal-kicker">AVAILABLE ACROSS HARYANA</span>
            <h1 className="calculator-title">Calculators for <em>Haryana</em></h1>
            <p className="calculator-subtitle">Free, private calculators tuned to the everyday money questions of each Haryana city — stamp duty and circle-rate checks, home loan EMI, age, BMI, GST, and CGPA.</p>
          </div>

          <div className="areas-index-grid">
            {haryanaAreas.map((area) => (
              <Link key={area.slug} href={`/areas/${area.slug}`} className={`areas-index-card area-theme-${area.theme}`}>
                <span className="areas-index-kicker">{area.eyebrow.split('·')[0].trim()}</span>
                <strong>{area.name}</strong>
                <span className="areas-index-lead">{area.lead}</span>
                <span className="areas-index-link">Open city page <ArrowRight size={15} /></span>
              </Link>
            ))}
          </div>
        </article>
        <SiteFooter />
      </div>
    </main>
  );
}