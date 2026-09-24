import { useState } from 'react';
import { HelpCircle, Plus, Sparkles, X } from 'lucide-react';
import { generateFaqs, type GeneratedQuestion } from '@/lib/ai-generator';
import { SectionCard } from './SectionCard';

/*
 * FAQs panel: repeatable question/answer field pairs shown as an accordion
 * (each item collapses/expands). The "Generate with AI" button drafts three
 * Q&A pairs from the article content — they are fully editable before saving.
 */
export function FaqsSection({
  value,
  onChange,
  content,
}: {
  value: GeneratedQuestion[];
  onChange: (faqs: GeneratedQuestion[]) => void;
  content: string;
}) {
  const [generating, setGenerating] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const update = (index: number, field: keyof GeneratedQuestion, text: string) => {
    onChange(
      value.map((faq, i) => (i === index ? { ...faq, [field]: text } : faq)),
    );
  };

  const remove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
    setOpenIndex((current) => (current === index ? null : current));
  };

  const addEmpty = () => {
    onChange([...value, { question: '', answer: '' }]);
    setOpenIndex(value.length);
  };

  const generate = async () => {
    if (generating) return;
    setGenerating(true);
    try {
      // Placeholder AI — replace with your real endpoint inside generateFaqs.
      const faqs = await generateFaqs(content || 'Write about how your calculator works.');
      onChange([...value, ...faqs]);
      setOpenIndex(value.length);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <SectionCard
      title="FAQs"
      icon={<HelpCircle size={16} strokeWidth={1.9} />}
      action={
        <button type="button" className="asb-ai-btn" onClick={() => void generate()} disabled={generating}>
          {generating ? <span className="asb-spinner" /> : <Sparkles size={13} />}
          <span>{generating ? 'Generating…' : 'Generate with AI'}</span>
        </button>
      }
    >
      {value.length > 0 ? (
        <div className="asb-faq-list">
          {value.map((faq, index) => (
            <details
              key={index}
              className="asb-faq-item"
              open={openIndex === index}
              onToggle={(event) => {
                if (event.currentTarget.open) setOpenIndex(index);
              }}
            >
              <summary>
                <span>{faq.question.trim() ? faq.question : `Question ${index + 1}`}</span>
                <button type="button" onClick={() => remove(index)} aria-label={`Remove FAQ ${index + 1}`}>
                  <X size={13} strokeWidth={2.2} />
                </button>
              </summary>
              <div className="asb-faq-body">
                <input
                  value={faq.question}
                  onChange={(event) => update(index, 'question', event.target.value)}
                  placeholder="Question…"
                  aria-label={`FAQ ${index + 1} question`}
                />
                <textarea
                  value={faq.answer}
                  onChange={(event) => update(index, 'answer', event.target.value)}
                  rows={3}
                  placeholder="Answer…"
                  aria-label={`FAQ ${index + 1} answer`}
                />
              </div>
            </details>
          ))}
        </div>
      ) : (
        <p className="asb-hint">No FAQs yet. Add your own or let AI draft some for you.</p>
      )}

      <button type="button" className="asb-btn asb-btn-soft asb-btn-block" onClick={addEmpty}>
        <Plus size={15} />
        <span>Add FAQ</span>
      </button>
    </SectionCard>
  );
}