import { DOCUMENT } from '@angular/common';
import { Injectable, NgZone, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment';

const STORAGE_KEY = 'pictalk-theme';
const DARK_CLASS = 'ion-palette-dark';
const LOG = '[PicTalk:Theme]';

export type AppThemeMode = 'light' | 'dark';

function themeDebug(...args: unknown[]): void {
  if (environment.themeDebugLogs) {
    console.log(LOG, ...args);
  }
}

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly ngZone = inject(NgZone);
  readonly mode = signal<AppThemeMode>('light');

  /** Call once at startup (e.g. from `AppComponent`). */
  init(): void {
    themeDebug('init() start');
    const stored = this.readStored();
    this.apply(stored, 'init');
    themeDebug('init() done', snapshotHtml(this.document));
  }

  setMode(next: AppThemeMode): void {
    themeDebug('setMode() called', { next, inZone: NgZone.isInAngularZone() });
    // Ionic web components can emit outside NgZone; keep signal + DOM updates inside the zone
    // so templates that read `theme.mode()` refresh and `classList` changes stick reliably.
    this.ngZone.run(() => {
      themeDebug('setMode() inside ngZone.run');
      this.apply(next, 'setMode');
    });
    themeDebug('setMode() after ngZone.run', snapshotHtml(this.document), 'signal=', this.mode());
  }

  private readStored(): AppThemeMode {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      const mode = v === 'dark' ? 'dark' : 'light';
      themeDebug('readStored()', { key: STORAGE_KEY, raw: v, mode });
      return mode;
    } catch (e) {
      themeDebug('readStored() threw, default light', e);
      return 'light';
    }
  }

  private persist(mode: AppThemeMode): void {
    try {
      localStorage.setItem(STORAGE_KEY, mode);
      themeDebug('persist() ok', mode);
    } catch (e) {
      themeDebug('persist() failed', e);
    }
  }

  private apply(mode: AppThemeMode, reason: string): void {
    const html = this.document.documentElement;
    const before = {
      hasDarkClass: html.classList.contains(DARK_CLASS),
      colorScheme: html.style.colorScheme,
      className: html.className,
    };
    themeDebug(`apply(${reason})`, { mode, before, inZone: NgZone.isInAngularZone() });
    if (mode === 'dark') {
      html.classList.add(DARK_CLASS);
    } else {
      html.classList.remove(DARK_CLASS);
    }
    html.style.colorScheme = mode === 'dark' ? 'dark' : 'light';
    this.mode.set(mode);
    this.persist(mode);
    themeDebug(`apply(${reason}) after`, snapshotHtml(this.document));
  }
}

function snapshotHtml(doc: Document): Record<string, unknown> {
  const html = doc.documentElement;
  return {
    tag: html.tagName,
    hasIonPaletteDark: html.classList.contains(DARK_CLASS),
    colorScheme: html.style.colorScheme || '(unset)',
    classList: Array.from(html.classList),
  };
}
