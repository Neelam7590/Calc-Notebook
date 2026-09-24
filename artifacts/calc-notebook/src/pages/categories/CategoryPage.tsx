import { useEffect, type ReactNode } from 'react';
import { useParams } from 'wouter';
import { Check } from 'lucide-react';
import { TopBar, calculatorMeta } from '@/components/top-bar';
import { ToolBoxLink } from '@/components/tool-link';
import { BackButton } from '@/components/back-button';
import { SiteFooter } from '@/components/site-footer';
import NotFound from '@/pages/not-found';
import { calculatorCategories, type CalculatorCategory } from '@/data/categories';

function resolveTools(category: CalculatorCategory) {
  return category.tools
    .map((id) => calculatorMeta.find((meta) => meta.id === id))
    .filter((meta): meta is NonNullable<typeof meta> => Boolean(meta));
}

function CategorySection({ num, title, children }: { num: string; title: string; children: ReactNode }) {
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

function useCategorySeo(category: CalculatorCategory) {
  useEffect(() => {
    const siteUrl = window.location.origin;
    const path = `/categories/${category.slug}`;
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

    let schema = document.getElementById('category-page-schema') as HTMLScriptElement | null;
    if (!schema) {
      schema = document.createElement('script');
      schema.type = 'application/ld+json';
      schema.id = 'category-page-schema';
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
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
            { '@type': 'ListItem', position: 2, name: 'Categories we cover', item: `${siteUrl}/` },
            { '@type': 'ListItem', position: 3, name: category.name, item: canonicalUrl },
          ],
        },
      ],
    });
  }, [category]);
}

function Header({ category }: { category: CalculatorCategory }) {
  return (
    <div className="blog-article-header">
      <span className="area-kicker">{category.eyebrow}</span>
      <h1 className="calculator-title">{category.name}</h1>
      <p className="calculator-subtitle">{category.lead}</p>
      <div className="legal-led">
        <span className="area-chip">Free & private</span>
        <span className="area-chip">{category.tools.length} tools in this set</span>
      </div>
    </div>
  );
}

function FinanceLayout({ category }: { category: CalculatorCategory }) {
  const tools = resolveTools(category);
  return (
    <>
      <section className="bf-intro">
        <p className="area-lead-text">{category.intro}</p>
      </section>
      <CategorySection num="01" title="The loan math, in order">
        <ol className="bf-steps">
          {(category.steps ?? []).map((step, index) => (
            <li key={step}><b>{String(index + 1).padStart(2, '0')}</b><span>{step}</span></li>
          ))}
        </ol>
      </CategorySection>
      <CategorySection num="02" title="Tools that answer">
        <div className="area-tools-grid">
          {tools.map((meta) => <ToolBoxLink key={meta.id} meta={meta} />)}
        </div>
      </CategorySection>
      <CategorySection num="03" title="How a deal really adds up">
        <div className="bf-sections">
          {category.sections.map((section) => (
            <div className="bf-doc-row" key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          ))}
        </div>
      </CategorySection>
      <NoteBanner note={category.note} />
      <CategorySection num="04" title="Financial habits worth keeping">
        <ol className="area-tip-list">
          {category.tips.map((tip) => <li key={tip}>{tip}</li>)}
        </ol>
      </CategorySection>
    </>
  );
}

function TaxLayout({ category }: { category: CalculatorCategory }) {
  const tools = resolveTools(category);
  return (
    <>
      <section className="bf-intro">
        <p className="area-lead-text">{category.intro}</p>
      </section>
      <CategorySection num="01" title="GST classes at a glance">
        <div className="bf-habit-row">
          {(category.chips ?? []).map((chip) => <span className="bf-habit-chip" key={chip}>{chip}</span>)}
        </div>
      </CategorySection>
      <CategorySection num="02" title="Tools for the invoice">
        <div className="area-tools-grid">
          {tools.map((meta) => <ToolBoxLink key={meta.id} meta={meta} />)}
        </div>
      </CategorySection>
      <CategorySection num="03" title="Three questions every invoice asks">
        <div className="bf-question-grid">
          {category.sections.map((section) => (
            <div className="bf-question-card" key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          ))}
        </div>
      </CategorySection>
      <NoteBanner note={category.note} />
      <CategorySection num="04" title="Practical habits">
        <ol className="area-tip-list">
          {category.tips.map((tip) => <li key={tip}>{tip}</li>)}
        </ol>
      </CategorySection>
    </>
  );
}

function PropertyLayout({ category }: { category: CalculatorCategory }) {
  const tools = resolveTools(category);
  return (
    <>
      <div className="bf-split">
        <div>
          <section className="bf-intro">
            <p className="area-lead-text">{category.intro}</p>
          </section>
          <CategorySection num="01" title="The rules that set the bill">
            <div className="area-checklist">
              {(category.facts ?? []).map((fact) => (
                <div className="area-check-item" key={fact.label}><Check size={16} strokeWidth={2.2} /><p><strong>{fact.label}:</strong> {fact.value}</p></div>
              ))}
            </div>
          </CategorySection>
        </div>
        <aside className="bf-rail">
          <CategorySection num="02" title="Tools for the transaction">
            <div className="area-tool-list">
              {tools.map((meta) => <ToolBoxLink key={meta.id} meta={meta} />)}
            </div>
          </CategorySection>
        </aside>
      </div>
      <CategorySection num="03" title="Beyond the sale price">
        <div className="bf-sections">
          {category.sections.map((section) => (
            <div className="bf-doc-row" key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          ))}
        </div>
      </CategorySection>
      <NoteBanner note={category.note} />
      <CategorySection num="04" title="Money habits for buyers">
        <ol className="area-tip-list">
          {category.tips.map((tip) => <li key={tip}>{tip}</li>)}
        </ol>
      </CategorySection>
    </>
  );
}

