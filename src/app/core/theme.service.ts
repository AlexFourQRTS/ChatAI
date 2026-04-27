import { DOCUMENT } from '@angular/common';
import { Injectable, NgZone, inject, signal } from '@angular/core';

const STORAGE_KEY = 'pictalk-theme';
const DARK_CLASS = 'ion-palette-dark';

export type AppThemeMode = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly ngZone = inject(NgZone);
  readonly mode = signal<AppThemeMode>('light');

  /** Call once at startup (e.g. from `AppComponent`). */
  init(): void {
    const stored = this.readStored();
    this.apply(stored);
  }

  setMode(next: AppThemeMode): void {
    // Ionic web components can emit outside NgZone; keep signal + DOM updates inside the zone
    // so templates that read `theme.mode()` refresh and `classList` changes stick reliably.
    this.ngZone.run(() => this.apply(next));
  }

  private readStored(): AppThemeMode {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      return v === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  }

  private persist(mode: AppThemeMode): void {
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      /* ignore */
    }
  }

  private apply(mode: AppThemeMode): void {
    const html = this.document.documentElement;
    if (mode === 'dark') {
      html.classList.add(DARK_CLASS);
    } else {
      html.classList.remove(DARK_CLASS);
    }
    html.style.colorScheme = mode === 'dark' ? 'dark' : 'light';
    this.mode.set(mode);
    this.persist(mode);
  }
}
