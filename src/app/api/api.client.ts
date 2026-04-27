import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, firstValueFrom, from } from 'rxjs';
import { AuthTokenStorage } from '../core/auth-token.storage';
import { API_KEY, API_URL } from '../env/constants';
import { BackendRoutes } from './backend.routes';
import type { AuthLoginResponse, ChatPreview, Contact, UserProfile } from './api.types';

/** Same role as per-request `AxiosRequestConfig` (subset Angular supports). */
export type ApiRequestConfig = {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean | readonly (string | number | boolean)[]>;
};

@Injectable({ providedIn: 'root' })
export class ApiClient {
  private readonly http = inject(HttpClient);
  private readonly tokens = inject(AuthTokenStorage);

  private defaultHeaders(): HttpHeaders {
    let h = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (API_KEY) {
      h = h.set('x-api-key', API_KEY);
    }
    return h;
  }

  private mergeHeaders(extra?: Record<string, string>): HttpHeaders {
    let h = this.defaultHeaders();
    if (extra) {
      for (const [k, v] of Object.entries(extra)) {
        h = h.set(k, v);
      }
    }
    return h;
  }

  private toParams(params?: ApiRequestConfig['params']): HttpParams | undefined {
    if (!params) return undefined;
    let p = new HttpParams();
    for (const [k, v] of Object.entries(params)) {
      if (v === undefined || v === null) continue;
      if (Array.isArray(v)) {
        for (const item of v) {
          p = p.append(k, String(item));
        }
      } else {
        p = p.set(k, String(v));
      }
    }
    return p;
  }

  private resolveUrl(path: string): string {
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    const p = path.startsWith('/') ? path : `/${path}`;
    return `${API_URL}${p}`;
  }

  async get<T>(path: string, config?: ApiRequestConfig): Promise<T> {
    return firstValueFrom(
      this.http.get<T>(this.resolveUrl(path), {
        headers: this.mergeHeaders(config?.headers),
        params: this.toParams(config?.params),
      }),
    );
  }

  async post<T>(path: string, body?: unknown, config?: ApiRequestConfig): Promise<T> {
    return firstValueFrom(
      this.http.post<T>(this.resolveUrl(path), body ?? {}, {
        headers: this.mergeHeaders(config?.headers),
        params: this.toParams(config?.params),
      }),
    );
  }

  async put<T>(path: string, body?: unknown, config?: ApiRequestConfig): Promise<T> {
    return firstValueFrom(
      this.http.put<T>(this.resolveUrl(path), body ?? {}, {
        headers: this.mergeHeaders(config?.headers),
        params: this.toParams(config?.params),
      }),
    );
  }

  async patch<T>(path: string, body?: unknown, config?: ApiRequestConfig): Promise<T> {
    return firstValueFrom(
      this.http.patch<T>(this.resolveUrl(path), body ?? {}, {
        headers: this.mergeHeaders(config?.headers),
        params: this.toParams(config?.params),
      }),
    );
  }

  async delete<T>(path: string, config?: ApiRequestConfig): Promise<T> {
    return firstValueFrom(
      this.http.delete<T>(this.resolveUrl(path), {
        headers: this.mergeHeaders(config?.headers),
        params: this.toParams(config?.params),
      }),
    );
  }

  // --- Exsample `authApi.js` ---
  async register(body: Record<string, unknown>): Promise<unknown> {
    return this.post(BackendRoutes.auth.register, body);
  }

  async login(body: Record<string, unknown>): Promise<AuthLoginResponse> {
    const data = await this.post<AuthLoginResponse>(BackendRoutes.auth.login, body);
    if (data?.accessToken) {
      this.tokens.setTokens(data.accessToken, data.refreshToken);
    }
    return data;
  }

  async logout(): Promise<void> {
    try {
      await this.post(BackendRoutes.auth.logout, {});
    } finally {
      this.tokens.clear();
    }
  }

  // --- Exsample `userApi.js` ---
  getChats(): Observable<ChatPreview[]> {
    return from(this.get<ChatPreview[]>(BackendRoutes.user.chats));
  }

  getContacts(): Observable<Contact[]> {
    return from(this.get<Contact[]>(BackendRoutes.user.list));
  }

  getProfile(): Observable<UserProfile> {
    return from(this.get<UserProfile>(BackendRoutes.user.me));
  }

  getUserById(id: string): Observable<UserProfile> {
    return from(this.get<UserProfile>(BackendRoutes.user.byId(id)));
  }

  // --- Exsample `messageApi.js` ---
  getChatHistory(otherUserId: string): Observable<unknown> {
    return from(this.get<unknown>(BackendRoutes.message.chatHistory(otherUserId)));
  }

  getAllMessages(): Observable<unknown> {
    return from(this.get<unknown>(BackendRoutes.message.list));
  }

  getMessageById(id: string): Observable<unknown> {
    return from(this.get<unknown>(BackendRoutes.message.byId(id)));
  }
}
