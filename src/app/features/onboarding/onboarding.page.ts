import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IonIcon } from '@ionic/angular/standalone';
import { ClearStuckIonPageHostDirective } from '../../core/clear-stuck-ion-page-host.directive';
import { hasAcceptedWelcome } from '../welcome/welcome.storage';
import { formatNanpNationalDisplay, nationalDigitsFromRawInput, nationalDigitsFromStored } from './us-phone-format';
import { OnboardingService } from './onboarding.service';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  hostDirectives: [ClearStuckIonPageHostDirective],
  imports: [IonIcon],
  templateUrl: './onboarding.page.html',
  styleUrls: ['./styles/onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {
  private readonly onboarding = inject(OnboardingService);
  private readonly router = inject(Router);

  readonly step = signal<1 | 2 | 3>(1);

  /** National 10 digits max (no country code). */
  readonly phoneNationalDigits = signal(nationalDigitsFromStored(this.onboarding.snapshot().phone));

  readonly nameDraft = signal(this.onboarding.snapshot().displayName);
  readonly photoPreview = signal<string | null>(this.onboarding.snapshot().photoDataUrl);
  readonly photoError = signal<string | null>(null);

  readonly nameOk = computed(() => this.onboarding.nameValid(this.nameDraft()));

  ngOnInit(): void {
    if (!this.onboarding.completed() && !hasAcceptedWelcome()) {
      void this.router.navigateByUrl('/welcome', { replaceUrl: true });
      return;
    }
    this.phoneNationalDigits.set(nationalDigitsFromStored(this.onboarding.snapshot().phone));
  }

  phoneDisplay(): string {
    return formatNanpNationalDisplay(this.phoneNationalDigits());
  }

  onPhoneInput(ev: Event): void {
    const raw = (ev.target as HTMLInputElement).value;
    const d = nationalDigitsFromRawInput(raw);
    this.phoneNationalDigits.set(d);
    const display = formatNanpNationalDisplay(d);
    this.onboarding.updatePhone(display.length ? display : '');
  }

  onNameInput(ev: Event): void {
    const v = (ev.target as HTMLInputElement).value;
    this.nameDraft.set(v);
    this.onboarding.updateDisplayName(v);
  }

  nextFromPhone(): void {
    const display = formatNanpNationalDisplay(this.phoneNationalDigits());
    this.onboarding.updatePhone(display.length ? display : '');
    this.step.set(2);
  }

  nextFromName(): void {
    if (!this.nameOk()) {
      return;
    }
    this.onboarding.updateDisplayName(this.nameDraft().trim());
    this.step.set(3);
  }

  backToPhone(): void {
    this.step.set(1);
  }

  backToName(): void {
    this.step.set(2);
  }

  onPickPhoto(ev: Event): void {
    const input = ev.target as HTMLInputElement;
    const file = input.files?.[0];
    this.photoError.set(null);
    input.value = '';
    if (!file || !file.type.startsWith('image/')) {
      return;
    }
    if (this.onboarding.photoFileTooLarge(file.size)) {
      this.photoError.set('File is too large. Use an image under ~450 KB or tap Skip.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const url = typeof reader.result === 'string' ? reader.result : null;
      this.photoPreview.set(url);
      this.onboarding.setPhotoDataUrl(url);
    };
    reader.readAsDataURL(file);
  }

  clearChosenPhoto(): void {
    this.photoPreview.set(null);
    this.onboarding.setPhotoDataUrl(null);
  }

  skipPhoto(): void {
    this.photoPreview.set(null);
    this.onboarding.setPhotoDataUrl(null);
    this.finish();
  }

  finishWithPhoto(): void {
    this.finish();
  }

  private finish(): void {
    this.onboarding.complete();
    void this.router.navigateByUrl('/chats');
  }
}
