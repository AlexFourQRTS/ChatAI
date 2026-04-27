import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { ClearStuckIonPageHostDirective } from '../../core/clear-stuck-ion-page-host.directive';
import { APP_NAME } from '../../app.constants';
import { CHAT_THREADS } from './mock/chat.mock';
import { ChatRepository } from '../../data/chat.repository';
import { SearchFieldComponent } from '../search/components/search-field.component';
import { AiMessengerIconComponent } from './components/ai-messenger-icon.component';

@Component({
  selector: 'app-chats',
  hostDirectives: [ClearStuckIonPageHostDirective],
  templateUrl: './chats.page.html',
  styleUrls: ['./styles/chats.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    AiMessengerIconComponent,
    SearchFieldComponent,
  ],
})
export class ChatsPage {
  private readonly chatRepository = inject(ChatRepository);
  private readonly router = inject(Router);

  readonly appName = APP_NAME;
  readonly threads = toSignal(this.chatRepository.getThreads(), { initialValue: CHAT_THREADS });

  openThread(id: string): void {
    void this.router.navigate(['/chats/thread', id]);
  }
}
