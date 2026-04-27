import { Injectable, computed, signal } from '@angular/core';
import { loadOnboardingState, saveOnboardingState } from './onboarding.storage';
import type { OnboardingState } from './onboarding.types';

const PHOTO_MAX_BYTES = 450_000;

@Injectable({ providedIn: 'root' })
export class OnboardingService {
  private readonly state = signal<OnboardingState>(this.read());

  readonly snapshot = this.state.asReadonly();

  readonly isComplete = computed(() => {
    const t = this.state().completedAt;
    return typeof t === 'string' && t.length > 0;
  });

  private read(): OnboardingState {
    return loadOnboardingState();
  }

  private persist(next: OnboardingState): void {
    this.state.set(next);
    saveOnboardingState(next);
  }

  /** For `canMatch` / route guards (sync). */
  completed(): boolean {
    const t = this.read().completedAt;
    return typeof t === 'string' && t.length > 0;
  }

  nameValid(name: string): boolean {
    return name.trim().length >= 2;
  }

  updatePhone(phone: string): void {
    const cur = this.state();
    this.persist({ ...cur, phone });
  }

  updateDisplayName(displayName: string): void {
    const cur = this.state();
    this.persist({ ...cur, displayName });
  }

  setPhotoDataUrl(dataUrl: string | null): void {
    const cur = this.state();
    this.persist({ ...cur, photoDataUrl: dataUrl });
  }

  complete(): void {
    const cur = this.state();
    this.persist({
      ...cur,
      completedAt: new Date().toISOString(),
    });
  }

  photoFileTooLarge(bytes: number): boolean {
    return bytes > PHOTO_MAX_BYTES;
  }
}
