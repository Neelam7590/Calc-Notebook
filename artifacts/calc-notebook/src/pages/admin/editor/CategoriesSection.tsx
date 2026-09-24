import { useState, type FormEvent } from 'react';
import { FolderTree, Plus } from 'lucide-react';
import { addCalculatorCategory, getCalculatorCategories } from '@/data/blogData';
import { SectionCard } from './SectionCard';

/*
 * "Categories" panel: multi-select of calculator-type categories the post
 * is about, plus an inline "Add new category" so more can be added later.
 */
export function CategoriesSection({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (next: string[]) => void;
}) {
  const [cats, setCats] = useState<string[]>(() => getCalculatorCategories());
  const [newName, setNewName] = useState('');

  const toggle = (name: string) => {
    onChange(selected.includes(name) ? selected.filter((item) => item !== name) : [...selected, name]);
  };

  const add = (event: FormEvent) => {
    event.preventDefault();
    const name = newName.trim();
    if (!name) return;
    setCats(addCalculatorCategory(name));
    onChange([...selected, name]);
    setNewName('');
  };

  return (
    <SectionCard title="Categories" icon={<FolderTree size={16} strokeWidth={1.9} />}>
      <p className="asb-hint">Which calculator(s) is this post about?</p>
      <div className="asb-check-list">
        {cats.map((name) => (
          <label key={name} className="asb-check-item">
            <input type="checkbox" checked={selected.includes(name)} onChange={() => toggle(name)} />
            <span>{name}</span>
            {selected.includes(name) && <span className="asb-check-tick">✓</span>}
          </label>
        ))}
      </div>
      <form className="asb-inline-add" onSubmit={add}>
        <input
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
          placeholder="Add new category…"
          aria-label="Add new category"
        />
        <button type="submit" className="asb-icon-btn" aria-label="Add category" disabled={!newName.trim()}>
          <Plus size={15} />
        </button>
      </form>
    </SectionCard>
  );
}