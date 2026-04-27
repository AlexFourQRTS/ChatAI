import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-search-field',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search-field.component.html',
  styleUrls: ['../styles/search-field.component.scss'],
  imports: [IonIcon],
})
export class SearchFieldComponent {
  readonly placeholder = input('');
  readonly ariaLabel = input('Search');
  readonly autocomplete = input('off');
}
