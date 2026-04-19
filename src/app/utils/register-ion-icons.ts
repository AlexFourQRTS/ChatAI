import { addIcons } from 'ionicons';
import {
  bookmarkOutline,
  chatbubbleEllipsesOutline,
  chatbubblesOutline,
  cloudOfflineOutline,
  colorWandOutline,
  documentTextOutline,
  layersOutline,
  listOutline,
  peopleOutline,
  personCircleOutline,
  personOutline,
  planetOutline,
  readerOutline,
  refreshOutline,
  sendOutline,
  settingsOutline,
  sparklesOutline,
  warningOutline,
} from 'ionicons/icons';

/** Call once at bootstrap so `ion-icon` works on lazy-loaded routes too. */
export function registerAppIonIcons(): void {
  addIcons({
    chatbubblesOutline,
    peopleOutline,
    settingsOutline,
    personCircleOutline,
    sparklesOutline,
    layersOutline,
    colorWandOutline,
    planetOutline,
    documentTextOutline,
    readerOutline,
    listOutline,
    bookmarkOutline,
    refreshOutline,
    cloudOfflineOutline,
    warningOutline,
    personOutline,
    sendOutline,
    chatbubbleEllipsesOutline,
  });
}
