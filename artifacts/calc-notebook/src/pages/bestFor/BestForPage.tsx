import { useEffect, type ReactNode } from 'react';
import { useParams } from 'wouter';
import { Check } from 'lucide-react';
import { TopBar, calculatorMeta } from '@/components/top-bar';
import { ToolBoxLink } from '@/components/tool-link';
import { BackButton } from '@/components/back-button';
import { SiteFooter } from '@/components/site-footer';
import NotFound from '@/pages/not-found';
import { bestForCategories, type BestForCategory } from '@/data/bestFor';

function resolveTools(category: BestForCategory) {
  return category.tools
    .map((id) => calculatorMeta.find((meta) => meta.id === id))
    .filter((meta): meta is NonNullable<typeof meta> => Boolean(meta));
}

function BestForSection({ num, title, children }: { num: string; title: string; children: ReactNode }) {
  return (
    <section className="bf-section">
      <div className="bf-section-head">
        <span className="bf-section-num">{num}</span>
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}

function NoteBanner({ note }: { note: string }) {
  return (
    <section className="bf-note">
      <span className="bf-note-label">WORTH REMEMBERING</span>
      <p>{note}</p>
    </section>
  );
}

function useBestForSeo(category: BestForCategory) {
  useEffect(() => {
    const siteUrl = window.location.origin;
    const path = `/best-for/${category.slug}`;
    const canonicalUrl = `${siteUrl}${path}`;

    document.title = category.title;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta) meta.setAttribute('content', category.metaDescription);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    let schema = document.getElementById('best-for-page-schema') as HTMLScriptElement | null;
    if (!schema) {
      schema = document.createElement('script');
      schema.type = 'application/ld+json';
      schema.id = 'best-for-page-schema';
      document.head.appendChild(schema);
    }
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': canonicalUrl,
          url: canonicalUrl,
          name: category.title,
          description: category.metaDescription,
          inLanguage: 'en',
          isPartOf: { '@type': 'WebSite', name: 'Calc Notebook', url: `${siteUrl}/` },
          about: {
            '@type': 'Service',
            name: `Free calculators for ${category.name.toLowerCase()}`,
            serviceType: 'Online calculators for everyday needs',
            provider: { '@type': 'Organization', name: 'Calc Notebook', url: `${siteUrl}/` },
            audience: { '@type': 'Audience', audienceType: category.name },
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
            { '@type': 'ListItem', position: 2, name: 'Best for', item: `${siteUrl}/best-for/students` },
            { '@type': 'ListItem', position: 3, name: category.name, item: canonicalUrl },
          ],
        },
      ],
    });
  }, [category]);
}

function Header({ category }: { category: BestForCategory }) {
  return (
    <div className="blog-article-header">
      <span className="area-kicker">{category.eyebrow}</span>
      <h1 className="calculator-title">For {category.name}</h1>
      <p className="calculator-subtitle">{category.lead}</p>
      <div className="legal-led">
        <span className="area-chip">Best for {category.name}</span>
        <span className="area-chip">Free & private</span>
      </div>
    </div>
  );
}

function SyllabusLayout({ category }: { category: BestForCategory }) {
  const tools = resolveTools(category);
  return (
    <>
      <section className="bf-intro">
        <p className="area-lead-text">{category.intro}</p>
      </section>
      <BestForSection num="01" title="Your semester in a few steps">
        <ol className="bf-steps">
          {(category.steps ?? []).map((step, index) => (
            <li key={step}><b>{String(index + 1).padStart(2, '0')}</b><span>{step}</span></li>
          ))}
        </ol>
      </BestForSection>
      <BestForSection num="02" title={`Best tools for ${category.name}`}>
        <div className="area-tools-grid">
          {tools.map((meta) => <ToolBoxLink key={meta.id} meta={meta} />)}
        </div>
      </BestForSection>
      <section className="bf-sections">
        {category.sections.map((section) => (
          <div className="bf-doc-row" key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        ))}
      </section>
      <BestForSection num="03" title="Last-minute check">
        <div className="bf-checks">
          {(category.checks ?? []).map((check) => (
            <div className="bf-check-item" key={check}><Check size={15} strokeWidth={2.2} /><span>{check}</span></div>
          ))}
        </div>
      </BestForSection>
      <NoteBanner note={category.note} />
      <BestForSection num="04" title="Practical tips">
        <ol className="area-tip-list">
          {category.tips.map((tip) => <li key={tip}>{tip}</li>)}
        </ol>
      </BestForSection>
    </>
  );
}

function HomebuyerLayout({ category }: { category: BestForCategory }) {
  const tools = resolveTools(category);
  return (
    <>
      <div className="bf-split">
        <div>
          <section className="bf-intro">
            <p className="area-lead-text">{category.intro}</p>
          </section>
          <BestForSection num="01" title="Before you buy">
            <ol className="bf-steps bf-steps-col">
              {(category.steps ?? []).map((step, index) => (
                <li key={step}><b>{String(index + 1).padStart(2, '0')}</b><span>{step}</span></li>
              ))}
            </ol>
          </BestForSection>
        </div>
        <aside className="bf-rail">
          <BestForSection num="02" title="Your three numbers">
            <div className="area-tool-list">
              {tools.map((meta) => <ToolBoxLink key={meta.id} meta={meta} />)}
            </div>
          </BestForSection>
        </aside>
      </div>
      <BestForSection num="03" title="How a deal really adds up">
        <div className="bf-sections">
          {category.sections.map((section) => (
            <div className="bf-doc-row" key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          ))}
        </div>
      </BestForSection>
      <NoteBanner note={category.note} />
      <BestForSection num="04" title="Practical tips">
        <ol className="area-tip-list">
          {category.tips.map((tip) => <li key={tip}>{tip}</li>)}
        </ol>
      </BestForSection>
    </>
  );
}

