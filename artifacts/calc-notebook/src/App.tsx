import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CircleDollarSign,
  GraduationCap,
  Hash,
  RotateCcw,
  Scale,
  Sparkles,
  Stamp,
  WalletCards,
  type LucideIcon,
} from 'lucide-react';
import { Link, Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import NotFound from '@/pages/not-found';
import BlogList from '@/pages/blog/BlogList';
import BlogPost from '@/pages/blog/BlogPost';
import AdminLogin from '@/pages/admin/admin-login';
import AdminApp from '@/pages/admin/admin-app';
import AdminRecovery from '@/pages/admin/admin-recovery';
import { AdminAuthProvider } from '@/pages/admin/admin-auth';
import Terms from '@/pages/legal/Terms';
import Privacy from '@/pages/legal/Privacy';
import Disclaimer from '@/pages/legal/Disclaimer';
import FAQ from '@/pages/legal/FAQ';
import AreasIndex from '@/pages/areas/AreasIndex';
import AreaPage from '@/pages/areas/AreaPage';
import BestForPage from '@/pages/bestFor/BestForPage';
import CategoryPage from '@/pages/categories/CategoryPage';
import { calculatorSeoContent, homeSeoSections, type SeoSection } from './seoContent';
import { haryanaCities, haryanaStampDuty, haryanaRegistrationFee, type AreaType, type BuyerType } from '@/data/haryanaRates';
import {
  TopBar,
  calculatorMeta,
  calculatorPath,
  type CalculatorId,
  type CalculatorMeta,
} from '@/components/top-bar';
import { SiteFooter } from '@/components/site-footer';

const queryClient = new QueryClient();

const relatedCalculators: Record<CalculatorId, CalculatorId[]> = {
  emi: ['gst', 'percentage', 'stamp-duty'],
  age: ['bmi', 'percentage'],
  percentage: ['gst', 'cgpa'],
  bmi: ['age', 'percentage'],
  gst: ['emi', 'percentage'],
  cgpa: ['percentage', 'gst'],
  'stamp-duty': ['emi', 'gst'],
};

const money = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(value);

const decimal = (value: number, digits = 2) =>
  new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: digits,
  }).format(value);

const parseDate = (value: string) => {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
};

const todayString = () => {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
};

function Home() {
  return (
    <main className="notebook-page min-h-[100dvh]">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-8">
        <PageSeo
          title="Free Online Calculators – Stamp Duty, EMI, Age, BMI, GST | Calc Notebook"
          description="Free online calculators for Haryana stamp duty, EMI, age, percentage, BMI, and GST. Fast, accurate, and easy to use — no signup required."
          path="/"
          website
        />
        <TopBar />
        <section className="home-intro animate-rise" aria-labelledby="welcome-title">
          <div className="home-kicker">
            <span className="kicker-line" />
            <span>THE LITTLE MATH DESK</span>
          </div>
          <div className="max-w-3xl">
            <h1 id="welcome-title" className="display-title">
              Free Online<br />
              <em>Calculators.</em>
            </h1>
            <p className="intro-copy">
              Clear answers for ordinary questions — a calm corner for the numbers
              that pop up in real life. Pick a page, fill in what you know, and
              keep moving.
            </p>
          </div>
          <div className="desk-note" aria-label="Notebook note">
            <Sparkles size={16} strokeWidth={1.8} />
            <span>Seven essentials, kept pleasantly simple.</span>
          </div>
        </section>

        <SimpleCalculator />

        <section className="calculator-list" aria-labelledby="calculator-list-title">
          <div className="section-caption">
            <h2 id="calculator-list-title">Choose a calculation</h2>
            <span className="section-rule" />
          </div>
          <div className="calculator-grid">
            {calculatorMeta.map((calculator, index) => (
              <CalculatorCard
                key={calculator.id}
                calculator={calculator}
                index={index}
              />
            ))}
          </div>
        </section>

        <HomeSeoContent />

        <SiteFooter variant="home" />
      </div>
    </main>
  );
}

