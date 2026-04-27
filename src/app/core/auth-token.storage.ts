import { Injectable } from '@angular/core';

/** Same keys as `Exsample` (`localStorage` access / refresh tokens). */
@Injectable({ providedIn: 'root' })
export class AuthTokenStorage {
  private readonly accessKey = 'accessToken';
  private readonly refreshKey = 'refreshToken';

  getAccessToken(): string | null {
    if (typeof localStorage === 'undefined') return null;
    return localStorage.getItem(this.accessKey);
  }

  setTokens(accessToken: string, refreshToken?: string): void {
    localStorage.setItem(this.accessKey, accessToken);
    if (refreshToken) {
      localStorage.setItem(this.refreshKey, refreshToken);
    }
  }

  clear(): void {
    localStorage.removeItem(this.accessKey);
    localStorage.removeItem(this.refreshKey);
  }
}
