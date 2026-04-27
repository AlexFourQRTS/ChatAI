import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { ApiClient } from '../api/api.client';
import type { UserProfile } from '../api/api.types';
import {
  SETTINGS_PROFILE_MOCK,
  type SettingsProfile,
} from '../features/settings/mock/settings.mock';

@Injectable({ providedIn: 'root' })
export class ProfileRepository {
  private readonly api = inject(ApiClient);

  getSettingsProfile(): Observable<SettingsProfile> {
    return this.api.getProfile().pipe(
      map((u) => mergeProfile(u)),
      catchError(() => of(SETTINGS_PROFILE_MOCK)),
    );
  }
}

function mergeProfile(u: UserProfile): SettingsProfile {
  const name = u.displayName?.trim() || SETTINGS_PROFILE_MOCK.displayName;
  const phone = u.phone?.trim() || SETTINGS_PROFILE_MOCK.phone;
  return {
    displayName: name,
    phone,
    initials: initialsFrom(name),
    avatarColor: '#4a90e2',
    photoUrl: u.photoUrl,
  };
}

function initialsFrom(name: string): string {
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase() || '?';
}
