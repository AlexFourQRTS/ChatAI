import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
  ToastController,
} from '@ionic/angular/standalone';
import { ClearStuckIonPageHostDirective } from '../../core/clear-stuck-ion-page-host.directive';
import {
  CONTACTS_DIRECTORY,
  pictalkSectionInvite,
  pictalkSectionOn,
  type PicContact,
} from './mock/contacts.mock';
import { ContactsRepository } from '../../data/contacts.repository';
import { SearchFieldComponent } from '../search/components/search-field.component';

@Component({
  selector: 'app-contacts',
  hostDirectives: [ClearStuckIonPageHostDirective],
  templateUrl: './contacts.page.html',
  styleUrls: ['./styles/contacts.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonIcon,
    IonButton,
    SearchFieldComponent,
  ],
})
export class ContactsPage {
  private readonly contactsRepository = inject(ContactsRepository);
  private readonly router = inject(Router);
  private readonly toastCtrl = inject(ToastController);

  readonly sectionOn = pictalkSectionOn();
  readonly sectionInvite = pictalkSectionInvite();

  readonly directory = toSignal(this.contactsRepository.getDirectory(), {
    initialValue: CONTACTS_DIRECTORY,
  });

  readonly onPicTalk = computed(() => this.directory().filter((c) => c.isOnPictalk));
  readonly inviteList = computed(() => this.directory().filter((c) => !c.isOnPictalk));

  openChat(id: string): void {
    void this.router.navigate(['/chats/thread', id]);
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
