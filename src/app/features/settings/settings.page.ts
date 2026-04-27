import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import type { SegmentChangeEventDetail } from '@ionic/core/components';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { ClearStuckIonPageHostDirective } from '../../core/clear-stuck-ion-page-host.directive';
import { APP_VERSION } from '../../app.constants';
import { ThemeService } from '../../core/theme.service';
import { SETTINGS_PROFILE_MOCK } from './mock/settings.mock';
import { ProfileRepository } from '../../data/profile.repository';

@Component({
  selector: 'app-settings',
  hostDirectives: [ClearStuckIonPageHostDirective],
  templateUrl: './settings.page.html',
  styleUrls: ['./styles/settings.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    IonSegment,
    IonSegmentButton,
  ],
})
export class SettingsPage {
  private readonly profileRepository = inject(ProfileRepository);
  readonly theme = inject(ThemeService);

  readonly profile = toSignal(this.profileRepository.getSettingsProfile(), {
    initialValue: SETTINGS_PROFILE_MOCK,
  });

  readonly betaLabel = `BETA ${APP_VERSION}` as const;

  onChangePhoto(): void {
    // TODO: file picker / native camera when backend exists
  }

  onEditName(): void {
    // TODO: inline edit or modal when API supports PATCH
  }

  onThemeSegment(ev: CustomEvent<SegmentChangeEventDetail>): void {
    const v = ev.detail?.value;
    if (v === 'light' || v === 'dark') {
      this.theme.setMode(v);
    }
  }
}
