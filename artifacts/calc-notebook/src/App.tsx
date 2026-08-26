import { useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  ArrowLeft,
  ArrowRight,
  BadgePercent,
  CalendarDays,
  Calculator,
  Check,
  CircleDollarSign,
  Gauge,
  Hash,
  HeartPulse,
  Landmark,
  NotebookPen,
  Percent,
  RotateCcw,
  Scale,
  Sparkles,
  WalletCards,
  type LucideIcon,
} from 'lucide-react';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

type CalculatorId = 'emi' | 'age' | 'percentage' | 'bmi' | 'gst';

type CalculatorMeta = {
  id: CalculatorId;
  name: string;
  description: string;
  eyebrow: string;
  icon: LucideIcon;
  tint: string;
  number: string;
};

const calculatorMeta: CalculatorMeta[] = [
  {
    id: 'emi',
    name: 'EMI Calculator',
    description: 'See the true cost of a loan before you sign.',
    eyebrow: 'Borrowing',
    icon: Landmark,
    tint: 'coral',
    number: '01',
  },
  {
    id: 'age',
    name: 'Age Calculator',
    description: 'Count your exact years, months, days — all of it.',
    eyebrow: 'Milestones',
    icon: CalendarDays,
    tint: 'gold',
    number: '02',
  },
  {
    id: 'percentage',
    name: 'Percentage Calculator',
    description: 'Turn the quick mental math into a clear answer.',
    eyebrow: 'Everyday math',
    icon: Percent,
    tint: 'blue',
    number: '03',
  },
  {
    id: 'bmi',
    name: 'BMI Calculator',
    description: 'A simple snapshot from height and weight.',
    eyebrow: 'Wellbeing',
    icon: HeartPulse,
    tint: 'sage',
    number: '04',
  },
  {
    id: 'gst',
    name: 'GST Calculator',
    description: 'Add or remove tax without reaching for a spreadsheet.',
    eyebrow: 'Money stuff',
    icon: BadgePercent,
    tint: 'plum',
    number: '05',
  },
];

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

function Home({ onSelect }: { onSelect: (id: CalculatorId) => void }) {
  return (
    <main className="notebook-page min-h-[100dvh]">
      <div className="mx-auto max-w-6xl px-5 py-5 sm:px-8 sm:py-8">
        <TopBar />
        <section className="home-intro animate-rise" aria-labelledby="welcome-title">
          <div className="home-kicker">
            <span className="kicker-line" />
            <span>THE LITTLE MATH DESK</span>
          </div>
          <div className="max-w-3xl">
            <h1 id="welcome-title" className="display-title">
              Clear answers for<br />
              <em>ordinary questions.</em>
            </h1>
            <p className="intro-copy">
              A calm corner for the numbers that pop up in real life. Pick a page,
              fill in what you know, and keep moving.
            </p>
          </div>
          <div className="desk-note" aria-label="Notebook note">
            <Sparkles size={16} strokeWidth={1.8} />
            <span>Five essentials, kept pleasantly simple.</span>
          </div>
        </section>

        <section className="calculator-list" aria-labelledby="calculator-list-title">
          <div className="section-caption">
            <span id="calculator-list-title">Choose a calculation</span>
            <span className="section-rule" />
            <span className="section-count">05 pages</span>
          </div>
          <div className="calculator-grid">
            {calculatorMeta.map((calculator, index) => (
              <CalculatorCard
                key={calculator.id}
                calculator={calculator}
                index={index}
                onSelect={onSelect}
              />
            ))}
          </div>
        </section>

        <footer className="home-footer">
          <span className="footer-mark">CN</span>
          <span>Made for the space between “wait, let me calculate that” and “there it is.”</span>
        </footer>
      </div>
    </main>
  );
}

function TopBar() {
  return (
    <header className="topbar">
      <div className="brand-lockup">
        <div className="brand-mark" aria-hidden="true">
          <NotebookPen size={20} strokeWidth={1.8} />
        </div>
        <div>
          <div className="brand-name">Calc Notebook</div>
          <div className="brand-subtitle">everyday calculations</div>
        </div>
      </div>
      <div className="topbar-status">
        <span className="status-dot" />
        <span>Ready when you are</span>
      </div>
    </header>
  );
}

function CalculatorCard({
  calculator,
  index,
  onSelect,
}: {
  calculator: CalculatorMeta;
  index: number;
  onSelect: (id: CalculatorId) => void;
}) {
  const Icon = calculator.icon;
  return (
    <button
      type="button"
      className={`calculator-card calculator-card-${calculator.tint} animate-rise`}
      style={{ animationDelay: `${index * 65}ms` }}
      onClick={() => onSelect(calculator.id)}
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
    </button>
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
      <div className="mx-auto max-w-6xl px-5 py-5 sm:px-8 sm:py-8">
        <TopBar />
        <div className="calculator-view animate-rise">
          <button type="button" className="back-button" onClick={onBack} data-testid="button-back-to-calculators">
            <ArrowLeft size={16} />
            <span>Back to calculators</span>
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
        </div>
        <div className="calculator-footer">
          <span>CALC NOTEBOOK</span>
          <span className="footer-dash" />
          <span>Numbers, without the spreadsheet feeling.</span>
        </div>
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
    <CalculatorLayout calculator={calculatorMeta[0]} onBack={onBack}>
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
    <CalculatorLayout calculator={calculatorMeta[1]} onBack={onBack}>
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
    <CalculatorLayout calculator={calculatorMeta[2]} onBack={onBack}>
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
    <CalculatorLayout calculator={calculatorMeta[3]} onBack={onBack}>
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
    <CalculatorLayout calculator={calculatorMeta[4]} onBack={onBack}>
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

function NotebookApp() {
  const [selected, setSelected] = useState<CalculatorId | null>(null);
  const onBack = () => setSelected(null);
  if (!selected) return <Home onSelect={setSelected} />;
  const calculatorProps = { onBack };
  if (selected === 'emi') return <EmiCalculator {...calculatorProps} />;
  if (selected === 'age') return <AgeCalculator {...calculatorProps} />;
  if (selected === 'percentage') return <PercentageCalculator {...calculatorProps} />;
  if (selected === 'bmi') return <BmiCalculator {...calculatorProps} />;
  return <GstCalculator {...calculatorProps} />;
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={NotebookApp} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
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