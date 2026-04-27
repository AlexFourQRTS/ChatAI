import { APP_NAME } from '../../../app.constants';

export interface PicContact {
  readonly id: string;
  readonly name: string;
  readonly phone: string;
  readonly initials: string;
  readonly avatarColor: string;
  readonly isOnPictalk: boolean;
}

/** Справочник контактов, если API недоступен. */
export const CONTACTS_DIRECTORY: readonly PicContact[] = [
  {
    id: 'anna',
    name: 'Anna',
    phone: '+1 (234) 567-89-01',
    initials: 'A',
    avatarColor: '#E85D75',
    isOnPictalk: true,
  },
  {
    id: 'max',
    name: 'Max',
    phone: '+1 (234) 567-89-02',
    initials: 'M',
    avatarColor: '#4ECDC4',
    isOnPictalk: true,
  },
  {
    id: 'kate',
    name: 'Kate',
    phone: '+1 (234) 567-89-03',
    initials: 'K',
    avatarColor: '#AF52DE',
    isOnPictalk: true,
  },
  {
    id: 'david',
    name: 'David',
    phone: '+1 (234) 567-89-04',
    initials: 'D',
    avatarColor: '#4A90E2',
    isOnPictalk: true,
  },
  {
    id: 'john-smith',
    name: 'John Smith',
    phone: '+1 (555) 010-20-30',
    initials: 'JS',
    avatarColor: '#C7C7CC',
    isOnPictalk: false,
  },
  {
    id: 'sarah-johnson',
    name: 'Sarah Johnson',
    phone: '+1 (555) 010-40-50',
    initials: 'SJ',
    avatarColor: '#C7C7CC',
    isOnPictalk: false,
  },
];

export function pictalkSectionOn(): string {
  return `ON ${APP_NAME.toUpperCase()}`;
}

export function pictalkSectionInvite(): string {
  return `INVITE TO ${APP_NAME.toUpperCase()}`;
}
