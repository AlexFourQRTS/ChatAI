/** One domain shape: inbox row and thread header read the same fields. */
export interface ChatThread {
  readonly id: string;
  readonly name: string;
  readonly time: string;
  readonly initials: string;
  readonly avatarColor: string;
  readonly unread?: number;
  readonly preview?: string;
  readonly previewStrip?: boolean;
  readonly online?: boolean;
}

export interface ChatBubble {
  readonly id: string;
  readonly from: 'me' | 'them';
  readonly time: string;
  readonly prompt: string;
  readonly gradient: string;
}

/** Демо-инбокс (fallback, если API недоступен). */
export const CHAT_THREADS: readonly ChatThread[] = [
  {
    id: 'anna',
    name: 'Anna',
    time: '14:23',
    initials: 'A',
    avatarColor: '#E85D75',
    unread: 2,
    previewStrip: true,
    online: false,
  },
  {
    id: 'max',
    name: 'Max',
    time: 'Yesterday',
    initials: 'M',
    avatarColor: '#4ECDC4',
    unread: 5,
    previewStrip: true,
    online: true,
  },
  {
    id: 'kate',
    name: 'Kate',
    time: 'Today',
    initials: 'K',
    avatarColor: '#AF52DE',
    unread: 5,
    previewStrip: true,
    online: true,
  },
  {
    id: 'david',
    name: 'David',
    time: 'Fri',
    initials: 'D',
    avatarColor: '#4A90E2',
    unread: 5,
    previewStrip: true,
    online: true,
  },
  {
    id: 'sophie',
    name: 'Sophie',
    time: 'Thu',
    initials: 'S',
    avatarColor: '#C792EA',
    unread: 5,
    preview: 'Sounds perfect, thanks!',
    online: false,
  },
  {
    id: 'team',
    name: 'Team chat',
    time: 'Wed',
    initials: 'T',
    avatarColor: '#FFB347',
    unread: 5,
    previewStrip: true,
    online: false,
  },
];

/** Один демо-транскрипт для любого треда. */
export const CHAT_TRANSCRIPT: readonly ChatBubble[] = [
  {
    id: 'm1',
    from: 'them',
    time: '14:18',
    prompt: 'Sunset over water',
    gradient: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 40%, #48dbfb 100%)',
  },
  {
    id: 'm2',
    from: 'me',
    time: '14:18',
    prompt: 'Abstract fluid cells',
    gradient: 'linear-gradient(125deg, #ee5a6f 0%, #f7b731 35%, #26de81 70%, #4b7bec 100%)',
  },
  {
    id: 'm3',
    from: 'them',
    time: '14:20',
    prompt: 'Teal and coral flow',
    gradient: 'linear-gradient(110deg, #0fb9b1 0%, #fd9644 50%, #eb3b5a 100%)',
  },
];

export function threadById(id: string): ChatThread {
  const row = CHAT_THREADS.find((t) => t.id === id);
  if (row) return row;
  const key = id || 'chat';
  return {
    id: key,
    name: key.charAt(0).toUpperCase() + key.slice(1),
    time: '',
    initials: key.charAt(0).toUpperCase(),
    avatarColor: '#8E8E93',
    online: false,
  };
}
