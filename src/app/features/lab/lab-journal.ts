/**
 * Журнал попыток в лаборатории: только localStorage, без API приложения.
 * Ключ хранилища версионируйте при смене формата записей.
 */

export const LAB_JOURNAL_STORAGE_KEY = 'pictalk-lab-journal-v1' as const;
export const LAB_JOURNAL_MAX_ENTRIES = 80 as const;

export type LabJournalOutcome = 'ok' | 'fail' | 'partial' | 'info';

export interface LabJournalEntry {
  readonly id: string;
  /** ISO-8601 */
  readonly at: string;
  readonly kind: 'auto' | 'manual';
  /** Что пробовали (действие / гипотеза). */
  readonly tried: string;
  readonly outcome: LabJournalOutcome;
  /** Что вышло, что не сработало, ошибка, короткая заметка. */
  readonly detail: string;
}

export function newLabJournalId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function loadLabJournal(): LabJournalEntry[] {
  if (typeof localStorage === 'undefined') {
    return [];
  }
  try {
    const raw = localStorage.getItem(LAB_JOURNAL_STORAGE_KEY);
    if (!raw?.trim()) {
      return [];
    }
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter(isLabJournalEntry);
  } catch {
    return [];
  }
}

export function saveLabJournal(entries: readonly LabJournalEntry[]): void {
  if (typeof localStorage === 'undefined') {
    return;
  }
  try {
    localStorage.setItem(LAB_JOURNAL_STORAGE_KEY, JSON.stringify(entries));
  } catch {
    /* квота / приватный режим */
  }
}

function isLabJournalEntry(x: unknown): x is LabJournalEntry {
  if (!x || typeof x !== 'object') {
    return false;
  }
  const o = x as Record<string, unknown>;
  return (
    typeof o['id'] === 'string' &&
    typeof o['at'] === 'string' &&
    (o['kind'] === 'auto' || o['kind'] === 'manual') &&
    typeof o['tried'] === 'string' &&
    (o['outcome'] === 'ok' ||
      o['outcome'] === 'fail' ||
      o['outcome'] === 'partial' ||
      o['outcome'] === 'info') &&
    typeof o['detail'] === 'string'
  );
}
