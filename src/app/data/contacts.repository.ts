import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { ApiClient } from '../api/api.client';
import type { Contact } from '../api/api.types';
import { CONTACTS_DIRECTORY, type PicContact } from './contact-data';

@Injectable({ providedIn: 'root' })
export class ContactsRepository {
  private readonly api = inject(ApiClient);

  /** Remote directory; on error or empty response uses `CONTACTS_DIRECTORY`. */
  getDirectory(): Observable<readonly PicContact[]> {
    return this.api.getContacts().pipe(
      map((rows) => rows.map((c) => mapApiContact(c))),
      map((rows) => (rows.length === 0 ? CONTACTS_DIRECTORY : rows)),
      catchError(() => of(CONTACTS_DIRECTORY)),
    );
  }
}

function mapApiContact(c: Contact): PicContact {
  const name = (c.displayName || 'Contact').trim() || 'Contact';
  return {
    id: c.id,
    name,
    phone: phoneFromId(c.id),
    initials: initialsFromName(name),
    avatarColor: colorFromId(c.id),
    isOnPictalk: Boolean(c.username?.trim()),
  };
}

function initialsFromName(name: string): string {
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

const PALETTE = ['#4A90E2', '#E85D75', '#4ECDC4', '#C792EA', '#FFB347', '#5AC8FA'] as const;

function colorFromId(id: string): string {
  let h = 0;
  for (let i = 0; i < id.length; i += 1) {
    h = (h * 31 + id.charCodeAt(i)) | 0;
  }
  return PALETTE[Math.abs(h) % PALETTE.length];
}

function phoneFromId(id: string): string {
  let n = 0;
  for (let i = 0; i < id.length; i += 1) {
    n = (n * 13 + id.charCodeAt(i)) % 9000000;
  }
  const a = String(234 + (n % 70)).padStart(3, '0');
  const b = String(567 + (n % 400)).padStart(3, '0');
  const c = String(10 + (n % 89)).padStart(2, '0');
  const d = String(10 + ((n >> 3) % 89)).padStart(2, '0');
  return `+1 (${a}) ${b}-${c}-${d}`;
}
