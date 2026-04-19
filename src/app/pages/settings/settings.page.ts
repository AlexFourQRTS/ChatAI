import { Component, inject, signal } from '@angular/core';
import { forkJoin, of, timer } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { ApiClient } from '../../api/api.client';
import type { Contact } from '../../api/api.types';

const DEMO_CONTACTS: Contact[] = [
  { id: 'demo-1', displayName: 'Ada (offline demo)', username: 'ada' },
  { id: 'demo-2', displayName: 'Alan (offline demo)', username: 'alan' },
  { id: 'demo-3', displayName: 'Grace (offline demo)', username: 'grace' },
];

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSpinner,
    IonList,
    IonItem,
    IonLabel,
    IonNote,
    IonButton,
    IonButtons,
    IonIcon,
  ],
})
export class SettingsPage {
  private readonly api = inject(ApiClient);

  readonly loading = signal(true);
  readonly contacts = signal<Contact[]>([]);
  readonly usedFallback = signal(false);

  constructor() {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.usedFallback.set(false);
    forkJoin({
      data: this.api.getContacts().pipe(
        catchError(() => {
          this.usedFallback.set(true);
          return of(DEMO_CONTACTS);
        }),
      ),
      minWait: timer(700),
    })
      .pipe(map(({ data }) => data))
      .subscribe((rows) => {
        this.contacts.set(rows);
        this.loading.set(false);
      });
  }
}