function HealthLayout({ category }: { category: CalculatorCategory }) {
  const tools = resolveTools(category);
  return (
    <>
      <div className="bf-quote"><p>{category.lead}</p></div>
      <section className="bf-intro">
        <p className="area-lead-text">{category.intro}</p>
      </section>
      <CategorySection num="01" title="The tools to keep">
        <div className="bf-tools-feature">
          {tools.map((meta) => <ToolBoxLink key={meta.id} meta={meta} />)}
        </div>
      </CategorySection>
      <CategorySection num="02" title="How to read the numbers">
        <div className="bf-sections-grid">
          {category.sections.map((section) => (
            <div className="bf-read-card" key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          ))}
        </div>
      </CategorySection>
      <CategorySection num="03" title="Habits that actually stick">
        <ol className="area-tip-list">
          {category.tips.map((tip) => <li key={tip}>{tip}</li>)}
        </ol>
      </CategorySection>
      <NoteBanner note={category.note} />
    </>
  );
}

function StudentLayout({ category }: { category: CalculatorCategory }) {
  const tools = resolveTools(category);
  return (
    <>
      <section className="bf-intro">
        <p className="area-lead-text">{category.intro}</p>
      </section>
      <CategorySection num="01" title="One deadline, four numbers">
        <div className="area-timeline">
          {(category.timeline ?? []).map((step, index) => (
            <div className="area-timeline-item" key={step}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </CategorySection>
      <CategorySection num="02" title="Tools that finish the form">
        <div className="area-tools-grid">
          {tools.map((meta) => <ToolBoxLink key={meta.id} meta={meta} />)}
        </div>
      </CategorySection>
      <CategorySection num="03" title="Asked and answered">
        <div className="area-accordion">
          {(category.questions ?? []).map((item) => (
            <details className="area-accordion-item" key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </CategorySection>
      <NoteBanner note={category.note} />
      <CategorySection num="04" title="Habits that save deadline nights">
        <ol className="area-tip-list">
          {category.tips.map((tip) => <li key={tip}>{tip}</li>)}
        </ol>
      </CategorySection>
    </>
  );
}

function MathLayout({ category }: { category: CalculatorCategory }) {
  const tools = resolveTools(category);
  return (
    <>
      <section className="bf-intro">
        <p className="area-lead-text">{category.intro}</p>
      </section>
      <CategorySection num="01" title="The two that cover the rest">
        <div className="bf-duo">
          {tools.map((meta) => <ToolBoxLink key={meta.id} meta={meta} />)}
        </div>
      </CategorySection>
      <CategorySection num="02" title="Real counter math">
        <div className="bf-examples">
          {(category.examples ?? []).map((example) => (
            <details className="bf-example-item" key={example.q}>
              <summary>{example.q}</summary>
              <p>{example.a}</p>
            </details>
          ))}
        </div>
      </CategorySection>
      <CategorySection num="03" title="The small print">
        <div className="bf-sections">
          {category.sections.map((section) => (
            <div className="bf-doc-row" key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          ))}
        </div>
      </CategorySection>
      <NoteBanner note={category.note} />
      <CategorySection num="04" title="More daily habits">
        <ol className="area-tip-list">
          {category.tips.map((tip) => <li key={tip}>{tip}</li>)}
        </ol>
      </CategorySection>
    </>
  );
}

function renderCategoryLayout(category: CalculatorCategory): ReactNode {
  switch (category.layout) {
    case 'finance': return <FinanceLayout category={category} />;
    case 'tax': return <TaxLayout category={category} />;
    case 'property': return <PropertyLayout category={category} />;
    case 'health': return <HealthLayout category={category} />;
    case 'student': return <StudentLayout category={category} />;
    case 'math': return <MathLayout category={category} />;
  }
}

function CategoryScene({ category }: { category: CalculatorCategory }) {
  useCategorySeo(category);
  return (
    <main className="notebook-page min-h-[100dvh]">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-8">
        <TopBar />
        <div className="back-wrap">
          <BackButton />
        </div>
        <article className={`bf-page category-page bf-theme-${category.theme} animate-rise`}>
          <Header category={category} />
          {renderCategoryLayout(category)}
        </article>
        <SiteFooter />
      </div>
    </main>
  );
}

export default function CategoryPage() {
  const params = useParams<{ slug?: string }>();
  const category = calculatorCategories.find((item) => item.slug === params.slug) ?? null;
  if (!category) return <NotFound />;
  return <CategoryScene category={category} />;
}