import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Чтобы работал *ngFor
import { FormsModule } from '@angular/forms'; // Чтобы работал ngModel (ввод текста)
import { 
  IonicModule 
} from '@ionic/angular'; // Чтобы работали ion-header, ion-content и т.д.
import { addIcons } from 'ionicons'; // Для иконок
import { send } from 'ionicons/icons';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule] // ДОБАВЛЯЕМ СЮДА ВСЕ МОДУЛИ
})
export class ExploreContainerComponent {
  @Input() name?: string;

  // Данные для чата (которых не хватало)
  messages = [
    { role: 'assistant', text: 'Привет! Чем могу помочь?' }
  ];
  newMessage = '';

  constructor() {
    addIcons({ send }); // Регистрируем иконку самолетика
  }

  sendMessage() {
    if (this.newMessage.trim().length > 0) {
      this.messages.push({
        role: 'user',
        text: this.newMessage
      });

      const userText = this.newMessage;
      this.newMessage = '';

      // Ответ бота
      setTimeout(() => {
        this.messages.push({
          role: 'assistant',
          text: 'Эхо: ' + userText
        });
      }, 700);
    }
  }
}