import { Component, effect, ElementRef, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { APP_NAME } from '../../app.constants';
import { CHAT_THREADS } from '../../data/chat-data';
import { ThemeService } from '../../core/theme.service';
import { ChatRepository } from '../../data/chat.repository';
import { miuHostStyle } from '../../miu/style-bridge';
import { AiMessengerIconComponent } from './ai-messenger-icon.component';
import { chatsPageMiuStyle } from './chats.page.style';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonIcon,
    IonButtons,
    AiMessengerIconComponent,
  ],
})
export class ChatsPage {
  private readonly chatRepository = inject(ChatRepository);
  private readonly theme = inject(ThemeService);
  private readonly el = inject(ElementRef);
  private readonly router = inject(Router);

  constructor() {
    effect(() => {
      const css = miuHostStyle(chatsPageMiuStyle(this.theme.mode() === 'dark'));
      (this.el.nativeElement as HTMLElement).style.cssText = css;
    });
  }

  readonly appName = APP_NAME;
  readonly threads = toSignal(this.chatRepository.getThreads(), { initialValue: CHAT_THREADS });

  openThread(id: string): void {
    void this.router.navigate(['/tabs/chats/thread', id]);
  }
}
