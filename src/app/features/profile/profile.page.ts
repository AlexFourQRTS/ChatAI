import { Component, signal } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { PROFILE_DEMO_BOT_LINE } from './mock/profile.mock';

type ChatRole = 'user' | 'bot';

interface ChatLine {
  role: ChatRole;
  text: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./styles/profile.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonFooter,
    IonTextarea,
    IonButton,
    IonButtons,
    IonIcon,
  ],
})
export class ProfilePage {
  readonly messages = signal<ChatLine[]>([{ role: 'bot', text: PROFILE_DEMO_BOT_LINE }]);

  readonly draft = signal('');

  onDraftInput(ev: CustomEvent<{ value?: string | null }>): void {
    this.draft.set(ev.detail?.value ?? '');
  }

  send(): void {
    const text = this.draft().trim();
    if (!text.length) {
      return;
    }
    this.messages.update((m) => [...m, { role: 'user', text }]);
    this.draft.set('');
    const n = text.length;
    const reply =
      n === 1
        ? 'Your message has 1 character.'
        : `Your message has ${n} characters.`;
    window.setTimeout(() => {
      this.messages.update((m) => [...m, { role: 'bot', text: reply }]);
    }, 400);
  }
}
