import { Component, effect, ElementRef, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { APP_VERSION } from '../../app.constants';
import { ThemeService, type AppThemeMode } from '../../core/theme.service';
import { SETTINGS_PROFILE_MOCK } from '../../data/profile-data';
import { ProfileRepository } from '../../data/profile.repository';
import { miuHostStyle } from '../../miu/style-bridge';
import { settingsPageMiuStyle } from './settings.page.style';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
  ],
})
export class SettingsPage {
  private readonly profileRepository = inject(ProfileRepository);
  readonly theme = inject(ThemeService);
  private readonly el = inject(ElementRef);

  constructor() {
    effect(() => {
      const css = miuHostStyle(settingsPageMiuStyle(this.theme.mode() === 'dark'));
      (this.el.nativeElement as HTMLElement).style.cssText = css;
    });
  }

  readonly profile = toSignal(this.profileRepository.getSettingsProfile(), {
    initialValue: SETTINGS_PROFILE_MOCK,
  });

  /** Large caps label for beta builds. */
  readonly betaLabel = `BETA ${APP_VERSION}` as const;

  onChangePhoto(): void {
    // TODO: file picker / native camera when backend exists
  }

  onEditName(): void {
    // TODO: inline edit or modal when API supports PATCH
  }

  setTheme(mode: AppThemeMode): void {
    this.theme.setMode(mode);
  }
}
