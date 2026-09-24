import { useSyncExternalStore } from 'react';
import { getSupabase } from '@/lib/supabase';

export type SiteSettings = {
  siteName: string;
  siteTagline: string;
  contactEmail: string;
};

export const DEFAULT_SETTINGS: SiteSettings = {
  siteName: 'Calc Notebook',
  siteTagline: 'Free online calculators for finance, tax, and everyday life',
  contactEmail: 'hello@calcnotebook.in',
};

const STORAGE_KEY = 'calc-notebook:site-settings:v1';
const SETTINGS_TABLE = 'settings';

function normalize(value: Partial<SiteSettings>): SiteSettings {
  return {
    siteName: typeof value.siteName === 'string' && value.siteName.trim() ? value.siteName.trim() : DEFAULT_SETTINGS.siteName,
    siteTagline:
      typeof value.siteTagline === 'string' && value.siteTagline.trim() ? value.siteTagline.trim() : DEFAULT_SETTINGS.siteTagline,
    contactEmail:
      typeof value.contactEmail === 'string' && value.contactEmail.trim() ? value.contactEmail.trim() : DEFAULT_SETTINGS.contactEmail,
  };
}

function loadSettings(): SiteSettings {
  if (typeof window === 'undefined') return { ...DEFAULT_SETTINGS };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return { ...DEFAULT_SETTINGS };
    return normalize(parsed as Partial<SiteSettings>);
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

let settings: SiteSettings = loadSettings();
let version = 0;
let synced = false;
let syncing = false;
const listeners = new Set<() => void>();

function persist() {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Best-effort: in-memory values still work this session.
  }
}

function publish() {
  version += 1;
  persist();
  listeners.forEach((listener) => listener());
}

function subscriber(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function memoize<T>(fn: () => T): () => T {
  let result: T;
  let hasResult = false;
  return () => {
    if (!hasResult) {
      result = fn();
      hasResult = true;
    }
    return result;
  };
}

const canUseSupabase = memoize(() => {
  if (typeof window === 'undefined') return false;
  try {
    getSupabase();
    return true;
  } catch {
    return false;
  }
});

function ensureSupabaseSync() {
  if (typeof window === 'undefined') return;
  if (synced || syncing) return;
  if (!canUseSupabase()) {
    synced = true;
    return;
  }
  syncing = true;
  void (async () => {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase.from(SETTINGS_TABLE).select('*').eq('key', 'site').maybeSingle();
      if (!error && data) {
        const row = data as { value?: unknown };
        if (row.value && typeof row.value === 'object') {
          settings = normalize(row.value as Partial<SiteSettings>);
          publish();
        }
      }
    } catch {
      // Supabase unavailable (missing table, network) -> keep localStorage values.
    } finally {
      syncing = false;
      synced = true;
    }
  })();
}

function pushToSupabase() {
  if (!canUseSupabase()) return;
  void (async () => {
    try {
      const supabase = getSupabase();
      await supabase.from(SETTINGS_TABLE).upsert({ key: 'site', value: settings }, { onConflict: 'key' });
    } catch {
      // Best-effort mirror; localStorage remains the fallback source of truth.
    }
  })();
}

export function getSiteSettings(): SiteSettings {
  ensureSupabaseSync();
  return settings;
}

export function subscribeSettingsStore(listener: () => void): () => void {
  return subscriber(listener);
}

export function useSiteSettings(): SiteSettings {
  useSyncExternalStore(subscriber, () => {
    ensureSupabaseSync();
    return version;
  });
  return settings;
}

export function updateSiteSettings(draft: Partial<SiteSettings>): SiteSettings {
  settings = normalize({ ...settings, ...draft });
  publish();
  pushToSupabase();
  return settings;
}
