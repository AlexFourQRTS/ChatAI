import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonIcon } from '@ionic/angular/standalone';
import { APP_NAME } from '../../app.constants';
import { ClearStuckIonPageHostDirective } from '../../core/clear-stuck-ion-page-host.directive';
import { OnboardingService } from '../onboarding/onboarding.service';
import { acceptWelcome, hasAcceptedWelcome } from './welcome.storage';

@Component({
  selector: 'app-welcome',
  standalone: true,
  hostDirectives: [ClearStuckIonPageHostDirective],
  imports: [IonIcon],
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  private readonly router = inject(Router);
  private readonly onboarding = inject(OnboardingService);

  readonly appName = APP_NAME;

  ngOnInit(): void {
    if (this.onboarding.completed()) {
      void this.router.navigateByUrl('/chats', { replaceUrl: true });
      return;
    }
    if (hasAcceptedWelcome()) {
      void this.router.navigateByUrl('/onboarding', { replaceUrl: true });
    }
  }

  getStarted(): void {
    acceptWelcome();
    void this.router.navigateByUrl('/onboarding');
  }
}
