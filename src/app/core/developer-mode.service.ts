import { Injectable, computed, signal } from '@angular/core';

const DEV_MODE_KEY = 'pictalk-dev-mode-v1' as const;

@Injectable({ providedIn: 'root' })
export class DeveloperModeService {
  private readonly enabledState = signal(this.readInitial());

  readonly enabled = computed(() => this.enabledState());

  setEnabled(next: boolean): void {
    this.enabledState.set(next);
    if (typeof localStorage === 'undefined') {
      return;
    }
    localStorage.setItem(DEV_MODE_KEY, next ? '1' : '0');
  }

  toggle(): void {
    this.setEnabled(!this.enabledState());
  }

  private readInitial(): boolean {
    if (typeof localStorage === 'undefined') {
      return false;
    }
    return localStorage.getItem(DEV_MODE_KEY) === '1';
  }
}