function InvoiceLayout({ category }: { category: BestForCategory }) {
  const tools = resolveTools(category);
  return (
    <>
      <section className="bf-intro">
        <p className="area-lead-text">{category.intro}</p>
      </section>
      <BestForSection num="01" title={`Tools for ${category.name}`}>
        <div className="area-ribbon bf-ribbon">
          {tools.map((meta) => <ToolBoxLink key={meta.id} meta={meta} />)}
        </div>
      </BestForSection>
      <BestForSection num="02" title="Three questions every invoice asks">
        <div className="bf-question-grid">
          {category.sections.map((section) => (
            <div className="bf-question-card" key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          ))}
        </div>
      </BestForSection>
      <NoteBanner note={category.note} />
      <BestForSection num="03" title="Practical tips">
        <ol className="area-tip-list">
          {category.tips.map((tip) => <li key={tip}>{tip}</li>)}
        </ol>
      </BestForSection>
    </>
  );
}

function HealthLayout({ category }: { category: BestForCategory }) {
  const tools = resolveTools(category);
  return (
    <>
      <div className="bf-quote"><p>{category.lead}</p></div>
      <section className="bf-intro">
        <p className="area-lead-text">{category.intro}</p>
      </section>
      <BestForSection num="01" title="The tools to keep">
        <div className="bf-tools-feature">
          {tools.map((meta) => <ToolBoxLink key={meta.id} meta={meta} />)}
        </div>
      </BestForSection>
      <BestForSection num="02" title="How to read the numbers">
        <div className="bf-sections-grid">
          {category.sections.map((section) => (
            <div className="bf-read-card" key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          ))}
        </div>
      </BestForSection>
      <div className="bf-habit-row">
        {category.tips.map((tip) => <span className="bf-habit-chip" key={tip}>{tip}</span>)}
      </div>
      <NoteBanner note={category.note} />
    </>
  );
}

function ApplicationsLayout({ category }: { category: BestForCategory }) {
  const tools = resolveTools(category);
  return (
    <>
      <section className="bf-intro">
        <p className="area-lead-text">{category.intro}</p>
      </section>
      <BestForSection num="01" title="What each form will ask">
        <div className="bf-sections">
          {category.sections.map((section) => (
            <div className="bf-doc-row" key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          ))}
        </div>
      </BestForSection>
      <BestForSection num="02" title="The calculators that answer">
        <div className="area-tool-list">
          {tools.map((meta) => <ToolBoxLink key={meta.id} meta={meta} />)}
        </div>
      </BestForSection>
      <NoteBanner note={category.note} />
      <BestForSection num="03" title="Pre-application checklist">
        <ol className="area-tip-list">
          {category.tips.map((tip) => <li key={tip}>{tip}</li>)}
        </ol>
      </BestForSection>
    </>
  );
}

function CounterLayout({ category }: { category: BestForCategory }) {
  const tools = resolveTools(category);
  return (
    <>
      <section className="bf-intro">
        <p className="area-lead-text">{category.intro}</p>
      </section>
      <BestForSection num="01" title="The two tools">
        <div className="bf-duo">
          {tools.map((meta) => <ToolBoxLink key={meta.id} meta={meta} />)}
        </div>
      </BestForSection>
      <BestForSection num="02" title="Real counter math">
        <div className="bf-examples">
          {(category.examples ?? []).map((example) => (
            <details className="bf-example-item" key={example.q}>
              <summary>{example.q}</summary>
              <p>{example.a}</p>
            </details>
          ))}
        </div>
      </BestForSection>
      <BestForSection num="03" title="The small print">
        <div className="bf-sections">
          {category.sections.map((section) => (
            <div className="bf-doc-row" key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          ))}
        </div>
      </BestForSection>
      <NoteBanner note={category.note} />
      <BestForSection num="04" title="More shopping habits">
        <ol className="area-tip-list">
          {category.tips.map((tip) => <li key={tip}>{tip}</li>)}
        </ol>
      </BestForSection>
    </>
  );
}

function renderBestForLayout(category: BestForCategory): ReactNode {
  switch (category.layout) {
    case 'syllabus': return <SyllabusLayout category={category} />;
    case 'homebuyer': return <HomebuyerLayout category={category} />;
    case 'invoice': return <InvoiceLayout category={category} />;
    case 'health': return <HealthLayout category={category} />;
    case 'applications': return <ApplicationsLayout category={category} />;
    case 'counter': return <CounterLayout category={category} />;
  }
}

function BestForScene({ category }: { category: BestForCategory }) {
  useBestForSeo(category);
  return (
    <main className="notebook-page min-h-[100dvh]">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-8">
        <TopBar />
        <div className="back-wrap">
          <BackButton />
        </div>
        <article className={`bf-page bf-theme-${category.theme} animate-rise`}>
          <Header category={category} />
          {renderBestForLayout(category)}
        </article>
        <SiteFooter />
      </div>
    </main>
  );
}

export default function BestForPage() {
  const params = useParams<{ slug?: string }>();
  const category = bestForCategories.find((item) => item.slug === params.slug) ?? null;
  if (!category) return <NotFound />;
  return <BestForScene category={category} />;
}