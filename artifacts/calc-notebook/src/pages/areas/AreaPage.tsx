import { useEffect, type ReactNode } from 'react';
import { Link, useParams } from 'wouter';
import { ArrowRight, Check, Stamp } from 'lucide-react';
import { TopBar, calculatorMeta, calculatorPath } from '@/components/top-bar';
import { ToolCardLink, ToolRowLink } from '@/components/tool-link';
import { BackButton } from '@/components/back-button';
import { SiteFooter } from '@/components/site-footer';
import NotFound from '@/pages/not-found';
import { haryanaAreas, type HaryanaArea } from '@/data/haryanaAreas';

function AreaHeader({ area }: { area: HaryanaArea }) {
  return (
    <div className="blog-article-header">
      <span className="area-kicker">{area.eyebrow}</span>
      <h1 className="calculator-title">{area.name}</h1>
      <p className="calculator-subtitle">{area.lead}</p>
      <div className="legal-led">
        <span className="area-chip">{area.name}, Haryana</span>
        <span className="area-chip">All 7 calculators</span>
      </div>
    </div>
  );
}

function AreaSection({ num, title, children, id }: { num: string; title: string; children: ReactNode; id?: string }) {
  return (
    <section className="area-section" id={id}>
      <div className="area-section-head">
        <span className="area-section-num">{num}</span>
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}

function AreaStampBanner({ area }: { area: HaryanaArea }) {
  return (
    <section className="area-stamp-banner" aria-labelledby={`${area.slug}-stamp-title`}>
      <div className="area-stamp-icon" aria-hidden="true"><Stamp size={20} strokeWidth={1.7} /></div>
      <div>
        <span className="area-stamp-label" id={`${area.slug}-stamp-title`}>Stamp duty note · {area.name.toUpperCase()}</span>
        <p>{area.stamp}</p>
        <Link href={calculatorPath('stamp-duty')} className="area-stamp-cta">
          Open the Stamp Duty Calculator <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
}

function AreaProse({ area }: { area: HaryanaArea }) {
  return (
    <section className="area-prose-zone">
      <p className="area-lead-text">{area.intro}</p>
      {area.profile.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
    </section>
  );
}

function useAreaSeo(area: HaryanaArea) {
  useEffect(() => {
    const siteUrl = window.location.origin;
    const path = `/areas/${area.slug}`;
    const canonicalUrl = `${siteUrl}${path}`;

    document.title = area.title;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta) meta.setAttribute('content', area.metaDescription);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    let schema = document.getElementById('area-page-schema') as HTMLScriptElement | null;
    if (!schema) {
      schema = document.createElement('script');
      schema.type = 'application/ld+json';
      schema.id = 'area-page-schema';
      document.head.appendChild(schema);
    }
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': canonicalUrl,
          url: canonicalUrl,
          name: area.title,
          description: area.metaDescription,
          inLanguage: 'en',
          isPartOf: { '@type': 'WebSite', name: 'Calc Notebook', url: `${siteUrl}/` },
          about: {
            '@type': 'Service',
            name: `Free online calculators for people in ${area.name}`,
            serviceType: 'Online calculators for everyday needs',
            provider: { '@type': 'Organization', name: 'Calc Notebook', url: `${siteUrl}/` },
            areaServed: { '@type': 'City', name: `${area.name}, Haryana` },
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
            { '@type': 'ListItem', position: 2, name: 'Available across Haryana', item: `${siteUrl}/areas` },
            { '@type': 'ListItem', position: 3, name: area.name, item: canonicalUrl },
          ],
        },
      ],
    });
  }, [area]);
}

