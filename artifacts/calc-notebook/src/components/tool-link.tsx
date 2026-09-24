import { Link } from 'wouter';
import { ArrowRight, Calculator } from 'lucide-react';
import { calculatorPath, type CalculatorMeta } from '@/components/top-bar';

export function ToolCardLink({ meta }: { meta: CalculatorMeta }) {
  const Icon = meta.icon;
  return (
    <Link href={calculatorPath(meta.id)} className={`calculator-card calculator-card-${meta.tint}`}>
      <span className="card-number">{meta.number}</span>
      <span className="card-icon"><Icon size={24} strokeWidth={1.7} /></span>
      <span className="card-copy">
        <span className="card-eyebrow">{meta.eyebrow}</span>
        <span className="card-title">{meta.name}</span>
        <span className="card-description">{meta.description}</span>
      </span>
      <span className="card-arrow" aria-hidden="true"><ArrowRight size={19} /></span>
    </Link>
  );
}

export function ToolRowLink({ meta }: { meta: CalculatorMeta }) {
  const Icon = meta.icon;
  return (
    <Link href={calculatorPath(meta.id)} className="area-tool-row">
      <span className="area-tool-row-icon"><Icon size={20} strokeWidth={1.7} /></span>
      <span className="area-tool-row-copy">
        <strong>{meta.name}</strong>
        <span>{meta.description}</span>
      </span>
      <span className="area-tool-row-arrow" aria-hidden="true"><ArrowRight size={17} /></span>
    </Link>
  );
}

export function ToolBoxLink({ meta }: { meta: CalculatorMeta }) {
  return (
    <Link href={calculatorPath(meta.id)} className="tool-box" aria-label={`Open ${meta.name}`}>
      <span className="tool-box-icon"><Calculator size={22} strokeWidth={1.7} /></span>
      <span className="tool-box-main">
        <span className="tool-box-eyebrow">{meta.eyebrow}</span>
        <strong>{meta.name}</strong>
      </span>
      <span className="tool-box-desc">{meta.description}</span>
      <span className="tool-box-arrow" aria-hidden="true"><ArrowRight size={17} /></span>
    </Link>
  );
}