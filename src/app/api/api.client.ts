import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import type { AppSettingsPayload, ChatPreview, Contact, UserProfile } from './api.types';

@Injectable({ providedIn: 'root' })
export class ApiClient {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl.replace(/\/$/, '');

  getChats(): Observable<ChatPreview[]> {
    return this.http.get<ChatPreview[]>(`${this.baseUrl}/chats`);
  }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.baseUrl}/contacts`);
  }

  getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.baseUrl}/profile`);
  }

  updateProfile(body: Partial<UserProfile>): Observable<UserProfile> {
    return this.http.patch<UserProfile>(`${this.baseUrl}/profile`, body);
  }

  getSettings(): Observable<AppSettingsPayload> {
    return this.http.get<AppSettingsPayload>(`${this.baseUrl}/settings`);
  }

  updateSettings(body: AppSettingsPayload): Observable<AppSettingsPayload> {
    return this.http.patch<AppSettingsPayload>(`${this.baseUrl}/settings`, body);
  }
}
