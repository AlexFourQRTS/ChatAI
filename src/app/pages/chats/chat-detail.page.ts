import { Component, computed, effect, ElementRef, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import type { ChatBubble } from '../../data/chat-data';
import { ThemeService } from '../../core/theme.service';
import { CHAT_TRANSCRIPT, threadById } from '../../data/chat-data';
import { miuHostStyle } from '../../miu/style-bridge';
import { chatDetailPageMiuStyle } from './chat-detail.page.style';

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.page.html',
  styleUrls: ['./chat-detail.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonFooter,
    IonButtons,
    IonButton,
    IonIcon,
    IonBackButton,
    IonModal,
  ],
})
export class ChatDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly theme = inject(ThemeService);
  private readonly el = inject(ElementRef);

  constructor() {
    effect(() => {
      const css = miuHostStyle(chatDetailPageMiuStyle(this.theme.mode() === 'dark'));
      (this.el.nativeElement as HTMLElement).style.cssText = css;
    });
  }

  readonly threadId = toSignal(this.route.paramMap.pipe(map((p) => p.get('id') ?? '')), {
    initialValue: '',
  });

  readonly thread = computed(() => threadById(this.threadId()));
  readonly messages = computed(() => CHAT_TRANSCRIPT);

  readonly modalOpen = signal(false);
  readonly editPromptMode = signal(false);
  readonly activeBubble = signal<ChatBubble | null>(null);
  readonly displayPrompt = signal('');
  readonly draftPrompt = signal('');

  openPreview(b: ChatBubble): void {
    this.activeBubble.set(b);
    this.displayPrompt.set(b.prompt);
    this.draftPrompt.set(b.prompt);
    this.editPromptMode.set(false);
    this.modalOpen.set(true);
  }

  closeModal(): void {
    this.modalOpen.set(false);
    this.editPromptMode.set(false);
  }

  startEditPrompt(): void {
    this.draftPrompt.set(this.displayPrompt());
    this.editPromptMode.set(true);
  }

  cancelEditPrompt(): void {
    this.editPromptMode.set(false);
    this.draftPrompt.set(this.displayPrompt());
  }

  applyPromptEdit(): void {
    this.displayPrompt.set(this.draftPrompt());
    this.editPromptMode.set(false);
  }

  onDraftInput(ev: Event): void {
    const v = (ev.target as HTMLInputElement).value;
    this.draftPrompt.set(v);
  }

  onRegenerate(): void {
    this.closeModal();
  }

  onSendFromModal(): void {
    this.closeModal();
  }
}
