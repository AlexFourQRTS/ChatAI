import { Component, computed, effect, ElementRef, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import {
  CONTACTS_DIRECTORY,
  pictalkSectionInvite,
  pictalkSectionOn,
  type PicContact,
} from '../../data/contact-data';
import { ThemeService } from '../../core/theme.service';
import { ContactsRepository } from '../../data/contacts.repository';
import { miuHostStyle } from '../../miu/style-bridge';
import { contactsPageMiuStyle } from './contacts.page.style';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonIcon,
    IonButton,
  ],
})
export class ContactsPage {
  private readonly contactsRepository = inject(ContactsRepository);
  private readonly theme = inject(ThemeService);
  private readonly el = inject(ElementRef);
  private readonly router = inject(Router);
  private readonly toastCtrl = inject(ToastController);

  constructor() {
    effect(() => {
      const css = miuHostStyle(contactsPageMiuStyle(this.theme.mode() === 'dark'));
      (this.el.nativeElement as HTMLElement).style.cssText = css;
    });
  }

  readonly sectionOn = pictalkSectionOn();
  readonly sectionInvite = pictalkSectionInvite();

  readonly directory = toSignal(this.contactsRepository.getDirectory(), {
    initialValue: CONTACTS_DIRECTORY,
  });

  readonly onPicTalk = computed(() => this.directory().filter((c) => c.isOnPictalk));
  readonly inviteList = computed(() => this.directory().filter((c) => !c.isOnPictalk));

  openChat(id: string): void {
    void this.router.navigate(['/tabs/chats/thread', id]);
  }

  onInvite(contact: PicContact, ev: Event): void {
    ev.stopPropagation();
    void this.toastCtrl
      .create({
        message: `Invite ${contact.name} — coming soon.`,
        duration: 2000,
        position: 'bottom',
      })
      .then((toast) => toast.present());
  }
}
