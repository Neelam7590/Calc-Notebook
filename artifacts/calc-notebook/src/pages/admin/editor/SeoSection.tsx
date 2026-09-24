import { Search } from 'lucide-react';
import { SectionCard } from './SectionCard';

/*
 * SEO fields panel: meta title + meta description (no length restriction,
 * per requirements — Google slices at ~60/160 chars but we don't force it).
 */
export function SeoSection({
  metaTitle,
  metaDescription,
  onChangeTitle,
  onChangeDescription,
}: {
  metaTitle: string;
  metaDescription: string;
  onChangeTitle: (value: string) => void;
  onChangeDescription: (value: string) => void;
}) {
  return (
    <SectionCard title="SEO" icon={<Search size={16} strokeWidth={1.9} />}>
      <label className="asb-field">
        <span className="asb-field-label">Meta title</span>
        <input
          value={metaTitle}
          onChange={(event) => onChangeTitle(event.target.value)}
          placeholder="The title shown in search results"
        />
      </label>
      <label className="asb-field">
        <span className="asb-field-label">Meta description</span>
        <textarea
          value={metaDescription}
          onChange={(event) => onChangeDescription(event.target.value)}
          rows={3}
          placeholder="The snippet shown under the title in search results"
        />
      </label>
    </SectionCard>
  );
}