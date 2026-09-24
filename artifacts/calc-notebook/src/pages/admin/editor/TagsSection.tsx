import { useState, type KeyboardEvent } from 'react';
import { Sparkles, Tags, X } from 'lucide-react';
import { generateTags } from '@/lib/ai-generator';
import { SectionCard } from './SectionCard';

/*
 * Tags panel: tag-chips UI with a free-text input, plus a "Generate with AI"
 * button that calls the placeholder helper (wire your real API in the helper).
 */
export function TagsSection({
  value,
  onChange,
  subject,
}: {
  value: string[];
  onChange: (tags: string[]) => void;
  subject: string;
}) {
  const [draft, setDraft] = useState('');
  const [generating, setGenerating] = useState(false);

  const addTag = () => {
    const tag = draft.trim().replace(/^#/, '');
    if (tag && !value.includes(tag)) onChange([...value, tag]);
    setDraft('');
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTag();
    } else if (event.key === 'Backspace' && !draft && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const generate = async () => {
    if (generating) return;
    setGenerating(true);
    try {
      // Placeholder AI — replace with your real endpoint inside generateTags.
      const tags = await generateTags(subject || value.join(' ') || 'blog post');
      onChange([...value, ...tags].filter((tag, index, all) => all.indexOf(tag) === index));
    } finally {
      setGenerating(false);
    }
  };

  return (
    <SectionCard
      title="Tags"
      icon={<Tags size={16} strokeWidth={1.9} />}
      action={
        <button type="button" className="asb-ai-btn" onClick={() => void generate()} disabled={generating}>
          {generating ? <span className="asb-spinner" /> : <Sparkles size={13} />}
          <span>{generating ? 'Generating…' : 'Generate with AI'}</span>
        </button>
      }
    >
      {value.length > 0 && (
        <div className="asb-chip-list">
          {value.map((tag) => (
            <span key={tag} className="asb-chip asb-chip-tag">
              <span>{tag}</span>
              <button type="button" onClick={() => onChange(value.filter((item) => item !== tag))} aria-label={`Remove tag ${tag}`}>
                <X size={12} strokeWidth={2.4} />
              </button>
            </span>
          ))}
        </div>
      )}
      <input
        className="asb-tag-input"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={onKeyDown}
        onBlur={addTag}
        placeholder="Type a tag and press Enter…"
        aria-label="Add tag"
      />
      <p className="asb-hint">Tags help readers and search engines find your post.</p>
    </SectionCard>
  );
}