function LayoutSpotlight({ area }: { area: HaryanaArea }) {
  return (
    <>
      <section className="area-spotlight">
        <p className="area-lead-text">{area.intro}</p>
        {area.profile.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </section>
      <AreaStampBanner area={area} />
      <AreaSection num="01" title={`Calculators for ${area.name}`}>
        <div className="area-tools-grid">
          {calculatorMeta.map((meta) => <ToolCardLink key={meta.id} meta={meta} />)}
        </div>
      </AreaSection>
      <AreaSection num="02" title="Local notes">
        <ol className="area-tip-list">
          {area.tips.map((tip) => <li key={tip}>{tip}</li>)}
        </ol>
      </AreaSection>
    </>
  );
}

function LayoutTimeline({ area }: { area: HaryanaArea }) {
  return (
    <>
      <AreaSection num="01" title={`A typical property day in ${area.name}`}>
        <div className="area-timeline">
          {(area.timeline ?? []).map((step, index) => (
            <div className="area-timeline-item" key={step}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </AreaSection>
      <AreaProse area={area} />
      <AreaSection num="02" title={`Calculators for ${area.name}`}>
        <div className="area-tool-list">
          {calculatorMeta.map((meta) => <ToolRowLink key={meta.id} meta={meta} />)}
        </div>
      </AreaSection>
      <AreaSection num="03" title="Local tips">
        <ol className="area-tip-list">
          {area.tips.map((tip) => <li key={tip}>{tip}</li>)}
        </ol>
      </AreaSection>
    </>
  );
}

function LayoutColumns({ area }: { area: HaryanaArea }) {
  return (
    <>
      <div className="area-columns">
        <div className="area-prose-col">
          <AreaSection num="01" title={`About ${area.name}`}>
            <p className="area-lead-text">{area.intro}</p>
            {area.profile.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <p className="area-quiet-note">{area.stamp}</p>
          </AreaSection>
        </div>
        <aside className="area-sticky-col">
          <AreaSection num="02" title="Tools to keep close">
            <div className="area-tool-list">
              {calculatorMeta.map((meta) => <ToolRowLink key={meta.id} meta={meta} />)}
            </div>
          </AreaSection>
        </aside>
      </div>
      <AreaSection num="03" title="Local tips">
        <ol className="area-tip-list">
          {area.tips.map((tip) => <li key={tip}>{tip}</li>)}
        </ol>
      </AreaSection>
    </>
  );
}

function LayoutAccordion({ area }: { area: HaryanaArea }) {
  return (
    <>
      <section className="area-prose-zone">
        <p className="area-lead-text">{area.intro}</p>
      </section>
      <AreaSection num="01" title="Questions families here ask">
        <div className="area-accordion">
          {(area.questions ?? []).map((item) => (
            <details className="area-accordion-item" key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </AreaSection>
      <AreaSection num="02" title={`Calculators for ${area.name}`}>
        <div className="area-tool-list">
          {calculatorMeta.map((meta) => <ToolRowLink key={meta.id} meta={meta} />)}
        </div>
      </AreaSection>
      <section className="area-prose-zone">
        {area.profile.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </section>
      <AreaSection num="03" title="Local tips">
        <ol className="area-tip-list">
          {area.tips.map((tip) => <li key={tip}>{tip}</li>)}
        </ol>
      </AreaSection>
    </>
  );
}

function LayoutGoalcards({ area }: { area: HaryanaArea }) {
  return (
    <>
      <div className="area-goal-grid">
        {(area.goals ?? []).map((goal) => (
          <div className="area-goal-card" key={goal.title}>
            <strong>{goal.title}</strong>
            <p>{goal.text}</p>
          </div>
        ))}
      </div>
      <AreaSection num="01" title={`Money questions in ${area.name}`}>
        <p className="area-lead-text">{area.intro}</p>
        {area.profile.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </AreaSection>
      <AreaSection num="02" title="Calculators built for the pace">
        <div className="area-tools-grid">
          {calculatorMeta.map((meta) => <ToolCardLink key={meta.id} meta={meta} />)}
        </div>
      </AreaSection>
      <AreaSection num="03" title="Quick tips">
        <ol className="area-tip-list">
          {area.tips.map((tip) => <li key={tip}>{tip}</li>)}
        </ol>
      </AreaSection>
      <AreaStampBanner area={area} />
    </>
  );
}

function LayoutChecklist({ area }: { area: HaryanaArea }) {
  return (
    <>
      <AreaSection num="01" title={`Before you register in ${area.name}`}>
        <div className="area-checklist">
          {(area.steps ?? []).map((step) => (
            <div className="area-check-item" key={step}><Check size={16} strokeWidth={2.2} /><p>{step}</p></div>
          ))}
        </div>
      </AreaSection>
      <AreaStampBanner area={area} />
      <AreaSection num="02" title={`Calculators for ${area.name}`}>
        <div className="area-tool-list">
          {calculatorMeta.map((meta) => <ToolRowLink key={meta.id} meta={meta} />)}
        </div>
      </AreaSection>
      <section className="area-prose-zone">
        <p className="area-lead-text">{area.intro}</p>
        {area.profile.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </section>
    </>
  );
}

function LayoutSplit({ area }: { area: HaryanaArea }) {
  return (
    <>
      <div className="area-split">
        <div className="area-split-copy">
          <p className="area-lead-text">{area.intro}</p>
          {area.profile.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <aside className="area-facts" aria-label={`${area.name} at a glance`}>
          <div className="area-facts-title">{area.name.toUpperCase()} AT A GLANCE</div>
          {(area.facts ?? []).map((fact) => (
            <div className="area-fact" key={fact.label}><span>{fact.label}</span><strong>{fact.value}</strong></div>
          ))}
        </aside>
      </div>
      <AreaSection num="01" title={`Calculators for ${area.name}`}>
        <div className="area-tools-grid">
          {calculatorMeta.map((meta) => <ToolCardLink key={meta.id} meta={meta} />)}
        </div>
      </AreaSection>
      <AreaStampBanner area={area} />
      <AreaSection num="02" title="Local tips">
        <ol className="area-tip-list">
          {area.tips.map((tip) => <li key={tip}>{tip}</li>)}
        </ol>
      </AreaSection>
    </>
  );
}

function LayoutStripes({ area }: { area: HaryanaArea }) {
  return (
    <AreaSection num="01" title={`Everything for ${area.name}`}>
      <div className="area-stripes">
        <div className="area-stripe">
          <span>A</span>
          <div>
            <h3>About {area.name}</h3>
            <p>{area.intro}</p>
            {area.profile.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
        {calculatorMeta.map((meta, index) => (
          <div className="area-stripe" key={meta.id}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div>
              <h3>{meta.name}</h3>
              <p>{meta.description}</p>
              <Link href={calculatorPath(meta.id)} className="area-stripe-link">Open {meta.name.replace(' Calculator', '')} <ArrowRight size={14} /></Link>
            </div>
          </div>
        ))}
      </div>
      <AreaStampBanner area={area} />
    </AreaSection>
  );
}

function LayoutStatcards({ area }: { area: HaryanaArea }) {
  return (
    <>
      <div className="area-stat-grid">
        {(area.stats ?? []).map((stat) => (
          <div className="area-stat" key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>
        ))}
      </div>
      <section className="area-prose-zone">
        <p className="area-lead-text">{area.intro}</p>
        {area.profile.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </section>
      <AreaSection num="01" title={`Calculators for ${area.name}`}>
        <div className="area-tools-grid">
          {calculatorMeta.map((meta) => <ToolCardLink key={meta.id} meta={meta} />)}
        </div>
      </AreaSection>
      <AreaSection num="02" title="Local tips">
        <ol className="area-tip-list">
          {area.tips.map((tip) => <li key={tip}>{tip}</li>)}
        </ol>
      </AreaSection>
      <AreaStampBanner area={area} />
    </>
  );
}

function LayoutPullquote({ area }: { area: HaryanaArea }) {
  return (
    <>
      {area.quote && (
        <div className="area-pullquote">
          <p>{area.quote}</p>
        </div>
      )}
      <section className="area-prose-zone">
        <p className="area-lead-text">{area.intro}</p>
        {area.profile.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </section>
      <AreaSection num="01" title={`Calculators for ${area.name}`}>
        <div className="area-ribbon">
          {calculatorMeta.map((meta) => <ToolCardLink key={meta.id} meta={meta} />)}
        </div>
      </AreaSection>
      <AreaSection num="02" title="Local tips">
        <ol className="area-tip-list">
          {area.tips.map((tip) => <li key={tip}>{tip}</li>)}
        </ol>
      </AreaSection>
    </>
  );
}

function LayoutChipgrid({ area }: { area: HaryanaArea }) {
  return (
    <>
      <div className="area-chip-grid">
        {(area.chips ?? []).map((chip) => <span className="area-chip" key={chip}>{chip}</span>)}
      </div>
      <section className="area-prose-zone">
        <p className="area-lead-text">{area.intro}</p>
        {area.profile.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </section>
      <AreaSection num="01" title={`Calculators for ${area.name}`}>
        <div className="area-tools-grid">
          {calculatorMeta.map((meta) => <ToolCardLink key={meta.id} meta={meta} />)}
        </div>
      </AreaSection>
      <AreaSection num="02" title="Local notes">
        <ol className="area-tip-list">
          {area.tips.map((tip) => <li key={tip}>{tip}</li>)}
        </ol>
      </AreaSection>
      <AreaStampBanner area={area} />
    </>
  );
}

function LayoutSidebar({ area }: { area: HaryanaArea }) {
  return (
    <div className="area-sidebar">
      <nav className="area-jump-nav" aria-label={`Sections on this ${area.name} page`}>
        <span>AROUND THIS PAGE</span>
        <a href="#about">About {area.name}</a>
        <a href="#daily">Daily money rhythm</a>
        <a href="#tools">Calculators</a>
        <a href="#stamp">Stamp duty</a>
        <a href="#tips">Local tips</a>
      </nav>
      <div className="area-main">
        <h2 id="about">About {area.name}</h2>
        <p>{area.intro}</p>
        <h2 id="daily">The daily money rhythm</h2>
        {(area.sections ?? []).map((section) => (
          <section key={section.title}>
            <h3>{section.title}</h3>
            <p>{section.body}</p>
          </section>
        ))}
        <h2 id="tools">Calculators for {area.name}</h2>
        <p>Every tool on Calc Notebook is free, private, and built for this kind of day.</p>
        <div className="area-tool-list">
          {calculatorMeta.map((meta) => <ToolRowLink key={meta.id} meta={meta} />)}
        </div>
        <h2 id="stamp">Stamp duty in {area.name}</h2>
        <p>{area.stamp}</p>
        <h2 id="tips">Local tips</h2>
        <ol className="area-tip-list">
          {area.tips.map((tip) => <li key={tip}>{tip}</li>)}
        </ol>
      </div>
    </div>
  );
}

function LayoutDigest({ area }: { area: HaryanaArea }) {
  return (
    <>
      <div className="area-digest">
        {(area.digest ?? []).map((item, index) => (
          <div className="area-digest-item" key={item}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p></div>
        ))}
      </div>
      <section className="area-prose-zone">
        <p className="area-lead-text">{area.intro}</p>
        {area.profile.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </section>
      <AreaStampBanner area={area} />
      <AreaSection num="01" title={`Calculators for ${area.name}`}>
        <div className="area-tools-grid">
          {calculatorMeta.map((meta) => <ToolCardLink key={meta.id} meta={meta} />)}
        </div>
      </AreaSection>
      <AreaSection num="02" title="Local tips">
        <ol className="area-tip-list">
          {area.tips.map((tip) => <li key={tip}>{tip}</li>)}
        </ol>
      </AreaSection>
    </>
  );
}

function renderAreaLayout(area: HaryanaArea): ReactNode {
  switch (area.layout) {
    case 'spotlight': return <LayoutSpotlight area={area} />;
    case 'timeline': return <LayoutTimeline area={area} />;
    case 'columns': return <LayoutColumns area={area} />;
    case 'accordion': return <LayoutAccordion area={area} />;
    case 'goalcards': return <LayoutGoalcards area={area} />;
    case 'checklist': return <LayoutChecklist area={area} />;
    case 'split': return <LayoutSplit area={area} />;
    case 'stripes': return <LayoutStripes area={area} />;
    case 'statcards': return <LayoutStatcards area={area} />;
    case 'pullquote': return <LayoutPullquote area={area} />;
    case 'chipgrid': return <LayoutChipgrid area={area} />;
    case 'sidebar': return <LayoutSidebar area={area} />;
    case 'digest': return <LayoutDigest area={area} />;
  }
}

function AreaScene({ area }: { area: HaryanaArea }) {
  useAreaSeo(area);
  return (
    <main className="notebook-page min-h-[100dvh]">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-8">
        <TopBar />
        <div className="back-wrap">
          <BackButton />
        </div>
        <article className={`area-page area-theme-${area.theme} animate-rise`}>
          <AreaHeader area={area} />
          {renderAreaLayout(area)}
        </article>
        <SiteFooter />
      </div>
    </main>
  );
}

export default function AreaPage() {
  const params = useParams<{ slug?: string }>();
  const area = haryanaAreas.find((item) => item.slug === params.slug) ?? null;
  if (!area) return <NotFound />;
  return <AreaScene area={area} />;
}