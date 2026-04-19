import { Component } from '@angular/core';
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
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon],
})
export class ContactsPage {
  /** Long list for scroll demo */
  readonly blocks = Array.from({ length: 90 }, (_, i) => i + 1);

  private readonly sectionIcons = [
    'document-text-outline',
    'reader-outline',
    'list-outline',
    'bookmark-outline',
  ] as const;

  iconFor(blockIndex: number): string {
    return this.sectionIcons[(blockIndex - 1) % this.sectionIcons.length];
  }
}
