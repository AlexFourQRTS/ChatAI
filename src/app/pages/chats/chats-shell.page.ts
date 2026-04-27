import { Component } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-chats-shell',
  template: '<ion-router-outlet></ion-router-outlet>',
  imports: [IonRouterOutlet],
})
export class ChatsShellPage {}
