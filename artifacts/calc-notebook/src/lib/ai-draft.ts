/*
 * Temporary holding spot for an AI-generated blog draft.
 *
 * The blog list's "Write with AI" dialog stores the finished draft here, then
 * navigates to the post editor, which consumes it on mount (only for new
 * posts). sessionStorage keeps it alive across the in-app navigation while
 * remaining per-tab, so drafts never leak between tabs or lose a refresh.
 */

import type { AiBlogDraft } from '@/lib/ai-generator';

const STORAGE_KEY = 'calc-notebook:ai-draft:v1';

export function setPendingAiDraft(draft: AiBlogDraft): void {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  } catch {
    // sessionStorage unavailable — the editor simply opens empty.
  }
}

export function consumePendingAiDraft(): AiBlogDraft | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    window.sessionStorage.removeItem(STORAGE_KEY);
    return JSON.parse(raw) as AiBlogDraft;
  } catch {
    return null;
  }
}