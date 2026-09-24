import { Link } from 'wouter';
import {
  BadgePercent,
  CalendarDays,
  GraduationCap,
  HeartPulse,
  Landmark,
  NotebookPen,
  Percent,
  Stamp,
  type LucideIcon,
} from 'lucide-react';

export type CalculatorId = 'emi' | 'age' | 'percentage' | 'bmi' | 'gst' | 'cgpa' | 'stamp-duty';

export type CalculatorMeta = {
  id: CalculatorId;
  name: string;
  description: string;
  eyebrow: string;
  icon: LucideIcon;
  tint: string;
  number: string;
};

export type TopBarSection = 'blog' | 'terms' | 'privacy' | 'disclaimer' | 'faq';

export const calculatorPath = (id: CalculatorId) => `/${id}-calculator`;

export const calculatorMeta: CalculatorMeta[] = [
  {
    id: 'stamp-duty',
    name: 'Stamp Duty Calculator',
    description: 'Estimate Haryana property registration costs before you buy.',
    eyebrow: 'Property',
    icon: Stamp,
    tint: 'gold',
    number: '01',
  },
  {
    id: 'emi',
    name: 'EMI Calculator',
    description: 'See the true cost of a loan before you sign.',
    eyebrow: 'Borrowing',
    icon: Landmark,
    tint: 'coral',
    number: '02',
  },
  {
    id: 'age',
    name: 'Age Calculator',
    description: 'Count your exact years, months, days — all of it.',
    eyebrow: 'Milestones',
    icon: CalendarDays,
    tint: 'gold',
    number: '03',
  },
  {
    id: 'percentage',
    name: 'Percentage Calculator',
    description: 'Turn the quick mental math into a clear answer.',
    eyebrow: 'Everyday math',
    icon: Percent,
    tint: 'blue',
    number: '04',
  },
  {
    id: 'bmi',
    name: 'BMI Calculator',
    description: 'A simple snapshot from height and weight.',
    eyebrow: 'Wellbeing',
    icon: HeartPulse,
    tint: 'sage',
    number: '05',
  },
  {
    id: 'gst',
    name: 'GST Calculator',
    description: 'Add or remove tax without reaching for a spreadsheet.',
    eyebrow: 'Money stuff',
    icon: BadgePercent,
    tint: 'plum',
    number: '06',
  },
  {
    id: 'cgpa',
    name: 'CGPA Calculator',
    description: 'Find your credit-weighted academic average.',
    eyebrow: 'Academics',
    icon: GraduationCap,
    tint: 'blue',
    number: '07',
  },
];

export function TopBar({
  activeId,
  activeSection,
}: {
  activeId?: CalculatorId;
  activeSection?: TopBarSection;
}) {
  const isHome = !activeId && !activeSection;
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
      <nav className="topbar-nav" aria-label="Main navigation">
        <Link
          href="/"
          className={isHome ? 'nav-link nav-link-active' : 'nav-link'}
          aria-current={isHome ? 'page' : undefined}
        >
          Home
        </Link>
        {calculatorMeta.map((calculator) => (
          <Link
            href={calculatorPath(calculator.id)}
            key={calculator.id}
            className={activeId === calculator.id ? 'nav-link nav-link-active' : 'nav-link'}
            aria-current={activeId === calculator.id ? 'page' : undefined}
          >
            {calculator.name.replace(' Calculator', '')}
          </Link>
        ))}
        <Link
          href="/blog"
          className={activeSection === 'blog' ? 'nav-link nav-link-active' : 'nav-link'}
          aria-current={activeSection === 'blog' ? 'page' : undefined}
        >
          Blog
        </Link>
      </nav>
    </header>
  );
}