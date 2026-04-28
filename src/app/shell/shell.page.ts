import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonIcon, IonRouterOutlet } from '@ionic/angular/standalone';
import { DeveloperModeService } from '../core/developer-mode.service';
import { MAIN_NAV, type MainNavItem } from './main-nav.config';

@Component({
  selector: 'app-shell',
  templateUrl: 'shell.page.html',
  styleUrls: ['shell.page.scss'],
  imports: [IonRouterOutlet, IonIcon, RouterLink],
})
export class ShellPage {
  private readonly router = inject(Router);
  private readonly devMode = inject(DeveloperModeService);

  readonly navItems = computed(() =>
    MAIN_NAV.filter((item) => {
      if (!item.requiresDeveloperMode) {
        return true;
      }
      return this.devMode.enabled();
    }),
  );

  isNavActive(item: MainNavItem): boolean {
    const path = this.router.url.split('?')[0];
    if (path === item.activeUrlPrefix) {
      return true;
    }
    return path.startsWith(`${item.activeUrlPrefix}/`);
  }
}
