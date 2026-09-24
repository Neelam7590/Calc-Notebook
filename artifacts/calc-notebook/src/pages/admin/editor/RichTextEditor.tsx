import { useEffect, useRef, useState, type ClipboardEvent } from 'react';
import {
  Bold,
  Code,
  Eraser,
  Heading2,
  Heading3,
  Image as ImageIcon,
  Italic,
  Link2,
  Link2Off,
  List,
  ListOrdered,
  Pilcrow,
  Quote,
  Redo2,
  Strikethrough,
  Table,
  Underline,
  Undo2,
} from 'lucide-react';

/*
 * Rich text editor built on a contentEditable area + document.execCommand.
 *
 * IMPORTANT — paste behaviour: by default the browser's native "rich paste"
 * is KEPT, so content copy-pasted from Word, Google Docs, websites or PDFs
 * keeps its formatting (fonts, headings, lists, tables, links, spacing).
 * Nothing is converted to plain text. The toolbar's "paste as text" toggle
 * is the opt-in way to get clean plain-text pasting instead.
 *
 * The article is stored as an array of top-level HTML "blocks" (each paragraph,
 * heading, list, table, …) so the public blog page can render them 1:1.
 */

type Props = {
  value: string[];
  onChange: (blocks: string[]) => void;
  placeholder?: string;
};

function escapeText(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** Splits the editor's direct children into HTML blocks. */
function collectBlocks(node: HTMLDivElement): string[] {
  const blocks: string[] = [];
  node.childNodes.forEach((child) => {
    if (child.nodeType === Node.ELEMENT_NODE && child instanceof HTMLElement) {
      if (child.tagName === 'BR') return;
      blocks.push(child.outerHTML);
    } else if (child.nodeType === Node.TEXT_NODE) {
      const text = (child.textContent ?? '').trim();
      if (text) blocks.push(`<p>${escapeText(text)}</p>`);
    }
  });
  return blocks;
}

export function RichTextEditor({ value, onChange, placeholder = 'Start writing your article…' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [plainPaste, setPlainPaste] = useState(false);

  // Seed the editor once with the initial blocks (plain-text legacy posts work too).
  useEffect(() => {
    const node = ref.current;
    if (node && !node.innerHTML && value.length > 0) {
      node.innerHTML = value.join('');
    }
    // Only run once on mount — the parent remounts this component when switching posts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sync = () => {
    const node = ref.current;
    if (node) onChange(collectBlocks(node));
  };

  const run = (command: string, commandValue?: string) => {
    ref.current?.focus();
    document.execCommand(command, false, commandValue ?? '');
    sync();
  };

  const fmt = (tag: string) => run('formatBlock', `<${tag}>`);
  const wrap = (html: string) => run('insertHTML', html);

  const addLink = () => {
    const url = window.prompt('Link URL (https://…):');
    if (url) run('createLink', url);
  };
  const insertImage = () => {
    const url = window.prompt('Image URL (https://…):');
    if (url) run('insertImage', url);
  };
  const insertTable = () => {
    wrap(
      '<table><tbody>' +
        '<tr><td>Cell</td><td>Cell</td></tr>' +
        '<tr><td>Cell</td><td>Cell</td></tr>' +
        '</tbody></table>',
    );
  };

  const handlePaste = (event: ClipboardEvent<HTMLDivElement>) => {
    if (plainPaste) {
      // Opt-in plain-text paste.
      event.preventDefault();
      document.execCommand('insertText', false, event.clipboardData.getData('text/plain'));
      sync();
      return;
    }
    // Default: keep rich HTML exactly as copied (Word/Docs/websites/PDFs).
    // Just make sure the blocks are refreshed afterwards.
    window.setTimeout(sync, 0);
  };

  const toolGroup = 'rich-toolbar-group';
  const btn = (label: string, onClick: () => void, icon: React.ReactNode) => (
    <button type="button" className="rich-toolbar-btn" title={label} aria-label={label} onClick={onClick}>
      {icon}
    </button>
  );
  const sep = () => <span className="rich-toolbar-sep" aria-hidden="true" />;

  return (
    <div className="rich-editor-wrap">
      <div className="rich-toolbar" role="toolbar" aria-label="Formatting toolbar">
        <div className={toolGroup}>
          {btn('Undo', () => run('undo'), <Undo2 size={16} />)}
          {btn('Redo', () => run('redo'), <Redo2 size={16} />)}
        </div>
        {sep()}
        <div className={toolGroup}>
          {btn('Bold', () => run('bold'), <Bold size={15} />)}
          {btn('Italic', () => run('italic'), <Italic size={15} />)}
          {btn('Underline', () => run('underline'), <Underline size={15} />)}
          {btn('Strikethrough', () => run('strikeThrough'), <Strikethrough size={15} />)}
        </div>
        {sep()}
        <div className={toolGroup}>
          {btn('Heading 2', () => fmt('h2'), <Heading2 size={15} />)}
          {btn('Heading 3', () => fmt('h3'), <Heading3 size={15} />)}
          {btn('Paragraph', () => fmt('p'), <Pilcrow size={15} />)}
          {btn('Quote', () => fmt('blockquote'), <Quote size={15} />)}
          {btn('Code block', () => fmt('pre'), <Code size={15} />)}
        </div>
        {sep()}
        <div className={toolGroup}>
          {btn('Bullet list', () => run('insertUnorderedList'), <List size={16} />)}
          {btn('Numbered list', () => run('insertOrderedList'), <ListOrdered size={16} />)}
          {btn('Table', insertTable, <Table size={15} />)}
        </div>
        {sep()}
        <div className={toolGroup}>
          {btn('Add link', addLink, <Link2 size={15} />)}
          {btn('Remove link', () => run('unlink'), <Link2Off size={15} />)}
          {btn('Insert image', insertImage, <ImageIcon size={15} />)}
        </div>
        {sep()}
        <div className={toolGroup}>
          {btn('Clear formatting', () => run('removeFormat'), <Eraser size={15} />)}
        </div>
        <span className="rich-toolbar-spacer" />
        <button
          type="button"
          className={`rich-paste-toggle${plainPaste ? ' is-active' : ''}`}
          onClick={() => setPlainPaste((value) => !value)}
          title="Toggle plain-text paste"
        >
          Paste as text
        </button>
      </div>

      <div
        ref={ref}
        className="rich-editor"
        contentEditable
        suppressContentEditableWarning
        role="textbox"
        aria-multiline="true"
        aria-label="Article content"
        data-placeholder={placeholder}
        spellCheck
        onInput={sync}
        onBlur={sync}
        onPaste={handlePaste}
      />
    </div>
  );
}