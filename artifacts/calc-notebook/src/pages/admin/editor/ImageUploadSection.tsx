import { useRef, useState, type ChangeEvent, type DragEvent } from 'react';
import { Image, Link, Upload } from 'lucide-react';
import { SectionCard } from './SectionCard';

/*
 * Featured image panel with two tabs:
 *  - "URL": paste any image URL, live preview shown underneath.
 *  - "Upload": drag & drop (or click) a local file which is read as a data URL.
 * TODO: swap the data-URL for an upload-to-storage call later (Supabase Storage, S3…).
 */
export function ImageUploadSection({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const [tab, setTab] = useState<'url' | 'upload'>('url');
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const readFiles = (files: FileList | null) => {
    const file = files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') onChange(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    readFiles(event.dataTransfer.files);
  };

  const onFileInput = (event: ChangeEvent<HTMLInputElement>) => readFiles(event.target.files);

  return (
    <SectionCard
      title="Featured image"
      icon={<Image size={16} strokeWidth={1.9} />}
      action={
        <span className="asb-tabs">
          <button
            type="button"
            className={`asb-tab${tab === 'url' ? ' is-active' : ''}`}
            onClick={() => setTab('url')}
          >
            URL
          </button>
          <button
            type="button"
            className={`asb-tab${tab === 'upload' ? ' is-active' : ''}`}
            onClick={() => setTab('upload')}
          >
            Upload
          </button>
        </span>
      }
    >
      {tab === 'url' ? (
        <div className="asb-url-row">
          <span className="asb-url-icon"><Link size={14} /></span>
          <input
            type="url"
            value={value.startsWith('data:') ? '' : value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="https://example.com/image.jpg"
            aria-label="Featured image URL"
          />
        </div>
      ) : (
        <div
          className={`asb-dropzone${dragging ? ' is-drag' : ''}`}
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => fileRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'Enter') fileRef.current?.click();
          }}
        >
          <Upload size={18} strokeWidth={1.8} />
          <span>Drag & drop an image, or click to browse</span>
          <input ref={fileRef} type="file" accept="image/*" onChange={onFileInput} hidden />
        </div>
      )}

      {value && (
        <div className="asb-thumb-wrap">
          <img src={value} alt="Featured preview" />
          <button type="button" className="asb-thumb-remove" onClick={() => onChange('')}>
            Remove
          </button>
        </div>
      )}
    </SectionCard>
  );
}