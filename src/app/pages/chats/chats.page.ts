import { Component, signal } from '@angular/core';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon],
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(16px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-8px)' }))]),
    ]),
    trigger('scaleToggle', [
      state('a', style({ transform: 'scale(1) rotate(0deg)' })),
      state('b', style({ transform: 'scale(1.12) rotate(3deg)' })),
      transition('a <=> b', [animate('700ms cubic-bezier(0.45, 0, 0.55, 1)')]),
    ]),
    trigger('shimmer', [
      transition(
        '* => *',
        animate(
          '1.2s ease-in-out',
          keyframes([
            style({ backgroundPosition: '0% 50%', offset: 0 }),
            style({ backgroundPosition: '100% 50%', offset: 1 }),
          ]),
        ),
      ),
    ]),
  ],
})
export class ChatsPage {
  readonly scaleState = signal<'a' | 'b'>('a');
  readonly shimmerTick = signal(0);
  readonly showBanner = signal(true);

  constructor() {
    setInterval(() => this.scaleState.update((s) => (s === 'a' ? 'b' : 'a')), 900);
    setInterval(() => this.shimmerTick.update((n) => n + 1), 1600);
    setInterval(() => this.showBanner.update((v) => !v), 3200);
  }
}
