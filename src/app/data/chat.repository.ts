import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { ApiClient } from '../api/api.client';
import type { ChatPreview } from '../api/api.types';
import { CHAT_THREADS, type ChatThread } from './chat-data';

/**
 * Remote chats over HTTP (Angular HttpClient, same role as axios).
 * When the server is down, returns an error, or an empty list — uses mock threads.
 */
@Injectable({ providedIn: 'root' })
export class ChatRepository {
  private readonly api = inject(ApiClient);

  getThreads(): Observable<readonly ChatThread[]> {
    return this.api.getChats().pipe(
      map((rows) => this.mapPreviews(rows)),
      map((rows) => (rows.length === 0 ? CHAT_THREADS : rows)),
      catchError(() => of(CHAT_THREADS)),
    );
  }

  private mapPreviews(rows: ChatPreview[]): ChatThread[] {
    return rows.map((p) => ({
      id: p.id,
      name: (p.title || 'Chat').trim() || 'Chat',
      time: formatShortTime(p.updatedAt),
      initials: initialsFromTitle(p.title || 'Chat'),
      avatarColor: colorFromId(p.id),
      preview: p.lastMessage,
      previewStrip: !p.lastMessage?.trim(),
      online: false,
    }));
  }
}

function initialsFromTitle(title: string): string {
  const parts = title.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  }
  const t = parts[0] || '?';
  return t.length >= 2 ? t.slice(0, 2).toUpperCase() : t.charAt(0).toUpperCase();
}

const ACCENT_PALETTE = ['#4a90e2', '#e85d75', '#4ecdc4', '#c792ea', '#ffb347', '#5ac8fa'] as const;

function colorFromId(id: string): string {
  let h = 0;
  for (let i = 0; i < id.length; i += 1) {
    h = (h * 31 + id.charCodeAt(i)) | 0;
  }
  return ACCENT_PALETTE[Math.abs(h) % ACCENT_PALETTE.length];
}

function formatShortTime(iso?: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
}