function HomeSeoContent() {
  return (
    <section className="seo-content home-seo" aria-labelledby="home-seo-title">
      <div className="seo-content-intro">
        <span className="home-kicker"><span className="kicker-line" /><span>THE NOTEBOOK GUIDE</span></span>
        <h2 id="home-seo-title">Useful calculators for the numbers in your day.</h2>
        <p>Browse a focused calculator page below whenever you need a reliable first answer. Each page includes the tool, a plain-language explanation, examples, and answers to common questions.</p>
      </div>
      <div className="home-seo-grid">
        {homeSeoSections.map((section) => (
          <article className="home-seo-card" key={section.heading}>
            <h3>{section.heading}</h3>
            {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </article>
        ))}
      </div>
    </section>
  );
}

function SimpleCalculator() {
  const [display, setDisplay] = useState('0');
  const [stored, setStored] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [lastExpression, setLastExpression] = useState<string | null>(null);

  const clear = () => {
    setDisplay('0');
    setStored(null);
    setOperator(null);
    setWaitingForOperand(false);
    setLastExpression(null);
  };

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
      setLastExpression(null);
      return;
    }
    setDisplay(display === '0' || display === 'Error' ? digit : display.length < 14 ? `${display}${digit}` : display);
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      setLastExpression(null);
    } else if (!display.includes('.')) {
      setDisplay(`${display}.`);
    }
  };

  const backspace = () => {
    if (waitingForOperand) return;
    if (display === 'Error' || display.length <= 1 || (display.length === 2 && display.startsWith('-'))) {
      setDisplay('0');
      return;
    }
    setDisplay(display.slice(0, -1));
  };

  const calculate = (left: number, right: number, nextOperator: string) => {
    if (nextOperator === '+') return left + right;
    if (nextOperator === '-') return left - right;
    if (nextOperator === '×') return left * right;
    return right === 0 ? Number.NaN : left / right;
  };

  const displayOperator = (nextOperator: string) => nextOperator === '-' ? '−' : nextOperator;

  const chooseOperator = (nextOperator: string) => {
    const value = Number(display);
    if (Number.isNaN(value)) return;
    if (stored !== null && operator && !waitingForOperand) {
      const result = calculate(stored, value, operator);
      setDisplay(Number.isFinite(result) ? String(result) : 'Error');
      setStored(Number.isFinite(result) ? result : null);
    } else {
      setStored(value);
    }
    setOperator(nextOperator);
    setWaitingForOperand(true);
    setLastExpression(null);
  };

  const equals = () => {
    if (stored === null || !operator) return;
    const right = Number(display);
    const result = calculate(stored, right, operator);
    setLastExpression(`${stored} ${displayOperator(operator)} ${display}`);
    setDisplay(Number.isFinite(result) ? String(result) : 'Error');
    setStored(null);
    setOperator(null);
    setWaitingForOperand(true);
  };

  const toggleSign = () => {
    if (display === '0' || display === 'Error') return;
    setDisplay(display.startsWith('-') ? display.slice(1) : `-${display}`);
  };

  const percent = () => {
    const value = Number(display);
    if (!Number.isNaN(value)) setDisplay(String(value / 100));
  };

  const buttons = [
    { label: 'AC', action: clear, className: 'simple-button-muted' },
    { label: '⌫', action: backspace, className: 'simple-button-muted' },
    { label: '±', action: toggleSign, className: 'simple-button-muted' },
    { label: '%', action: percent, className: 'simple-button-muted' },
    { label: '÷', action: () => chooseOperator('÷'), className: 'simple-button-operator' },
    { label: '7', action: () => inputDigit('7') },
    { label: '8', action: () => inputDigit('8') },
    { label: '9', action: () => inputDigit('9') },
    { label: '×', action: () => chooseOperator('×'), className: 'simple-button-operator' },
    { label: '4', action: () => inputDigit('4') },
    { label: '5', action: () => inputDigit('5') },
    { label: '6', action: () => inputDigit('6') },
    { label: '−', action: () => chooseOperator('-'), className: 'simple-button-operator' },
    { label: '1', action: () => inputDigit('1') },
    { label: '2', action: () => inputDigit('2') },
    { label: '3', action: () => inputDigit('3') },
    { label: '+', action: () => chooseOperator('+'), className: 'simple-button-operator' },
    { label: '0', action: () => inputDigit('0'), className: 'simple-button-zero' },
    { label: '.', action: inputDecimal },
    { label: '=', action: equals, className: 'simple-button-equals' },
  ];

  return (
    <section className="simple-calculator" aria-labelledby="simple-calculator-title">
      <div className="simple-calculator-copy">
        <span className="card-eyebrow">A QUICK SCRATCHPAD</span>
        <h2 id="simple-calculator-title">Simple calculator</h2>
        <p>For the little sums that do not need a whole page. Add, subtract, multiply, divide, or find a quick percentage.</p>
      </div>
      <div className="simple-calculator-body">
        <div className="simple-display" aria-live="polite">
          <div className={`simple-expression${lastExpression ? ' simple-expression-visible' : ''}`}>
            {lastExpression || (stored !== null && operator ? `${stored} ${displayOperator(operator)}${waitingForOperand ? '' : ` ${display}`}` : '')}
          </div>
          <div className="simple-result">{display}</div>
        </div>
        <div className="simple-keypad">
          {buttons.map((button) => (
            <button type="button" key={button.label} className={`simple-button ${button.className ?? ''}`} onClick={button.action} aria-label={button.label === '⌫' ? 'Backspace' : button.label}>
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function PageSeo({
  title,
  description,
  path,
  faqs,
  application,
  breadcrumbs,
  website = false,
}: {
  title: string;
  description: string;
  path: string;
  faqs?: { question: string; answer: string }[];
  application?: { name: string; description: string; applicationCategory: string };
  breadcrumbs?: { name: string; path: string }[];
  website?: boolean;
}) {
  useEffect(() => {
    document.title = title;
    const siteUrl = window.location.origin;
    const canonicalUrl = `${siteUrl}${path}`;
    const values: Record<string, string> = {
      description,
      'og:title': title,
      'og:description': description,
      'og:url': canonicalUrl,
      'twitter:title': title,
      'twitter:description': description,
    };

    Object.entries(values).forEach(([key, content]) => {
      const selector = key.startsWith('og:') || key.startsWith('twitter:')
        ? `meta[property="${key}"]`
        : `meta[name="${key}"]`;
      let element = document.head.querySelector<HTMLMetaElement>(selector);
      if (!element) {
        element = document.createElement('meta');
        if (key.startsWith('og:') || key.startsWith('twitter:')) {
          element.setAttribute('property', key);
        } else {
          element.setAttribute('name', key);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    });

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    const graph: Record<string, unknown>[] = [];

    if (website) {
      graph.push({
        '@type': 'WebSite',
        name: 'Calc Notebook',
        url: `${siteUrl}/`,
        description,
        inLanguage: 'en',
      });
    }

    if (application) {
      graph.push({
        '@type': 'SoftwareApplication',
        name: application.name,
        description: application.description,
        applicationCategory: application.applicationCategory,
        url: canonicalUrl,
        operatingSystem: 'Any',
        inLanguage: 'en',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
      });
    }

    if (faqs && faqs.length) {
      graph.push({
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      });
    }

    if (breadcrumbs && breadcrumbs.length) {
      graph.push({
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: `${siteUrl}${item.path}`,
        })),
      });
    }

    const schema = { '@context': 'https://schema.org', '@graph': graph };

    let structuredData = document.head.querySelector<HTMLScriptElement>(
      'script[data-calc-notebook-schema]',
    );
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.type = 'application/ld+json';
      structuredData.dataset.calcNotebookSchema = 'true';
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify(schema);
  }, [application, breadcrumbs, description, faqs, path, title, website]);

  return null;
}

function SeoArticle({ contentKey }: { contentKey: CalculatorId }) {
  const content = calculatorSeoContent[contentKey];
  const calculatorName = calculatorMeta.find((meta) => meta.id === contentKey)?.name ?? contentKey;
  return (
    <article className="seo-content calculator-seo" aria-labelledby={`${contentKey}-guide-title`}>
      <div className="seo-content-intro">
        <span className="home-kicker"><span className="kicker-line" /><span>THE NOTEBOOK GUIDE</span></span>
        <h2 id={`${contentKey}-guide-title`}>About {calculatorName}</h2>
        <p>{content.intro}</p>
      </div>
      <div className="seo-sections">
        {content.sections.map((section) => (
          <SeoSectionBlock key={section.heading} section={section} />
        ))}
      </div>
      <section className="faq-section" aria-labelledby={`${contentKey}-faq-title`}>
        <div className="section-caption">
          <h2 id={`${contentKey}-faq-title`}>Frequently asked questions</h2>
          <span className="section-rule" />
        </div>
        <div className="faq-grid">
          {content.faqs.map((faq) => (
            <details className="faq-item" key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </article>
  );
}

function SeoSectionBlock({ section }: { section: SeoSection }) {
  return (
    <section className="seo-section">
      <h3>{section.heading}</h3>
      {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {section.bullets && (
        <ul>
          {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
        </ul>
      )}
    </section>
  );
}

function CalculatorCard({
  calculator,
  index,
}: {
  calculator: CalculatorMeta;
  index: number;
}) {
  const Icon = calculator.icon;
  return (
    <Link
      href={calculatorPath(calculator.id)}
      className={`calculator-card calculator-card-${calculator.tint} animate-rise`}
      style={{ animationDelay: `${index * 65}ms` }}
      data-testid={`button-open-${calculator.id}`}
      aria-label={`Open ${calculator.name}`}
    >
      <span className="card-number">{calculator.number}</span>
      <span className="card-icon"><Icon size={24} strokeWidth={1.7} /></span>
      <span className="card-copy">
        <span className="card-eyebrow">{calculator.eyebrow}</span>
        <span className="card-title">{calculator.name}</span>
        <span className="card-description">{calculator.description}</span>
      </span>
      <span className="card-arrow" aria-hidden="true"><ArrowRight size={19} /></span>
    </Link>
  );
}

function CalculatorLayout({
  calculator,
  onBack,
  children,
}: {
  calculator: CalculatorMeta;
  onBack: () => void;
  children: ReactNode;
}) {
  const Icon = calculator.icon;
  return (
    <main className="notebook-page min-h-[100dvh]">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-8">
        <TopBar activeId={calculator.id} />
        <div className="calculator-view animate-rise">
          <button type="button" className="back-button" onClick={() => { if (window.history.length > 1) { window.history.back(); } else { onBack(); } }} data-testid="button-back-to-calculators">
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
          <div className="calculator-heading">
            <div className={`heading-icon heading-icon-${calculator.tint}`}><Icon size={28} strokeWidth={1.6} /></div>
            <div>
              <div className="home-kicker"><span className="kicker-line" /><span>{calculator.eyebrow}</span></div>
              <h1 className="calculator-title">{calculator.name}</h1>
              <p className="calculator-subtitle">{calculator.description}</p>
            </div>
          </div>
          {children}
          <SeoArticle contentKey={calculator.id} />
          <section className="related-calculators" aria-labelledby="related-calculators-title">
            <div className="section-caption">
              <h2 id="related-calculators-title">Related calculators</h2>
              <span className="section-rule" />
            </div>
            <div className="related-calculator-grid">
              {relatedCalculators[calculator.id].map((relatedId) => {
                const related = calculatorMeta.find((meta) => meta.id === relatedId);
                if (!related) return null;
                const RelatedIcon = related.icon;
                return (
                  <Link
                    key={related.id}
                    href={calculatorPath(related.id)}
                    className={`related-calculator-card related-calculator-card-${related.tint}`}
                  >
                    <span className="card-icon"><RelatedIcon size={24} strokeWidth={1.7} /></span>
                    <span className="card-copy">
                      <span className="card-eyebrow">{related.eyebrow}</span>
                      <span className="card-title">{related.name}</span>
                      <span className="card-description">{related.description}</span>
                    </span>
                    <span className="card-arrow" aria-hidden="true"><ArrowRight size={16} /></span>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
        <SiteFooter />
      </div>
    </main>
  );
}

function TextField({
  id,
  label,
  value,
  onChange,
  type = 'number',
  placeholder,
  suffix,
  hint,
  error,
  min,
  max,
  step,
  testId,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'number' | 'date';
  placeholder?: string;
  suffix?: string;
  hint?: string;
  error?: string;
  min?: string;
  max?: string;
  step?: string;
  testId: string;
}) {
  return (
    <div className="field-wrap">
      <label htmlFor={id} className="field-label">{label}</label>
      <div className={`input-shell ${error ? 'input-error' : ''}`}>
        <input
          id={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          data-testid={testId}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        />
        {suffix && <span className="input-suffix">{suffix}</span>}
      </div>
      {error ? <p id={`${id}-error`} className="field-error">{error}</p> : hint ? <p id={`${id}-hint`} className="field-hint">{hint}</p> : null}
    </div>
  );
}

function CalculateButton({ children, onClick, testId }: { children: ReactNode; onClick?: () => void; testId: string }) {
  return (
    <button type={onClick ? 'button' : 'submit'} className="calculate-button" onClick={onClick} data-testid={testId}>
      <span>{children}</span>
      <ArrowRight size={18} />
    </button>
  );
}

function EmptyResult({ icon: Icon, title, detail }: { icon: LucideIcon; title: string; detail: string }) {
  return (
    <div className="empty-result" data-testid="empty-calculation-state">
      <div className="empty-result-icon"><Icon size={23} strokeWidth={1.6} /></div>
      <div>
        <p className="empty-result-title">{title}</p>
        <p className="empty-result-detail">{detail}</p>
      </div>
    </div>
  );
}

function ResultPanel({ children, title = 'Your result' }: { children: ReactNode; title?: string }) {
  return (
    <section className="result-panel" aria-live="polite" data-testid="calculation-result">
      <div className="result-heading">
        <span className="result-label"><Check size={14} /> {title}</span>
        <span className="result-underline" />
      </div>
      {children}
    </section>
  );
}

function ResultStat({ label, value, featured = false, testId }: { label: string; value: string; featured?: boolean; testId: string }) {
  return (
    <div className={`result-stat ${featured ? 'result-stat-featured' : ''}`}>
      <p>{label}</p>
      <strong data-testid={testId}>{value}</strong>
    </div>
  );
}

function EmiCalculator({ onBack }: { onBack: () => void }) {
  const [loan, setLoan] = useState('');
  const [rate, setRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [attempted, setAttempted] = useState(false);
  const [calculated, setCalculated] = useState(false);
  const loanNumber = Number(loan);
  const rateNumber = Number(rate);
  const tenureNumber = Number(tenure);
  const errors = {
    loan: attempted && (!loan || loanNumber <= 0) ? 'Enter a loan amount greater than zero.' : '',
    rate: attempted && (!rate || rateNumber < 0) ? 'Use zero or a positive annual rate.' : '',
    tenure: attempted && (!tenure || tenureNumber <= 0) ? 'Tenure needs to be at least one month.' : '',
  };
  const result = useMemo(() => {
    if (loanNumber <= 0 || rateNumber < 0 || tenureNumber <= 0) return null;
    const monthlyRate = rateNumber / 1200;
    const emi = monthlyRate === 0
      ? loanNumber / tenureNumber
      : loanNumber * monthlyRate * ((1 + monthlyRate) ** tenureNumber) / (((1 + monthlyRate) ** tenureNumber) - 1);
    return { emi, interest: emi * tenureNumber - loanNumber, total: emi * tenureNumber };
  }, [loanNumber, rateNumber, tenureNumber]);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    setAttempted(true);
    if (!errors.loan && !errors.rate && !errors.tenure) setCalculated(true);
  };
  return (
    <CalculatorLayout calculator={calculatorMeta.find((meta) => meta.id === 'emi')!} onBack={onBack}>
      <div className="calculator-columns">
        <form className="input-card" onSubmit={submit}>
          <div className="form-card-heading"><span>Fill in the details</span><span className="pencil-line" /></div>
          <TextField id="emi-loan" label="Loan amount" value={loan} onChange={setLoan} placeholder="e.g. 850000" suffix="INR" hint="The amount you plan to borrow." error={errors.loan} min="0" step="1000" testId="input-emi-loan" />
          <TextField id="emi-rate" label="Annual interest rate" value={rate} onChange={setRate} placeholder="e.g. 8.5" suffix="%" hint="Your lender’s yearly interest rate." error={errors.rate} min="0" step="0.01" testId="input-emi-rate" />
          <TextField id="emi-tenure" label="Loan tenure" value={tenure} onChange={setTenure} placeholder="e.g. 60" suffix="months" hint="How long you’ll take to repay." error={errors.tenure} min="1" step="1" testId="input-emi-tenure" />
          <CalculateButton testId="button-calculate-emi">Calculate monthly EMI</CalculateButton>
        </form>
        <div className="result-column">
          {calculated && result ? (
            <ResultPanel>
              <div className="hero-result">
                <span>Monthly EMI</span>
                <strong data-testid="result-emi-monthly">{money(result.emi)}</strong>
                <small>for {decimal(tenureNumber, 0)} months</small>
              </div>
              <div className="result-stat-grid">
                <ResultStat label="Total interest" value={money(result.interest)} testId="result-emi-interest" />
                <ResultStat label="Total payment" value={money(result.total)} testId="result-emi-total" />
              </div>
              <p className="result-footnote">A helpful estimate. Your lender may calculate small differences in the final instalment.</p>
            </ResultPanel>
          ) : (
            <EmptyResult icon={CircleDollarSign} title="Your payment plan will appear here." detail="Add the three loan details to see the monthly number and the full cost." />
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}

function AgeCalculator({ onBack }: { onBack: () => void }) {
  const [dob, setDob] = useState('');
  const [attempted, setAttempted] = useState(false);
  const [calculated, setCalculated] = useState(false);
  const dobDate = dob ? parseDate(dob) : null;
  const today = new Date();
  const error = attempted && (!dob || !dobDate || Number.isNaN(dobDate.getTime()) || dobDate > new Date(today.getFullYear(), today.getMonth(), today.getDate()))
    ? 'Choose a date in the past.'
    : '';
  const result = useMemo(() => {
    if (!dobDate || error) return null;
    const now = new Date();
    let years = now.getFullYear() - dobDate.getFullYear();
    let months = now.getMonth() - dobDate.getMonth();
    let days = now.getDate() - dobDate.getDate();
    if (days < 0) {
      months -= 1;
      const daysInPreviousMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
      days += daysInPreviousMonth;
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }
    const utcNow = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    const utcDob = Date.UTC(dobDate.getFullYear(), dobDate.getMonth(), dobDate.getDate());
    return { years, months, days, totalDays: Math.floor((utcNow - utcDob) / 86400000) };
  }, [dobDate, error]);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    setAttempted(true);
    if (!error) setCalculated(true);
  };
  return (
    <CalculatorLayout calculator={calculatorMeta.find((meta) => meta.id === 'age')!} onBack={onBack}>
      <div className="calculator-columns">
        <form className="input-card" onSubmit={submit}>
          <div className="form-card-heading"><span>Find your exact age</span><span className="pencil-line" /></div>
          <TextField id="age-dob" label="Date of birth" value={dob} onChange={(value) => { setDob(value); setCalculated(false); }} type="date" hint="We’ll compare it with today." error={error} max={todayString()} testId="input-age-dob" />
          <CalculateButton testId="button-calculate-age">Calculate my age</CalculateButton>
          <button type="button" className="secondary-action" onClick={() => { setDob(''); setAttempted(false); setCalculated(false); }} data-testid="button-reset-age">
            <RotateCcw size={15} /> Clear date
          </button>
        </form>
        <div className="result-column">
          {calculated && result ? (
            <ResultPanel>
              <div className="age-result">
                <span>You are</span>
                <div className="age-numbers">
                  <div><strong data-testid="result-age-years">{result.years}</strong><small>years</small></div>
                  <div><strong data-testid="result-age-months">{result.months}</strong><small>months</small></div>
                  <div><strong data-testid="result-age-days">{result.days}</strong><small>days</small></div>
                </div>
              </div>
              <div className="single-stat">
                <span>Total days lived</span>
                <strong data-testid="result-age-total-days">{decimal(result.totalDays, 0)}</strong>
              </div>
            </ResultPanel>
          ) : (
            <EmptyResult icon={CalendarDays} title="Your little timeline is waiting." detail="Choose your date of birth to see the exact count, right down to the day." />
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}

function PercentageCalculator({ onBack }: { onBack: () => void }) {
  const [mode, setMode] = useState<'of' | 'what'>('of');
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const [attempted, setAttempted] = useState(false);
  const [calculated, setCalculated] = useState(false);
  const xNumber = Number(x);
  const yNumber = Number(y);
  const errors = {
    x: attempted && (!x || xNumber < 0) ? 'Enter zero or a positive number.' : '',
    y: attempted && (!y || yNumber <= 0) ? 'The second number must be greater than zero.' : '',
  };
  const result = mode === 'of' ? (xNumber / 100) * yNumber : (xNumber / yNumber) * 100;
  const submit = (event: FormEvent) => {
    event.preventDefault();
    setAttempted(true);
    if (!errors.x && !errors.y) setCalculated(true);
  };
  return (
    <CalculatorLayout calculator={calculatorMeta.find((meta) => meta.id === 'percentage')!} onBack={onBack}>
      <div className="calculator-columns">
        <form className="input-card" onSubmit={submit}>
          <div className="form-card-heading"><span>Pick a question</span><span className="pencil-line" /></div>
          <div className="segmented-control" role="group" aria-label="Percentage mode">
            <button type="button" className={mode === 'of' ? 'segment-active' : ''} onClick={() => { setMode('of'); setCalculated(false); }} data-testid="button-percentage-mode-of">X% of Y</button>
            <button type="button" className={mode === 'what' ? 'segment-active' : ''} onClick={() => { setMode('what'); setCalculated(false); }} data-testid="button-percentage-mode-what">X is what % of Y?</button>
          </div>
          <TextField id="percentage-x" label={mode === 'of' ? 'Percentage (X)' : 'First number (X)'} value={x} onChange={(value) => { setX(value); setCalculated(false); }} placeholder={mode === 'of' ? 'e.g. 15' : 'e.g. 30'} suffix={mode === 'of' ? '%' : ''} error={errors.x} min="0" step="0.01" testId="input-percentage-x" />
          <TextField id="percentage-y" label="Second number (Y)" value={y} onChange={(value) => { setY(value); setCalculated(false); }} placeholder={mode === 'of' ? 'e.g. 240' : 'e.g. 120'} error={errors.y} min="0" step="0.01" testId="input-percentage-y" />
          <CalculateButton testId="button-calculate-percentage">Show the answer</CalculateButton>
        </form>
        <div className="result-column">
          {calculated && !errors.x && !errors.y ? (
            <ResultPanel>
              <div className="hero-result percentage-result">
                <span>{mode === 'of' ? `${decimal(xNumber)}% of ${decimal(yNumber)}` : `${decimal(xNumber)} is what % of ${decimal(yNumber)}?`}</span>
                <strong data-testid="result-percentage">{decimal(result)}{mode === 'what' ? '%' : ''}</strong>
                <small>{mode === 'of' ? 'is the part you were looking for' : 'is the percentage'}</small>
              </div>
            </ResultPanel>
          ) : (
            <EmptyResult icon={Hash} title="The answer will land here." detail="Choose a percentage question and add the two numbers to make it real." />
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}

function BmiCalculator({ onBack }: { onBack: () => void }) {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [attempted, setAttempted] = useState(false);
  const [calculated, setCalculated] = useState(false);
  const heightNumber = Number(height);
  const weightNumber = Number(weight);
  const errors = {
    height: attempted && (!height || heightNumber <= 0) ? 'Height must be greater than zero.' : '',
    weight: attempted && (!weight || weightNumber <= 0) ? 'Weight must be greater than zero.' : '',
  };
  const result = heightNumber > 0 && weightNumber > 0 ? weightNumber / ((heightNumber / 100) ** 2) : 0;
  const category = result < 18.5 ? 'Underweight' : result < 25 ? 'Normal' : result < 30 ? 'Overweight' : 'Obese';
  const submit = (event: FormEvent) => {
    event.preventDefault();
    setAttempted(true);
    if (!errors.height && !errors.weight) setCalculated(true);
  };
  return (
    <CalculatorLayout calculator={calculatorMeta.find((meta) => meta.id === 'bmi')!} onBack={onBack}>
      <div className="calculator-columns">
        <form className="input-card" onSubmit={submit}>
          <div className="form-card-heading"><span>Take a quick snapshot</span><span className="pencil-line" /></div>
          <TextField id="bmi-height" label="Height" value={height} onChange={(value) => { setHeight(value); setCalculated(false); }} placeholder="e.g. 172" suffix="cm" hint="Stand tall, measured without shoes." error={errors.height} min="0" step="0.1" testId="input-bmi-height" />
          <TextField id="bmi-weight" label="Weight" value={weight} onChange={(value) => { setWeight(value); setCalculated(false); }} placeholder="e.g. 68" suffix="kg" hint="Your current weight." error={errors.weight} min="0" step="0.1" testId="input-bmi-weight" />
          <CalculateButton testId="button-calculate-bmi">Calculate my BMI</CalculateButton>
          <p className="quiet-disclaimer">BMI is a general screening measure, not a diagnosis.</p>
        </form>
        <div className="result-column">
          {calculated && !errors.height && !errors.weight ? (
            <ResultPanel>
              <div className="hero-result bmi-result">
                <span>Body mass index</span>
                <strong data-testid="result-bmi">{decimal(result, 1)}</strong>
                <span className={`category-pill category-${category.toLowerCase()}`} data-testid="result-bmi-category">{category}</span>
              </div>
              <div className="bmi-scale" aria-label={`BMI category: ${category}`}>
                <div className="scale-track"><span className={`scale-marker marker-${category.toLowerCase()}`} /></div>
                <div className="scale-labels"><span>Underweight</span><span>Normal</span><span>Overweight</span><span>Obese</span></div>
              </div>
            </ResultPanel>
          ) : (
            <EmptyResult icon={Scale} title="A balanced answer is waiting." detail="Add your height and weight for a quick BMI snapshot and category." />
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}

function GstCalculator({ onBack }: { onBack: () => void }) {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('18');
  const [mode, setMode] = useState<'add' | 'remove'>('add');
  const [attempted, setAttempted] = useState(false);
  const [calculated, setCalculated] = useState(false);
  const amountNumber = Number(amount);
  const error = attempted && (!amount || amountNumber <= 0) ? 'Enter an amount greater than zero.' : '';
  const result = mode === 'add'
    ? { gst: amountNumber * Number(rate) / 100, original: amountNumber, final: amountNumber * (1 + Number(rate) / 100) }
    : { gst: amountNumber - amountNumber / (1 + Number(rate) / 100), original: amountNumber / (1 + Number(rate) / 100), final: amountNumber };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    setAttempted(true);
    if (!error) setCalculated(true);
  };
  return (
    <CalculatorLayout calculator={calculatorMeta.find((meta) => meta.id === 'gst')!} onBack={onBack}>
      <div className="calculator-columns">
        <form className="input-card" onSubmit={submit}>
          <div className="form-card-heading"><span>Set up your tax calculation</span><span className="pencil-line" /></div>
          <div className="segmented-control" role="group" aria-label="GST direction">
            <button type="button" className={mode === 'add' ? 'segment-active' : ''} onClick={() => { setMode('add'); setCalculated(false); }} data-testid="button-gst-mode-add">Add GST</button>
            <button type="button" className={mode === 'remove' ? 'segment-active' : ''} onClick={() => { setMode('remove'); setCalculated(false); }} data-testid="button-gst-mode-remove">Remove GST</button>
          </div>
          <TextField id="gst-amount" label={mode === 'add' ? 'Base amount' : 'Amount including GST'} value={amount} onChange={(value) => { setAmount(value); setCalculated(false); }} placeholder="e.g. 2500" suffix="INR" hint={mode === 'add' ? 'The price before tax.' : 'The total price you already have.'} error={error} min="0" step="0.01" testId="input-gst-amount" />
          <div className="field-wrap">
            <span className="field-label">GST rate</span>
            <div className="rate-options" role="radiogroup" aria-label="GST rate">
              {[5, 12, 18, 28].map((value) => (
                <button type="button" key={value} className={rate === String(value) ? 'rate-active' : ''} onClick={() => { setRate(String(value)); setCalculated(false); }} role="radio" aria-checked={rate === String(value)} data-testid={`button-gst-rate-${value}`}>{value}%</button>
              ))}
            </div>
          </div>
          <CalculateButton testId="button-calculate-gst">{mode === 'add' ? 'Add GST to amount' : 'Remove GST from amount'}</CalculateButton>
        </form>
        <div className="result-column">
          {calculated && !error ? (
            <ResultPanel>
              <div className="hero-result">
                <span>GST at {rate}%</span>
                <strong data-testid="result-gst-amount">{money(result.gst)}</strong>
                <small>{mode === 'add' ? 'added to your base amount' : 'included in the amount you entered'}</small>
              </div>
              <div className="result-stat-grid">
                <ResultStat label={mode === 'add' ? 'Base amount' : 'Original amount'} value={money(result.original)} testId="result-gst-original" />
                <ResultStat label={mode === 'add' ? 'Final amount' : 'Amount after GST'} value={money(result.final)} featured testId="result-gst-final" />
              </div>
            </ResultPanel>
          ) : (
            <EmptyResult icon={WalletCards} title="Your tax split will show here." detail="Enter an amount, choose a rate, and decide whether GST comes on or comes off." />
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}

type CgpaSubject = {
  id: number;
  name: string;
  gradePoint: string;
  credits: string;
};

const newCgpaSubject = (id: number): CgpaSubject => ({
  id,
  name: '',
  gradePoint: '',
  credits: '',
});

function CgpaCalculator({ onBack }: { onBack: () => void }) {
  const [subjects, setSubjects] = useState<CgpaSubject[]>(() =>
    Array.from({ length: 5 }, (_, index) => newCgpaSubject(index + 1)),
  );
  const [attempted, setAttempted] = useState(false);
  const [calculated, setCalculated] = useState(false);

  const updateSubject = (id: number, field: 'name' | 'gradePoint' | 'credits', value: string) => {
    setSubjects((current) =>
      current.map((subject) => subject.id === id ? { ...subject, [field]: value } : subject),
    );
    setCalculated(false);
  };

  const addSubject = () => {
    setSubjects((current) => {
      const nextId = Math.max(...current.map((subject) => subject.id), 0) + 1;
      return [...current, newCgpaSubject(nextId)];
    });
    setCalculated(false);
  };

  const removeSubject = (id: number) => {
    setSubjects((current) => current.length > 1 ? current.filter((subject) => subject.id !== id) : current);
    setCalculated(false);
  };

  const rowErrors = subjects.map((subject) => {
    const gradePoint = subject.gradePoint.trim();
    const credits = subject.credits.trim();
    if (!gradePoint && !credits) return '';
    if (!gradePoint || !credits) return 'Add both grade point and credits.';
    const gradeNumber = Number(gradePoint);
    const creditNumber = Number(credits);
    if (!Number.isFinite(gradeNumber) || gradeNumber < 0 || gradeNumber > 10) return 'Grade point must be between 0 and 10.';
    if (!Number.isFinite(creditNumber) || creditNumber <= 0) return 'Credits must be greater than zero.';
    return '';
  });
  const filledSubjects = subjects.filter((subject) => subject.gradePoint.trim() || subject.credits.trim());
  const isValid = filledSubjects.length > 0 && rowErrors.every((error) => !error);
  const formError = attempted
    ? filledSubjects.length === 0
      ? 'Enter at least one subject with its grade point and credits.'
      : rowErrors.some(Boolean)
        ? 'Check the highlighted subject rows before calculating.'
        : ''
    : '';

  const result = useMemo(() => {
    const entries = subjects
      .map((subject) => ({
        gradePoint: Number(subject.gradePoint),
        credits: Number(subject.credits),
      }))
      .filter((entry) =>
        Number.isFinite(entry.gradePoint) &&
        entry.gradePoint >= 0 &&
        entry.gradePoint <= 10 &&
        Number.isFinite(entry.credits) &&
        entry.credits > 0,
      );
    if (!entries.length) return null;
    const totalCredits = entries.reduce((sum, entry) => sum + entry.credits, 0);
    const weightedPoints = entries.reduce((sum, entry) => sum + entry.gradePoint * entry.credits, 0);
    return {
      cgpa: weightedPoints / totalCredits,
      totalCredits,
      subjects: entries.length,
    };
  }, [subjects]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setAttempted(true);
    if (isValid) setCalculated(true);
  };

  return (
    <CalculatorLayout calculator={calculatorMeta.find((meta) => meta.id === 'cgpa')!} onBack={onBack}>
      <div className="calculator-columns">
        <form className="input-card" onSubmit={submit}>
          <div className="form-card-heading"><span>Add your subjects</span><span className="pencil-line" /></div>
          <p className="cgpa-help">Enter each subject’s grade point out of 10 and its credit value. Subject names are optional.</p>
          <div className="cgpa-row-labels" aria-hidden="true">
            <span>Subject</span>
            <span>Grade point</span>
            <span>Credits</span>
          </div>
          <div className="cgpa-rows">
            {subjects.map((subject, index) => (
              <div className={`cgpa-row${attempted && rowErrors[index] ? ' cgpa-row-invalid' : ''}`} key={subject.id}>
                <input
                  id={`cgpa-subject-${subject.id}`}
                  className="cgpa-input cgpa-subject-input"
                  type="text"
                  value={subject.name}
                  onChange={(event) => updateSubject(subject.id, 'name', event.target.value)}
                  placeholder={`Subject ${index + 1}`}
                  aria-label={`Subject ${index + 1} name`}
                  data-testid={`input-cgpa-subject-${index + 1}`}
                />
                <input
                  id={`cgpa-grade-${subject.id}`}
                  className="cgpa-input"
                  type="number"
                  value={subject.gradePoint}
                  onChange={(event) => updateSubject(subject.id, 'gradePoint', event.target.value)}
                  placeholder="e.g. 8.5"
                  min="0"
                  max="10"
                  step="0.01"
                  aria-label={`Subject ${index + 1} grade point`}
                  data-testid={`input-cgpa-grade-${index + 1}`}
                />
                <input
                  id={`cgpa-credits-${subject.id}`}
                  className="cgpa-input"
                  type="number"
                  value={subject.credits}
                  onChange={(event) => updateSubject(subject.id, 'credits', event.target.value)}
                  placeholder="e.g. 4"
                  min="0.01"
                  step="0.5"
                  aria-label={`Subject ${index + 1} credits`}
                  data-testid={`input-cgpa-credits-${index + 1}`}
                />
                {subjects.length > 1 && (
                  <button
                    type="button"
                    className="cgpa-remove"
                    onClick={() => removeSubject(subject.id)}
                    aria-label={`Remove subject ${index + 1}`}
                  >
                    ×
                  </button>
                )}
                {attempted && rowErrors[index] && <p className="cgpa-row-error">{rowErrors[index]}</p>}
              </div>
            ))}
          </div>
          <button type="button" className="cgpa-add-button" onClick={addSubject}>
            + Add another subject
          </button>
          {formError && <p className="field-error cgpa-form-error">{formError}</p>}
          <CalculateButton testId="button-calculate-cgpa">Calculate my CGPA</CalculateButton>
        </form>
        <div className="result-column">
          {calculated && result ? (
            <ResultPanel title="Your CGPA">
              <div className="hero-result cgpa-result">
                <span>Credit-weighted academic average</span>
                <strong data-testid="result-cgpa">{decimal(result.cgpa)}</strong>
                <small>on a 10-point scale</small>
              </div>
              <div className="result-stat-grid">
                <ResultStat label="Subjects counted" value={decimal(result.subjects, 0)} testId="result-cgpa-subjects" />
                <ResultStat label="Total credits" value={decimal(result.totalCredits)} featured testId="result-cgpa-credits" />
              </div>
              <p className="result-footnote">This uses Σ(grade point × credits) ÷ Σcredits. Check your institution’s grading rules for official transcripts or conversions.</p>
            </ResultPanel>
          ) : (
            <EmptyResult icon={GraduationCap} title="Your academic average will appear here." detail="Add at least one grade point and credit value to calculate a weighted CGPA." />
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}

function StampDutyCalculator({ onBack }: { onBack: () => void }) {
  const [propertyValue, setPropertyValue] = useState('');
  const [cityId, setCityId] = useState(haryanaCities[0].id);
  const [areaType, setAreaType] = useState<AreaType>('urban');
  const [buyer, setBuyer] = useState<BuyerType>('joint-male-female');
  const [area, setArea] = useState('');
  const [attempted, setAttempted] = useState(false);
  const [calculated, setCalculated] = useState(false);

  const valueNumber = Number(propertyValue);
  const areaNumber = Number(area);
  const city = haryanaCities.find((item) => item.id === cityId) ?? haryanaCities[0];

  const errors = {
    value: attempted && (!propertyValue || valueNumber <= 0) ? 'Enter a property value greater than zero.' : '',
    area: attempted && area && (!Number.isFinite(areaNumber) || areaNumber <= 0)
      ? 'Plot area needs to be a positive number of square yards.'
      : '',
  };

  const result = useMemo(() => {
    if (valueNumber <= 0) return null;
    if (area && (!Number.isFinite(areaNumber) || areaNumber <= 0)) return null;
    const circleValue = areaNumber > 0 ? areaNumber * city.typicalRatePerSqYard : 0;
    const taxableBase = Math.max(valueNumber, circleValue);
    const rate = haryanaStampDuty[areaType][buyer];
    const duty = taxableBase * rate;
    const registration = haryanaRegistrationFee(taxableBase);
    return { taxableBase, rate, duty, registration, total: duty + registration, circleValue };
  }, [valueNumber, areaNumber, city.typicalRatePerSqYard, areaType, buyer]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setAttempted(true);
    if (!errors.value && !errors.area) setCalculated(true);
  };

  const buyerLabels: Record<BuyerType, string> = {
    male: 'Male',
    female: 'Female',
    'joint-male-female': 'Joint (Male + Female)',
    'joint-two-males': 'Joint (Two Males)',
    'joint-two-females': 'Joint (Two Females)',
  };

  return (
    <CalculatorLayout calculator={calculatorMeta.find((meta) => meta.id === 'stamp-duty')!} onBack={onBack}>
      <div className="calculator-columns">
        <form className="input-card" onSubmit={submit}>
          <div className="form-card-heading"><span>Set up your property details</span><span className="pencil-line" /></div>
          <div className="field-wrap">
            <span className="field-label">Area type</span>
            <div className="segmented-control" role="group" aria-label="Area type">
              <button type="button" className={areaType === 'urban' ? 'segment-active' : ''} onClick={() => { setAreaType('urban'); setCalculated(false); }} data-testid="button-stamp-area-urban">Urban (Within MC)</button>
              <button type="button" className={areaType === 'rural' ? 'segment-active' : ''} onClick={() => { setAreaType('rural'); setCalculated(false); }} data-testid="button-stamp-area-rural">Rural (Outside MC)</button>
            </div>
            <p className="field-hint">Stamp duty rates differ inside municipal limits and outside them.</p>
          </div>
          <div className="field-wrap">
            <label htmlFor="stamp-buyer" className="field-label">Khaaridaar / Buyer</label>
            <div className="input-shell">
              <select id="stamp-buyer" value={buyer} onChange={(event) => { setBuyer(event.target.value as BuyerType); setCalculated(false); }} data-testid="select-stamp-buyer">
                {(Object.keys(buyerLabels) as BuyerType[]).map((type) => (
                  <option key={type} value={type}>{buyerLabels[type]} — {decimal(haryanaStampDuty[areaType][type] * 100)}%</option>
                ))}
              </select>
            </div>
            <p className="field-hint">Haryana applies different stamp duty rates by buyer category.</p>
          </div>
          <TextField id="stamp-value" label="Property value" value={propertyValue} onChange={(value) => { setPropertyValue(value); setCalculated(false); }} placeholder="e.g. 3000000" suffix="INR" hint="The agreement value or amount mentioned in the sale deed." error={errors.value} min="0" step="10000" testId="input-stamp-value" />
          <div className="field-wrap">
            <label htmlFor="stamp-city" className="field-label">Location (Haryana)</label>
            <div className="input-shell">
              <select id="stamp-city" value={cityId} onChange={(event) => { setCityId(event.target.value); setCalculated(false); }} data-testid="select-stamp-city">
                {haryanaCities.map((item) => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
              <span className="input-suffix">Haryana</span>
            </div>
            <p className="field-hint">Reference circle rate: {decimal(city.typicalRatePerSqYard, 0)} – {decimal(city.highRatePerSqYard, 0)} per sq yd.</p>
          </div>
          <TextField id="stamp-area" label="Plot area (optional)" value={area} onChange={(value) => { setArea(value); setCalculated(false); }} placeholder="e.g. 150" suffix="sq yd" hint="Enter the plot size to compare with the circle rate. Leave blank to use the agreement value." error={errors.area} min="0" step="1" testId="input-stamp-area" />
          <CalculateButton testId="button-calculate-stamp-duty">Calculate stamp duty</CalculateButton>
        </form>
        <div className="result-column">
          {calculated && result ? (
            <ResultPanel title="Estimated Haryana charges">
              <div className="hero-result">
                <span>Stamp duty</span>
                <strong data-testid="result-stamp-duty">{money(result.duty)}</strong>
                <small>at {decimal(result.rate * 100)}% on {money(result.taxableBase)}</small>
              </div>
              <div className="result-stat-grid">
                <ResultStat label="Registration fee" value={money(result.registration)} testId="result-stamp-registration" />
                <ResultStat label="Total cost" value={money(result.total)} featured testId="result-stamp-total" />
              </div>
              <p className="result-footnote">
                {result.circleValue > valueNumber
                  ? `The circle rate for an area of ${areaNumber} sq yd in ${city.name} is higher than the entered value, so duty is calculated on that circle-rate base. `
                  : ''}
                Registration uses a slab-based fee. An estimate based on the city reference circle rate; verify the exact locality rate and current slabs with the sub-registrar before registering.
              </p>
            </ResultPanel>
          ) : (
            <EmptyResult icon={Stamp} title="Your property costs will appear here." detail="Add the property value, choose a Haryana city, area type, and buyer category to see stamp duty and registration." />
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}

function CalculatorPage({ calculatorId }: { calculatorId: CalculatorId }) {
  const [, setLocation] = useLocation();
  const content = calculatorSeoContent[calculatorId];
  const calculatorName = calculatorMeta.find((meta) => meta.id === calculatorId)?.name ?? content.title;
  const onBack = () => setLocation('/');
  const calculatorProps = { onBack };

  return (
    <>
      <PageSeo
        title={content.title}
        description={content.metaDescription}
        path={calculatorPath(calculatorId)}
        faqs={content.faqs}
        application={{
          name: calculatorName,
          description: content.metaDescription,
          applicationCategory: 'UtilitiesApplication',
        }}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: calculatorName, path: calculatorPath(calculatorId) },
        ]}
      />
      {calculatorId === 'emi' && <EmiCalculator {...calculatorProps} />}
      {calculatorId === 'age' && <AgeCalculator {...calculatorProps} />}
      {calculatorId === 'percentage' && <PercentageCalculator {...calculatorProps} />}
      {calculatorId === 'bmi' && <BmiCalculator {...calculatorProps} />}
      {calculatorId === 'gst' && <GstCalculator {...calculatorProps} />}
      {calculatorId === 'cgpa' && <CgpaCalculator {...calculatorProps} />}
      {calculatorId === 'stamp-duty' && <StampDutyCalculator {...calculatorProps} />}
    </>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/emi-calculator">
          <CalculatorPage calculatorId="emi" />
        </Route>
        <Route path="/age-calculator">
          <CalculatorPage calculatorId="age" />
        </Route>
        <Route path="/percentage-calculator">
          <CalculatorPage calculatorId="percentage" />
        </Route>
        <Route path="/bmi-calculator">
          <CalculatorPage calculatorId="bmi" />
        </Route>
        <Route path="/gst-calculator">
          <CalculatorPage calculatorId="gst" />
        </Route>
        <Route path="/cgpa-calculator">
          <CalculatorPage calculatorId="cgpa" />
        </Route>
        <Route path="/stamp-duty-calculator">
          <CalculatorPage calculatorId="stamp-duty" />
        </Route>
        <Route path="/blog" component={BlogList} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/terms" component={Terms} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/disclaimer" component={Disclaimer} />
        <Route path="/faq" component={FAQ} />
        <Route path="/areas" component={AreasIndex} />
        <Route path="/areas/:slug">
          <AreaPage />
        </Route>
        <Route path="/best-for/:slug">
          <BestForPage />
        </Route>
        <Route path="/categories/:slug">
          <CategoryPage />
        </Route>
        <Route path="/manage-portal-x7k9">
          <AdminAuthProvider>
            <AdminLogin />
          </AdminAuthProvider>
        </Route>
        <Route path="/manage-portal-x7k9/recovery">
          <AdminAuthProvider>
            <AdminRecovery />
          </AdminAuthProvider>
        </Route>
        <Route path="/manage-portal-x7k9/*">
          <AdminAuthProvider>
            <AdminApp />
          </AdminAuthProvider>
        </Route>
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function ScrollToTop() {
  const [location] = useLocation();
  const skipNext = useRef(false);
  useEffect(() => {
    const markBack = () => { skipNext.current = true; };
    window.addEventListener('popstate', markBack);
    return () => window.removeEventListener('popstate', markBack);
  }, []);
  useEffect(() => {
    if (skipNext.current) {
      skipNext.current = false;
      return;
    }
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;