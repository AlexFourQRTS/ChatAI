import { afterNextRender, AfterViewInit, Directive, ElementRef, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ViewDidEnter } from '@ionic/angular/common';
import { timer } from 'rxjs';

/**
 * Ionic иногда оставляет на хосте страницы `.ion-page-invisible` / `.ion-page-hidden`
 * (opacity: 0 у invisible), из‑за чего не доходят ни тапы, ни скролл. Снимаем залипшие классы
 * несколькими проходами: анимация роутера может повесить классы уже после первого кадра.
 */
@Directive({
  standalone: true,
  selector: '[appClearStuckIonPageHost]',
})
export class ClearStuckIonPageHostDirective implements AfterViewInit, ViewDidEnter {
  private readonly hostRef = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => this.clearStuckIonicHostClasses('afterNextRender'));
  }

  ngAfterViewInit(): void {
    queueMicrotask(() => this.clearStuckIonicHostClasses('ngAfterViewInit'));
    requestAnimationFrame(() => this.clearStuckIonicHostClasses('ngAfterViewInit+rAF'));
    requestAnimationFrame(() =>
      requestAnimationFrame(() => this.clearStuckIonicHostClasses('ngAfterViewInit+rAF×2')),
    );

    for (const ms of [0, 32, 120] as const) {
      timer(ms, undefined)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => this.clearStuckIonicHostClasses(`timer+${ms}ms`));
    }
  }

  ionViewDidEnter(): void {
    this.clearStuckIonicHostClasses('ionViewDidEnter');
    requestAnimationFrame(() => this.clearStuckIonicHostClasses('ionViewDidEnter+rAF'));
  }

  private clearStuckIonicHostClasses(reason: string): void {
    const el = this.hostRef.nativeElement;
    const hadInvisible = el.classList.contains('ion-page-invisible');
    const hadHidden = el.classList.contains('ion-page-hidden');
    if (hadInvisible || hadHidden) {
      el.classList.remove('ion-page-invisible', 'ion-page-hidden');
      el.removeAttribute('aria-hidden');
      console.warn('[IonPageHost]', `removed stuck Ionic page classes (${reason})`, {
        tag: el.tagName,
        hadInvisible,
        hadHidden,
      });
    }
  }
}
