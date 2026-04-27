import { Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { ThemeService } from './core/theme.service';
import { registerAppIonIcons } from './utils/register-ion-icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  private readonly theme = inject(ThemeService);

  constructor() {
    registerAppIonIcons();
    this.theme.init();
  }
}
